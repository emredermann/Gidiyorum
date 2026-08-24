import {
  SupabaseService,
  environment
} from "./chunk-3WGHE6CE.js";
import {
  Router,
  inject,
  ɵɵdefineInjectable
} from "./chunk-C5IKH3YG.js";
import {
  __async
} from "./chunk-POPFE7MN.js";

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  constructor() {
    this.supabase = inject(SupabaseService);
    this.router = inject(Router);
    this.user = this.supabase.user;
    this.isAuthenticated = this.supabase.isAuthenticated;
    this.session = this.supabase.session;
  }
  signInWithPassword(email, password) {
    return __async(this, null, function* () {
      if (environment.useMockData || !this.supabase.client) {
        yield new Promise((r) => setTimeout(r, 600));
        yield this.router.navigate(["/trips"]);
        return;
      }
      const { error } = yield this.supabase.client.auth.signInWithPassword({
        email,
        password
      });
      if (error)
        throw error;
      yield this.router.navigate(["/trips"]);
    });
  }
  signUp(email, password, fullName) {
    return __async(this, null, function* () {
      if (environment.useMockData || !this.supabase.client) {
        yield new Promise((r) => setTimeout(r, 600));
        yield this.router.navigate(["/trips"]);
        return;
      }
      const { error } = yield this.supabase.client.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName || "Gezgin" }
        }
      });
      if (error)
        throw error;
      yield this.router.navigate(["/trips"]);
    });
  }
  signInWithGoogle() {
    return __async(this, null, function* () {
      if (environment.useMockData || !this.supabase.client) {
        yield new Promise((r) => setTimeout(r, 600));
        yield this.router.navigate(["/trips"]);
        return;
      }
      const { error } = yield this.supabase.client.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error)
        throw error;
    });
  }
  signInWithApple() {
    return __async(this, null, function* () {
      if (environment.useMockData || !this.supabase.client) {
        yield new Promise((r) => setTimeout(r, 600));
        yield this.router.navigate(["/trips"]);
        return;
      }
      const { error } = yield this.supabase.client.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error)
        throw error;
    });
  }
  signInWithMagicLink(email) {
    return __async(this, null, function* () {
      if (environment.useMockData || !this.supabase.client) {
        yield new Promise((r) => setTimeout(r, 600));
        yield this.router.navigate(["/trips"]);
        return;
      }
      const { error } = yield this.supabase.client.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error)
        throw error;
    });
  }
  signOut() {
    return __async(this, null, function* () {
      if (!environment.useMockData && this.supabase.client) {
        yield this.supabase.client.auth.signOut();
      }
      yield this.router.navigate(["/auth/login"]);
    });
  }
  static {
    this.\u0275fac = function AuthService_Factory(t) {
      return new (t || _AuthService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
//# sourceMappingURL=chunk-3ASZHI2J.js.map
