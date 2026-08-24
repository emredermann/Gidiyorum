import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Mail,
  Camera,
  Edit2,
  Globe,
  Bell,
  WifiOff,
  Bookmark,
  ShieldCheck,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { UiCardComponent } from '../../shared/components/ui-card/ui-card.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule,
    HeaderComponent,
    UiCardComponent,
  ],
  template: `
    <div class="min-h-screen bg-background pb-24">
      <app-header title="Profilim" [showNotifications]="true"></app-header>

      <div class="max-w-2xl mx-auto px-4 py-8 space-y-6">

        <!-- 1. Profil Başlığı & Bilgi Kartı (Monocle Style) -->
        <div class="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-luxe relative">

          <div class="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <!-- Avatar & Change Button -->
            <div class="relative">
              <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-black/[0.08] shadow-subtle bg-stone-100 flex items-center justify-center">
                <img
                  [src]="avatarUrl()"
                  alt="Profil Fotoğrafı"
                  class="w-full h-full object-cover"
                />
              </div>
              <label class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-obsidian text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-stone-900 transition-all">
                <input type="file" accept="image/*" class="hidden" (change)="onAvatarChange($event)" />
                <lucide-icon [img]="CameraIcon" [size]="14" strokeWidth="1.5"></lucide-icon>
              </label>
            </div>

            <!-- Name, Email, Edit Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-center sm:justify-start gap-2">
                <h2 class="text-xl font-serif-luxe font-normal text-stone-950 tracking-tight">{{ userName() }}</h2>
                <button
                  type="button"
                  (click)="editProfileName()"
                  class="w-7 h-7 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
                  title="Profili Düzenle"
                >
                  <lucide-icon [img]="Edit2Icon" [size]="13" strokeWidth="1.5"></lucide-icon>
                </button>
              </div>

              <p class="text-xs text-stone-400 mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                <lucide-icon [img]="MailIcon" [size]="12" strokeWidth="1.5"></lucide-icon>
                {{ userEmail() }}
              </p>

              <div class="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-gold text-stone-950 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                <lucide-icon [img]="SparklesIcon" [size]="11" strokeWidth="1.5"></lucide-icon>
                <span>Concierge Elite Üye</span>
              </div>
            </div>
          </div>

          <!-- Hızlı İstatistik Rozetleri (Monocle 3'lü Grid) -->
          <div class="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-black/[0.05]">
            <div class="bg-stone-50 p-3 rounded-2xl text-center border border-black/[0.03]">
              <span class="text-base mb-0.5 block">✈️</span>
              <span class="text-base font-extrabold text-stone-950 block">12</span>
              <span class="text-[10px] text-stone-400 font-medium uppercase tracking-wider">Seyahat</span>
            </div>

            <div class="bg-stone-50 p-3 rounded-2xl text-center border border-black/[0.03]">
              <span class="text-base mb-0.5 block">📍</span>
              <span class="text-base font-extrabold text-stone-950 block">34</span>
              <span class="text-[10px] text-stone-400 font-medium uppercase tracking-wider">Mekan</span>
            </div>

            <div class="bg-stone-50 p-3 rounded-2xl text-center border border-black/[0.03]">
              <span class="text-base mb-0.5 block">🌍</span>
              <span class="text-base font-extrabold text-stone-950 block">8</span>
              <span class="text-[10px] text-stone-400 font-medium uppercase tracking-wider">Şehir</span>
            </div>
          </div>

        </div>

        <!-- 2. Tercihler & Özelleştirme Bölümü -->
        <app-ui-card>
          <div class="space-y-4">
            <div class="flex items-center justify-between border-b border-black/[0.05] pb-3.5">
              <h3 class="font-bold text-stone-950 text-xs tracking-wider uppercase">Varsayılan Seyahat Tercihlerim</h3>
              <span class="text-xs text-stone-900 font-bold">Güncelle</span>
            </div>

            <!-- Tags Selection (Monocle Pill Style) -->
            <div>
              <label class="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2 block">Favori İlgi Alanları</label>
              <div class="flex flex-wrap gap-2">
                @for (tag of availableTags; track tag) {
                  <button
                    type="button"
                    (click)="toggleTag(tag)"
                    [ngClass]="{
                      'bg-obsidian text-white border-obsidian': userTags().includes(tag),
                      'bg-stone-50 text-stone-600 border-black/[0.06]': !userTags().includes(tag)
                    }"
                    class="px-3 py-1.5 rounded-full border text-xs font-bold transition-all"
                  >
                    {{ tag }}
                  </button>
                }
              </div>
            </div>

            <!-- Tempo & Bütçe Options -->
            <div class="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label class="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 block">Yürüme Hızı</label>
                <select
                  [(ngModel)]="selectedPace"
                  class="w-full px-3 py-2 rounded-2xl border border-black/[0.06] text-xs font-bold bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-obsidian/30 shadow-subtle"
                >
                  <option value="Yavaş 🐢">Yavaş 🐢</option>
                  <option value="Normal 🚶">Normal 🚶</option>
                  <option value="Hızlı ⚡">Hızlı ⚡</option>
                </select>
              </div>

              <div>
                <label class="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 block">Varsayılan Bütçe</label>
                <select
                  [(ngModel)]="selectedBudget"
                  class="w-full px-3 py-2 rounded-2xl border border-black/[0.06] text-xs font-bold bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-obsidian/30 shadow-subtle"
                >
                  <option value="€ (Ekonomik)">€ (Ekonomik)</option>
                  <option value="€€ (Dengeli)">€€ (Dengeli)</option>
                  <option value="€€€ (Lüks)">€€€ (Lüks)</option>
                </select>
              </div>
            </div>

          </div>
        </app-ui-card>

        <!-- 3. Uygulama Ayarları Menüsü (Quiet Luxury List Tile) -->
        <div class="bg-white rounded-3xl border border-black/[0.06] shadow-subtle overflow-hidden divide-y divide-black/[0.04]">

          <!-- Tile 1: Çevrimdışı Haritalar -->
          <div class="flex items-center justify-between p-4 hover:bg-stone-50 transition-colors">
            <div class="flex items-center gap-3.5">
              <div class="w-9 h-9 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center flex-shrink-0">
                <lucide-icon [img]="WifiOffIcon" [size]="16" strokeWidth="1.5"></lucide-icon>
              </div>
              <div>
                <span class="text-xs font-bold text-stone-950 block">Çevrimdışı Haritalar & Veriler</span>
                <span class="text-[11px] text-stone-400">İnternet olmadan rotaları görüntüleyin</span>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" [(ngModel)]="offlineMode" class="sr-only peer" />
              <div class="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-obsidian"></div>
            </label>
          </div>

          <!-- Tile 2: Bildirim Tercihleri -->
          <div class="flex items-center justify-between p-4 hover:bg-stone-50 transition-colors">
            <div class="flex items-center gap-3.5">
              <div class="w-9 h-9 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center flex-shrink-0">
                <lucide-icon [img]="BellIcon" [size]="16" strokeWidth="1.5"></lucide-icon>
              </div>
              <div>
                <span class="text-xs font-bold text-stone-950 block">Bildirim Tercihleri</span>
                <span class="text-[11px] text-stone-400">Concierge rota hatırlatmaları</span>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" [(ngModel)]="pushNotifications" class="sr-only peer" />
              <div class="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-obsidian"></div>
            </label>
          </div>

          <!-- Tile 3: Dil ve Para Birimi -->
          <button
            type="button"
            (click)="openLangCurrency()"
            class="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors text-left"
          >
            <div class="flex items-center gap-3.5">
              <div class="w-9 h-9 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center flex-shrink-0">
                <lucide-icon [img]="GlobeIcon" [size]="16" strokeWidth="1.5"></lucide-icon>
              </div>
              <div>
                <span class="text-xs font-bold text-stone-950 block">Dil ve Para Birimi</span>
                <span class="text-[11px] text-stone-400">Türkçe / EUR (€)</span>
              </div>
            </div>
            <lucide-icon [img]="ChevronRightIcon" [size]="16" strokeWidth="1.5" class="text-stone-300"></lucide-icon>
          </button>

          <!-- Tile 4: Kayıtlı Mekanlarım -->
          <a
            routerLink="/places/place-roscioli-120"
            class="flex items-center justify-between p-4 hover:bg-stone-50 transition-colors"
          >
            <div class="flex items-center gap-3.5">
              <div class="w-9 h-9 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center flex-shrink-0">
                <lucide-icon [img]="BookmarkIcon" [size]="16" strokeWidth="1.5"></lucide-icon>
              </div>
              <div>
                <span class="text-xs font-bold text-stone-950 block">Kayıtlı Mekanlarım & Favoriler</span>
                <span class="text-[11px] text-stone-400">18 seçkin mekan kaydedildi</span>
              </div>
            </div>
            <lucide-icon [img]="ChevronRightIcon" [size]="16" strokeWidth="1.5" class="text-stone-300"></lucide-icon>
          </a>

          <!-- Tile 5: Gizlilik & Güvenlik -->
          <button
            type="button"
            (click)="openPrivacy()"
            class="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors text-left"
          >
            <div class="flex items-center gap-3.5">
              <div class="w-9 h-9 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center flex-shrink-0">
                <lucide-icon [img]="ShieldCheckIcon" [size]="16" strokeWidth="1.5"></lucide-icon>
              </div>
              <div>
                <span class="text-xs font-bold text-stone-950 block">Gizlilik & Güvenlik</span>
                <span class="text-[11px] text-stone-400">Hesap güvenliği ve veri izinleri</span>
              </div>
            </div>
            <lucide-icon [img]="ChevronRightIcon" [size]="16" strokeWidth="1.5" class="text-stone-300"></lucide-icon>
          </button>

          <!-- Tile 6: Yardım & Destek -->
          <button
            type="button"
            (click)="openHelp()"
            class="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors text-left"
          >
            <div class="flex items-center gap-3.5">
              <div class="w-9 h-9 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center flex-shrink-0">
                <lucide-icon [img]="HelpCircleIcon" [size]="16" strokeWidth="1.5"></lucide-icon>
              </div>
              <div>
                <span class="text-xs font-bold text-stone-950 block">Yardım & Destek</span>
                <span class="text-[11px] text-stone-400">SSS ve Concierge canlı destek</span>
              </div>
            </div>
            <lucide-icon [img]="ChevronRightIcon" [size]="16" strokeWidth="1.5" class="text-stone-300"></lucide-icon>
          </button>

        </div>

        <!-- 4. Alt Kısım: Çıkış Yap & Sürüm Bilgisi -->
        <div class="space-y-4 pt-2">
          <!-- Çıkış Yap Button -->
          <button
            type="button"
            (click)="onSignOut()"
            class="w-full py-3.5 px-4 rounded-2xl bg-stone-100 text-red-600 font-bold text-xs hover:bg-red-50 transition-all border border-black/[0.05] flex items-center justify-center gap-2"
          >
            <lucide-icon [img]="LogOutIcon" [size]="16" strokeWidth="1.5"></lucide-icon>
            <span>Çıkış Yap</span>
          </button>

          <!-- Sürüm Bilgisi -->
          <div class="text-center space-y-0.5">
            <p class="text-[10px] font-bold text-stone-400 tracking-wider uppercase font-serif-luxe">Gidiyorum Concierge</p>
            <p class="text-[10px] text-stone-400">Sürüm v1.0.0 · Monocle Edition 2026</p>
          </div>
        </div>

      </div>
    </div>
  `,
})
export class ProfileComponent {
  private authService = inject(AuthService);

