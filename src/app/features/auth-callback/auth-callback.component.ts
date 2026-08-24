import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: `
    <div id="auth-callback-page-container" class="min-h-screen bg-background flex items-center justify-center">
      <div id="auth-callback-card-box" class="text-center">
        <div id="auth-callback-spinner" class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-600 font-medium">Giriş yapılıyor...</p>
        <p class="text-gray-400 text-sm mt-1">Lütfen bekleyin</p>
      </div>
    </div>
  `,
})
export class AuthCallbackComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private router = inject(Router);

  async ngOnInit() {
    // Give Supabase time to process the OAuth callback and set the session
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (this.supabase.isAuthenticated()) {
      await this.router.navigate(['/trips']);
    } else {
      await this.router.navigate(['/onboarding']);
    }
  }
}
