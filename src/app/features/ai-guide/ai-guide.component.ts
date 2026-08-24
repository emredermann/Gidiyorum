import {
  Component,
  inject,
  signal,
  OnInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  Send,
  Sparkles,
  Bot,
  Mic,
  Image as ImageIcon,
  MapPin,
  Star,
  ChevronRight,
} from 'lucide-angular';
import { AiChatService } from '../../core/services/ai-chat.service';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-ai-guide',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule,
    HeaderComponent,
  ],
  template: `
    <div id="ai-guide-page-container" class="flex flex-col h-screen bg-background">
      <!-- Top Header -->
      <app-header title="AI Concierge" [showBack]="true"></app-header>

      <!-- Main Messages / Welcome Container -->
      <div #scrollContainer id="ai-guide-messages-scroll-area" class="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        <!-- 1. Karşılama Ekranı -->
        @if (messages().length === 0) {
          <div id="ai-guide-welcome-screen" class="max-w-xl mx-auto py-8 space-y-7">

            <div id="ai-guide-welcome-header-box" class="text-center space-y-2">
              <div id="ai-guide-welcome-sparkles-badge" class="w-16 h-16 rounded-3xl bg-stone-100 border border-black/[0.05] flex items-center justify-center mx-auto mb-4 shadow-subtle">
                <lucide-icon [img]="SparklesIcon" [size]="28" class="text-gold animate-pulse" strokeWidth="1.5"></lucide-icon>
              </div>
              <h2 class="text-2xl sm:text-3xl font-serif-luxe font-normal text-stone-950 tracking-tight">
                Merhaba Emre 👋
              </h2>
              <p class="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
                Kişisel seyahat concierge asistanınız hizmetinizde. Özel tavsiye ve rotalarınızı belirlemek için sorabilirsiniz.
              </p>
            </div>

            <div id="ai-guide-quick-actions-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">

              <button
                type="button"
                (click)="sendQuickAction('Yakınımda iyi bir restoran bul')"
                class="flex items-start gap-3.5 p-4 rounded-3xl bg-white border border-black/[0.06] hover:border-obsidian hover:shadow-luxe transition-all duration-300 text-left group"
              >
                <div id="ai-guide-quick-action-icon-1" class="w-9 h-9 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                  🍽️
                </div>
                <div id="ai-guide-quick-action-text-1" class="flex-1 min-w-0">
                  <h3 class="font-bold text-xs text-stone-950 group-hover:text-gold transition-colors">
                    Yakınımda restoran bul
                  </h3>
                  <p class="text-[11px] text-stone-400 mt-0.5">
                    120m mesafedeki İtalyan lezzetleri
                  </p>
                </div>
              </button>

              <button
                type="button"
                (click)="sendQuickAction('2 saatlik yürüyüş rotası oluştur')"
                class="flex items-start gap-3.5 p-4 rounded-3xl bg-white border border-black/[0.06] hover:border-obsidian hover:shadow-luxe transition-all duration-300 text-left group"
              >
                <div id="ai-guide-quick-action-icon-2" class="w-9 h-9 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                  🚶
                </div>
                <div id="ai-guide-quick-action-text-2" class="flex-1 min-w-0">
                  <h3 class="font-bold text-xs text-stone-950 group-hover:text-gold transition-colors">
                    2 saatlik yürüyüş rotası
                  </h3>
                  <p class="text-[11px] text-stone-400 mt-0.5">
                    Tarihi sokaklar ve meydanlar
                  </p>
                </div>
              </button>

              <button
                type="button"
                (click)="sendQuickAction('Yağmur başladı, ne yapabilirim?')"
                class="flex items-start gap-3.5 p-4 rounded-3xl bg-white border border-black/[0.06] hover:border-obsidian hover:shadow-luxe transition-all duration-300 text-left group"
              >
                <div id="ai-guide-quick-action-icon-3" class="w-9 h-9 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                  🌧️
                </div>
                <div id="ai-guide-quick-action-text-3" class="flex-1 min-w-0">
                  <h3 class="font-bold text-xs text-stone-950 group-hover:text-gold transition-colors">
                    Yağmur başladı!
                  </h3>
                  <p class="text-[11px] text-stone-400 mt-0.5">
                    Kapalı mekan & müze önerileri
                  </p>
                </div>
              </button>

              <button
                type="button"
                (click)="sendQuickAction('Akşam için bar önerisi ver')"
                class="flex items-start gap-3.5 p-4 rounded-3xl bg-white border border-black/[0.06] hover:border-obsidian hover:shadow-luxe transition-all duration-300 text-left group"
              >
                <div id="ai-guide-quick-action-icon-4" class="w-9 h-9 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                  🍸
                </div>
                <div id="ai-guide-quick-action-text-4" class="flex-1 min-w-0">
                  <h3 class="font-bold text-xs text-stone-950 group-hover:text-gold transition-colors">
                    Akşam için bar önerisi
                  </h3>
                  <p class="text-[11px] text-stone-400 mt-0.5">
                    Manzaralı kokteyl mekanları
                  </p>
                </div>
              </button>

            </div>

          </div>
        }

        <!-- 2. Sohbet Akışı -->
        <div id="ai-guide-chat-flow-container" class="max-w-xl mx-auto space-y-4">
          @for (msg of messages(); track msg.id) {
            <div [id]="'ai-guide-msg-row-' + msg.id" class="flex items-start gap-2.5" [ngClass]="{ 'flex-row-reverse': msg.role === 'user' }">

              @if (msg.role === 'assistant') {
                <div [id]="'ai-guide-msg-bot-avatar-' + msg.id" class="w-7 h-7 rounded-full bg-stone-100 border border-black/[0.06] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  <lucide-icon [img]="BotIcon" [size]="14" class="text-gold" strokeWidth="1.5"></lucide-icon>
                </div>
              }

              <div [id]="'ai-guide-msg-bubble-wrapper-' + msg.id" class="space-y-3 max-w-[85%] sm:max-w-[80%]">

                <!-- Message Bubble Text -->
                <div
                  [id]="'ai-guide-msg-bubble-' + msg.id"
                  [ngClass]="{
                    'bg-obsidian text-white rounded-br-xs': msg.role === 'user',
                    'bg-white text-stone-900 border border-black/[0.06] rounded-bl-xs': msg.role === 'assistant'
                  }"
                  class="px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-subtle"
                >
                  {{ msg.content }}
                </div>

                <!-- Rich Card 1: Restoran / Mekan Kartı -->
                @if (msg.role === 'assistant' && shouldShowRestaurantCard(msg.content)) {
                  <div [id]="'ai-guide-restaurant-card-' + msg.id" class="bg-white rounded-3xl border border-black/[0.06] shadow-luxe overflow-hidden transition-all">
                    <div [id]="'ai-guide-restaurant-thumb-box-' + msg.id" class="relative h-36">
                      <img
                        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600"
                        alt="Roscioli Salumeria con Cucina"
                        class="w-full h-full object-cover"
                      />
                      <div [id]="'ai-guide-restaurant-dist-badge-' + msg.id" class="absolute top-3 left-3 bg-obsidian/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <lucide-icon [img]="MapPinIcon" [size]="10" strokeWidth="1.5"></lucide-icon>
                        120 m uzaklıkta
                      </div>
                      <div [id]="'ai-guide-restaurant-rating-badge-' + msg.id" class="absolute top-3 right-3 bg-gold text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                        4.6 ★
                      </div>
                    </div>

                    <div [id]="'ai-guide-restaurant-info-box-' + msg.id" class="p-4 space-y-2">
                      <div [id]="'ai-guide-restaurant-title-row-' + msg.id" class="flex items-center justify-between">
                        <h4 class="font-bold text-stone-950 text-sm">Roscioli Salumeria con Cucina</h4>
                        <span class="text-[11px] font-medium text-stone-400">İtalyan · €€</span>
                      </div>
                      <p class="text-xs text-stone-500 leading-relaxed">
                        Geleneksel Roma makarnaları, şarküteri çeşitleri ve taze peynir seçkisiyle dünyaca ünlü şık restoran.
                      </p>
                      <div [id]="'ai-guide-restaurant-action-row-' + msg.id" class="pt-2 flex justify-end">
                        <a
                          routerLink="/places/place-roscioli-120"
                          class="inline-flex items-center gap-1 text-xs font-bold text-obsidian hover:text-gold transition-colors"
                        >
                          <span>Detayları Gör</span>
                          <lucide-icon [img]="ChevronRightIcon" [size]="14" strokeWidth="1.5"></lucide-icon>
                        </a>
                      </div>
                    </div>
                  </div>
                }

                <!-- Rich Card 2: Rota Önizleme Kartı -->
                @if (msg.role === 'assistant' && shouldShowRouteCard(msg.content)) {
                  <div [id]="'ai-guide-route-card-' + msg.id" class="bg-white rounded-3xl border border-black/[0.06] shadow-luxe overflow-hidden transition-all">
                    <div [id]="'ai-guide-route-thumb-box-' + msg.id" class="relative h-32 bg-stone-100 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600"
                        alt="Roma Yürüyüş Rotaları"
                        class="w-full h-full object-cover"
                      />
                      <div [id]="'ai-guide-route-overlay-' + msg.id" class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div [id]="'ai-guide-route-badge-box-' + msg.id" class="absolute bottom-3 left-3 text-white">
                        <span class="text-[9px] font-bold uppercase tracking-wider bg-gold text-stone-950 px-2 py-0.5 rounded-md">
                          2 Saatlik Yürüyüş
                        </span>
                        <h4 class="font-bold text-xs mt-0.5">Roma Tarihi Meydanlar Rotaları</h4>
                      </div>
                    </div>

                    <div [id]="'ai-guide-route-info-box-' + msg.id" class="p-3.5 space-y-2.5">
                      <div [id]="'ai-guide-route-stops-list-' + msg.id" class="space-y-1.5 text-xs text-stone-800">
                        <div [id]="'ai-guide-route-stop-1-' + msg.id" class="flex items-center gap-2">
                          <span class="w-4 h-4 rounded-full bg-obsidian text-white text-[9px] font-bold flex items-center justify-center">1</span>
                          <span class="font-bold">Piazza Navona</span>
                          <span class="text-[10px] text-stone-400">· 09:00</span>
                        </div>
                        <div [id]="'ai-guide-route-stop-2-' + msg.id" class="flex items-center gap-2">
                          <span class="w-4 h-4 rounded-full bg-obsidian text-white text-[9px] font-bold flex items-center justify-center">2</span>
                          <span class="font-bold">Pantheon Tapınağı</span>
                          <span class="text-[10px] text-stone-400">· 09:45</span>
                        </div>
                        <div [id]="'ai-guide-route-stop-3-' + msg.id" class="flex items-center gap-2">
                          <span class="w-4 h-4 rounded-full bg-obsidian text-white text-[9px] font-bold flex items-center justify-center">3</span>
                          <span class="font-bold">Trevi Çeşmesi</span>
                          <span class="text-[10px] text-stone-400">· 10:30</span>
                        </div>
                      </div>

                      <div [id]="'ai-guide-route-footer-' + msg.id" class="pt-2 border-t border-black/[0.04] flex justify-between items-center">
                        <span class="text-[10px] text-stone-400">🚶 ~1.8 km yürüyüş</span>
                        <a
                          routerLink="/itinerary"
                          class="inline-flex items-center gap-1 px-3 py-1.5 bg-obsidian text-white text-xs font-bold rounded-xl hover:bg-stone-900 transition-colors shadow-sm"
                        >
                          <span>Rotayı Haritada Aç</span>
                          <lucide-icon [img]="ChevronRightIcon" [size]="12" strokeWidth="1.5"></lucide-icon>
                        </a>
                      </div>
                    </div>
                  </div>
                }

              </div>

            </div>
          }

          <!-- Typing Indicator -->
          @if (isLoading()) {
            <div id="ai-guide-typing-indicator-row" class="flex items-end gap-2">
              <div id="ai-guide-typing-avatar" class="w-7 h-7 rounded-full bg-stone-100 border border-black/[0.06] flex items-center justify-center flex-shrink-0">
                <lucide-icon [img]="BotIcon" [size]="14" class="text-gold" strokeWidth="1.5"></lucide-icon>
              </div>
              <div id="ai-guide-typing-bubble" class="bg-white border border-black/[0.06] px-4 py-3 rounded-2xl rounded-bl-xs shadow-subtle">
                <div id="ai-guide-typing-dots" class="flex gap-1.5">
                  <span class="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style="animation-delay:0ms"></span>
                  <span class="w-1.5 h-1.5 bg-stone-600 rounded-full animate-bounce" style="animation-delay:150ms"></span>
                  <span class="w-1.5 h-1.5 bg-obsidian rounded-full animate-bounce" style="animation-delay:300ms"></span>
                </div>
              </div>
            </div>
          }
        </div>

      </div>

      <!-- 3. Quiet Luxury Input Bar -->
      <div
        id="ai-guide-input-bar-container"
        class="border-t border-black/[0.06] bg-[#F9F8F6]/95 backdrop-blur-md px-4 py-3 sticky bottom-0 z-20"
        style="padding-bottom: max(12px, env(safe-area-inset-bottom))"
      >
        <div id="ai-guide-input-bar-inner" class="max-w-xl mx-auto space-y-2">

          @if (isListening()) {
            <div id="ai-guide-listening-banner" class="flex items-center justify-between px-3 py-1.5 bg-stone-900 text-white rounded-xl text-xs font-medium animate-pulse">
              <span class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-gold animate-ping"></span>
                Dinleniyor... Konuşabilirsiniz.
              </span>
              <button (click)="toggleSpeechRecognition()" class="font-bold underline text-[11px]">Durdur</button>
            </div>
          }

          <div id="ai-guide-input-row" class="flex items-end gap-2">

            <!-- Resim Yükleme -->
            <label class="w-10 h-10 rounded-2xl bg-white border border-black/[0.06] text-stone-600 hover:text-stone-950 flex items-center justify-center cursor-pointer transition-colors flex-shrink-0 mb-0.5 shadow-subtle">
              <input type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)" />
              <lucide-icon [img]="ImageIcon" [size]="18" strokeWidth="1.5"></lucide-icon>
            </label>

            <!-- Mikrofon -->
            <button
              type="button"
              (click)="toggleSpeechRecognition()"
              [ngClass]="{
                'bg-obsidian text-gold border-obsidian': isListening(),
                'bg-white text-stone-600 border-black/[0.06]': !isListening()
              }"
              class="w-10 h-10 rounded-2xl border transition-all flex items-center justify-center flex-shrink-0 mb-0.5 shadow-subtle"
              title="Sesli Konuş (Web Speech API)"
            >
              <lucide-icon [img]="MicIcon" [size]="18" strokeWidth="1.5"></lucide-icon>
            </button>

            <!-- Text Input -->
            <div id="ai-guide-textarea-wrapper" class="flex-1 relative">
              <textarea
                [(ngModel)]="inputText"
                (keydown.enter)="onEnterKey($event)"
                placeholder="Bir şey sorun..."
                rows="1"
                class="w-full px-4 py-2.5 rounded-2xl border border-black/[0.06] text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-obsidian/30 focus:border-obsidian bg-white leading-relaxed pr-10 shadow-subtle"
                style="max-height: 120px"
              ></textarea>
            </div>

            <!-- Gönder Butonu -->
            <button
              type="button"
              (click)="send()"
              [disabled]="!inputText.trim() || isLoading()"
              class="w-10 h-10 bg-obsidian rounded-2xl flex items-center justify-center text-white hover:bg-stone-900 transition-all disabled:opacity-30 shadow-subtle flex-shrink-0 mb-0.5"
              aria-label="Gönder"
            >
              <lucide-icon [img]="SendIcon" [size]="16" strokeWidth="1.5" class="text-white"></lucide-icon>
            </button>

          </div>
        </div>
      </div>
    </div>
  `,
})
export class AiGuideComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  private chatService = inject(AiChatService);
  private route = inject(ActivatedRoute);

  inputText = '';
  tripId = signal<string | null>(null);

  messages = this.chatService.messages;
  isLoading = this.chatService.isLoading;
  isListening = signal(false);

  protected SendIcon = Send;
  protected SparklesIcon = Sparkles;
  protected BotIcon = Bot;
  protected MicIcon = Mic;
  protected ImageIcon = ImageIcon;
  protected MapPinIcon = MapPin;
  protected StarIcon = Star;
  protected ChevronRightIcon = ChevronRight;

  private recognition: any = null;

  ngOnInit() {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      this.tripId.set(tripId);
      this.chatService.loadMessages(tripId);
    }
    this.initSpeechRecognition();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      const el = this.scrollContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

  onEnterKey(event: Event) {
    const ke = event as KeyboardEvent;
    if (!ke.shiftKey) {
      ke.preventDefault();
      this.send();
    }
  }

  async sendQuickAction(text: string) {
    this.inputText = text;
    await this.send();
  }

  async send() {
    const text = this.inputText.trim();
    if (!text) return;
    this.inputText = '';
    await this.chatService.sendMessage(text, this.tripId() ?? undefined);
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      this.inputText += ` [Görsel Yüklendi: ${file.name}]`;
    }
  }

  private initSpeechRecognition() {
    if (typeof window !== 'undefined') {
      const windowObj = window as any;
      const SpeechRecognition = windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'tr-TR';

        this.recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          this.inputText += (this.inputText ? ' ' : '') + transcript;
          this.isListening.set(false);
        };

        this.recognition.onerror = () => {
          this.isListening.set(false);
        };

        this.recognition.onend = () => {
          this.isListening.set(false);
        };
      }
    }
  }

  toggleSpeechRecognition() {
    if (!this.recognition) {
      alert('Tarayıcınız ses tanıma özelliğini desteklemiyor. Lütfen Chrome veya Edge kullanın.');
      return;
    }

    if (this.isListening()) {
      this.recognition.stop();
      this.isListening.set(false);
    } else {
      this.recognition.start();
      this.isListening.set(true);
    }
  }

  shouldShowRestaurantCard(content: string): boolean {
    const c = content.toLowerCase();
    return c.includes('restoran') || c.includes('roscioli') || c.includes('lezzet') || c.includes('yemek');
  }

  shouldShowRouteCard(content: string): boolean {
    const c = content.toLowerCase();
    return c.includes('rotas') || c.includes('yürüyüş') || c.includes('gezi') || c.includes('saatlik');
  }
}
