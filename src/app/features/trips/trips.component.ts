import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Plus,
  MapPin,
  Calendar,
  ChevronRight,
} from 'lucide-angular';
import { SupabaseService } from '../../core/services/supabase.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { UiCardComponent } from '../../shared/components/ui-card/ui-card.component';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';

export interface TripCardData {
  id: string;
  title: string;
  city: string;
  country: string;
  dateRangeStr: string;
  daysRemainingStr: string;
  isUpcoming: boolean;
  coverImage: string;
  tags: string[];
}

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    HeaderComponent,
    UiCardComponent,
    UiButtonComponent,
  ],
  template: `
    <div class="min-h-screen bg-background pb-20">

      <!-- Üst Header (Sağ Üstte + İkonu) -->
      <header class="sticky top-0 z-40 bg-[#F9F8F6]/90 backdrop-blur-md border-b border-black/[0.05]">
        <div class="flex items-center justify-between px-4 h-14 max-w-2xl mx-auto">
          <h1 class="font-bold text-stone-950 text-base tracking-tight font-serif-luxe">Seyahatlerim</h1>

          <a
            routerLink="/planner/preferences"
            class="w-8 h-8 bg-obsidian text-white rounded-full flex items-center justify-center shadow-sm hover:bg-stone-900 transition-all"
            aria-label="Yeni Seyahat Ekle"
            title="Yeni Seyahat Ekle"
          >
            <lucide-icon [img]="PlusIcon" [size]="16" strokeWidth="1.5"></lucide-icon>
          </a>
        </div>
      </header>

      <div class="px-4 py-6 max-w-2xl mx-auto space-y-6">

        <!-- Segmented Tab Seçici ("Yaklaşan" ve "Geçmiş" - Monocle Pill Style) -->
        <div class="bg-stone-200/60 p-1 rounded-full flex items-center border border-black/[0.04]">
          <button
            type="button"
            (click)="activeTab.set('upcoming')"
            class="flex-1 py-2 rounded-full text-xs font-bold transition-all text-center"
            [class.bg-obsidian]="activeTab() === 'upcoming'"
            [class.text-white]="activeTab() === 'upcoming'"
            [class.shadow-sm]="activeTab() === 'upcoming'"
            [class.text-stone-600]="activeTab() !== 'upcoming'"
          >
            Yaklaşanlar ({{ upcomingTrips().length }})
          </button>

          <button
            type="button"
            (click)="activeTab.set('past')"
            class="flex-1 py-2 rounded-full text-xs font-bold transition-all text-center"
            [class.bg-obsidian]="activeTab() === 'past'"
            [class.text-white]="activeTab() === 'past'"
            [class.shadow-sm]="activeTab() === 'past'"
            [class.text-stone-600]="activeTab() !== 'past'"
          >
            Geçmiş ({{ pastTrips().length }})
          </button>
        </div>

        <!-- Seyahat Kart Listesi (Monocle / Airbnb Luxe Cards) -->
        <div class="space-y-5">

          @for (trip of displayedTrips(); track trip.id) {
            <a [routerLink]="['/trips', trip.id, 'itinerary']" class="block group">
              <div class="relative rounded-3xl overflow-hidden shadow-luxe border border-black/[0.05] transition-all duration-300 group-hover:-translate-y-0.5 bg-stone-900">

                <!-- Background Image -->
                <div class="h-48 sm:h-52 w-full overflow-hidden relative">
                  <img
                    [src]="trip.coverImage"
                    [alt]="trip.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                </div>

                <!-- Kalan Gün Rozeti (Top Right) -->
                <div class="absolute top-4 right-4 z-10">
                  @if (trip.isUpcoming) {
                    <span class="px-3 py-1 rounded-full text-[11px] font-extrabold shadow-sm backdrop-blur-md bg-white/90 text-stone-950 inline-flex items-center gap-1 border border-black/[0.04]">
                      ⏳ {{ trip.daysRemainingStr }}
                    </span>
                  } @else {
                    <span class="px-3 py-1 rounded-full text-[11px] font-bold shadow-sm backdrop-blur-md bg-stone-100/90 text-stone-700 inline-flex items-center gap-1 border border-black/[0.04]">
                      ✓ {{ trip.daysRemainingStr }}
                    </span>
                  }
                </div>

                <!-- Card Bottom Text Info -->
                <div class="absolute bottom-5 left-5 right-5 z-10 text-white">
                  <div class="flex items-center gap-1.5 text-xs text-white/80 font-medium mb-1">
                    <lucide-icon [img]="MapPinIcon" [size]="12" strokeWidth="1.5" class="text-gold"></lucide-icon>
                    <span>{{ trip.city }}, {{ trip.country }}</span>
                  </div>

                  <h3 class="text-xl sm:text-2xl font-serif-luxe font-normal tracking-tight text-white group-hover:text-gold transition-colors">
                    {{ trip.title }}
                  </h3>

                  <div class="flex items-center justify-between mt-3 pt-2.5 border-t border-white/15 text-xs text-white/90 font-medium">
                    <div class="flex items-center gap-1.5">
                      <lucide-icon [img]="CalendarIcon" [size]="13" strokeWidth="1.5"></lucide-icon>
                      <span>{{ trip.dateRangeStr }}</span>
                    </div>

                    <div class="flex items-center gap-1 font-bold text-white group-hover:translate-x-1 transition-transform">
                      <span>Rotayı İncele</span>
                      <lucide-icon [img]="ChevronRightIcon" [size]="14" strokeWidth="1.5"></lucide-icon>
                    </div>
                  </div>
                </div>

              </div>
            </a>
          }

          <!-- Empty State -->
          @if (displayedTrips().length === 0) {
            <div class="flex flex-col items-center justify-center py-16 text-center bg-white rounded-3xl border border-black/[0.05] p-6 space-y-4 shadow-subtle">
              <div class="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-2xl">
                ✈️
              </div>
              <div>
                <h3 class="font-bold text-stone-950 text-sm">Bu kategoride seyahat bulunamadı</h3>
                <p class="text-stone-400 text-xs mt-1 max-w-xs mx-auto">
                  Yeni bir concierge planı oluşturun ve rotanızı hazırlayın.
                </p>
              </div>
              <a routerLink="/planner/preferences">
                <app-ui-button label="Yeni Plan Ekle" [icon]="PlusIcon"></app-ui-button>
              </a>
            </div>
          }

        </div>

      </div>
    </div>
  `,
})
export class TripsComponent implements OnInit {
  private supabase = inject(SupabaseService);

