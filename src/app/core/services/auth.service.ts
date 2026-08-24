import { Injectable, inject, computed } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = inject(SupabaseService);
  private router = inject(Router);

  readonly isAuthenticated = this.supabase.isAuthenticated;
  readonly session = this.supabase.session;

  readonly user = computed<User | null>(() => {
    const supaUser = this.supabase.user();
    if (!supaUser) return null;
    return {
      id: supaUser.id,
      name: supaUser.user_metadata?.['full_name'] || 'Emre Yılmaz',
      email: supaUser.email || 'demo@gidiyorum.app',
      avatar_url: supaUser.user_metadata?.['avatar_url'] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    };
  });

  async signInWithPassword(email: string, password: string): Promise<void> {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const validEmails = ['demo@gidiyorum.app', 'emre@gidiyorum.app'];
    const validPassword = 'Gidiyorum2026!';

    if (!validEmails.includes(normalizedEmail) || password !== validPassword) {
      throw new Error('Geçersiz e-posta veya şifre. Lütfen demo bilgileri ile giriş yapın.');
    }

    if (environment.useMockData || !this.supabase.client) {
      await new Promise(r => setTimeout(r, 400));
      this.supabase.setMockSession(
        normalizedEmail,
        'Emre Yılmaz',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
      );
      await this.router.navigate(['/trips']);
      return;
    }

    const { error } = await this.supabase.client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error('Geçersiz e-posta veya şifre. Lütfen demo bilgileri ile giriş yapın.');
    }
    await this.router.navigate(['/trips']);
  }

  async signUp(email: string, password: string, fullName?: string): Promise<void> {
    if (environment.useMockData || !this.supabase.client) {
      await new Promise(r => setTimeout(r, 400));
      this.supabase.setMockSession(email, fullName || 'Emre Yılmaz');
      await this.router.navigate(['/trips']);
      return;
    }

    const { error } = await this.supabase.client.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName || 'Emre Yılmaz' },
      },
    });
    if (error) throw error;
    await this.router.navigate(['/trips']);
  }

  async signInWithGoogle(): Promise<void> {
    if (environment.useMockData || !this.supabase.client) {
      await new Promise(r => setTimeout(r, 400));
      this.supabase.setMockSession('demo@gidiyorum.app', 'Emre Yılmaz');
      await this.router.navigate(['/trips']);
      return;
    }

    const { error } = await this.supabase.client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  }

  async signInWithApple(): Promise<void> {
    if (environment.useMockData || !this.supabase.client) {
      await new Promise(r => setTimeout(r, 400));
      this.supabase.setMockSession('demo@gidiyorum.app', 'Emre Yılmaz');
      await this.router.navigate(['/trips']);
      return;
    }

    const { error } = await this.supabase.client.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  }

  async signInWithMagicLink(email: string): Promise<void> {
    if (environment.useMockData || !this.supabase.client) {
      await new Promise(r => setTimeout(r, 400));
      this.supabase.setMockSession(email, 'Emre Yılmaz');
      await this.router.navigate(['/trips']);
      return;
    }

    const { error } = await this.supabase.client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  }

  async signOut(): Promise<void> {
    if (environment.useMockData || !this.supabase.client) {
      this.supabase.clearMockSession();
    } else {
      await this.supabase.client.auth.signOut();
      this.supabase.clearMockSession();
    }
    await this.router.navigate(['/auth/login']);
  }
}
