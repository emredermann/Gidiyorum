import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Eye, EyeOff, Mail, Lock, User, Globe } from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule, UiButtonComponent],
  template: `
    <div id="register-page-container" class="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-8">
      <div id="register-card-wrapper" class="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-black/[0.06] shadow-luxe">

        <!-- Logo & Header -->
        <div id="register-header-box" class="text-center space-y-2">
          <div id="register-logo-badge" class="w-14 h-14 rounded-2xl bg-obsidian text-white flex items-center justify-center mx-auto shadow-sm">
            <lucide-icon [img]="GlobeIcon" [size]="24" strokeWidth="1.5" class="text-white"></lucide-icon>
          </div>
          <h1 class="text-2xl font-serif-luxe font-normal text-stone-950 tracking-tight">Hesap Oluşturun</h1>
          <p class="text-xs text-stone-400">Kişiselleştirilmiş AI seyahat concierge asistanınıza katılın</p>
        </div>

        <!-- Error Message -->
        @if (errorMessage()) {
          <div id="register-error-alert" class="p-3.5 bg-red-50/80 border border-red-100 text-red-600 rounded-2xl text-xs font-semibold flex items-center gap-2">
            <span>⚠️ {{ errorMessage() }}</span>
          </div>
        }

        <!-- Signup Form -->
        <form (submit)="onRegister($event)" class="space-y-4">
          <div id="register-fullname-field-group">
            <label class="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">Ad Soyad</label>
            <div id="register-fullname-input-wrapper" class="relative">
              <span class="absolute left-3.5 top-3.5 text-stone-400">
                <lucide-icon [img]="UserIcon" [size]="18" strokeWidth="1.5"></lucide-icon>
              </span>
              <input
                [(ngModel)]="fullName"
                name="fullName"
                type="text"
                required
                placeholder="Emre Yılmaz"
                class="w-full pl-11 pr-4 py-3 rounded-2xl border border-black/[0.06] text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-obsidian/30 focus:border-obsidian bg-white transition-all shadow-subtle"
              />
            </div>
          </div>

          <div id="register-email-field-group">
            <label class="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">E-posta Adresi</label>
            <div id="register-email-input-wrapper" class="relative">
              <span class="absolute left-3.5 top-3.5 text-stone-400">
                <lucide-icon [img]="MailIcon" [size]="18" strokeWidth="1.5"></lucide-icon>
              </span>
              <input
                [(ngModel)]="email"
                name="email"
                type="email"
                required
                placeholder="ornek@gidiyorum.app"
                class="w-full pl-11 pr-4 py-3 rounded-2xl border border-black/[0.06] text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-obsidian/30 focus:border-obsidian bg-white transition-all shadow-subtle"
              />
            </div>
          </div>

          <div id="register-password-field-group">
            <label class="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">Şifre</label>
            <div id="register-password-input-wrapper" class="relative">
              <span class="absolute left-3.5 top-3.5 text-stone-400">
                <lucide-icon [img]="LockIcon" [size]="18" strokeWidth="1.5"></lucide-icon>
              </span>
              <input
                [(ngModel)]="password"
                name="password"
                [type]="showPassword() ? 'text' : 'password'"
                required
                placeholder="En az 6 karakter"
                class="w-full pl-11 pr-11 py-3 rounded-2xl border border-black/[0.06] text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-obsidian/30 focus:border-obsidian bg-white transition-all shadow-subtle"
              />
              <button
                type="button"
                (click)="toggleShowPassword()"
                class="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-700 transition-colors"
                title="Şifreyi göster/gizle"
              >
                <lucide-icon [img]="showPassword() ? EyeOffIcon : EyeIcon" [size]="18" strokeWidth="1.5"></lucide-icon>
              </button>
            </div>
          </div>

          <div id="register-submit-btn-wrapper" class="pt-2">
            <app-ui-button
              type="submit"
              label="Kayıt Ol"
              [fullWidth]="true"
              [loading]="loading()"
              size="lg"
            ></app-ui-button>
          </div>
        </form>

        <!-- Divider -->
        <div id="register-social-divider" class="relative">
          <div id="register-divider-line-bg" class="absolute inset-0 flex items-center"><div id="register-divider-line" class="w-full border-t border-black/[0.05]"></div></div>
          <div id="register-divider-text-wrapper" class="relative flex justify-center"><span class="bg-white px-3 text-[11px] text-stone-400 font-medium">veya sosyal hesabınızla</span></div>
        </div>

        <!-- Social Logins (Outlined) -->
        <div id="register-social-buttons-box" class="space-y-2.5">
          <button
            type="button"
            (click)="signInWithGoogle()"
            [disabled]="loading()"
            class="w-full flex items-center justify-center gap-3 bg-white border border-black/[0.08] rounded-2xl px-4 py-3 text-xs font-bold text-stone-800 hover:bg-stone-50 transition-colors shadow-subtle disabled:opacity-50"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google ile Devam Et
          </button>

          <button
            type="button"
            (click)="signInWithApple()"
            [disabled]="loading()"
            class="w-full flex items-center justify-center gap-3 bg-white border border-black/[0.08] rounded-2xl px-4 py-3 text-xs font-bold text-stone-950 hover:bg-stone-50 transition-colors shadow-subtle disabled:opacity-50"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.11-1 .04-2.18.67-2.88 1.49-.62.72-1.16 1.88-1.01 3.01 1.11.09 2.22-.57 2.9-1.39z"/>
            </svg>
            Apple ile Devam Et
          </button>
        </div>

        <!-- Footer Link -->
        <div id="register-footer-link-box" class="text-center pt-2">
          <p class="text-xs text-stone-500">
            Zaten hesabınız var mı?
            <a routerLink="/auth/login" class="font-bold text-obsidian hover:underline ml-1">Giriş Yapın</a>
          </p>
        </div>

      </div>
    </div>
  `,
})
export class RegisterComponent {
  private authService = inject(AuthService);

  fullName = '';
  email = '';
  password = '';
  showPassword = signal(false);
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  protected GlobeIcon = Globe;
  protected UserIcon = User;
  protected MailIcon = Mail;
  protected LockIcon = Lock;
  protected EyeIcon = Eye;
  protected EyeOffIcon = EyeOff;

  toggleShowPassword() {
    this.showPassword.update(v => !v);
  }

  async onRegister(event: Event) {
    event.preventDefault();
    if (!this.email || !this.password) return;

    this.loading.set(true);
    this.errorMessage.set(null);

    try {
      await this.authService.signUp(this.email, this.password, this.fullName);
    } catch (e: any) {
      this.errorMessage.set(e.message || 'Kayıt olunurken bir hata oluştu.');
    } finally {
      this.loading.set(false);
    }
  }

  async signInWithGoogle() {
    this.loading.set(true);
    try {
      await this.authService.signInWithGoogle();
    } finally {
      this.loading.set(false);
    }
  }

  async signInWithApple() {
    this.loading.set(true);
    try {
      await this.authService.signInWithApple();
    } finally {
      this.loading.set(false);
    }
  }
}