  activeTab = signal<'upcoming' | 'past'>('upcoming');
  loading = signal(true);

  protected PlusIcon = Plus;
  protected MapPinIcon = MapPin;
  protected CalendarIcon = Calendar;
  protected ChevronRightIcon = ChevronRight;

  allTrips = signal<TripCardData[]>([
    {
      id: 'trip-rome-01',
      title: 'Roma Antik Çağ & Lezzet Keşfi',
      city: 'Roma',
      country: 'İtalya',
      dateRangeStr: '20 - 24 Haziran 2026',
      daysRemainingStr: '5 gün kaldı',
      isUpcoming: true,
      coverImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
      tags: ['Tarih', 'Yemek', 'Mimari'],
    },
    {
      id: 'trip-barcelona-02',
      title: 'Barselona Mimarisi ve Plaj Rotası',
      city: 'Barselona',
      country: 'İspanya',
      dateRangeStr: '15 - 20 Temmuz 2026',
      daysRemainingStr: '26 gün kaldı',
      isUpcoming: true,
      coverImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
      tags: ['Sanat', 'Plaj', 'Yemek'],
    },
    {
      id: 'trip-paris-03',
      title: 'Paris Sanat ve Gurme Turu',
      city: 'Paris',
      country: 'Fransa',
      dateRangeStr: '10 - 15 Mayıs 2026',
      daysRemainingStr: 'Tamamlandı',
      isUpcoming: false,
      coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      tags: ['Müze', 'Lüks'],
    },
  ]);

  upcomingTrips = () => this.allTrips().filter(t => t.isUpcoming);
  pastTrips = () => this.allTrips().filter(t => !t.isUpcoming);

  displayedTrips = () => (this.activeTab() === 'upcoming' ? this.upcomingTrips() : this.pastTrips());

  async ngOnInit() {
    this.loading.set(false);
  }
}
