import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { TripPlannerService } from '../../core/services/trip-planner.service';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, HeaderComponent],
  template: `
    <div id="planner-preferences-page" class="min-h-screen bg-background pb-20">
      <app-header title="Tercihlerini Seç" [showBack]="true"></app-header>

      <div id="planner-preferences-container" class="max-w-md mx-auto px-4 py-6 space-y-7">

        <!-- Stepper Indicator Header -->
        <div id="planner-stepper" class="flex items-center justify-between px-2">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-xs">1</span>
            <span class="text-xs font-bold text-slate-900 dark:text-white">Tercihlerini Seç</span>
          </div>
          <div class="h-0.5 flex-1 bg-slate-200 dark:bg-slate-700 mx-3 rounded-full"></div>
          <div class="flex items-center gap-2 opacity-50">
            <span class="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold flex items-center justify-center">2</span>
            <span class="text-xs font-medium text-slate-500">Planını Oluştur</span>
          </div>
          <div class="h-0.5 flex-1 bg-slate-200 dark:bg-slate-700 mx-3 rounded-full"></div>
          <div class="flex items-center gap-2 opacity-40">
            <span class="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold flex items-center justify-center">3</span>
            <span class="text-xs font-medium text-slate-500 hidden sm:inline">Bugünkü Rotan</span>
          </div>
        </div>

        <!-- Heading -->
        <div id="planner-heading" class="text-center space-y-1 pt-1">
          <h2 class="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Seyahatini senin için nasıl planlayalım?</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">Seçtiklerin, sana özel rotanı oluşturacak.</p>
        </div>

        <!-- Destinasyon & Şehir (Canlı / Dinamik İnternet Arama) -->
        <section class="space-y-3">
          <label class="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Destinasyon & Şehir Ara
          </label>

          <!-- Canlı Arama Input Kutusu -->
          <div class="relative">
            <div class="relative flex items-center">
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (ngModelChange)="onSearchInput()"
                placeholder="🔍 Şehir veya Destinasyon Ara... (Örn: Prag, New York, Viyana, İzmir)"
                class="w-full pl-4 pr-10 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary shadow-xs transition-all"
              />
              @if (searchQuery) {
                <button
                  type="button"
                  (click)="clearSearch()"
                  class="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              }
            </div>

            <!-- Arama Yükleniyor Göstergesi -->
            @if (planner.isSearchingCity()) {
              <div class="absolute right-3 top-3 flex items-center gap-1.5 text-xs text-primary font-bold bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md">
                <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                <span>Aranıyor...</span>
              </div>
            }

            <!-- Canlı Arama Sonuçları Dropdown -->
            @if (planner.searchResults().length > 0) {
              <div class="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                @for (item of planner.searchResults(); track item.name) {
                  <button
                    type="button"
                    (click)="selectCity(item)"
                    class="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-purple-50 dark:hover:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700/50 last:border-0 transition-colors cursor-pointer"
                  >
                    <div class="flex items-center gap-2.5">
                      <span class="text-lg">{{ item.flag }}</span>
                      <div>
                        <div class="font-bold text-xs text-slate-900 dark:text-white">{{ item.name }}</div>
                        <div class="text-[10px] text-slate-500 dark:text-slate-400">{{ item.country }}</div>
                      </div>
                    </div>
                    <span class="text-xs font-bold text-primary bg-purple-50 dark:bg-primary/20 px-2 py-0.5 rounded-full">
                      🌤️ {{ item.temperature }}
                    </span>
                  </button>
                }
              </div>
            }
          </div>

          <!-- Popüler Destinasyonlar (Hızlı Seçim Pills) -->
          <div class="space-y-1.5">
            <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Popüler Destinasyonlar:</span>
            <div class="flex flex-wrap gap-1.5">
              @for (city of planner.popularCities; track city.name) {
                <button
                  type="button"
                  (click)="selectCity(city)"
                  [ngClass]="{
                    'bg-primary text-white border-primary shadow-purple': planner.selectedCity() === city.name,
                    'bg-white text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 hover:border-primary/50': planner.selectedCity() !== city.name
                  }"
                  class="px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>{{ city.flag }}</span>
                  <span>{{ city.name }}</span>
                </button>
              }
            </div>
          </div>

          <!-- Seçilen Şehir Detay Rozeti -->
          @if (planner.selectedCityData(); as selected) {
            <div class="p-3.5 rounded-2xl bg-purple-50 dark:bg-primary/10 border border-primary/20 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-2xl">{{ selected.flag }}</span>
                <div>
                  <h4 class="text-xs font-extrabold text-slate-900 dark:text-white">Seçilen Destinasyon: {{ selected.name }}</h4>
                  <p class="text-[11px] text-slate-600 dark:text-slate-300 font-medium">{{ selected.country }} • Canlı Hava: {{ selected.temperature }}</p>
                </div>
              </div>
              <span class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">✓</span>
            </div>
          }
        </section>

        <!-- Section: Seyahat Tarih Aralığı (Gidiş & Dönüş Tarihleri) -->
        <section class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Seyahat Tarih Aralığı</h3>
            <span class="text-xs font-extrabold text-primary bg-purple-50 dark:bg-primary/20 px-2.5 py-0.5 rounded-full border border-primary/20">
              📅 {{ planner.daysCount() }} Gün Sürecek
            </span>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <!-- Gidiş Tarihi -->
            <div class="space-y-1">
              <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300">Gidiş Tarihi</label>
              <input
                type="date"
                [ngModel]="planner.startDateIso()"
                (ngModelChange)="planner.setStartDate($event)"
                class="w-full px-3 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary shadow-xs cursor-pointer"
              />
            </div>

            <!-- Dönüş Tarihi -->
            <div class="space-y-1">
              <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300">Dönüş Tarihi</label>
              <input
                type="date"
                [ngModel]="planner.endDateIso()"
                (ngModelChange)="planner.setEndDate($event)"
                class="w-full px-3 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary shadow-xs cursor-pointer"
              />
            </div>
          </div>

          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <span class="font-medium text-slate-500 dark:text-slate-400">Planlanacak Tarih Aralığı:</span>
            <span class="font-extrabold text-slate-900 dark:text-white">{{ planner.dateRangeFormatted() }}</span>
          </div>
        </section>

        <!-- Section: İlgi Alanların -->
        <section class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">İlgi Alanların</h3>
            <span class="text-[11px] text-primary font-bold">{{ planner.selectedInterests().length }} Seçildi</span>
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            @for (item of planner.availableInterests; track item.id) {
              <button
                type="button"
                (click)="planner.toggleInterest(item.label)"
                [ngClass]="{
                  'bg-purple-50 text-primary border-primary dark:bg-primary/20 dark:text-purple-300 shadow-sm': planner.selectedInterests().includes(item.label),
                  'bg-white text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 hover:border-purple-300': !planner.selectedInterests().includes(item.label)
                }"
                class="flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer"
              >
                <span class="text-xl flex-shrink-0">{{ item.icon }}</span>
                <span class="font-bold text-xs leading-tight flex-1">{{ item.label }}</span>
                @if (planner.selectedInterests().includes(item.label)) {
                  <span class="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                }
              </button>
            }
          </div>
        </section>

        <!-- Section: Seyahat Tarzın -->
        <section class="space-y-2.5">
          <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Seyahat Tarzın</h3>
          <div class="grid grid-cols-3 gap-2">
            @for (opt of planner.travelStyleOptions; track opt.value) {
              <button
                type="button"
                (click)="planner.setTravelStyle(opt.value)"
                [ngClass]="{
                  'bg-purple-50 text-primary border-primary font-bold shadow-xs': planner.travelStyle() === opt.value,
                  'bg-white text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700': planner.travelStyle() !== opt.value
                }"
                class="py-2.5 px-3 rounded-full border text-xs text-center transition-all cursor-pointer font-semibold"
              >
                {{ opt.label }}
              </button>
            }
          </div>
        </section>

        <!-- Section: Bütçe (Günlük) -->
        <section class="space-y-2.5">
          <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Bütçe (Günlük)</h3>
          <div class="grid grid-cols-3 gap-2">
            @for (opt of planner.budgetOptions; track opt.value) {
              <button
                type="button"
                (click)="planner.setDailyBudget(opt.value)"
                [ngClass]="{
                  'bg-purple-50 text-primary border-primary font-bold shadow-xs': planner.dailyBudget() === opt.value,
                  'bg-white text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700': planner.dailyBudget() !== opt.value
                }"
                class="py-2.5 px-3 rounded-full border text-xs text-center transition-all cursor-pointer font-semibold"
              >
                {{ opt.label }}
              </button>
            }
          </div>
        </section>

        <!-- Section: Yürüme Tercihin -->
        <section class="space-y-2.5">
          <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Yürüme Tercihin</h3>
          <div class="grid grid-cols-3 gap-2">
            @for (opt of planner.walkingOptions; track opt.value) {
              <button
                type="button"
                (click)="planner.setWalkingPreference(opt.value)"
                [ngClass]="{
                  'bg-purple-50 text-primary border-primary font-bold shadow-xs': planner.walkingPreference() === opt.value,
                  'bg-white text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700': planner.walkingPreference() !== opt.value
                }"
                class="py-2.5 px-3 rounded-full border text-xs text-center transition-all cursor-pointer font-semibold"
              >
                {{ opt.label }}
              </button>
            }
          </div>
        </section>

        <!-- Submit Button -->
        <div id="planner-action-button-box" class="pt-2">
          <button
            type="button"
            (click)="goToPlanSummary()"
            class="w-full py-4 px-6 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-sm transition-all duration-200 shadow-purple flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <span>Planımı Oluştur</span>
            <span class="text-lg">✨</span>
          </button>
        </div>

      </div>
    </div>
  `,
})
export class PreferencesComponent {
  planner = inject(TripPlannerService);
  private router = inject(Router);

  searchQuery = '';
  private searchTimeout: any;

  onSearchInput() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.planner.searchCityDynamic(this.searchQuery);
    }, 300);
  }

  clearSearch() {
    this.searchQuery = '';
    this.planner.searchCityDynamic('');
  }

  selectCity(city: any) {
    this.searchQuery = '';
    this.planner.selectDynamicCity(city);
  }

  goToPlanSummary() {
    this.router.navigate(['/planner/summary']);
  }
}

