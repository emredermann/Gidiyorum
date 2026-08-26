import {
  Component, inject, signal, OnInit, PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, MapPin, Clock, Star, Navigation } from 'lucide-angular';
import { SupabaseService } from '../../core/services/supabase.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { UiCardComponent } from '../../shared/components/ui-card/ui-card.component';
import { ItineraryDay, ItineraryItem } from '../../core/models';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, HeaderComponent, UiCardComponent],
  template: `
    <div class="min-h-screen bg-background">
      <app-header title="Bugünkü Rotam" [showBack]="true"></app-header>

      <div class="h-56 bg-gray-200 relative overflow-hidden">
        <div id="itinerary-map" class="w-full h-full"></div>
        @if (!mapLoaded()) {
          <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-blue-100 pointer-events-none">
            <div class="text-center"><div class="text-4xl mb-2">🗺️</div><p class="text-sm text-gray-500">Harita yükleniyor...</p></div>
          </div>
        }
      </div>

      <div class="bg-surface border-b border-gray-100 overflow-x-auto hide-scrollbar">
        <div class="flex gap-2 px-4 py-3">
          @for (day of days(); track day.id) {
            <button (click)="selectedDay.set(day)"
              class="flex-shrink-0 px-4 py-2 rounded-xl border text-sm font-medium transition-all"
              [class.bg-primary]="selectedDay()?.id === day.id" [class.text-white]="selectedDay()?.id === day.id"
              [class.border-transparent]="selectedDay()?.id === day.id"
              [class.text-gray-600]="selectedDay()?.id !== day.id" [class.border-gray-200]="selectedDay()?.id !== day.id">
              Gün {{ day.day_number }}
            </button>
          }
        </div>
      </div>

      <div class="px-4 py-6 max-w-2xl mx-auto">
        @if (selectedDay()) {
          <div class="relative">
            <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100 rounded-full"></div>
            <div class="space-y-4">
              @for (item of selectedDay()!.items || []; track item.id; let i = $index) {
                <div class="flex gap-4">
                  <div class="relative z-10 w-12 flex-shrink-0">
                    <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm shadow-md">{{ i + 1 }}</div>
                  </div>
                  <div class="flex-1 pb-4">
                    <app-ui-card>
                      @if (item.image_url) {
                        <img [src]="item.image_url" [alt]="item.place_name" class="w-full h-28 object-cover rounded-lg mb-3" />
                      }
                      <div class="flex items-start justify-between">
                        <div class="flex-1 min-w-0">
                          <h3 class="font-bold text-gray-900 text-sm truncate">{{ item.place_name }}</h3>
                          @if (item.category) {
                            <span class="inline-block mt-0.5 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">{{ item.category }}</span>
                          }
                        </div>
                        @if (item.price_level) {
                          <div class="flex items-center gap-0.5 text-yellow-400 flex-shrink-0 ml-2">
                            @for (s of getPriceStars(item.price_level); track s) {
                              <lucide-icon [img]="StarIcon" [size]="10"></lucide-icon>
                            }
                          </div>
                        }
                      </div>
                      @if (item.time_slot) {
                        <div class="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                          <lucide-icon [img]="ClockIcon" [size]="12"></lucide-icon>
                          {{ item.time_slot }}
                        </div>
                      }
                      @if (item.description) {
                        <p class="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">{{ item.description }}</p>
                      }
                      @if (item.latitude && item.longitude) {
                        <button (click)="openDirections(item)" class="flex items-center gap-1.5 mt-3 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                          <lucide-icon [img]="NavigationIcon" [size]="12"></lucide-icon>
                          Yol tarifi al
                        </button>
                      }
                    </app-ui-card>
                  </div>
                </div>
              }
              @if (!(selectedDay()!.items?.length)) {
                <div class="text-center py-12 text-gray-400"><p class="text-4xl mb-3">📋</p><p class="text-sm">Bu gün için henüz etkinlik eklenmedi</p></div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class ItineraryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private supabase = inject(SupabaseService);
  private platformId = inject(PLATFORM_ID);

  days = signal<ItineraryDay[]>([]);
  selectedDay = signal<ItineraryDay | null>(null);
  mapLoaded = signal(false);

  protected MapPinIcon = MapPin;
  protected ClockIcon = Clock;
  protected StarIcon = Star;
  protected NavigationIcon = Navigation;

  getPriceStars(level: number | null): number[] { return Array(level ?? 1).fill(0); }

  openDirections(item: ItineraryItem) {
    if (item.latitude && item.longitude)
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${item.latitude},${item.longitude}`, '_blank');
  }

  async ngOnInit() {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (!tripId) return;

    const { data: daysData } = await this.supabase
      .from('itinerary_days').select('*, items:itinerary_items(*)').eq('trip_id', tripId).order('day_number');

    if (daysData) {
      const sorted = (daysData as any[]).map(d => ({
        ...d,
        items: ((d.items as ItineraryItem[]) || []).sort((a, b) => a.order_index - b.order_index),
      }));
      this.days.set(sorted);
      if (sorted.length > 0) this.selectedDay.set(sorted[0]);
    }

    if (isPlatformBrowser(this.platformId)) await this.initMap();
  }

  private async initMap() {
    try {
      const leaf = await import('leaflet');
      const L: any = leaf.default || leaf;
      const mapEl = document.getElementById('itinerary-map');
      if (!mapEl) return;

      if (L && L.Icon && L.Icon.Default) {
        (L.Icon.Default.prototype as any)._getIconUrl = undefined;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
      }
      const map = L.map(mapEl).setView([41.0082, 28.9784], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap', maxZoom: 19 }).addTo(map);
      this.mapLoaded.set(true);
      const allItems = this.days().flatMap(d => d.items ?? []);
      const bounds: [number, number][] = [];
      allItems.forEach(item => {
        if (item.latitude && item.longitude) {
          bounds.push([item.latitude, item.longitude]);
          L.marker([item.latitude, item.longitude])
            .bindPopup(`<b>${item.place_name}</b>${item.category ? `<br><small>${item.category}</small>` : ''}`)
            .addTo(map);
        }
      });
      if (bounds.length > 0) map.fitBounds(bounds, { padding: [40, 40] });
      setTimeout(() => { try { map.invalidateSize(); } catch {} }, 250);
    } catch (e) { console.error('Leaflet init failed:', e); }
  }
}
