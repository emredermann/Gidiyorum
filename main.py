import sys
from crewai import Crew, Process, Task
from agents import (
    team_lead_agent,
    pr_creator_agent,
    frontend_agent,
    backend_agent,
    qa_agent,
    pr_reviewer_agent
)
from tools import get_real_repo_name


def create_gidiyorum_crew() -> Crew:
    branch_name = "fix/issue-patch"
    
    # 1. Görev: Issue Analizi (Team Lead)
    task_fetch = Task(
        description=(
            "1. 'fetch_github_issues' aracını kullanarak repodaki açık issue'ları çek.\n"
            "2. Çözülecek issue'yu belirle, düzeltilecek dosyaları ve oluşturulacak branch adını (fix/issue-patch) netleştir."
        ),
        expected_output="Hedef dosya yolları ve çözüm planı.",
        agent=team_lead_agent
    )

    # 2. Görev: Yeni Git Branch Açılışı (PR Creator)
    task_create_branch = Task(
        description=(
            f"1. 'create_and_checkout_branch' aracını kullanarak '{branch_name}' adında yeni bir Git branch oluştur ve bu branch'e geç.\n"
            "2. Geliştirici ajanların bu yeni branch üzerinde kod yazabilmesi için branch'in hazır olduğunu doğrula."
        ),
        expected_output=f"Yeni branch '{branch_name}' oluşturuldu ve aktif yapıldı.",
        agent=pr_creator_agent,
        context=[task_fetch]
    )

    # 3. Görev: Yeni Branch Üzerinde Kodlama (Frontend & Backend)
    task_fix = Task(
        description=(
            "1. Hedef dosya yolunu 'read_local_file' ile oku.\n"
            "2. Angular 18 (Signals) ve Tailwind kurallarına göre düzeltmeyi yap.\n"
            "3. Düzeltilen tam kodu 'write_local_file' ile yeni branch üzerine kaydet."
        ),
        expected_output="Yeni branch üzerinde düzeltilen dosya yolu ve özet.",
        agent=frontend_agent,
        context=[task_fetch, task_create_branch]
    )

    # 4. Görev: QA Test ve Derleme (QA)
    task_qa = Task(
        description=(
            "1. 'execute_terminal_command' aracıyla 'npx ng build' komutunu çalıştır.\n"
            "2. Çıkış kodunu incele, derleme başarılı ise onay ver."
        ),
        expected_output="Derleme sonucu ve QA onay raporu.",
        agent=qa_agent,
        context=[task_fix]
    )

    # 5. Görev: Yeni Branch ile GitHub PR Açılışı (PR Creator)
    task_pr_create = Task(
        description=(
            f"1. 'create_pull_request' aracını çalıştır.\n"
            f"2. Parametreler: branch_name='{branch_name}', pr_title='fix: Automated Issue Patch on {branch_name}', "
            f"pr_body='Bu Pull Request {branch_name} branch'i üzerinden otomatik oluşturulmuştur. Testler ve kod düzeltmeleri tamamlandı.'\n"
            "3. Açılan PR linkini döndür."
        ),
        expected_output="Yeni branch ile açılan Pull Request linki ve numarası.",
        agent=pr_creator_agent,
        context=[task_create_branch, task_fix, task_qa]
    )

    # 6. Görev: PR İnceleme ve Kullanıcı Onayı (PR Reviewer)
    task_pr_review = Task(
        description=(
            "1. Açılan PR'ı 'review_pull_request' ve 'add_pr_comment_and_request_changes' araçlarıyla incele ve onay yorumu ekle.\n"
            "2. Sonuç raporunda açılan GitHub PR linkini belirterek kullanıcının merge onayı için hazır olduğunu duyur."
        ),
        expected_output="PR inceleme onayı, GitHub PR Linki ve Kullanıcı Onay durumu.",
        agent=pr_reviewer_agent,
        context=[task_pr_create]
    )

    return Crew(
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
        verbose=True
    )


def main():
    print("=" * 60)
    print("🚀 GİDİYORUM - Yeni Branch & PR Otomasyon Orkestratörü")
    print("🤖 Model: Yerel Ollama (Ücretsiz / Localhost)")
    print("=" * 60)

    try:
        crew = create_gidiyorum_crew()
        print("\n⏳ Orkestrasyon başlatılıyor...\n")
        result = crew.kickoff()
        print("\n" + "=" * 60)
        print("✅ TÜM GÖREVLER BAŞARIYLA TAMAMLANDI!")
        print("=" * 60)
        print("\n📋 NİHAİ RAPOR:\n")
        print(result)
    except KeyboardInterrupt:
        print("\n⚠️ İşlem kullanıcı tarafından iptal edildi.")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Hata oluştu: {str(e)}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
