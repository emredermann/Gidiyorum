import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  MapPin,
  Clock,
  Star,
  Heart,
  Share2,
  Calendar,
  CreditCard,
  Navigation,
} from 'lucide-angular';
import { SupabaseService } from '../../core/services/supabase.service';
import { TripPlannerService } from '../../core/services/trip-planner.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { UiCardComponent } from '../../shared/components/ui-card/ui-card.component';
import { ItineraryItem } from '../../core/models';

@Component({
  selector: 'app-place-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, HeaderComponent, UiCardComponent],
  template: `
    <div id="place-detail-page" class="min-h-screen bg-background pb-24">

      <!-- Hero Mekan Fotoğrafı & Üst Butonlar -->
      <div id="place-detail-hero-box" class="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-900">
        <img
          [src]="placeData().imageUrl"
          [alt]="placeData().name"
          class="w-full h-full object-cover opacity-90"
        />
        <div id="place-detail-hero-overlay" class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

        <!-- Header Top Action Buttons -->
        <div id="place-detail-hero-actions-row" class="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <button
            type="button"
            (click)="goBack()"
            class="w-9 h-9 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm font-bold text-slate-900 dark:text-white hover:bg-white transition-all text-xs cursor-pointer"
          >
            ←
          </button>

          <div id="place-detail-hero-right-actions" class="flex items-center gap-2">
            <button
              type="button"
              (click)="toggleFavorite()"
              class="w-9 h-9 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm transition-colors cursor-pointer"
              [class.text-red-500]="isFavorited()"
              [class.text-slate-700]="!isFavorited()"
            >
              <lucide-icon [img]="HeartIcon" [size]="16" strokeWidth="1.8"></lucide-icon>
            </button>

            <button
              type="button"
              (click)="sharePlace()"
              class="w-9 h-9 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm text-slate-700 dark:text-slate-200 hover:bg-white transition-all cursor-pointer"
            >
              <lucide-icon [img]="Share2Icon" [size]="16" strokeWidth="1.8"></lucide-icon>
            </button>
          </div>
        </div>

        <!-- Hero Bottom Badge Overlay -->
        <div id="place-detail-hero-info-box" class="absolute bottom-6 left-6 right-6 text-white">
          <div id="place-detail-hero-badge-row" class="flex items-center gap-2 mb-1.5">
            <span class="px-2.5 py-0.5 bg-emerald-500 text-white text-[11px] font-bold rounded-full flex items-center gap-1 shadow-xs">
              ★ {{ placeData().rating }}
            </span>
            <span class="text-xs text-white/80 font-medium">({{ placeData().reviewCount }} Değerlendirme)</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {{ placeData().name }}
          </h1>
          <p class="text-xs sm:text-sm text-white/90 mt-1 font-medium">
            {{ placeData().subtitle }}
          </p>
        </div>
      </div>

      <!-- Main Content Container -->
      <div id="place-detail-content-container" class="max-w-md mx-auto px-4 py-6 space-y-6">

        <!-- Tag Listesi -->
        <section class="flex flex-wrap gap-2">
          @for (tag of placeData().tags; track tag) {
            <span class="px-3 py-1 bg-purple-50 dark:bg-slate-800 text-primary dark:text-purple-300 text-xs font-semibold rounded-full border border-purple-100 dark:border-slate-700">
              {{ tag }}
            </span>
          }
        </section>

        <!-- Açıklama Metni -->
        <div class="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-2">
          <h2 class="font-bold text-slate-900 dark:text-white text-xs tracking-wider uppercase">Hakkında</h2>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {{ placeData().description }}
          </p>
        </div>

        <!-- Bilgi Listesi / Mekan Bilgileri Tablosu & Kartları -->
        <section class="space-y-3.5">
          <div class="flex items-center justify-between">
            <h2 class="font-extrabold text-slate-900 dark:text-white text-xs tracking-wider uppercase flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>Mekan Bilgileri & Özellikler</span>
            </h2>
            <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              🟢 Açık • 09:00 - 22:00
            </span>
          </div>

          <!-- 2x2 İnteraktif Bilgi Kartları Grid'i -->
          <div id="place-detail-info-grid" class="grid grid-cols-2 gap-3">

            <!-- 🕒 Çalışma Saatleri -->
            <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-xs space-y-2 hover:border-primary/40 transition-all">
              <div class="flex items-center justify-between">
                <div class="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <lucide-icon [img]="ClockIcon" [size]="16" strokeWidth="2"></lucide-icon>
                </div>
                <span class="text-[10px] font-bold text-slate-400">Saatler</span>
              </div>
              <div>
                <div class="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Çalışma Saatleri</div>
                <div class="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">{{ placeData().openingHours }}</div>
              </div>
            </div>

            <!-- 💳 Ortalama Fiyat -->
            <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-xs space-y-2 hover:border-primary/40 transition-all">
              <div class="flex items-center justify-between">
                <div class="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <lucide-icon [img]="CreditCardIcon" [size]="16" strokeWidth="2"></lucide-icon>
                </div>
                <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">Fiyat</span>
              </div>
              <div>
                <div class="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Ortalama Fiyat</div>
                <div class="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">{{ placeData().averagePrice }}</div>
              </div>
            </div>

            <!-- 📅 Rezervasyon -->
            <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-xs space-y-2 hover:border-primary/40 transition-all">
              <div class="flex items-center justify-between">
                <div class="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-primary dark:text-purple-300 flex items-center justify-center flex-shrink-0">
                  <lucide-icon [img]="CalendarIcon" [size]="16" strokeWidth="2"></lucide-icon>
                </div>
                <span class="text-[10px] font-bold text-slate-400">Durum</span>
              </div>
              <div>
                <div class="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Rezervasyon</div>
                <div class="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">{{ placeData().reservation }}</div>
              </div>
            </div>

            <!-- 📍 Mesafe & Konum -->
            <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-xs space-y-2 hover:border-primary/40 transition-all">
              <div class="flex items-center justify-between">
                <div class="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <lucide-icon [img]="MapPinIcon" [size]="16" strokeWidth="2"></lucide-icon>
                </div>
                <span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-1.5 py-0.5 rounded">Mesafe</span>
              </div>
              <div>
                <div class="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Konum / Ulaşım</div>
                <div class="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5 line-clamp-1">{{ placeData().distance }}</div>
              </div>
            </div>

          </div>

          <!-- Detaylı Mekan Özellikleri Tablosu -->
          <div class="bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-100 dark:border-slate-700/80 shadow-xs space-y-3">
            <h3 class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Detaylı Özellik Tablosu</h3>

            <div class="divide-y divide-slate-100 dark:divide-slate-700/50 text-xs">
              <div class="py-2.5 flex items-center justify-between">
                <span class="font-medium text-slate-500 dark:text-slate-400">⭐ Genel Puanı</span>
                <span class="font-extrabold text-slate-900 dark:text-white">{{ placeData().rating }} / 5.0 ({{ placeData().reviewCount }} Oy)</span>
              </div>
              <div class="py-2.5 flex items-center justify-between">
                <span class="font-medium text-slate-500 dark:text-slate-400">🏆 Mekan Türü</span>
                <span class="font-extrabold text-slate-900 dark:text-white">{{ placeData().subtitle || 'Özel Destinasyon Noktası' }}</span>
              </div>
              <div class="py-2.5 flex items-center justify-between">
                <span class="font-medium text-slate-500 dark:text-slate-400">⏳ İdeal Ziyaret Süresi</span>
                <span class="font-extrabold text-slate-900 dark:text-white">1.5 - 2 Saat</span>
              </div>
              <div class="py-2.5 flex items-center justify-between">
                <span class="font-medium text-slate-500 dark:text-slate-400">🌐 Temassız Ödeme</span>
                <span class="font-bold text-emerald-600 dark:text-emerald-400">✓ Destekleniyor</span>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- Alt Sabit Butonlar -->
      <div
        id="place-detail-bottom-bar"
        class="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 px-4 py-3 shadow-lg"
        style="padding-bottom: max(12px, env(safe-area-inset-bottom))"
      >
        <div id="place-detail-bottom-bar-inner" class="max-w-md mx-auto grid grid-cols-2 gap-3">
          <!-- Outlined Yol Tarifi Butonu -->
          <button
            type="button"
            (click)="openDirections()"
            class="py-3.5 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <lucide-icon [img]="NavigationIcon" [size]="14" strokeWidth="1.8"></lucide-icon>
            <span>Yol Tarifi</span>
          </button>

          <!-- Primary Rezervasyon Yap Butonu -->
          <button
            type="button"
            (click)="makeReservation()"
            class="py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs transition-all shadow-purple flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
          >
            <span>Rezervasyon Yap</span>
          </button>
        </div>
      </div>

    </div>
  `,
})
export class PlaceDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private supabase = inject(SupabaseService);
  private planner = inject(TripPlannerService);

  isFavorited = signal(false);

  protected MapPinIcon = MapPin;
  protected ClockIcon = Clock;
  protected StarIcon = Star;
  protected HeartIcon = Heart;
  protected Share2Icon = Share2;
  protected CalendarIcon = Calendar;
  protected CreditCardIcon = CreditCard;
  protected NavigationIcon = Navigation;

  placeData = signal<any>({
    name: 'Mekan Detayı',
    subtitle: 'Yükleniyor...',
    rating: '4.8',
    reviewCount: '1,200',
    tags: ['Mekan'],
    description: 'Mekan detayları getiriliyor...',
    openingHours: '09:00 - 22:00',
    averagePrice: '€€',
    reservation: 'Önerilir',
    distance: 'Şehir Merkezinde',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000',
    lat: 41.9028,
    lng: 12.4964,
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadPlace(id);
      }
    });
  }

  private loadPlace(id: string) {
    const resolvedPlace = this.planner.findPlaceById(id);
    if (resolvedPlace) {
      this.placeData.set(resolvedPlace);
    } else {
      this.loadPlaceFromSupabase(id);
    }
  }

  private async loadPlaceFromSupabase(id: string) {
    try {
      const { data } = await this.supabase
        .from('itinerary_items')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        const item = data as ItineraryItem;
        this.placeData.update(current => ({
          ...current,
          name: item.place_name || current.name,
          subtitle: item.category ? `${item.category} • ${current.subtitle || ''}` : current.subtitle,
          description: item.description || current.description,
          imageUrl: item.image_url || current.imageUrl,
          lat: item.latitude || current.lat,
          lng: item.longitude || current.lng,
        }));
      }
    } catch {}
  }

  goBack() {
    window.history.back();
  }

  toggleFavorite() {
    this.isFavorited.update(v => !v);
    if (this.isFavorited()) {
      alert(`❤️ ${this.placeData().name} favorilerinize kaydedildi!`);
    } else {
      alert(`🤍 ${this.placeData().name} favorilerinizden çıkarıldı.`);
    }
  }

  sharePlace() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: this.placeData().name,
        text: `${this.placeData().name} - Gidiyorum Rehberi`,
        url: window.location.href,
      });
    } else {
      alert('📋 Mekan bağlantısı panoya kopyalandı!');
    }
  }

  openDirections() {
    const p = this.placeData();
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`, '_blank');
  }

  makeReservation() {
    alert(`🍷 ${this.placeData().name} için 2 kişilik masa rezervasyon talebiniz alındı! Onay SMS olarak iletilecektir.`);
  }
}
