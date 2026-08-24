import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../models';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export function useAuthStore() {
  const auth = inject(AuthService);
  return {
    get isAuthenticated(): boolean {
      return auth.isAuthenticated();
    },
    get user(): User | null {
      return auth.user();
    },
    signInWithPassword: auth.signInWithPassword.bind(auth),
    signOut: auth.signOut.bind(auth),
  };
}
