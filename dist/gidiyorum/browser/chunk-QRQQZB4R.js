import {
  SupabaseService
} from "./chunk-3WGHE6CE.js";
import {
  Router,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-C5IKH3YG.js";
import {
  __async
} from "./chunk-POPFE7MN.js";

// src/app/features/auth-callback/auth-callback.component.ts
var AuthCallbackComponent = class _AuthCallbackComponent {
  constructor() {
    this.supabase = inject(SupabaseService);
    this.router = inject(Router);
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield new Promise((resolve) => setTimeout(resolve, 1500));
      if (this.supabase.isAuthenticated()) {
        yield this.router.navigate(["/trips"]);
      } else {
        yield this.router.navigate(["/onboarding"]);
      }
    });
  }
  static {
    this.\u0275fac = function AuthCallbackComponent_Factory(t) {
      return new (t || _AuthCallbackComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthCallbackComponent, selectors: [["app-auth-callback"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 7, vars: 0, consts: [[1, "min-h-screen", "bg-background", "flex", "items-center", "justify-center"], [1, "text-center"], [1, "w-12", "h-12", "border-4", "border-primary", "border-t-transparent", "rounded-full", "animate-spin", "mx-auto", "mb-4"], [1, "text-gray-600", "font-medium"], [1, "text-gray-400", "text-sm", "mt-1"]], template: function AuthCallbackComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275element(2, "div", 2);
        \u0275\u0275elementStart(3, "p", 3);
        \u0275\u0275text(4, "Giri\u015F yap\u0131l\u0131yor...");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6, "L\xFCtfen bekleyin");
        \u0275\u0275elementEnd()()();
      }
    }, encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthCallbackComponent, { className: "AuthCallbackComponent", filePath: "src\\app\\features\\auth-callback\\auth-callback.component.ts", lineNumber: 18 });
})();
export {
  AuthCallbackComponent
};
//# sourceMappingURL=chunk-QRQQZB4R.js.map
