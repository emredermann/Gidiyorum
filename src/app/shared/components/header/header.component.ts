import { Component, inject, Input } from '@angular/core';
import { LucideAngularModule, Bell, Search, ArrowLeft, Sun, Moon } from 'lucide-angular';
import { Location } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <header class="sticky top-0 z-40 bg-[#F9F8F6]/85 backdrop-blur-md border-b border-black/[0.05]">
      <div id="header-content-wrapper" class="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
        @if (showBack) {
          <button
            (click)="goBack()"
            class="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-stone-200/60 text-stone-800 transition-colors"
            title="Geri"
          >
            <lucide-icon [img]="ArrowLeftIcon" [size]="18" strokeWidth="1.5"></lucide-icon>
          </button>
        }
        <h1 class="flex-1 font-semibold text-stone-950 text-base tracking-tight">{{ title }}</h1>

        <!-- Theme Toggle Button -->
        <button
          (click)="theme.toggleDarkMode()"
          class="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-stone-200/60 text-stone-700 dark:text-stone-300 transition-colors"
          [title]="theme.darkMode() ? 'Aydınlık Temaya Geç' : 'Koyu Temaya Geç'"
        >
          <lucide-icon [img]="theme.darkMode() ? SunIcon : MoonIcon" [size]="18" strokeWidth="1.5"></lucide-icon>
        </button>

        @if (showSearch) {
          <button (click)="onSearch()" class="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-stone-200/60 text-stone-700 transition-colors" title="Arama Yap">
            <lucide-icon [img]="SearchIcon" [size]="18" strokeWidth="1.5"></lucide-icon>
          </button>
        }
        @if (showNotifications) {
          <button (click)="onNotifications()" class="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-stone-200/60 text-stone-700 transition-colors" title="Bildirimler">
            <lucide-icon [img]="BellIcon" [size]="18" strokeWidth="1.5"></lucide-icon>
          </button>
        }
      </div>
    </header>
  `,
})
export class HeaderComponent {
  @Input() title = 'Gidiyorum';
  @Input() showBack = false;
  @Input() showSearch = false;
  @Input() showNotifications = false;

  private location = inject(Location);
  theme = inject(ThemeService);

  protected ArrowLeftIcon = ArrowLeft;
  protected SearchIcon = Search;
  protected BellIcon = Bell;
  protected SunIcon = Sun;
  protected MoonIcon = Moon;

  goBack() {
    this.location.back();
  }

  onSearch() {
    const q = prompt('Gidiyorum arama paneli - Şehir veya mekan adı girin:');
    if (q) {
      alert(`🔍 "${q}" araması için 14 ilgili rotasyon listelendi.`);
    }
  }

  onNotifications() {
    alert('🔔 Bildirimler:\n• Roma seyahatinize 5 gün kaldı!\n• Concierge AI: "Trastevere restoran rezervasyonu onaylandı"');
  }
}