  userName = signal('Emre Yılmaz');
  userEmail = signal('emre@gidiyorum.app');
  avatarUrl = signal('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300');

  availableTags = ['Tarih', 'Yemek', 'Doğa', 'Sanat', 'Alışveriş', 'Gece Hayatı'];
  userTags = signal<string[]>(['Tarih', 'Yemek', 'Sanat']);

  selectedPace = 'Normal 🚶';
  selectedBudget = '€€ (Dengeli)';

  offlineMode = true;
  pushNotifications = true;

  protected CameraIcon = Camera;
  protected Edit2Icon = Edit2;
  protected MailIcon = Mail;
  protected SparklesIcon = Sparkles;
  protected WifiOffIcon = WifiOff;
  protected BellIcon = Bell;
  protected GlobeIcon = Globe;
  protected BookmarkIcon = Bookmark;
  protected ShieldCheckIcon = ShieldCheck;
  protected HelpCircleIcon = HelpCircle;
  protected LogOutIcon = LogOut;
  protected ChevronRightIcon = ChevronRight;

  toggleTag(tag: string) {
    this.userTags.update(tags => {
      if (tags.includes(tag)) {
        return tags.filter(t => t !== tag);
      } else {
        return [...tags, tag];
      }
    });
  }

  onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl.set(e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  editProfileName() {
    const newName = prompt('Yeni Ad Soyad girin:', this.userName());
    if (newName && newName.trim()) {
      this.userName.set(newName.trim());
    }
  }

  openLangCurrency() {
    alert('Mevcut Seçim: Türkçe / EUR (€)');
  }

  openPrivacy() {
    alert('Gizlilik & RLS politikaları aktif. Verileriniz şifrelenmiştir.');
  }

  openHelp() {
    alert('Yardım merkezi ve AI canlı destek aktif.');
  }

  async onSignOut() {
    if (confirm('Oturumunuz kapatılacaktır. Onaylıyor musunuz?')) {
      await this.authService.signOut();
    }
  }
}
