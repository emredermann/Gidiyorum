import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { TripPlannerService } from '../../core/services/trip-planner.service';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, HeaderComponent],
  template: `
    <div id="planner-preferences-page" class="min-h-screen bg-background pb-16">
      <app-header title="Concierge Planner" [showBack]="true"></app-header>

      <div id="planner-preferences-container" class="max-w-2xl mx-auto px-4 py-8 space-y-9">

        <!-- Step Indicator -->
        <div id="planner-step-indicator-card" class="bg-white rounded-3xl p-5 border border-black/[0.05] shadow-subtle">
          <div id="planner-step-row" class="flex items-center justify-between relative">
            <div id="planner-step-1-group" class="flex items-center gap-3.5 z-10">
              <div id="planner-step-1-badge" class="w-8 h-8 rounded-full bg-obsidian text-white flex items-center justify-center font-semibold text-xs shadow-sm">
                1
              </div>
              <div id="planner-step-1-text">
                <span class="text-[10px] font-bold text-stone-400 tracking-wider uppercase block">Adım 1</span>
                <h3 class="text-xs font-bold text-stone-950">Tercihlerinizi Belirleyin</h3>
              </div>
            </div>

            <div id="planner-step-divider-line" class="flex-1 h-px bg-black/[0.06] mx-4"></div>

            <div id="planner-step-2-group" class="flex items-center gap-3.5 z-10 opacity-40">
              <div id="planner-step-2-badge" class="w-8 h-8 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center font-semibold text-xs">
                2
              </div>
              <div id="planner-step-2-text" class="hidden sm:block">
                <span class="text-[10px] font-semibold text-stone-400 tracking-wider uppercase block">Adım 2</span>
                <h3 class="text-xs font-semibold text-stone-500">Plan Özeti</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 1: İlgi Alanları -->
        <section class="space-y-3.5">
          <div id="planner-interests-header-row" class="flex items-center justify-between">
            <div id="planner-interests-title-box">
              <h2 class="text-base font-bold text-stone-950 tracking-tight">İlgi Alanları</h2>
              <p class="text-xs text-stone-500 mt-0.5">Rotanıza eklenmesini istediğiniz deneyim alanları</p>
            </div>
            <span class="text-[11px] font-bold px-3 py-1 bg-stone-100 text-stone-700 rounded-full border border-black/[0.04]">
              {{ planner.selectedInterests().length }} Seçildi
            </span>
          </div>

          <div id="planner-interests-grid" class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            @for (item of planner.availableInterests; track item.id) {
              <button
                type="button"
                (click)="planner.toggleInterest(item.label)"
                [ngClass]="{
                  'bg-obsidian text-white border-obsidian shadow-luxe': planner.selectedInterests().includes(item.label),
                  'bg-white text-stone-900 border-black/[0.06] hover:border-stone-300': !planner.selectedInterests().includes(item.label)
                }"
                class="relative flex flex-col items-start p-4 rounded-3xl border text-left transition-all duration-200"
              >
                @if (planner.selectedInterests().includes(item.label)) {
                  <span class="absolute top-3.5 right-3.5 w-4 h-4 rounded-full bg-gold text-stone-950 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                }
                <span class="text-xl mb-2">{{ item.icon }}</span>
                <span class="font-bold text-xs">
                  {{ item.label }}
                </span>
                <span class="text-[10px] mt-1 leading-tight opacity-75">
                  {{ item.description }}
                </span>
              </button>
            }
          </div>
        </section>

        <!-- Section 2: Seyahat Temposu -->
        <section class="space-y-3">
          <div id="planner-tempo-title-box">
            <h2 class="text-base font-bold text-stone-950 tracking-tight">Seyahat Temposu</h2>
            <p class="text-xs text-stone-500 mt-0.5">Günlük gezi yoğunluğu tercihi</p>
          </div>

          <div id="planner-tempo-grid" class="grid grid-cols-3 gap-3">
            @for (opt of planner.travelStyleOptions; track opt.value) {
              <button
                type="button"
                (click)="planner.setTravelStyle(opt.value)"
                [ngClass]="{
                  'bg-obsidian text-white border-obsidian': planner.travelStyle() === opt.value,
                  'bg-white text-stone-900 border-black/[0.06]': planner.travelStyle() !== opt.value
                }"
                class="flex flex-col items-center justify-center p-4 rounded-3xl border text-center transition-all"
              >
                <span class="text-xl mb-1">{{ opt.icon }}</span>
                <span class="font-bold text-xs">{{ opt.label }}</span>
                <span class="text-[10px] mt-0.5 opacity-70">{{ opt.desc }}</span>
              </button>
            }
          </div>
        </section>

        <!-- Section 3: Bütçe Seviyesi -->
        <section class="space-y-3">
          <div id="planner-budget-title-box">
            <h2 class="text-base font-bold text-stone-950 tracking-tight">Bütçe Seviyesi</h2>
            <p class="text-xs text-stone-500 mt-0.5">Gastronomi ve konaklama harcama ölçeği</p>
          </div>

          <div id="planner-budget-grid" class="grid grid-cols-3 gap-3">
            @for (opt of planner.budgetOptions; track opt.value) {
              <button
                type="button"
                (click)="planner.setDailyBudget(opt.value)"
                [ngClass]="{
                  'bg-obsidian text-white border-obsidian': planner.dailyBudget() === opt.value,
                  'bg-white text-stone-900 border-black/[0.06]': planner.dailyBudget() !== opt.value
                }"
                class="flex flex-col items-center justify-center p-4 rounded-3xl border text-center transition-all"
              >
                <span class="text-base font-bold mb-0.5" [class.text-gold]="planner.dailyBudget() === opt.value">{{ opt.label }}</span>
                <span class="font-bold text-xs">{{ opt.name }}</span>
                <span class="text-[10px] mt-0.5 opacity-70">{{ opt.desc }}</span>
              </button>
            }
          </div>
        </section>

        <!-- Section 4: Yürüme Mesafesi -->
        <section class="space-y-3">
          <div id="planner-walking-title-box">
            <h2 class="text-base font-bold text-stone-950 tracking-tight">Yürüme Mesafesi</h2>
            <p class="text-xs text-stone-500 mt-0.5">Şehir içi ulaşım ve yürüyüş dengesi</p>
          </div>

          <div id="planner-walking-grid" class="grid grid-cols-3 gap-3">
            @for (opt of planner.walkingOptions; track opt.value) {
              <button
                type="button"
                (click)="planner.setWalkingPreference(opt.value)"
                [ngClass]="{
                  'bg-obsidian text-white border-obsidian': planner.walkingPreference() === opt.value,
                  'bg-white text-stone-900 border-black/[0.06]': planner.walkingPreference() !== opt.value
                }"
                class="flex flex-col items-center justify-center p-4 rounded-3xl border text-center transition-all"
              >
                <span class="text-xl mb-1">{{ opt.icon }}</span>
                <span class="font-bold text-xs">{{ opt.label }}</span>
                <span class="text-[10px] mt-0.5 opacity-70">{{ opt.desc }}</span>
              </button>
            }
          </div>
        </section>

        <!-- Action Button -->
        <div id="planner-action-button-box" class="pt-4">
          <button
            type="button"
            (click)="goToPlanSummary()"
            class="w-full py-4 px-6 rounded-2xl bg-obsidian text-white font-bold text-sm hover:bg-stone-900 transition-all duration-200 shadow-luxe flex items-center justify-center gap-2"
          >
            <span>Planımı Oluştur</span>
            <span class="text-gold">✦</span>
          </button>
        </div>

      </div>
    </div>
  `,
})
export class PreferencesComponent {
  planner = inject(TripPlannerService);
  private router = inject(Router);

  goToPlanSummary() {
    this.router.navigate(['/planner/summary']);
  }
}
