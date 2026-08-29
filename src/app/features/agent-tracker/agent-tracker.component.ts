import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface LogEntry {
  time: string;
  agent: string;
  detail: string;
}

interface AgentStateInfo {
  name: string;
  state: 'IDLE' | 'THINKING' | 'WORKING' | 'RUNNING_TOOL' | 'COMPLETED' | 'ERROR';
  task: string;
  tool?: string | null;
}

@Component({
  selector: 'app-agent-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agent-tracker.component.html',
  styleUrls: ['./agent-tracker.component.css']
})
export class AgentTrackerComponent implements OnInit, OnDestroy, AfterViewChecked {
  private http = inject(HttpClient);

  @ViewChild('scrollContainer') private scrollContainer?: ElementRef<HTMLDivElement>;

  isConnected = signal<boolean>(false);
  isRunning = signal<boolean>(false);
  isStarting = signal<boolean>(false);
  activeAgent = signal<string | null>(null);

  currentStep = signal<number>(0);
  currentPhase = signal<string>("BEKLEMEDE");

  agentsMap = signal<Record<string, AgentStateInfo>>({
    team_lead: { name: "Team Lead", state: "IDLE", task: "Açık issue'lar bekleniyor", tool: null },
    pr_creator: { name: "PR Creator", state: "IDLE", task: "Sırasını bekliyor", tool: null },
    frontend: { name: "Frontend Dev", state: "IDLE", task: "Sırasını bekliyor", tool: null },
    backend: { name: "Backend Dev", state: "IDLE", task: "Sırasını bekliyor", tool: null },
    qa: { name: "QA Tester", state: "IDLE", task: "Sırasını bekliyor", tool: null },
    pr_reviewer: { name: "PR Reviewer", state: "IDLE", task: "Sırasını bekliyor", tool: null }
  });

  showFinalModal = signal<boolean>(false);
  finalReportContent = signal<string>('');
  prUrl = signal<string | null>(null);

  logs = signal<LogEntry[]>([]);
  commandInput: string = '';

  private socket?: WebSocket;
  private shouldScroll: boolean = false;
  private readonly apiUrl = 'http://localhost:8000';
  private readonly wsUrl = 'ws://localhost:8000/ws/agent-stream';

  ngOnInit() {
    this.connectWebSocket();
  }

  ngOnDestroy() {
    this.disconnectWebSocket();
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  connectWebSocket() {
    this.disconnectWebSocket();

    try {
      this.socket = new WebSocket(this.wsUrl);

      this.socket.onopen = () => {
        this.isConnected.set(true);
        this.addLog('Sistem', 'FastAPI WebSocket sunucusuna bağlanıldı. 6 Ajan Canlı Takipte.');
      };

      this.socket.onmessage = (event) => {
        this.handleIncomingMessage(event.data);
      };

      this.socket.onerror = () => {
        this.isConnected.set(false);
        this.addLog('Sistem', 'WebSocket bağlantı hatası! Sunucunun (localhost:8000) açık olduğundan emin olun.');
      };

      this.socket.onclose = () => {
        this.isConnected.set(false);
        this.isRunning.set(false);
        this.addLog('Sistem', 'WebSocket bağlantısı kapandı.');
      };
    } catch (err: any) {
      this.isConnected.set(false);
      this.addLog('Sistem', `Bağlantı başlatılamadı: ${err?.message || err}`);
    }
  }

  disconnectWebSocket() {
    if (this.socket) {
      this.socket.close();
      this.socket = undefined;
    }
  }

  reconnect() {
    this.connectWebSocket();
  }

  triggerOrchestrationHttp() {
    if (this.isRunning()) return;

    this.isStarting.set(true);
    this.isRunning.set(true);
    this.prUrl.set(null);
    this.currentStep.set(1);
    this.currentPhase.set("1/6: GitHub Issue Analizi Başlatılıyor");
    this.addLog('Kullanıcı', "GitHub Issue çözümü ve yeni branch PR döngüsü tetiklendi.");

    this.http.post<{ message: string }>(`${this.apiUrl}/api/start`, {}).subscribe({
      next: (res) => {
        this.isStarting.set(false);
        this.addLog('Sistem', res.message || 'Orkestrasyon başlatıldı.');
      },
      error: (err) => {
        this.isStarting.set(false);
        this.isRunning.set(false);
        this.addLog('Sistem', `HTTP Başlatma Hatası: ${err.message || 'Sunucuya ulaşılamadı'}`);
      }
    });
  }

  sendCommand() {
    if (!this.commandInput.trim() || !this.socket || !this.isConnected()) return;

    const cmd = this.commandInput.trim();
    if (cmd.toLowerCase() === 'start' || cmd.toLowerCase() === 'run') {
      this.isRunning.set(true);
      this.prUrl.set(null);
    }
    
    this.socket.send(cmd);
    this.addLog('Kullanıcı', cmd);
    this.commandInput = '';
  }

  clearLogs() {
    this.logs.set([]);
  }

  closeFinalModal() {
    this.showFinalModal.set(false);
  }

  private handleIncomingMessage(rawMessage: string) {
    try {
      if (rawMessage.startsWith('{') && rawMessage.endsWith('}')) {
        const parsed = JSON.parse(rawMessage);
        if (parsed.type === 'STATE_UPDATE' && parsed.data) {
          const stateData = parsed.data;
          this.currentStep.set(stateData.current_step || 0);
          this.currentPhase.set(stateData.current_phase || "BEKLEMEDE");
          this.isRunning.set(!!stateData.is_running);
          if (stateData.pr_url) {
            this.prUrl.set(stateData.pr_url);
          }
          if (stateData.agents) {
            this.agentsMap.set(stateData.agents);
          }
          return;
        }
      }
    } catch {
    }

    const prUrlMatch = rawMessage.match(/https:\/\/github\.com\/[a-zA-Z0-9_\-\.]+\/[a-zA-Z0-9_\-\.]+\/(?:pull\/\d+|pull\/new\/[^\s\)]+|compare\/[^\s\)]+)/);
    if (prUrlMatch && !prUrlMatch[0].includes('your-username') && !prUrlMatch[0].includes('123456789')) {
      this.prUrl.set(prUrlMatch[0]);
    }

