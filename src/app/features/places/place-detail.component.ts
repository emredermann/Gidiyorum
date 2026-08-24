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
      <div id="place-detail-hero-box" class="relative h-72 sm:h-80 w-full overflow-hidden bg-stone-900">
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
            class="w-9 h-9 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm font-bold text-stone-900 hover:bg-white transition-all text-xs"
          >
            ←
          </button>

          <div id="place-detail-hero-right-actions" class="flex items-center gap-2">
            <button
              type="button"
              (click)="toggleFavorite()"
              class="w-9 h-9 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm transition-colors"
              [class.text-red-500]="isFavorited()"
              [class.text-stone-700]="!isFavorited()"
            >
              <lucide-icon [img]="HeartIcon" [size]="16" strokeWidth="1.5"></lucide-icon>
            </button>

            <button
              type="button"
              (click)="sharePlace()"
              class="w-9 h-9 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm text-stone-700 hover:bg-white transition-all"
            >
              <lucide-icon [img]="Share2Icon" [size]="16" strokeWidth="1.5"></lucide-icon>
            </button>
          </div>
        </div>

        <!-- Hero Bottom Badge Overlay -->
        <div id="place-detail-hero-info-box" class="absolute bottom-6 left-6 right-6 text-white">
          <div id="place-detail-hero-badge-row" class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 bg-gold text-stone-950 text-[10px] font-bold rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wider">
              <lucide-icon [img]="StarIcon" [size]="11" class="text-stone-950"></lucide-icon>
              {{ placeData().rating }} ★
            </span>
            <span class="text-xs text-white/80 font-medium">({{ placeData().reviewCount }} Değerlendirme)</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-serif-luxe font-normal tracking-tight">
            {{ placeData().name }}
          </h1>
          <p class="text-xs sm:text-sm text-white/90 mt-1 font-medium">
            {{ placeData().subtitle }}
          </p>
        </div>
      </div>

      <!-- Main Content Container -->
      <div id="place-detail-content-container" class="max-w-2xl mx-auto px-4 py-8 space-y-6">

        <!-- Tag Listesi (Monocle Pill Style) -->
        <section class="flex flex-wrap gap-2">
          @for (tag of placeData().tags; track tag) {
            <span class="px-3 py-1 bg-white text-stone-800 text-xs font-semibold rounded-full border border-black/[0.06] shadow-subtle">
              # {{ tag }}
            </span>
          }
        </section>

        <!-- Açıklama Metni -->
        <app-ui-card>
          <div id="place-detail-about-box" class="space-y-2">
            <h2 class="font-bold text-stone-950 text-xs tracking-wider uppercase">Hakkında</h2>
            <p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {{ placeData().description }}
            </p>
          </div>
        </app-ui-card>

        <!-- Bilgi Listesi (İkonlu Detay Kartları) -->
        <section class="space-y-3">
          <h2 class="font-bold text-stone-950 text-xs tracking-wider uppercase">Mekan Bilgileri</h2>

          <div id="place-detail-info-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3">

            <!-- 🕒 Çalışma Saatleri -->
            <div id="place-detail-info-hours-card" class="bg-white p-3.5 rounded-3xl border border-black/[0.05] shadow-subtle flex items-center gap-3">
              <div id="place-detail-info-hours-icon" class="w-9 h-9 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center flex-shrink-0">
                <lucide-icon [img]="ClockIcon" [size]="16" strokeWidth="1.5"></lucide-icon>
              </div>
              <div id="place-detail-info-hours-text">
                <span class="text-[10px] text-stone-400 font-medium block">Çalışma Saatleri</span>
                <span class="text-xs font-bold text-stone-950">{{ placeData().openingHours }}</span>
              </div>
            </div>

            <!-- 💳 Ortalama Fiyat -->
            <div id="place-detail-info-price-card" class="bg-white p-3.5 rounded-3xl border border-black/[0.05] shadow-subtle flex items-center gap-3">
              <div id="place-detail-info-price-icon" class="w-9 h-9 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center flex-shrink-0">
                <lucide-icon [img]="CreditCardIcon" [size]="16" strokeWidth="1.5"></lucide-icon>
              </div>
              <div id="place-detail-info-price-text">
                <span class="text-[10px] text-stone-400 font-medium block">Ortalama Fiyat</span>
                <span class="text-xs font-bold text-stone-950">{{ placeData().averagePrice }}</span>
              </div>
            </div>

            <!-- 📅 Rezervasyon -->
            <div id="place-detail-info-res-card" class="bg-white p-3.5 rounded-3xl border border-black/[0.05] shadow-subtle flex items-center gap-3">
              <div id="place-detail-info-res-icon" class="w-9 h-9 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center flex-shrink-0">
                <lucide-icon [img]="CalendarIcon" [size]="16" strokeWidth="1.5"></lucide-icon>
              </div>
              <div id="place-detail-info-res-text">
                <span class="text-[10px] text-stone-400 font-medium block">Rezervasyon</span>
                <span class="text-xs font-bold text-stone-950">{{ placeData().reservation }}</span>
              </div>
            </div>

            <!-- 📍 Mesafe -->
            <div id="place-detail-info-dist-card" class="bg-white p-3.5 rounded-3xl border border-black/[0.05] shadow-subtle flex items-center gap-3">
              <div id="place-detail-info-dist-icon" class="w-9 h-9 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center flex-shrink-0">
                <lucide-icon [img]="MapPinIcon" [size]="16" strokeWidth="1.5"></lucide-icon>
              </div>
              <div id="place-detail-info-dist-text">
                <span class="text-[10px] text-stone-400 font-medium block">Mesafe</span>
                <span class="text-xs font-bold text-stone-950">{{ placeData().distance }}</span>
              </div>
            </div>

          </div>
        </section>

      </div>

      <!-- Alt Sabit Butonlar (Quiet Luxury Action Bar) -->
      <div
        id="place-detail-bottom-bar"
        class="fixed bottom-0 left-0 right-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-md border-t border-black/[0.06] px-4 py-3 shadow-lg"
        style="padding-bottom: max(12px, env(safe-area-inset-bottom))"
      >
        <div id="place-detail-bottom-bar-inner" class="max-w-2xl mx-auto grid grid-cols-2 gap-3">
          <!-- Outlined Yol Tarifi Butonu -->
          <button
            type="button"
            (click)="openDirections()"
            class="py-3.5 px-4 rounded-2xl border border-stone-300 text-stone-900 font-bold text-xs hover:bg-stone-100 transition-all flex items-center justify-center gap-2"
          >
            <lucide-icon [img]="NavigationIcon" [size]="14" strokeWidth="1.5"></lucide-icon>
            <span>Yol Tarifi</span>
          </button>

          <!-- Primary Rezervasyon Yap Butonu -->
          <button
            type="button"
            (click)="makeReservation()"
            class="py-3.5 px-4 rounded-2xl bg-obsidian text-white font-bold text-xs hover:bg-stone-900 transition-all shadow-luxe flex items-center justify-center gap-2"
          >
            <span>Rezervasyon Yap</span>
            <span class="text-gold">🍷</span>
          </button>
        </div>
      </div>

    </div>
  `,
})
export class PlaceDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private supabase = inject(SupabaseService);

  isFavorited = signal(false);

  protected MapPinIcon = MapPin;
  protected ClockIcon = Clock;
  protected StarIcon = Star;
  protected HeartIcon = Heart;
  protected Share2Icon = Share2;
  protected CalendarIcon = Calendar;
  protected CreditCardIcon = CreditCard;
  protected NavigationIcon = Navigation;

  placeData = signal({
    name: 'Da Enzo al 29',
    subtitle: 'Restoran • Trastevere, Roma • €€',
    rating: '4.7',
    reviewCount: '1,820',
    tags: ['İtalyan', 'Taze Makarna', 'Yerel', 'Otantik'],
    description:
      'Trastevere’in tarihi ve samimi sokaklarında geleneksel Roma mutfağının en seçkin lezzetlerini sunan otantik bir trattoria. Günlük taze yapılan Cacio e Pepe, Carbonara ve Enginar kızartması (Carciofi alla Giudia) ile meşhurdur.',
    openingHours: '12:30 - 15:00 / 19:30 - 23:00',
    averagePrice: '€€ (20 - 30 €)',
    reservation: 'Önerilir (Akşam sırası beklememek için)',
    distance: '1.2 km (Mevcut konumunuzdan)',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000',
    lat: 41.8894,
    lng: 12.4705,
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'place-roscioli-120') {
      this.loadPlaceFromSupabase(id);
    }
  }

  private async loadPlaceFromSupabase(id: string) {
    const { data } = await this.supabase
      .from('itinerary_items')
      .select('*')
      .eq('id', id)
      .single();

    if (data) {
      const item = data as ItineraryItem;
      this.placeData.update(current => ({
        ...current,
        name: item.place_name,
        subtitle: `${item.category || 'Mekan'} • Roma • €€`,
        description: item.description || current.description,
        imageUrl: item.image_url || current.imageUrl,
        lat: item.latitude || current.lat,
        lng: item.longitude || current.lng,
      }));
    }
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
