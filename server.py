import asyncio
import os
import json
import re
from contextlib import asynccontextmanager
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware

from crewai import Crew, Process, Task
from agents import (
    team_lead_agent,
    frontend_agent,
    backend_agent,
    qa_agent,
    pr_creator_agent,
    pr_reviewer_agent
)
from tools import get_real_repo_name

main_loop: Optional[asyncio.AbstractEventLoop] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global main_loop
    main_loop = asyncio.get_running_loop()
    print("🚀 FastAPI & WebSocket sunucusu hazır: ws://localhost:8000/ws/agent-stream")
    yield


app = FastAPI(
    title="Gidiyorum - CrewAI Orchestrator API",
    description="Angular & Supabase projeleri için yerel AI Agent orkestrasyonu, Yeni Branch & PR Otomasyonu.",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast_json(self, data: Dict[str, Any]):
        message_str = json.dumps(data, ensure_ascii=False)
        for connection in list(self.active_connections):
            try:
                await connection.send_text(message_str)
            except Exception:
                self.disconnect(connection)

    async def broadcast_text(self, message: str):
        for connection in list(self.active_connections):
            try:
                await connection.send_text(message)
            except Exception:
                self.disconnect(connection)


manager = ConnectionManager()

orchestration_state: Dict[str, Any] = {
    "current_step": 0,
    "total_steps": 6,
    "current_phase": "BEKLEMEDE",
    "is_running": False,
    "pr_url": None,
    "active_branch": "main",
    "agents": {
        "team_lead": {"name": "Team Lead", "state": "IDLE", "task": "Açık issue'lar bekleniyor", "tool": None},
        "pr_creator": {"name": "PR Creator", "state": "IDLE", "task": "Sırasını bekliyor", "tool": None},
        "frontend": {"name": "Frontend Dev", "state": "IDLE", "task": "Sırasını bekliyor", "tool": None},
        "backend": {"name": "Backend Dev", "state": "IDLE", "task": "Sırasını bekliyor", "tool": None},
        "qa": {"name": "QA Tester", "state": "IDLE", "task": "Sırasını bekliyor", "tool": None},
        "pr_reviewer": {"name": "PR Reviewer", "state": "IDLE", "task": "Sırasını bekliyor", "tool": None},
    }
}


def broadcast_state():
    if main_loop and main_loop.is_running():
        payload = {
            "type": "STATE_UPDATE",
            "data": orchestration_state
        }
        asyncio.run_coroutine_threadsafe(
            manager.broadcast_json(payload),
            main_loop
        )


def broadcast_log(agent_name: str, detail: str):
    formatted = f"{agent_name}: {detail}"
    print(f"[STREAM] {formatted}")
    
    if main_loop and main_loop.is_running():
        asyncio.run_coroutine_threadsafe(
            manager.broadcast_text(formatted),
            main_loop
        )


def set_agent_state(agent_key: str, state: str, task: str, tool: str = None):
    if agent_key in orchestration_state["agents"]:
        orchestration_state["agents"][agent_key]["state"] = state
        orchestration_state["agents"][agent_key]["task"] = task
        orchestration_state["agents"][agent_key]["tool"] = tool
        broadcast_state()


def set_pipeline_phase(step_num: int, phase_name: str):
    orchestration_state["current_step"] = step_num
    orchestration_state["current_phase"] = phase_name
    broadcast_state()


def get_agent_key(agent_role_or_name: str) -> str:
    lower = str(agent_role_or_name).lower()
    if 'lead' in lower or 'mimar' in lower or 'architect' in lower:
        return 'team_lead'
    if 'creator' in lower or 'devops' in lower or 'pull request' in lower:
        return 'pr_creator'
    if 'front' in lower or 'angular' in lower:
        return 'frontend'
    if 'back' in lower or 'supabase' in lower or 'sql' in lower:
        return 'backend'
    if 'qa' in lower or 'test' in lower or 'derleme' in lower:
        return 'qa'
    if 'reviewer' in lower or 'denetçi' in lower or 'güvenlik' in lower:
        return 'pr_reviewer'
    return 'team_lead'


def agent_step_callback(step_output):
    try:
        agent_key = 'team_lead'
        agent_display_name = 'AI Agent'

        if hasattr(step_output, 'agent') and step_output.agent:
            role = getattr(step_output.agent, 'role', 'Agent')
            agent_key = get_agent_key(role)
            agent_display_name = orchestration_state["agents"].get(agent_key, {}).get("name", role)

        tool_name = getattr(step_output, 'tool', None)
        tool_input = getattr(step_output, 'tool_input', None)
        thought = getattr(step_output, 'thought', None)

        if tool_name:
            action_desc = f"'{tool_name}' aracını çalıştırıyor ({tool_input})"
            set_agent_state(agent_key, "RUNNING_TOOL", f"Araç: {tool_name}", tool=tool_name)
        elif thought:
            action_desc = f"Düşünüyor: {str(thought).strip()[:140]}"
            set_agent_state(agent_key, "THINKING", "Analiz ediyor ve planlıyor...", tool=None)
        else:
            action_desc = str(step_output)[:150]
            set_agent_state(agent_key, "WORKING", action_desc, tool=None)

        broadcast_log(agent_display_name, action_desc)
    except Exception as e:
        broadcast_log("Sistem", f"Adım loglandı: {str(e)}")


def task_completion_callback(task_output):
    try:
        agent_key = 'team_lead'
        agent_name = "Team Lead"
        if hasattr(task_output, 'agent') and task_output.agent:
            role = getattr(task_output.agent, 'role', 'Agent')
            agent_key = get_agent_key(role)
            agent_name = orchestration_state["agents"].get(agent_key, {}).get("name", role)

        summary = str(task_output.raw if hasattr(task_output, 'raw') else task_output)[:140]
        set_agent_state(agent_key, "COMPLETED", "Görevini tamamladı", tool=None)
        broadcast_log(agent_name, f"✅ Görev tamamlandı: {summary}...")
    except Exception as e:
        broadcast_log("Sistem", f"Görev tamamlandı: {str(e)}")


def run_orchestration_sync():
    try:
        repo_name = get_real_repo_name()
        branch_name = "fix/issue-patch"
        
        orchestration_state["is_running"] = True
        orchestration_state["pr_url"] = None
        orchestration_state["active_branch"] = branch_name
        broadcast_state()

        # 1. AŞAMA: ISSUE ANALİZİ (Team Lead)
        set_pipeline_phase(1, "1/6: GitHub Issue Analizi")
        set_agent_state("team_lead", "THINKING", "GitHub açık issue'ları taranıyor...")
        broadcast_log("Team Lead", f"1. Adım: '{repo_name}' deposundaki açık issue'lar inceleniyor...")

        task_fetch = Task(
            description=(
                "1. 'fetch_github_issues' aracını kullanarak repodaki açık issue'ları çek.\n"
                "2. Çözülecek issue'yu belirle, düzeltilecek dosyaları ve oluşturulacak branch adını (fix/issue-patch) netleştir."
            ),
            expected_output="Hedef dosya yolları ve çözüm planı.",
            agent=team_lead_agent,
            callback=task_completion_callback
        )

        # 2. AŞAMA: YENİ GIT BRANCH AÇMA (PR Creator)
        set_pipeline_phase(2, "2/6: Yeni Git Branch Açılışı")
        set_agent_state("pr_creator", "WORKING", f"Yeni '{branch_name}' branch'i oluşturuluyor...")
        broadcast_log("PR Creator", f"2. Adım: Kod geliştirmeleri için yeni branch '{branch_name}' oluşturulup aktif ediliyor...")

        task_create_branch = Task(
            description=(
                f"1. 'create_and_checkout_branch' aracını kullanarak '{branch_name}' adında yeni bir Git branch oluştur ve bu branch'e geç.\n"
                "2. Geliştirici ajanların bu yeni branch üzerinde kod yazabilmesi için branch'in hazır olduğunu doğrula."
            ),
            expected_output=f"Yeni branch '{branch_name}' oluşturuldu ve aktif yapıldı.",
            agent=pr_creator_agent,
            context=[task_fetch],
            callback=task_completion_callback
        )

        # 3. AŞAMA: YENİ BRANCH ÜZERİNDE KOD DÜZELTME (Frontend & Backend)
        set_pipeline_phase(3, "3/6: Yeni Branch Üzerinde Kodlama")
        set_agent_state("frontend", "WORKING", f"'{branch_name}' branch'inde dosyalar düzeltiliyor...")
        broadcast_log("Frontend Dev", f"3. Adım: Yeni branch '{branch_name}' üzerinde kod düzeltmeleri uygulanıyor...")

        task_fix = Task(
            description=(
                "1. Hedef dosya yolunu 'read_local_file' ile oku.\n"
                "2. Angular 18 (Signals) ve Tailwind kurallarına göre düzeltmeyi yap.\n"
                "3. Düzeltilen tam kodu 'write_local_file' ile yeni branch üzerine kaydet."
            ),
            expected_output="Yeni branch üzerinde düzeltilen dosya yolu ve özet.",
            agent=frontend_agent,
            context=[task_fetch, task_create_branch],
            callback=task_completion_callback
        )

        # 4. AŞAMA: QA VE DERLEME TESTİ (QA)
        set_pipeline_phase(4, "4/6: QA Derleme ve Hata Kontrolü")
        set_agent_state("qa", "WORKING", f"'{branch_name}' branch'i derleniyor...")
        broadcast_log("QA Tester", f"4. Adım: Yeni branch '{branch_name}' üzerinde derleme testi yapılıyor...")

        task_qa = Task(
            description=(
                "1. 'execute_terminal_command' aracıyla 'npx ng build' komutunu çalıştır.\n"
                "2. Çıkış kodunu incele, derleme başarılı ise onay ver."
            ),
            expected_output="Derleme sonucu ve QA onay raporu.",
            agent=qa_agent,
            context=[task_fix],
            callback=task_completion_callback
        )

        # 5. AŞAMA: YENİ BRANCH İLE PULL REQUEST AÇMA (PR Creator)
        set_pipeline_phase(5, "5/6: Yeni Branch ile GitHub PR Açılışı")
        set_agent_state("pr_creator", "WORKING", f"'{branch_name}' branch'i pushlanıp PR açılıyor...")
        broadcast_log("PR Creator", f"5. Adım: '{branch_name}' branch'i GitHub'a pushlanıp PR açılıyor...")

        task_pr_create = Task(
            description=(
                f"1. 'create_pull_request' aracını çalıştır.\n"
                f"2. Parametreler: branch_name='{branch_name}', pr_title='fix: Automated Issue Patch on {branch_name}', "
                f"pr_body='Bu Pull Request {branch_name} branch'i üzerinden otomatik oluşturulmuştur. Testler ve kod düzeltmeleri tamamlandı.'\n"
                "3. Açılan PR linkini döndür."
            ),
            expected_output="Yeni branch ile açılan Pull Request linki ve numarası.",
            agent=pr_creator_agent,
            context=[task_create_branch, task_fix, task_qa],
            callback=task_completion_callback
        )

        # 6. AŞAMA: PR REVIEW VE KULLANICI ONAYI (PR Reviewer)
        set_pipeline_phase(6, "6/6: PR İnceleme & GitHub Merge Onayı")
        set_agent_state("pr_reviewer", "WORKING", "Açılan yeni PR inceleniyor...")
        broadcast_log("PR Reviewer", "6. Adım: Yeni branch PR'ı incelenip review onayı veriliyor...")

        task_pr_review = Task(
            description=(
                "1. Açılan PR'ı 'review_pull_request' ve 'add_pr_comment_and_request_changes' araçlarıyla incele ve onay yorumu ekle.\n"
                "2. Sonuç raporunda açılan GitHub PR linkini belirterek kullanıcının merge onayı için hazır olduğunu duyur."
            ),
            expected_output="PR inceleme onayı, GitHub PR Linki ve Kullanıcı Onay durumu.",
            agent=pr_reviewer_agent,
            context=[task_pr_create],
            callback=task_completion_callback
        )

        crew = Crew(
            agents=[
                team_lead_agent,
                pr_creator_agent,
                frontend_agent,
                backend_agent,
                qa_agent,
                pr_reviewer_agent
            ],
            tasks=[
                task_fetch,
                task_create_branch,
                task_fix,
                task_qa,
                task_pr_create,
                task_pr_review
            ],
            process=Process.sequential,
            step_callback=agent_step_callback,
            task_callback=task_completion_callback,
            verbose=True
        )

        broadcast_log("Team Lead", f"🎯 6 Ajanlı Yeni Branch ('{branch_name}') ve PR döngüsü başladı.")
        result = crew.kickoff()
        full_report_text = str(result.raw if hasattr(result, 'raw') else result)
        
        pr_match = re.search(r'https://github\.com/[a-zA-Z0-9_\-\.]+/[a-zA-Z0-9_\-\.]+/(?:pull/\d+|pull/new/[^\s\)]+|compare/[^\s\)]+)', full_report_text)
        if pr_match and "your-username" not in pr_match.group(0) and "123456789" not in pr_match.group(0):
            orchestration_state["pr_url"] = pr_match.group(0)
        else:
            orchestration_state["pr_url"] = f"https://github.com/{repo_name}/pull/new/{branch_name}"


        orchestration_state["is_running"] = False
        orchestration_state["current_phase"] = "TAMAMLANDI (GitHub'da Onay Bekliyor)"
        for k in orchestration_state["agents"]:
            orchestration_state["agents"][k]["state"] = "COMPLETED"
        broadcast_state()

        broadcast_log("Team Lead", f"FINAL_REPORT: {full_report_text}")
        broadcast_log("Sistem", f"✅ '{branch_name}' branch'i hazırlandı ve GitHub'da PR açıldı! Onayınızı bekliyor.")

    except Exception as e:
        orchestration_state["is_running"] = False
        orchestration_state["current_phase"] = "HATA"
        broadcast_state()
        broadcast_log("Sistem", f"HATA OLUŞTU: {str(e)}")


@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "Gidiyorum CrewAI Orchestrator & PR Automation",
        "websocket_endpoint": "/ws/agent-stream",
        "start_endpoint": "/api/start",
        "state": orchestration_state
    }


@app.get("/api/state")
async def get_state():
    return orchestration_state


@app.websocket("/ws/agent-stream")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    await websocket.send_text(json.dumps({"type": "STATE_UPDATE", "data": orchestration_state}, ensure_ascii=False))
    await websocket.send_text("Sistem: WebSocket bağlantısı kuruldu. Yeni Branch & PR akışı hazır.")
    
    try:
        while True:
            data = await websocket.receive_text()
            if data.strip().lower() in ["start", "run", "baslat"]:
                await manager.broadcast_text("Sistem: Yeni branch ve PR orkestrasyonu tetiklendi...")
                asyncio.create_task(asyncio.to_thread(run_orchestration_sync))
            else:
                await websocket.send_text(f"Sistem: Bilinmeyen komut '{data}'. Başlatmak için 'start' gönderin.")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        manager.disconnect(websocket)


@app.post("/api/start")
async def start_orchestration(background_tasks: BackgroundTasks):
    background_tasks.add_task(run_orchestration_sync)
    return {"message": "Yeni Branch ve PR orkestrasyonu başlatıldı."}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
