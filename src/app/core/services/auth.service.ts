import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = inject(SupabaseService);
  private router = inject(Router);

  readonly user = this.supabase.user;
  readonly isAuthenticated = this.supabase.isAuthenticated;
  readonly session = this.supabase.session;

  async signInWithPassword(email: string, password: string): Promise<void> {
    if (environment.useMockData || !this.supabase.client) {
      await new Promise(r => setTimeout(r, 600));
      await this.router.navigate(['/trips']);
      return;
    }

    const { error } = await this.supabase.client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    await this.router.navigate(['/trips']);
  }

  async signUp(email: string, password: string, fullName?: string): Promise<void> {
    if (environment.useMockData || !this.supabase.client) {
      await new Promise(r => setTimeout(r, 600));
      await this.router.navigate(['/trips']);
      return;
    }

    const { error } = await this.supabase.client.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName || 'Gezgin' },
      },
    });
    if (error) throw error;
    await this.router.navigate(['/trips']);
  }

  async signInWithGoogle(): Promise<void> {
    if (environment.useMockData || !this.supabase.client) {
      await new Promise(r => setTimeout(r, 600));
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
      await new Promise(r => setTimeout(r, 600));
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
      await new Promise(r => setTimeout(r, 600));
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
    if (!environment.useMockData && this.supabase.client) {
      await this.supabase.client.auth.signOut();
    }
    await this.router.navigate(['/auth/login']);
  }
}
