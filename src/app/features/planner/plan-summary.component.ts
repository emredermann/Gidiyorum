import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { TripPlannerService } from '../../core/services/trip-planner.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { UiCardComponent } from '../../shared/components/ui-card/ui-card.component';

@Component({
  selector: 'app-plan-summary',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, HeaderComponent, UiCardComponent],
  template: `
    <div id="plan-summary-page" class="min-h-screen bg-background pb-16">
      <app-header title="Plan Özeti" [showBack]="true"></app-header>

      <div id="plan-summary-container" class="max-w-2xl mx-auto px-4 py-8 space-y-7">

        <!-- Quiet Luxury Step Indicator -->
        <div id="plan-summary-step-indicator-card" class="bg-white rounded-3xl p-5 border border-black/[0.05] shadow-subtle">
          <div id="plan-summary-step-row" class="flex items-center justify-between relative">
            <div id="plan-summary-step-1-group" class="flex items-center gap-3.5 z-10 opacity-60">
              <div id="plan-summary-step-1-badge" class="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-semibold text-xs">
                ✓
              </div>
              <div id="plan-summary-step-1-text" class="hidden sm:block">
                <span class="text-[10px] font-semibold text-stone-400 tracking-wider uppercase block">Tamamlandı</span>
                <h3 class="text-xs font-semibold text-stone-700">Tercihler</h3>
              </div>
            </div>

            <!-- Hairline Divider -->
            <div id="plan-summary-step-divider-line" class="flex-1 h-px bg-black/[0.06] mx-4"></div>

            <div id="plan-summary-step-2-group" class="flex items-center gap-3.5 z-10">
              <div id="plan-summary-step-2-badge" class="w-8 h-8 rounded-full bg-obsidian text-white flex items-center justify-center font-semibold text-xs shadow-sm ring-4 ring-black/5">
                2
              </div>
              <div id="plan-summary-step-2-text">
                <span class="text-[10px] font-bold text-stone-400 tracking-wider uppercase block">Adım 2</span>
                <h3 class="text-xs font-bold text-stone-950">Plan Özeti</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- City Banner Image with Temperature Badge -->
        <div id="plan-summary-banner-card" class="relative rounded-3xl overflow-hidden shadow-luxe h-72 border border-black/[0.05]">
          <img
            [src]="summary().cityImageUrl"
            [alt]="summary().city"
            class="w-full h-full object-cover"
          />
          <div id="plan-summary-banner-overlay" class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

          <!-- Weather Badge -->
          <div id="plan-summary-weather-badge" class="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-black/[0.04]">
            <span class="text-sm">🌤️</span>
            <span class="text-xs font-bold text-stone-950">{{ summary().temperature }}</span>
            <span class="text-[10px] text-stone-500 font-medium">Güneşli</span>
          </div>

          <!-- Main Title & Location Badge -->
          <div id="plan-summary-banner-text-box" class="absolute bottom-6 left-6 right-6 text-white">
            <div id="plan-summary-banner-badge-row" class="flex items-center gap-2 mb-2">
              <span class="px-3 py-0.5 bg-gold text-stone-950 text-[10px] font-bold rounded-full uppercase tracking-wider">
                Concierge Rota
              </span>
              <span class="text-xs text-white/80 font-medium">📍 {{ summary().city }}, {{ summary().country }}</span>
            </div>
            <h1 class="text-3xl sm:text-4xl font-serif-luxe font-normal tracking-tight leading-tight">
              {{ summary().daysCount }} Günlük {{ summary().city }} Planınız
            </h1>
            <p class="text-xs text-white/80 mt-1 font-medium">
              {{ planner.travelStyle() }} tempo · {{ planner.dailyBudget() }} bütçe ölçeği
            </p>
          </div>
        </div>

        <!-- 4-Metric Grid Cards -->
        <div id="plan-summary-metrics-grid" class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div id="plan-summary-metric-card-1" class="bg-white p-4 rounded-3xl border border-black/[0.05] shadow-subtle flex flex-col items-center text-center">
            <span class="text-xl mb-1.5">📅</span>
            <span class="text-[10px] text-stone-400 font-medium uppercase tracking-wider">Gün Sayısı</span>
            <span class="text-sm font-extrabold text-stone-950 mt-0.5">{{ summary().daysCount }} Gün</span>
          </div>

          <div id="plan-summary-metric-card-2" class="bg-white p-4 rounded-3xl border border-black/[0.05] shadow-subtle flex flex-col items-center text-center">
            <span class="text-xl mb-1.5">🎯</span>
            <span class="text-[10px] text-stone-400 font-medium uppercase tracking-wider">Aktivite</span>
            <span class="text-sm font-extrabold text-stone-950 mt-0.5">{{ summary().totalActivities }} Aktivite</span>
          </div>

          <div id="plan-summary-metric-card-3" class="bg-white p-4 rounded-3xl border border-black/[0.05] shadow-subtle flex flex-col items-center text-center">
            <span class="text-xl mb-1.5">📍</span>
            <span class="text-[10px] text-stone-400 font-medium uppercase tracking-wider">Mekan</span>
            <span class="text-sm font-extrabold text-stone-950 mt-0.5">{{ summary().totalPlaces }} Mekan</span>
          </div>

          <div id="plan-summary-metric-card-4" class="bg-white p-4 rounded-3xl border border-black/[0.05] shadow-subtle flex flex-col items-center text-center">
            <span class="text-xl mb-1.5">🚶</span>
            <span class="text-[10px] text-stone-400 font-medium uppercase tracking-wider">Mesafe</span>
            <span class="text-sm font-extrabold text-stone-950 mt-0.5">{{ summary().estimatedWalkingKm }}</span>
          </div>
        </div>

        <!-- Plan Özeti Section -->
        <app-ui-card>
          <div id="plan-summary-details-card" class="space-y-4">
            <div id="plan-summary-details-header" class="flex items-center gap-2 border-b border-black/[0.05] pb-3.5">
              <span class="text-gold text-lg">✦</span>
              <h2 class="font-bold text-stone-950 text-sm tracking-tight">Öne Çıkan Rota Detayları</h2>
            </div>

            <ul class="space-y-2.5">
              @for (item of summary().highlights; track item) {
                <li class="flex items-start gap-3 text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-2xl border border-black/[0.03]">
                  <span class="text-base flex-shrink-0 leading-none mt-0.5">{{ item.substring(0, 2) }}</span>
                  <span class="font-medium text-stone-800">{{ item.substring(2) }}</span>
                </li>
              }
            </ul>
          </div>
        </app-ui-card>

        <!-- Action Buttons Grid -->
        <div id="plan-summary-actions-grid" class="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            (click)="goBackToPreferences()"
            class="py-3.5 px-4 rounded-2xl border border-stone-300 text-stone-800 font-bold text-xs hover:bg-stone-100 transition-all flex items-center justify-center gap-2"
          >
            <span>Planı Düzenle</span>
          </button>

          <button
            type="button"
            (click)="confirmPlan()"
            class="py-3.5 px-4 rounded-2xl bg-obsidian text-white font-bold text-xs hover:bg-stone-900 transition-all shadow-luxe flex items-center justify-center gap-2"
          >
            <span>Planı Onayla</span>
            <span class="text-gold">✦</span>
          </button>
        </div>

      </div>
    </div>
  `,
})
export class PlanSummaryComponent {
  planner = inject(TripPlannerService);
  private router = inject(Router);

  summary = this.planner.generatedSummary;

  goBackToPreferences() {
    this.router.navigate(['/planner/preferences']);
  }

  confirmPlan() {
    this.planner.confirmCurrentPlan();
    this.router.navigate(['/itinerary']);
  }
}