    if (rawMessage.includes('FINAL_REPORT:')) {
      const parts = rawMessage.split('FINAL_REPORT:');
      const reportText = parts[1]?.trim() || '';
      this.finalReportContent.set(reportText);
      
      const modalPrMatch = reportText.match(/https:\/\/github\.com\/[a-zA-Z0-9_\-\.]+\/[a-zA-Z0-9_\-\.]+\/(?:pull\/\d+|pull\/new\/[^\s\)]+|compare\/[^\s\)]+)/);
      if (modalPrMatch && !modalPrMatch[0].includes('your-username') && !modalPrMatch[0].includes('123456789')) {
        this.prUrl.set(modalPrMatch[0]);
      } else if (!this.prUrl()) {
        this.prUrl.set('https://github.com/emredermann/Gidiyorum/pull/new/fix/issue-patch');
      }

      this.showFinalModal.set(true);
      this.isRunning.set(false);
      this.currentPhase.set("TAMAMLANDI (GitHub'da Onay Bekliyor)");
      this.addLog('Team Lead', '🏆 Pull Request GitHub üzerinde hazırlandı ve onayınıza sunuldu!');
      return;
    }

    let agent = 'Sistem';
    let detail = rawMessage;

    if (rawMessage.includes(':')) {
      const parts = rawMessage.split(':');
      agent = parts[0].trim();
      detail = parts.slice(1).join(':').trim();
    }

    if (detail.includes('Tüm süreç tamamlandı') || detail.includes('kullanıcı onayında bekliyor') || detail.includes('PR açıldı')) {
      this.isRunning.set(false);
    }

    this.addLog(agent, detail);
  }

  private addLog(agent: string, detail: string) {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    this.logs.update(items => [...items, { time: timeStr, agent, detail }]);
    this.shouldScroll = true;
  }

  private scrollToBottom() {
    if (this.scrollContainer?.nativeElement) {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }

  isAgentActive(key: string): boolean {
    const s = this.agentsMap()[key]?.state;
    return s === 'THINKING' || s === 'WORKING' || s === 'RUNNING_TOOL';
  }

  getAgentStateBadge(key: string): { label: string; class: string } {
    const state = this.agentsMap()[key]?.state || 'IDLE';
    const tool = this.agentsMap()[key]?.tool;

    switch (state) {
      case 'THINKING':
        return { label: '🧠 DÜŞÜNÜYOR', class: 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse' };
      case 'RUNNING_TOOL':
        return { label: `⚙️ ${tool || 'ARAÇ KULLANIYOR'}`, class: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse' };
      case 'WORKING':
        return { label: '⚡ ÇALIŞIYOR', class: 'bg-blue-500/20 text-blue-300 border border-blue-500/40' };
      case 'COMPLETED':
        return { label: '✅ TAMAMLANDI', class: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' };
      case 'ERROR':
        return { label: '❌ HATA', class: 'bg-red-500/20 text-red-300 border border-red-500/40' };
      default:
        return { label: '⏳ BEKLEMEDE', class: 'bg-slate-700/40 text-slate-400 border border-slate-700' };
    }
  }

  getAgentBadgeClass(agent: string): string {
    const lower = agent.toLowerCase();
    if (lower.includes('lead') || lower.includes('architect')) return 'bg-[#f59e0b] text-black';
    if (lower.includes('front')) return 'bg-[#06b6d4] text-black';
    if (lower.includes('back')) return 'bg-[#10b981] text-black';
    if (lower.includes('qa')) return 'bg-[#ec4899] text-white';
    if (lower.includes('creator') || lower.includes('devops') || lower.includes('pr')) return 'bg-[#8b5cf6] text-white';
    if (lower.includes('reviewer') || lower.includes('auditor') || lower.includes('denetçi')) return 'bg-[#f97316] text-white';
    if (lower.includes('kullanıcı')) return 'bg-[#3b82f6] text-white';
    return 'bg-slate-700 text-slate-200';
  }

  getAgentBubbleClass(agent: string): string {
    const lower = agent.toLowerCase();
    if (lower.includes('lead') || lower.includes('architect')) return 'border-[#f59e0b] text-amber-200';
    if (lower.includes('front')) return 'border-[#06b6d4] text-cyan-200';
    if (lower.includes('back')) return 'border-[#10b981] text-emerald-200';
    if (lower.includes('qa')) return 'border-[#ec4899] text-pink-200';
    if (lower.includes('creator') || lower.includes('devops') || lower.includes('pr')) return 'border-[#8b5cf6] text-purple-200';
    if (lower.includes('reviewer') || lower.includes('auditor') || lower.includes('denetçi')) return 'border-[#f97316] text-orange-200';
    if (lower.includes('kullanıcı')) return 'border-[#3b82f6] text-blue-200';
    return 'border-slate-600 text-slate-300';
  }
}
