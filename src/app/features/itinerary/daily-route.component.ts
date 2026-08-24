import {
  Component,
  inject,
  signal,
  OnInit,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Clock, Navigation } from 'lucide-angular';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { UiCardComponent } from '../../shared/components/ui-card/ui-card.component';
import { TripPlannerService } from '../../core/services/trip-planner.service';

export interface DailyScheduleItem {
  id: string;
  time: string;
  title: string;
  category: string;
  duration: string;
  walkingInfo: string;
  description: string;
  imageUrl: string;
  lat: number;
  lng: number;
}

export interface DayOption {
  id: string;
  label: string;
  dateStr: string;
  isToday?: boolean;
}

@Component({
  selector: 'app-daily-route',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    HeaderComponent,
    UiCardComponent,
  ],
  template: `
    <div class="min-h-screen bg-background pb-20">
      <!-- 1. Üst Alan & Başlık -->
      <app-header title="Bugünkü Rotam 📍" [showNotifications]="true"></app-header>

      <!-- Gün Seçici (Monocle Style Pill Tabs) -->
      <div class="bg-[#F9F8F6]/90 backdrop-blur-md border-b border-black/[0.05] sticky top-14 z-30">
        <div class="flex items-center gap-2 px-4 py-3 overflow-x-auto hide-scrollbar max-w-2xl mx-auto">
          @for (day of dayOptions; track day.id) {
            <button
              type="button"
              (click)="selectDay(day)"
              [ngClass]="{
                'bg-obsidian text-white border-obsidian shadow-sm': selectedDay().id === day.id,
                'bg-white text-stone-600 border-black/[0.06]': selectedDay().id !== day.id
              }"
              class="flex-shrink-0 px-4 py-2 rounded-full border text-xs font-bold transition-all duration-200 flex items-center gap-1.5"
            >
              @if (day.isToday) {
                <span
                  [ngClass]="{
                    'bg-gold': selectedDay().id === day.id,
                    'bg-obsidian': selectedDay().id !== day.id
                  }"
                  class="w-1.5 h-1.5 rounded-full"
                ></span>
              }
              <span>{{ day.label }}</span>
              <span class="opacity-60 font-normal text-[11px]">({{ day.dateStr }})</span>
            </button>
          }
        </div>
      </div>

      <!-- 2. Harita Bileşeni (Monocle / Airbnb Luxe Style Map) -->
      <div class="relative w-full h-64 sm:h-80 bg-stone-100 border-b border-black/[0.05] overflow-hidden">
        <div id="daily-route-map" class="w-full h-full"></div>

        <!-- Harita Yükleniyor Overlay -->
        @if (!mapLoaded()) {
          <div class="absolute inset-0 bg-[#F2F0EB] flex items-center justify-center pointer-events-none">
            <div class="text-center">
              <span class="text-3xl animate-bounce">🗺️</span>
              <p class="text-xs font-semibold text-stone-500 mt-2">Harita Yükleniyor...</p>
            </div>
          </div>
        }

        <!-- Quiet Luxury Floating City Info Pill -->
        <div class="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/[0.05] shadow-subtle flex items-center gap-2">
          <span class="text-xs">🇮🇹</span>
          <span class="text-xs font-bold text-stone-950">Roma Rota Haritası</span>
          <span class="text-[10px] text-stone-900 font-bold px-2 py-0.5 bg-stone-100 rounded-full border border-black/[0.05]">
            {{ currentSchedule().length }} Durak
          </span>
        </div>
      </div>

      <!-- 3. Zaman Çizelgesi (Linear / Quiet Luxury Timeline) -->
      <div class="max-w-2xl mx-auto px-4 py-8">

        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-base font-bold text-stone-950 tracking-tight">Günün Akışı ⏰</h2>
            <p class="text-xs text-stone-500">Saat saat optimize edilmiş rotanız</p>
          </div>
          <span class="text-xs font-semibold text-stone-400">
            Toplam {{ currentSchedule().length }} Mekan
          </span>
        </div>

        <!-- Timeline Container -->
        <div class="relative pl-3 space-y-6">

          <!-- Hairline Vertical Line -->
          <div class="absolute left-6 top-3 bottom-6 w-px bg-black/[0.08]"></div>

          @for (item of currentSchedule(); track item.id; let i = $index) {
            <div class="relative flex items-start gap-4 group">

              <!-- Monocle Donut Marker Ring Node -->
              <div class="relative z-10 flex-shrink-0 w-7 h-7 rounded-full bg-obsidian text-white font-bold text-xs flex items-center justify-center shadow-sm border-2 border-white ring-1 ring-black/10">
                {{ i + 1 }}
              </div>

              <!-- Content Card -->
              <div class="flex-1 bg-white rounded-3xl p-4 border border-black/[0.05] shadow-subtle hover:shadow-luxe transition-all duration-300">

                <div class="flex items-start justify-between gap-3">
                  <!-- Sol / Orta Alan -->
                  <div class="flex-1 min-w-0">

                    <!-- Saat & Kategori Badges -->
                    <div class="flex items-center flex-wrap gap-2 mb-1.5">
                      <span class="inline-flex items-center gap-1 font-bold text-xs px-2.5 py-0.5 bg-stone-100 text-stone-900 rounded-full">
                        <lucide-icon [img]="ClockIcon" [size]="12" strokeWidth="1.5"></lucide-icon>
                        {{ item.time }}
                      </span>
                      <span class="text-[11px] font-medium px-2.5 py-0.5 bg-stone-50 text-stone-600 rounded-full border border-black/[0.03]">
                        {{ item.category }}
                      </span>
                    </div>

                    <!-- Mekan Adı -->
                    <a
                      [routerLink]="['/places', item.id]"
                      class="font-bold text-sm sm:text-base text-stone-950 leading-snug group-hover:text-gold transition-colors block cursor-pointer"
                    >
                      {{ item.title }}
                    </a>

                    <!-- Açıklama -->
                    <p class="text-xs text-stone-500 mt-1 leading-relaxed line-clamp-2">
                      {{ item.description }}
                    </p>

                    <!-- Süre & Yürüyüş Detayları -->
                    <div class="flex items-center gap-3 mt-3 pt-2.5 border-t border-black/[0.04] text-[11px] text-stone-400 font-medium">
                      <span class="flex items-center gap-1">⏱️ {{ item.duration }}</span>
                      <span>•</span>
                      <span class="flex items-center gap-1">{{ item.walkingInfo }}</span>
                    </div>
                  </div>

                  <!-- Sağ Alan: Yuvarlak Küçük Önizleme Görseli -->
                  <div class="relative flex-shrink-0">
                    <a [routerLink]="['/places', item.id]">
                      <img
                        [src]="item.imageUrl"
                        [alt]="item.title"
                        class="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-black/[0.06] shadow-sm group-hover:scale-105 transition-transform cursor-pointer"
                      />
                    </a>
                  </div>
                </div>

                <!-- Yol Tarifi Al Butonu -->
                <div class="mt-3 text-right">
                  <button
                    type="button"
                    (click)="openGoogleMaps(item)"
                    class="inline-flex items-center gap-1 text-xs font-bold text-stone-900 hover:text-gold transition-colors"
                  >
                    <span>Yol tarifi al</span>
                    <lucide-icon [img]="NavigationIcon" [size]="12" strokeWidth="1.5"></lucide-icon>
                  </button>
                </div>

              </div>

            </div>
          }

        </div>

      </div>
    </div>
  `,
})
export class DailyRouteComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  planner = inject(TripPlannerService);

  mapLoaded = signal(false);
  private mapInstance: any = null;

  protected ClockIcon = Clock;
  protected NavigationIcon = Navigation;

  dayOptions: DayOption[] = [
    { id: 'day-1', label: '20 Haz Bugün', dateStr: 'Gün 1', isToday: true },
    { id: 'day-2', label: '21 Haz Yarın', dateStr: 'Gün 2' },
    { id: 'day-3', label: '22 Haz Paz', dateStr: 'Gün 3' },
    { id: 'day-4', label: '23 Haz Pzt', dateStr: 'Gün 4' },
    { id: 'day-5', label: '24 Haz Sal', dateStr: 'Gün 5' },
  ];

  selectedDay = signal<DayOption>(this.dayOptions[0]);

  schedulesByDay: Record<string, DailyScheduleItem[]> = {
    'day-1': [
      {
        id: 'place-roscioli-120',
        time: '09:00',
        title: 'Giolitti - Geleneksel İtalyan Kahvaltısı',
        category: '☕ Kafe & Tatlı',
        duration: '45 dk',
        walkingInfo: 'Başlangıç noktası',
        description: '1900 yılından beri hizmet veren tarihi mekanda taze kruvasan, espresso ve meşhur Roma dondurması.',
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300',
        lat: 41.9011,
        lng: 12.4772,
      },
      {
        id: 'sch-102',
        time: '10:30',
        title: 'Piazza Navona Meydanı & Dört Nehir Çeşmesi',
        category: '🏛️ Meydan & Anıt',
        duration: '1 saat',
        walkingInfo: '🚶 400m (5 dk yürüyüş)',
        description: 'Bernini eserleri, sokak sanatçıları ve Barok mimari atmosferiyle büyüleyici meydan.',
        imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300',
        lat: 41.8992,
        lng: 12.4731,
      },
      {
        id: 'sch-103',
        time: '12:00',
        title: 'Pantheon Tapınağı',
        category: '🏛️ Antik Eser',
        duration: '1.5 saat',
        walkingInfo: '🚶 350m (4 dk yürüyüş)',
        description: 'Antik Roma’dan günümüze en iyi korunmuş kubbeli tapınak yapısı ve Raphael’in mezarı.',
        imageUrl: 'https://images.unsplash.com/photo-1548625361-1845110f0e04?w=300',
        lat: 41.8986,
        lng: 12.4769,
      },
      {
        id: 'sch-104',
        time: '14:30',
        title: 'Trevi Aşk Çeşmesi',
        category: '⛲ Anıt & Manzara',
        duration: '45 dk',
        walkingInfo: '🚶 650m (8 dk yürüyüş)',
        description: 'Dilek parası atmak için dünyaca ünlü çeşme. Barok heykel sanatının zirvesi.',
        imageUrl: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=300',
        lat: 41.9009,
        lng: 12.4833,
      },
      {
        id: 'sch-105',
        time: '19:00',
        title: 'Trastevere - Osteria Da Enzo',
        category: '🍝 Akşam Yemeği',
        duration: '2 saat',
        walkingInfo: '🚶 1.2 km veya otobüs',
        description: 'Tarihi Trastevere sokaklarında geleneksel Carbonara ve Cacio e Pepe makarna ziyafeti.',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300',
        lat: 41.8894,
        lng: 12.4705,
      },
    ],
    'day-2': [
      {
        id: 'sch-201',
        time: '09:00',
        title: 'Kolezyum (Colosseum) Antik Amfitiyatro',
        category: '🏛️ Dünya Mirası',
        duration: '2.5 saat',
        walkingInfo: 'Başlangıç',
        description: 'Gladyatör dövüşlerine ev sahipliği yapmış dünyanın en büyük amfitiyatrosu.',
        imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300',
        lat: 41.8902,
        lng: 12.4922,
      },
      {
        id: 'sch-202',
        time: '12:00',
        title: 'Roman Forumu ve Palatino Tepesi',
        category: '🏛️ Antik Kent',
        duration: '2 saat',
        walkingInfo: '🚶 200m (3 dk)',
        description: 'Antik Roma imparatorluğunun siyasi, hukuki ve dini merkezi kalıntıları.',
        imageUrl: 'https://images.unsplash.com/photo-1548625361-1845110f0e04?w=300',
        lat: 41.8925,
        lng: 12.4853,
      },
      {
        id: 'sch-203',
        time: '15:00',
        title: 'Campidoglio Tepesi & Kapitolin Müzeleri',
        category: '🎨 Müze & Sanat',
        duration: '2 saat',
        walkingInfo: '🚶 450m (6 dk)',
        description: 'Michelangelo imzalı meydan ve dünyanın en eski halka açık müze koleksiyonu.',
        imageUrl: 'https://images.unsplash.com/photo-1527838832700-54595d164a3e?w=300',
        lat: 41.8933,
        lng: 12.4828,
      },
    ],
    'day-3': [
      {
        id: 'sch-301',
        time: '09:00',
        title: 'Vatikan Müzeleri & Sistine Şapeli',
        category: '🎨 Dünya Mirası',
        duration: '3 saat',
        walkingInfo: 'Başlangıç',
        description: 'Michelangelo’nun Adem’in Yaratılışı tavan freski ve eşsiz Rönesans eserleri.',
        imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=300',
        lat: 41.9065,
        lng: 12.4536,
      },
      {
        id: 'sch-302',
        time: '12:30',
        title: 'Aziz Petrus Bazilikası & Meydanı',
        category: '🏛️ Katedral & İbadethane',
        duration: '1.5 saat',
        walkingInfo: '🚶 300m (4 dk)',
        description: 'Hristiyan dünyasının en görkemli yapısı ve kubbeden 360 derece panoramik Roma manzarası.',
        imageUrl: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=300',
        lat: 41.9022,
        lng: 12.4539,
      },
      {
        id: 'sch-303',
        time: '15:00',
        title: 'Castel Sant’Angelo (Kutsal Melek Kalesi)',
        category: '🏰 Kale & Müze',
        duration: '1.5 saat',
        walkingInfo: '🚶 750m (9 dk)',
        description: 'İmparator Hadrianus’un anıt mezarından kaye dönüştürülmüş tarihi kule ve melekler köprüsü.',
        imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300',
        lat: 41.9031,
        lng: 12.4663,
      },
    ],
    'day-4': [
      {
        id: 'sch-401',
        time: '10:00',
        title: 'Villa Borghese Bahçeleri',
        category: '🌿 Park & Doğa',
        duration: '2 saat',
        walkingInfo: 'Başlangıç',
        description: 'Roma’nın en geniş yeşil park alanı, gölet, bisiklet rotaları ve manzara terasları.',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300',
        lat: 41.9142,
        lng: 12.4921,
      },
      {
        id: 'sch-402',
        time: '13:00',
        title: 'Piazza di Spagna & İspanyol Merdivenleri',
        category: '🏛️ İkonik Meydan',
        duration: '1 saat',
        walkingInfo: '🚶 850m (10 dk)',
        description: 'Çiçeklerle süslü 135 basamaklı tarihi merdivenler ve modanın kalbi Via Condotti.',
        imageUrl: 'https://images.unsplash.com/photo-1548625361-1845110f0e04?w=300',
        lat: 41.9059,
        lng: 12.4827,
      },
    ],
    'day-5': [
      {
        id: 'sch-501',
        time: '10:30',
        title: 'Circus Maximus & Ağız Deliği (Bocca della Verità)',
        category: '🏛️ Antik Eser',
        duration: '1.5 saat',
        walkingInfo: 'Başlangıç',
        description: 'Antik Roma at araba yarışları stadyumu ve dürüstlük testi heykeli.',
        imageUrl: 'https://images.unsplash.com/photo-1527838832700-54595d164a3e?w=300',
        lat: 41.8862,
        lng: 12.4851,
      },
      {
        id: 'sch-502',
        time: '13:00',
        title: 'Aventino Tepesi & Anahtar Deliği Manzarası',
        category: '🌅 Manzara Tepesi',
        duration: '1 saat',
        walkingInfo: '🚶 600m (7 dk)',
        description: 'Malta Şövalyeleri Sarayı anahtar deliğinden Aziz Petrus kubbesi kadrajı.',
        imageUrl: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=300',
        lat: 41.8826,
        lng: 12.4786,
      },
    ],
  };

  currentSchedule = signal<DailyScheduleItem[]>(this.schedulesByDay['day-1']);

  ngOnInit() {}

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      await this.renderMap();
    }
  }

  ngOnDestroy() {
    if (this.mapInstance) {
      try {
        this.mapInstance.remove();
      } catch {}
    }
  }

  selectDay(day: DayOption) {
    this.selectedDay.set(day);
    const schedule = this.schedulesByDay[day.id] || this.schedulesByDay['day-1'];
    this.currentSchedule.set(schedule);
    if (isPlatformBrowser(this.platformId)) {
      this.renderMap();
    }
  }

  openGoogleMaps(item: DailyScheduleItem) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`, '_blank');
  }

  private async renderMap() {
    try {
      const L = await import('leaflet');
      const container = document.getElementById('daily-route-map');
      if (!container) return;

      if (this.mapInstance) {
        this.mapInstance.remove();
        this.mapInstance = null;
      }

      (L.Icon.Default.prototype as any)._getIconUrl = undefined;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const schedule = this.currentSchedule();
      const firstLoc = schedule[0] || { lat: 41.9011, lng: 12.4772 };

      const map = L.map(container, {
        zoomControl: true,
        scrollWheelZoom: false,
      }).setView([firstLoc.lat, firstLoc.lng], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      const bounds: [number, number][] = [];
      const latLngs: [number, number][] = [];

      schedule.forEach((item, index) => {
        const coords: [number, number] = [item.lat, item.lng];
        bounds.push(coords);
        latLngs.push(coords);

        const customMarkerHtml = `
          <div style="background-color:#0F1012;color:white;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:11px;border:2px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.2)">
            ${index + 1}
          </div>
        `;

        const customIcon = L.divIcon({
          html: customMarkerHtml,
          className: 'custom-leaflet-marker',
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });

        L.marker(coords, { icon: customIcon })
          .bindPopup(
            `<div style="font-family:sans-serif;padding:2px">
              <span style="font-size:10px;color:#C5A880;font-weight:bold">${item.time}</span>
              <br><b>${item.title}</b>
              <br><small style="color:#666">${item.category}</small>
            </div>`
          )
          .addTo(map);
      });

      if (latLngs.length > 1) {
        L.polyline(latLngs, {
          color: '#0F1012',
          weight: 2.5,
          opacity: 0.7,
          dashArray: '6, 6',
        }).addTo(map);
      }

      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [35, 35] });
      }

      this.mapInstance = map;
      this.mapLoaded.set(true);
    } catch (e) {
      console.error('Daily route Leaflet render error:', e);
    }
  }
}
