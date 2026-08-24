import {
  UiButtonComponent
} from "./chunk-SOSY2L3E.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-K3XLSYZ2.js";
import {
  AuthService
} from "./chunk-3ASZHI2J.js";
import {
  Eye,
  EyeOff,
  Globe,
  Lock,
  LucideAngularComponent,
  LucideAngularModule,
  Mail
} from "./chunk-RPAFIYH2.js";
import "./chunk-3WGHE6CE.js";
import {
  CommonModule,
  RouterLink,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-C5IKH3YG.js";
import {
  __async
} from "./chunk-POPFE7MN.js";

// src/app/features/auth/login.component.ts
function LoginComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", ctx_r0.errorMessage(), "");
  }
}
var LoginComponent = class _LoginComponent {
  constructor() {
    this.authService = inject(AuthService);
    this.email = "";
    this.password = "";
    this.showPassword = signal(false);
    this.loading = signal(false);
    this.errorMessage = signal(null);
    this.GlobeIcon = Globe;
    this.MailIcon = Mail;
    this.LockIcon = Lock;
    this.EyeIcon = Eye;
    this.EyeOffIcon = EyeOff;
  }
  toggleShowPassword() {
    this.showPassword.update((v) => !v);
  }
  onLogin(event) {
    return __async(this, null, function* () {
      event.preventDefault();
      if (!this.email || !this.password)
        return;
      this.loading.set(true);
      this.errorMessage.set(null);
      try {
        yield this.authService.signInWithPassword(this.email, this.password);
      } catch (e) {
        this.errorMessage.set(e.message || "Giri\u015F yap\u0131l\u0131rken bir hata olu\u015Ftu.");
      } finally {
        this.loading.set(false);
      }
    });
  }
  signInWithGoogle() {
    return __async(this, null, function* () {
      this.loading.set(true);
      try {
        yield this.authService.signInWithGoogle();
      } finally {
        this.loading.set(false);
      }
    });
  }
  signInWithApple() {
    return __async(this, null, function* () {
      this.loading.set(true);
      try {
        yield this.authService.signInWithApple();
      } finally {
        this.loading.set(false);
      }
    });
  }
  onForgotPassword() {
    alert("\u015Eifre s\u0131f\u0131rlama ba\u011Flant\u0131s\u0131 e-posta adresinize g\xF6nderilecektir. L\xFCtfen e-postan\u0131z\u0131 girin.");
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 55, vars: 16, consts: [[1, "min-h-screen", "bg-background", "flex", "flex-col", "justify-center", "items-center", "px-4", "py-8"], [1, "w-full", "max-w-md", "space-y-8", "bg-white", "p-8", "sm:p-10", "rounded-3xl", "border", "border-black/[0.06]", "shadow-luxe"], [1, "text-center", "space-y-2"], [1, "w-14", "h-14", "rounded-2xl", "bg-obsidian", "text-white", "flex", "items-center", "justify-center", "mx-auto", "shadow-sm"], ["strokeWidth", "1.5", 1, "text-white", 3, "img", "size"], [1, "text-2xl", "font-serif-luxe", "font-normal", "text-stone-950", "tracking-tight"], [1, "text-xs", "text-stone-400"], [1, "p-3.5", "bg-red-50/80", "border", "border-red-100", "text-red-600", "rounded-2xl", "text-xs", "font-semibold", "flex", "items-center", "gap-2"], [1, "space-y-4", 3, "submit"], [1, "block", "text-xs", "font-bold", "text-stone-700", "mb-1.5", "uppercase", "tracking-wider"], [1, "relative"], [1, "absolute", "left-3.5", "top-3.5", "text-stone-400"], ["strokeWidth", "1.5", 3, "img", "size"], ["name", "email", "type", "email", "required", "", "placeholder", "ornek@gidiyorum.app", 1, "w-full", "pl-11", "pr-4", "py-3", "rounded-2xl", "border", "border-black/[0.06]", "text-xs", "sm:text-sm", "focus:outline-none", "focus:ring-1", "focus:ring-obsidian/30", "focus:border-obsidian", "bg-white", "transition-all", "shadow-subtle", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "justify-between", "mb-1.5"], [1, "block", "text-xs", "font-bold", "text-stone-700", "uppercase", "tracking-wider"], ["type", "button", 1, "text-xs", "font-semibold", "text-stone-500", "hover:text-stone-950", "hover:underline", 3, "click"], ["name", "password", "required", "", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "w-full", "pl-11", "pr-11", "py-3", "rounded-2xl", "border", "border-black/[0.06]", "text-xs", "sm:text-sm", "focus:outline-none", "focus:ring-1", "focus:ring-obsidian/30", "focus:border-obsidian", "bg-white", "transition-all", "shadow-subtle", 3, "ngModelChange", "ngModel", "type"], ["type", "button", "title", "\u015Eifreyi g\xF6ster/gizle", 1, "absolute", "right-3.5", "top-3.5", "text-stone-400", "hover:text-stone-700", "transition-colors", 3, "click"], [1, "pt-2"], ["type", "submit", "label", "Giri\u015F Yap", "size", "lg", 3, "fullWidth", "loading"], [1, "absolute", "inset-0", "flex", "items-center"], [1, "w-full", "border-t", "border-black/[0.05]"], [1, "relative", "flex", "justify-center"], [1, "bg-white", "px-3", "text-[11px]", "text-stone-400", "font-medium"], [1, "space-y-2.5"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-center", "gap-3", "bg-white", "border", "border-black/[0.08]", "rounded-2xl", "px-4", "py-3", "text-xs", "font-bold", "text-stone-800", "hover:bg-stone-50", "transition-colors", "shadow-subtle", "disabled:opacity-50", 3, "click", "disabled"], ["viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["fill", "#4285F4", "d", "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"], ["fill", "#34A853", "d", "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"], ["fill", "#FBBC05", "d", "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"], ["fill", "#EA4335", "d", "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-center", "gap-3", "bg-white", "border", "border-black/[0.08]", "rounded-2xl", "px-4", "py-3", "text-xs", "font-bold", "text-stone-950", "hover:bg-stone-50", "transition-colors", "shadow-subtle", "disabled:opacity-50", 3, "click", "disabled"], ["viewBox", "0 0 24 24", 1, "w-4", "h-4", "fill-current"], ["d", "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.11-1 .04-2.18.67-2.88 1.49-.62.72-1.16 1.88-1.01 3.01 1.11.09 2.22-.57 2.9-1.39z"], [1, "text-center", "pt-2"], [1, "text-xs", "text-stone-500"], ["routerLink", "/auth/register", 1, "font-bold", "text-obsidian", "hover:underline", "ml-1"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275element(4, "lucide-icon", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 5);
        \u0275\u0275text(6, "Tekrar Ho\u015F Geldiniz");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p", 6);
        \u0275\u0275text(8, "Ki\u015Fiselle\u015Ftirilmi\u015F seyahat concierge hesab\u0131n\u0131za eri\u015Fin");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, LoginComponent_Conditional_9_Template, 3, 1, "div", 7);
        \u0275\u0275elementStart(10, "form", 8);
        \u0275\u0275listener("submit", function LoginComponent_Template_form_submit_10_listener($event) {
          return ctx.onLogin($event);
        });
        \u0275\u0275elementStart(11, "div")(12, "label", 9);
        \u0275\u0275text(13, "E-posta Adresi");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "div", 10)(15, "span", 11);
        \u0275\u0275element(16, "lucide-icon", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "input", 13);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_17_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(18, "div")(19, "div", 14)(20, "label", 15);
        \u0275\u0275text(21, "\u015Eifre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "button", 16);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_22_listener() {
          return ctx.onForgotPassword();
        });
        \u0275\u0275text(23, " \u015Eifremi Unuttum? ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "div", 10)(25, "span", 11);
        \u0275\u0275element(26, "lucide-icon", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "input", 17);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_27_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "button", 18);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_28_listener() {
          return ctx.toggleShowPassword();
        });
        \u0275\u0275element(29, "lucide-icon", 12);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(30, "div", 19);
        \u0275\u0275element(31, "app-ui-button", 20);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "div", 10)(33, "div", 21);
        \u0275\u0275element(34, "div", 22);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "div", 23)(36, "span", 24);
        \u0275\u0275text(37, "veya sosyal hesab\u0131n\u0131zla");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(38, "div", 25)(39, "button", 26);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_39_listener() {
          return ctx.signInWithGoogle();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(40, "svg", 27);
        \u0275\u0275element(41, "path", 28)(42, "path", 29)(43, "path", 30)(44, "path", 31);
        \u0275\u0275elementEnd();
        \u0275\u0275text(45, " Google ile Devam Et ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(46, "button", 32);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_46_listener() {
          return ctx.signInWithApple();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(47, "svg", 33);
        \u0275\u0275element(48, "path", 34);
        \u0275\u0275elementEnd();
        \u0275\u0275text(49, " Apple ile Devam Et ");
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(50, "div", 35)(51, "p", 36);
        \u0275\u0275text(52, " Hesab\u0131n\u0131z yok mu? ");
        \u0275\u0275elementStart(53, "a", 37);
        \u0275\u0275text(54, "Kay\u0131t Olun");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("img", ctx.GlobeIcon)("size", 24);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(9, ctx.errorMessage() ? 9 : -1);
        \u0275\u0275advance(7);
        \u0275\u0275property("img", ctx.MailIcon)("size", 18);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.email);
        \u0275\u0275advance(9);
        \u0275\u0275property("img", ctx.LockIcon)("size", 18);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.password);
        \u0275\u0275property("type", ctx.showPassword() ? "text" : "password");
        \u0275\u0275advance(2);
        \u0275\u0275property("img", ctx.showPassword() ? ctx.EyeOffIcon : ctx.EyeIcon)("size", 18);
        \u0275\u0275advance(2);
        \u0275\u0275property("fullWidth", true)("loading", ctx.loading());
        \u0275\u0275advance(8);
        \u0275\u0275property("disabled", ctx.loading());
        \u0275\u0275advance(7);
        \u0275\u0275property("disabled", ctx.loading());
      }
    }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterLink, LucideAngularModule, LucideAngularComponent, UiButtonComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\features\\auth\\login.component.ts", lineNumber: 145 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-HP3KQYU6.js.map
