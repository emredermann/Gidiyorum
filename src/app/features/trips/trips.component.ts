import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Plus,
  MapPin,
  Calendar,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-angular';
import { SupabaseService } from '../../core/services/supabase.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { UiCardComponent } from '../../shared/components/ui-card/ui-card.component';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';
import { TripPlannerService } from '../../core/services/trip-planner.service';
import { ThemeService } from '../../core/services/theme.service';

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
    <div id="trips-page-container" class="min-h-screen bg-background pb-20">

      <!-- Üst Header -->
      <header class="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-white/10">
        <div id="trips-header-inner" class="flex items-center justify-between px-4 h-14 max-w-md mx-auto">
          <h1 class="font-extrabold text-slate-900 dark:text-white text-base tracking-tight">Seyahatlerim</h1>

          <div id="trips-header-actions" class="flex items-center gap-2">
            <!-- Tema Değiştirme Butonu -->
            <button
              type="button"
              (click)="theme.toggleDarkMode()"
              class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 transition-all cursor-pointer"
              [title]="theme.darkMode() ? 'Aydınlık Temaya Geç' : 'Koyu Temaya Geç'"
            >
              <lucide-icon [img]="theme.darkMode() ? SunIcon : MoonIcon" [size]="16" strokeWidth="1.8"></lucide-icon>
            </button>

            <!-- Yeni Seyahat Ekle -->
            <a
              routerLink="/planner/preferences"
              class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-purple hover:bg-primary-hover transition-all cursor-pointer"
              aria-label="Yeni Seyahat Ekle"
              title="Yeni Seyahat Ekle"
            >
              <lucide-icon [img]="PlusIcon" [size]="16" strokeWidth="2"></lucide-icon>
            </a>
          </div>
        </div>
      </header>

      <div id="trips-content-wrapper" class="px-4 py-6 max-w-md mx-auto space-y-6">

        <!-- Segmented Tab Seçici ("Yaklaşan" ve "Geçmiş") -->
        <div id="trips-segmented-tab-selector" class="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl flex items-center border border-slate-200/60 dark:border-slate-700">
          <button
            type="button"
            (click)="activeTab.set('upcoming')"
            class="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
            [class.bg-primary]="activeTab() === 'upcoming'"
            [class.text-white]="activeTab() === 'upcoming'"
            [class.shadow-purple]="activeTab() === 'upcoming'"
            [class.text-slate-600]="activeTab() !== 'upcoming'"
            [class.dark:text-slate-400]="activeTab() !== 'upcoming'"
          >
            Yaklaşan ({{ upcomingTrips().length }})
          </button>

          <button
            type="button"
            (click)="activeTab.set('past')"
            class="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
            [class.bg-primary]="activeTab() === 'past'"
            [class.text-white]="activeTab() === 'past'"
            [class.shadow-purple]="activeTab() === 'past'"
            [class.text-slate-600]="activeTab() !== 'past'"
            [class.dark:text-slate-400]="activeTab() !== 'past'"
          >
            Geçmiş ({{ pastTrips().length }})
          </button>
        </div>

        <!-- Seyahat Kart Listesi -->
        <div id="trips-cards-list-box" class="space-y-4">

          @for (trip of displayedTrips(); track trip.id) {
            <a [routerLink]="['/trips', trip.id, 'itinerary']" class="block group">
              <div [id]="'trips-card-box-' + trip.id" class="relative rounded-3xl overflow-hidden shadow-card border border-slate-100 dark:border-slate-800 transition-all duration-300 group-hover:-translate-y-1 bg-slate-900 min-h-[220px] flex flex-col justify-between p-5">

                <!-- Background Image & Gradient Overlay -->
                <img
                  [src]="trip.coverImage"
                  [alt]="trip.title"
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/30"></div>

                <!-- Top Row: Location Badge (Left) & Remaining Days Badge (Right) -->
                <div class="relative z-10 flex items-center justify-between gap-2">
                  <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/10 shadow-xs">
                    <lucide-icon [img]="MapPinIcon" [size]="12" strokeWidth="1.8" class="text-primary"></lucide-icon>
                    <span>{{ trip.city }}, {{ trip.country }}</span>
                  </div>

                  @if (trip.isUpcoming) {
                    <span class="px-3 py-1 rounded-full text-xs font-extrabold shadow-xs bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white backdrop-blur-md border border-white/20">
                      {{ trip.daysRemainingStr }}
                    </span>
                  } @else {
                    <span class="px-3 py-1 rounded-full text-xs font-bold shadow-xs bg-slate-800/80 text-slate-300 backdrop-blur-md border border-white/10">
                      ✓ Tamamlandı
                    </span>
                  }
                </div>

                <!-- Bottom Area: Tags, Title, Date & Action Button -->
                <div class="relative z-10 space-y-2 mt-6">
                  <!-- Tags Row -->
                  @if (trip.tags && trip.tags.length > 0) {
                    <div class="flex flex-wrap items-center gap-1.5">
                      @for (tag of trip.tags; track tag) {
                        <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/90 text-white backdrop-blur-md shadow-xs">
                          #{{ tag }}
                        </span>
                      }
                    </div>
                  }

                  <!-- Title -->
                  <h3 class="text-lg sm:text-xl font-extrabold text-white leading-snug group-hover:text-purple-300 transition-colors">
                    {{ trip.title }}
                  </h3>

                  <!-- Footer: Date & Rotayı İncele -->
                  <div class="flex items-center justify-between pt-3 border-t border-white/15 text-xs text-white/90 font-medium">
                    <div class="flex items-center gap-1.5">
                      <lucide-icon [img]="CalendarIcon" [size]="14" strokeWidth="1.8"></lucide-icon>
                      <span>{{ trip.dateRangeStr }}</span>
                    </div>

                    <div class="flex items-center gap-1 font-bold text-white group-hover:translate-x-1 transition-transform">
                      <span>Rotayı İncele</span>
                      <lucide-icon [img]="ChevronRightIcon" [size]="14" strokeWidth="2"></lucide-icon>
                    </div>
                  </div>
                </div>

              </div>
            </a>
          }

          <!-- Empty State -->
          @if (displayedTrips().length === 0) {
            <div id="trips-empty-state-box" class="flex flex-col items-center justify-center py-16 text-center bg-white rounded-3xl border border-black/[0.05] p-6 space-y-4 shadow-subtle">
              <div id="trips-empty-state-icon" class="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-2xl">
                ✈️
              </div>
              <div id="trips-empty-state-text-box">
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
  private planner = inject(TripPlannerService);
  theme = inject(ThemeService);

  activeTab = signal<'upcoming' | 'past'>('upcoming');
  loading = signal(true);

  protected PlusIcon = Plus;
  protected MapPinIcon = MapPin;
  protected CalendarIcon = Calendar;
  protected ChevronRightIcon = ChevronRight;
  protected SunIcon = Sun;
  protected MoonIcon = Moon;

  allTrips = this.planner.createdTrips;

  upcomingTrips = () => this.allTrips().filter(t => t.isUpcoming);
  pastTrips = () => this.allTrips().filter(t => !t.isUpcoming);

  displayedTrips = () => (this.activeTab() === 'upcoming' ? this.upcomingTrips() : this.pastTrips());

  async ngOnInit() {
    this.loading.set(false);
  }
}
