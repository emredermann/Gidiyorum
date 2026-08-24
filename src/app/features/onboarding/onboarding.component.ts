import { Component, signal, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, MapPin, Sparkles, Wallet, Tag } from 'lucide-angular';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';
import { SupabaseService } from '../../core/services/supabase.service';
import { AuthService } from '../../core/services/auth.service';

type Step = 'auth' | 'city' | 'preferences' | 'creating';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, UiButtonComponent],
  template: `
    <div class="min-h-screen bg-background flex flex-col">
      <!-- Hero banner -->
      <div class="bg-gradient-to-br from-primary to-indigo-700 text-white px-6 pt-16 pb-12">
        <div class="max-w-md mx-auto text-center">
          <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
            <lucide-icon [img]="SparklesIcon" [size]="28" class="text-white"></lucide-icon>
          </div>
          <h1 class="text-3xl font-bold mb-2">Gidiyorum ✈️</h1>
          <p class="text-white/80 text-sm">Yapay zeka destekli kişisel seyahat rehberiniz</p>
        </div>
      </div>

      <!-- Step content -->
      <div class="flex-1 px-6 py-8 max-w-md mx-auto w-full">

        <!-- STEP: Auth -->
        @if (currentStep() === 'auth') {
          <div class="space-y-6">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Hoş geldiniz! 👋</h2>
              <p class="text-gray-500 mt-1 text-sm">Seyahat planlamanıza başlamak için giriş yapın</p>
            </div>
            <button
              (click)="signInWithGoogle()"
              [disabled]="loading()"
              class="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google ile devam et
            </button>
            <div class="relative">
              <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
              <div class="relative flex justify-center"><span class="bg-background px-3 text-xs text-gray-400">veya</span></div>
            </div>
            <div class="space-y-3">
              <input [(ngModel)]="email" type="email" placeholder="E-posta adresiniz"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white" />
              <app-ui-button label="Sihirli link gönder" [fullWidth]="true" [loading]="loading()" (clicked)="sendMagicLink()"></app-ui-button>
            </div>
          </div>
        }

        <!-- STEP: City -->
        @if (currentStep() === 'city') {
          <div class="space-y-6">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Nereye gidiyorsunuz? 🌍</h2>
              <p class="text-gray-500 mt-1 text-sm">Şehir veya destinasyonu girin</p>
            </div>
            <div class="space-y-3">
              <div class="relative">
                <lucide-icon [img]="MapPinIcon" [size]="18" class="absolute left-3 top-3 text-gray-400"></lucide-icon>
                <input [(ngModel)]="city" type="text" placeholder="Örn: Roma, İtalya"
                  class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Başlangıç</label>
                  <input [(ngModel)]="startDate" type="date" class="w-full px-3 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white" />
                </div>
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Bitiş</label>
                  <input [(ngModel)]="endDate" type="date" class="w-full px-3 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white" />
                </div>
              </div>
            </div>
            <app-ui-button label="Tercihlerini Seç →" [fullWidth]="true" [disabled]="!city" (clicked)="nextStep('preferences')"></app-ui-button>
          </div>
        }

        <!-- STEP: Creating -->
        @if (currentStep() === 'creating') {
          <div class="flex flex-col items-center justify-center min-h-[300px] text-center space-y-4">
            <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <svg class="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-900">Rotanız hazırlanıyor...</h3>
              <p class="text-gray-400 text-sm mt-1">AI rehberiniz {{ city }} için en iyi planı oluşturuyor</p>
            </div>
          </div>
        }
      </div>

      @if (currentStep() !== 'auth' && currentStep() !== 'creating') {
        <div class="flex justify-center gap-2 pb-8">
          @for (s of ['city', 'preferences']; track s) {
            <div class="h-1.5 rounded-full transition-all duration-300"
              [class.w-8]="currentStep() === s" [class.w-2]="currentStep() !== s"
              [class.bg-primary]="currentStep() === s" [class.bg-gray-200]="currentStep() !== s"></div>
          }
        </div>
      }
    </div>
  `,
})
export class OnboardingComponent implements OnInit {
  private router = inject(Router);
  private supabase = inject(SupabaseService);
  private auth = inject(AuthService);

  currentStep = signal<Step>('auth');
  loading = signal(false);
  email = ''; city = 'Roma, İtalya'; startDate = ''; endDate = '';

  protected SparklesIcon = Sparkles;
  protected MapPinIcon = MapPin;

  ngOnInit() {
    if (this.auth.isAuthenticated()) this.currentStep.set('city');
  }

  nextStep(step: Step) {
    if (step === 'preferences') {
      this.router.navigate(['/planner/preferences']);
    } else {
      this.currentStep.set(step);
    }
  }

  async signInWithGoogle() {
    this.loading.set(true);
    try { await this.auth.signInWithGoogle(); } finally { this.loading.set(false); }
  }

  async sendMagicLink() {
    if (!this.email) return;
    this.loading.set(true);
    try { await this.auth.signInWithMagicLink(this.email); alert('Magic link e-postanıza gönderildi! 📬'); }
    finally { this.loading.set(false); }
  }
}
