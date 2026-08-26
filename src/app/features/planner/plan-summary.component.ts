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
    <div id="plan-summary-page" class="min-h-screen bg-background pb-20">
      <app-header title="Planın Hazır!" [showBack]="true"></app-header>

      <div id="plan-summary-container" class="max-w-md mx-auto px-4 py-6 space-y-6">

        <!-- Stepper Indicator -->
        <div id="plan-summary-stepper" class="flex items-center justify-between px-2">
          <div class="flex items-center gap-2 opacity-60">
            <span class="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center">✓</span>
            <span class="text-xs font-medium text-slate-600 dark:text-slate-400">Tercihler</span>
          </div>
          <div class="h-0.5 flex-1 bg-primary mx-3 rounded-full"></div>
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-xs">2</span>
            <span class="text-xs font-bold text-slate-900 dark:text-white">Planını Oluştur</span>
          </div>
          <div class="h-0.5 flex-1 bg-slate-200 dark:bg-slate-700 mx-3 rounded-full"></div>
          <div class="flex items-center gap-2 opacity-40">
            <span class="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold flex items-center justify-center">3</span>
            <span class="text-xs font-medium text-slate-500 hidden sm:inline">Bugünkü Rotan</span>
          </div>
        </div>

        <!-- Header Titles -->
        <div class="text-center space-y-1">
          <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {{ summary().daysCount }} Günlük {{ summary().city }} Planın 🧳
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400">Senin tercihlerine göre oluşturuldu.</p>
        </div>

        <!-- City Banner Image Card -->
        <div id="plan-summary-banner-card" class="relative rounded-3xl overflow-hidden shadow-luxe h-64 border border-slate-100">
          <img
            [src]="summary().cityImageUrl"
            [alt]="summary().city"
            class="w-full h-full object-cover"
          />
          <div id="plan-summary-banner-overlay" class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <!-- Weather Badge -->
          <div id="plan-summary-weather-badge" class="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-slate-100 dark:border-white/10">
            <span class="text-sm">☀️</span>
            <span class="text-xs font-bold text-slate-900 dark:text-white">{{ summary().temperature }}</span>
          </div>

          <!-- Title Overlay -->
          <div id="plan-summary-banner-text-box" class="absolute bottom-5 left-5 right-5 text-white">
            <h2 class="text-2xl font-extrabold tracking-tight leading-tight">
              {{ summary().city }}, {{ summary().country }}
            </h2>
            <p class="text-xs text-white/80 mt-1 font-medium">
              20 – 24 Haziran
            </p>
          </div>
        </div>

        <!-- 4 Stats Cards Grid -->
        <div id="plan-summary-metrics-grid" class="grid grid-cols-4 gap-2">
          <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex flex-col items-center text-center">
            <span class="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">{{ summary().daysCount }}</span>
            <span class="text-[10px] text-slate-400 font-medium mt-0.5">Gün</span>
          </div>

          <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex flex-col items-center text-center">
            <span class="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">{{ summary().totalActivities }}</span>
            <span class="text-[10px] text-slate-400 font-medium mt-0.5">Aktivite</span>
          </div>

          <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex flex-col items-center text-center">
            <span class="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">{{ summary().totalPlaces }}</span>
            <span class="text-[10px] text-slate-400 font-medium mt-0.5">Mekan</span>
          </div>

          <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex flex-col items-center text-center">
            <span class="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">{{ summary().estimatedWalkingKm }}</span>
            <span class="text-[10px] text-slate-400 font-medium mt-0.5">Yürüme</span>
          </div>
        </div>

        <!-- Plan Özeti Section -->
        <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm space-y-3">
          <h3 class="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Plan Özeti</h3>

          <ul class="space-y-2.5">
            @for (item of summary().highlights; track item) {
              <li class="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-200">
                <span class="w-5 h-5 rounded-full bg-purple-50 text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                <span class="font-medium">{{ item.substring(2) }}</span>
              </li>
            }
          </ul>
        </div>

        <!-- Action Buttons Grid -->
        <div id="plan-summary-actions-grid" class="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            (click)="goBackToPreferences()"
            class="py-3.5 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer"
          >
            <span>Planı Düzenle</span>
          </button>

          <button
            type="button"
            (click)="confirmPlan()"
            class="py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs transition-all shadow-purple flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
          >
            <span>Planı Onayla</span>
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
    const newTrip = this.planner.confirmCurrentPlan();
    this.router.navigate(['/trips', newTrip.id, 'itinerary']);
  }
}
