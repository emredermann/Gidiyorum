import {
  UiButtonComponent
} from "./chunk-SOSY2L3E.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-K3XLSYZ2.js";
import {
  AuthService
} from "./chunk-3ASZHI2J.js";
import {
  LucideAngularComponent,
  LucideAngularModule,
  MapPin,
  Sparkles
} from "./chunk-RPAFIYH2.js";
import {
  SupabaseService
} from "./chunk-3WGHE6CE.js";
import {
  CommonModule,
  Router,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
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

// src/app/features/onboarding/onboarding.component.ts
var _c0 = () => ["city", "preferences"];
function OnboardingComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "div")(2, "h2", 11);
    \u0275\u0275text(3, "Ho\u015F geldiniz! \u{1F44B}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 12);
    \u0275\u0275text(5, "Seyahat planlaman\u0131za ba\u015Flamak i\xE7in giri\u015F yap\u0131n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 13);
    \u0275\u0275listener("click", function OnboardingComponent_Conditional_10_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.signInWithGoogle());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 14);
    \u0275\u0275element(8, "path", 15)(9, "path", 16)(10, "path", 17)(11, "path", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " Google ile devam et ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "div", 19)(14, "div", 20);
    \u0275\u0275element(15, "div", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 22)(17, "span", 23);
    \u0275\u0275text(18, "veya");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 24)(20, "input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function OnboardingComponent_Conditional_10_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.email, $event) || (ctx_r1.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "app-ui-button", 26);
    \u0275\u0275listener("clicked", function OnboardingComponent_Conditional_10_Template_app_ui_button_clicked_21_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendMagicLink());
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r1.loading());
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.email);
    \u0275\u0275advance();
    \u0275\u0275property("fullWidth", true)("loading", ctx_r1.loading());
  }
}
function OnboardingComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "div")(2, "h2", 11);
    \u0275\u0275text(3, "Nereye gidiyorsunuz? \u{1F30D}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 12);
    \u0275\u0275text(5, "\u015Eehir veya destinasyonu girin");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 24)(7, "div", 19);
    \u0275\u0275element(8, "lucide-icon", 27);
    \u0275\u0275elementStart(9, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function OnboardingComponent_Conditional_11_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.city, $event) || (ctx_r1.city = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 29)(11, "div")(12, "label", 30);
    \u0275\u0275text(13, "Ba\u015Flang\u0131\xE7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function OnboardingComponent_Conditional_11_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.startDate, $event) || (ctx_r1.startDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div")(16, "label", 30);
    \u0275\u0275text(17, "Biti\u015F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function OnboardingComponent_Conditional_11_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.endDate, $event) || (ctx_r1.endDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(19, "app-ui-button", 32);
    \u0275\u0275listener("clicked", function OnboardingComponent_Conditional_11_Template_app_ui_button_clicked_19_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextStep("preferences"));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("img", ctx_r1.MapPinIcon)("size", 18);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.city);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.startDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.endDate);
    \u0275\u0275advance();
    \u0275\u0275property("fullWidth", true)("disabled", !ctx_r1.city);
  }
}
function OnboardingComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 33);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 34);
    \u0275\u0275element(3, "circle", 35)(4, "path", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div")(6, "h3", 37);
    \u0275\u0275text(7, "Rotan\u0131z haz\u0131rlan\u0131yor...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 38);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("AI rehberiniz ", ctx_r1.city, " i\xE7in en iyi plan\u0131 olu\u015Fturuyor");
  }
}
function OnboardingComponent_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 40);
  }
  if (rf & 2) {
    const s_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("w-8", ctx_r1.currentStep() === s_r4)("w-2", ctx_r1.currentStep() !== s_r4)("bg-primary", ctx_r1.currentStep() === s_r4)("bg-gray-200", ctx_r1.currentStep() !== s_r4);
  }
}
function OnboardingComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275repeaterCreate(1, OnboardingComponent_Conditional_13_For_2_Template, 1, 8, "div", 39, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
var OnboardingComponent = class _OnboardingComponent {
  constructor() {
    this.router = inject(Router);
    this.supabase = inject(SupabaseService);
    this.auth = inject(AuthService);
    this.currentStep = signal("auth");
    this.loading = signal(false);
    this.email = "";
    this.city = "Roma, \u0130talya";
    this.startDate = "";
    this.endDate = "";
    this.SparklesIcon = Sparkles;
    this.MapPinIcon = MapPin;
  }
  ngOnInit() {
    if (this.auth.isAuthenticated())
      this.currentStep.set("city");
  }
  nextStep(step) {
    if (step === "preferences") {
      this.router.navigate(["/planner/preferences"]);
    } else {
      this.currentStep.set(step);
    }
  }
  signInWithGoogle() {
    return __async(this, null, function* () {
      this.loading.set(true);
      try {
        yield this.auth.signInWithGoogle();
      } finally {
        this.loading.set(false);
      }
    });
  }
  sendMagicLink() {
    return __async(this, null, function* () {
      if (!this.email)
        return;
      this.loading.set(true);
      try {
        yield this.auth.signInWithMagicLink(this.email);
        alert("Magic link e-postan\u0131za g\xF6nderildi! \u{1F4EC}");
      } finally {
        this.loading.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function OnboardingComponent_Factory(t) {
      return new (t || _OnboardingComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OnboardingComponent, selectors: [["app-onboarding"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 14, vars: 6, consts: [[1, "min-h-screen", "bg-background", "flex", "flex-col"], [1, "bg-gradient-to-br", "from-primary", "to-indigo-700", "text-white", "px-6", "pt-16", "pb-12"], [1, "max-w-md", "mx-auto", "text-center"], [1, "w-16", "h-16", "rounded-2xl", "bg-white/20", "backdrop-blur-sm", "flex", "items-center", "justify-center", "mx-auto", "mb-4"], [1, "text-white", 3, "img", "size"], [1, "text-3xl", "font-bold", "mb-2"], [1, "text-white/80", "text-sm"], [1, "flex-1", "px-6", "py-8", "max-w-md", "mx-auto", "w-full"], [1, "space-y-6"], [1, "flex", "flex-col", "items-center", "justify-center", "min-h-[300px]", "text-center", "space-y-4"], [1, "flex", "justify-center", "gap-2", "pb-8"], [1, "text-2xl", "font-bold", "text-gray-900"], [1, "text-gray-500", "mt-1", "text-sm"], [1, "w-full", "flex", "items-center", "justify-center", "gap-3", "bg-white", "border", "border-gray-200", "rounded-xl", "px-4", "py-3.5", "text-sm", "font-semibold", "text-gray-700", "hover:bg-gray-50", "transition-colors", "shadow-sm", "disabled:opacity-50", 3, "click", "disabled"], ["viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["fill", "#4285F4", "d", "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"], ["fill", "#34A853", "d", "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"], ["fill", "#FBBC05", "d", "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"], ["fill", "#EA4335", "d", "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"], [1, "relative"], [1, "absolute", "inset-0", "flex", "items-center"], [1, "w-full", "border-t", "border-gray-200"], [1, "relative", "flex", "justify-center"], [1, "bg-background", "px-3", "text-xs", "text-gray-400"], [1, "space-y-3"], ["type", "email", "placeholder", "E-posta adresiniz", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-gray-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-primary/30", "focus:border-primary", "bg-white", 3, "ngModelChange", "ngModel"], ["label", "Sihirli link g\xF6nder", 3, "clicked", "fullWidth", "loading"], [1, "absolute", "left-3", "top-3", "text-gray-400", 3, "img", "size"], ["type", "text", "placeholder", "\xD6rn: Roma, \u0130talya", 1, "w-full", "pl-10", "pr-4", "py-3", "rounded-xl", "border", "border-gray-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-primary/30", "focus:border-primary", "bg-white", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-2", "gap-3"], [1, "text-xs", "text-gray-500", "mb-1", "block"], ["type", "date", 1, "w-full", "px-3", "py-3", "rounded-xl", "border", "border-gray-200", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-primary/30", "bg-white", 3, "ngModelChange", "ngModel"], ["label", "Tercihlerini Se\xE7 \u2192", 3, "clicked", "fullWidth", "disabled"], [1, "w-16", "h-16", "rounded-2xl", "bg-primary/10", "flex", "items-center", "justify-center"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-8", "w-8", "text-primary"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z", 1, "opacity-75"], [1, "font-bold", "text-gray-900"], [1, "text-gray-400", "text-sm", "mt-1"], [1, "h-1.5", "rounded-full", "transition-all", "duration-300", 3, "w-8", "w-2", "bg-primary", "bg-gray-200"], [1, "h-1.5", "rounded-full", "transition-all", "duration-300"]], template: function OnboardingComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275element(4, "lucide-icon", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 5);
        \u0275\u0275text(6, "Gidiyorum \u2708\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p", 6);
        \u0275\u0275text(8, "Yapay zeka destekli ki\u015Fisel seyahat rehberiniz");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(9, "div", 7);
        \u0275\u0275template(10, OnboardingComponent_Conditional_10_Template, 22, 4, "div", 8)(11, OnboardingComponent_Conditional_11_Template, 20, 7, "div", 8)(12, OnboardingComponent_Conditional_12_Template, 10, 1, "div", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275template(13, OnboardingComponent_Conditional_13_Template, 3, 1, "div", 10);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("img", ctx.SparklesIcon)("size", 28);
        \u0275\u0275advance(6);
        \u0275\u0275conditional(10, ctx.currentStep() === "auth" ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(11, ctx.currentStep() === "city" ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(12, ctx.currentStep() === "creating" ? 12 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(13, ctx.currentStep() !== "auth" && ctx.currentStep() !== "creating" ? 13 : -1);
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, LucideAngularModule, LucideAngularComponent, UiButtonComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OnboardingComponent, { className: "OnboardingComponent", filePath: "src\\app\\features\\onboarding\\onboarding.component.ts", lineNumber: 121 });
})();
export {
  OnboardingComponent
};
//# sourceMappingURL=chunk-XH2TJWLX.js.map
