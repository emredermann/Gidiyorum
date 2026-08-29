from crewai import Agent
from llm_config import get_llm
from tools import (
    fetch_github_issues,
    create_and_checkout_branch,
    read_local_file,
    write_local_file,
    execute_terminal_command,
    create_pull_request,
    review_pull_request,
    add_pr_comment_and_request_changes,
    commit_and_push_fixes_to_pr
)

llm = get_llm()

# 1. Team Lead (Orchestrator) Ajanı
team_lead_agent = Agent(
    role="Takım Lideri ve Yazılım Mimarı",
    goal="GitHub açık issue'larını çekip analiz etmek, çözülecek issue için branch adını belirlemek ve PR onay durumunu özetleyen rapor hazırlamak.",
    backstory="Sen 'Gidiyorum' projesinin kıdemli mimarısın. Açık issue'ları inceler ve geliştiricilere net hedefler belirlersin.",
    tools=[fetch_github_issues],
    llm=llm,
    verbose=True,
    allow_delegation=False,
    max_iter=4
)

# 2. PR Creator (DevOps & Git Uzmanı) Ajanı
pr_creator_agent = Agent(
    role="Git & Pull Request Uzmanı",
    goal="Issue analizi sonrası hemen yeni bir Git branch oluşturup bu branch'e geçmek; kod düzeltmeleri tamamlandığında ise bu yeni branch ile GitHub üzerinde Pull Request açmak.",
    backstory="Sen Git ve GitHub otomasyon uzmanısın. Herhangi bir kod yazılmadan önce 'create_and_checkout_branch' aracıyla yeni bir Git branch oluşturursun.",
    tools=[create_and_checkout_branch, create_pull_request, commit_and_push_fixes_to_pr, read_local_file, write_local_file],
    llm=llm,
    verbose=True,
    allow_delegation=False,
    max_iter=4
)

# 3. Frontend Geliştirici Ajanı
frontend_agent = Agent(
    role="Angular Frontend Geliştiricisi",
    goal="Açılan yeni Git branch üzerinde dosyaları okuyup hatayı Angular 18+ (Standalone, Signals) ve Tailwind standartlarında düzeltmek.",
    backstory="Sen Angular uzmanısın. PR Creator'ın açtığı yeni branch üzerindeki dosyaları okur ve düzeltirsin.",
    tools=[read_local_file, write_local_file],
    llm=llm,
    verbose=True,
    allow_delegation=False,
    max_iter=4
)

# 4. Backend Geliştirici Ajanı
backend_agent = Agent(
    role="Supabase Backend Geliştiricisi",
    goal="Açılan yeni Git branch üzerinde Supabase mantığını düzenlemek.",
    backstory="Sen Supabase ve PostgreSQL uzmanısın. Yeni branch üzerinde kodları güvenli şekilde güncellersin.",
    tools=[read_local_file, write_local_file],
    llm=llm,
    verbose=True,
    allow_delegation=False,
    max_iter=4
)

# 5. QA (Kalite Kontrol) Ajanı
qa_agent = Agent(
    role="QA ve Derleme Test Uzmanı",
    goal="Yeni branch üzerindeki kodları 'npx ng build' ile derleyip test ederek hata olmadığını doğrulamak.",
    backstory="Sen QA uzmanısın. Yeni branch'teki projenin derlendiğini terminal çıktısıyla onaylarsın.",
    tools=[execute_terminal_command, read_local_file],
    llm=llm,
    verbose=True,
    allow_delegation=False,
    max_iter=3
)

# 6. PR Reviewer (Güvenlik & Kod Denetçisi) Ajanı
pr_reviewer_agent = Agent(
    role="PR ve Güvenlik Denetçisi",
    goal="Açılan yeni branch Pull Request'inin kod diff'lerini denetleyip GitHub PR sayfasına review onayı bırakmak.",
    backstory="Sen titiz bir Code Reviewer'sın. Yeni branch ile açılan PR'ı inceler ve Kullanıcı Onayına sunarsın.",
    tools=[review_pull_request, add_pr_comment_and_request_changes],
    llm=llm,
    verbose=True,
    allow_delegation=False,
    max_iter=4
)
