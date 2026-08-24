import {
  AuthService
} from "./chunk-3ASZHI2J.js";
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Globe,
  LucideAngularComponent,
  LucideAngularModule,
  MapPin,
  Plus,
  Sparkles,
  User
} from "./chunk-RPAFIYH2.js";
import "./chunk-3WGHE6CE.js";
import {
  CommonModule,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  bootstrapApplication,
  inject,
  provideHttpClient,
  provideRouter,
  provideZoneChangeDetection,
  signal,
  withComponentInputBinding,
  withFetch,
  withViewTransitions,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵreference,
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-C5IKH3YG.js";
import "./chunk-POPFE7MN.js";

// src/app/core/guards/auth.guard.ts
var authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(["/auth/login"]);
};

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    redirectTo: "/trips",
    pathMatch: "full"
  },
  {
    path: "onboarding",
    loadComponent: () => import("./chunk-XH2TJWLX.js").then((m) => m.OnboardingComponent)
  },
  {
    path: "auth/login",
    loadComponent: () => import("./chunk-HP3KQYU6.js").then((m) => m.LoginComponent)
  },
  {
    path: "auth/register",
    loadComponent: () => import("./chunk-K4HTAFBW.js").then((m) => m.RegisterComponent)
  },
  {
    path: "profile",
    canActivate: [authGuard],
    loadComponent: () => import("./chunk-B2J7DXAK.js").then((m) => m.ProfileComponent)
  },
  {
    path: "planner/preferences",
    loadComponent: () => import("./chunk-66IXQFHM.js").then((m) => m.PreferencesComponent)
  },
  {
    path: "planner/summary",
    loadComponent: () => import("./chunk-XW7OY4I3.js").then((m) => m.PlanSummaryComponent)
  },
  {
    path: "auth/callback",
    loadComponent: () => import("./chunk-QRQQZB4R.js").then((m) => m.AuthCallbackComponent)
  },
  {
    path: "trips",
    canActivate: [authGuard],
    loadComponent: () => import("./chunk-4NN4QJMV.js").then((m) => m.TripsComponent)
  },
  {
    path: "trips/:id/itinerary",
    canActivate: [authGuard],
    loadComponent: () => import("./chunk-6F3DHKNX.js").then((m) => m.DailyRouteComponent)
  },
  {
    path: "trips/:id/chat",
    canActivate: [authGuard],
    loadComponent: () => import("./chunk-SL3KOHIL.js").then((m) => m.AiGuideComponent)
  },
  {
    path: "ai-guide",
    canActivate: [authGuard],
    loadComponent: () => import("./chunk-SL3KOHIL.js").then((m) => m.AiGuideComponent)
  },
  {
    path: "itinerary",
    canActivate: [authGuard],
    loadComponent: () => import("./chunk-6F3DHKNX.js").then((m) => m.DailyRouteComponent)
  },
  {
    path: "daily-route",
    canActivate: [authGuard],
    loadComponent: () => import("./chunk-6F3DHKNX.js").then((m) => m.DailyRouteComponent)
  },
  {
    path: "places/:id",
    canActivate: [authGuard],
    loadComponent: () => import("./chunk-FI3BWQF5.js").then((m) => m.PlaceDetailComponent)
  },
  {
    path: "**",
    redirectTo: "/trips"
  }
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withFetch())
  ]
};

// src/app/shared/components/bottom-nav/bottom-nav.component.ts
function BottomNavComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 10);
  }
}
function BottomNavComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 10);
  }
}
function BottomNavComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 13);
  }
}
function BottomNavComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 10);
  }
}
var BottomNavComponent = class _BottomNavComponent {
  constructor() {
    this.CompassIcon = Compass;
    this.MapPinIcon = MapPin;
    this.PlusIcon = Plus;
    this.SparklesIcon = Sparkles;
    this.UserIcon = User;
  }
  static {
    this.\u0275fac = function BottomNavComponent_Factory(t) {
      return new (t || _BottomNavComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BottomNavComponent, selectors: [["app-bottom-nav"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 30, vars: 19, consts: [["r1", "routerLinkActive"], ["r2", "routerLinkActive"], ["r3", "routerLinkActive"], ["r4", "routerLinkActive"], ["r5", "routerLinkActive"], [1, "fixed", "bottom-0", "left-0", "right-0", "z-50", "bg-[#F9F8F6]/90", "backdrop-blur-md", "border-t", "border-black/[0.06]", "md:hidden"], [1, "flex", "items-center", "justify-around", "h-16", "px-2", "max-w-md", "mx-auto"], ["routerLinkActive", "text-obsidian font-bold", 1, "relative", "flex", "flex-col", "items-center", "gap-1", "px-3", "py-2", "text-stone-400", "transition-colors", "duration-200", "hover:text-obsidian", 3, "routerLink"], ["strokeWidth", "1.5", 3, "img", "size"], [1, "text-[10px]", "tracking-tight"], [1, "absolute", "bottom-1", "w-1", "h-1", "bg-obsidian", "rounded-full"], [1, "w-8", "h-8", "rounded-full", "bg-obsidian", "text-white", "flex", "items-center", "justify-center", "shadow-sm"], ["strokeWidth", "1.75", 3, "img", "size"], [1, "absolute", "bottom-1", "w-1", "h-1", "bg-gold", "rounded-full"]], template: function BottomNavComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "nav", 5)(1, "div", 6)(2, "a", 7, 0);
        \u0275\u0275element(4, "lucide-icon", 8);
        \u0275\u0275elementStart(5, "span", 9);
        \u0275\u0275text(6, "Ke\u015Ffet");
        \u0275\u0275elementEnd();
        \u0275\u0275template(7, BottomNavComponent_Conditional_7_Template, 1, 0, "span", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "a", 7, 1);
        \u0275\u0275element(10, "lucide-icon", 8);
        \u0275\u0275elementStart(11, "span", 9);
        \u0275\u0275text(12, "Rotam");
        \u0275\u0275elementEnd();
        \u0275\u0275template(13, BottomNavComponent_Conditional_13_Template, 1, 0, "span", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "a", 7, 2)(16, "div", 11);
        \u0275\u0275element(17, "lucide-icon", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "a", 7, 3);
        \u0275\u0275element(20, "lucide-icon", 8);
        \u0275\u0275elementStart(21, "span", 9);
        \u0275\u0275text(22, "AI Rehber");
        \u0275\u0275elementEnd();
        \u0275\u0275template(23, BottomNavComponent_Conditional_23_Template, 1, 0, "span", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "a", 7, 4);
        \u0275\u0275element(26, "lucide-icon", 8);
        \u0275\u0275elementStart(27, "span", 9);
        \u0275\u0275text(28, "Profil");
        \u0275\u0275elementEnd();
        \u0275\u0275template(29, BottomNavComponent_Conditional_29_Template, 1, 0, "span", 10);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        const r1_r1 = \u0275\u0275reference(3);
        const r2_r2 = \u0275\u0275reference(9);
        const r4_r3 = \u0275\u0275reference(19);
        const r5_r4 = \u0275\u0275reference(25);
        \u0275\u0275advance(2);
        \u0275\u0275property("routerLink", "/trips");
        \u0275\u0275advance(2);
        \u0275\u0275property("img", ctx.CompassIcon)("size", 20);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(7, r1_r1.isActive ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("routerLink", "/itinerary");
        \u0275\u0275advance(2);
        \u0275\u0275property("img", ctx.MapPinIcon)("size", 20);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(13, r2_r2.isActive ? 13 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("routerLink", "/planner/preferences");
        \u0275\u0275advance(3);
        \u0275\u0275property("img", ctx.PlusIcon)("size", 16);
        \u0275\u0275advance();
        \u0275\u0275property("routerLink", "/ai-guide");
        \u0275\u0275advance(2);
        \u0275\u0275property("img", ctx.SparklesIcon)("size", 20);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(23, r4_r3.isActive ? 23 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("routerLink", "/profile");
        \u0275\u0275advance(2);
        \u0275\u0275property("img", ctx.UserIcon)("size", 20);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(29, r5_r4.isActive ? 29 : -1);
      }
    }, dependencies: [RouterLink, RouterLinkActive, LucideAngularModule, LucideAngularComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BottomNavComponent, { className: "BottomNavComponent", filePath: "src\\app\\shared\\components\\bottom-nav\\bottom-nav.component.ts", lineNumber: 63 });
})();

// src/app/shared/components/sidebar/sidebar.component.ts
function SidebarComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275text(1, "Gidiyorum");
    \u0275\u0275elementEnd();
  }
}
function SidebarComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "Seyahatlerim");
    \u0275\u0275elementEnd();
  }
}
function SidebarComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "Bug\xFCnk\xFC Rotam");
    \u0275\u0275elementEnd();
  }
}
function SidebarComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "Yeni Plan");
    \u0275\u0275elementEnd();
  }
}
function SidebarComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "AI Concierge");
    \u0275\u0275elementEnd();
  }
}
function SidebarComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "Profilim");
    \u0275\u0275elementEnd();
  }
}
var SidebarComponent = class _SidebarComponent {
  constructor() {
    this.collapsed = signal(false);
    this.GlobeIcon = Globe;
    this.CompassIcon = Compass;
    this.MapPinIcon = MapPin;
    this.PlusIcon = Plus;
    this.SparklesIcon = Sparkles;
    this.UserIcon = User;
    this.ChevronLeftIcon = ChevronLeft;
    this.ChevronRightIcon = ChevronRight;
  }
  toggleCollapse() {
    this.collapsed.update((v) => !v);
  }
  static {
    this.\u0275fac = function SidebarComponent_Factory(t) {
      return new (t || _SidebarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarComponent, selectors: [["app-sidebar"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 23, vars: 29, consts: [[1, "hidden", "md:flex", "flex-col", "bg-[#F9F8F6]", "border-r", "border-black/[0.06]", "transition-all", "duration-300", "h-screen", "sticky", "top-0"], [1, "flex", "items-center", "gap-3", "px-5", "py-6", "border-b", "border-black/[0.05]", "overflow-hidden"], [1, "w-8", "h-8", "rounded-xl", "bg-obsidian", "text-white", "flex", "items-center", "justify-center", "flex-shrink-0", "shadow-sm"], ["strokeWidth", "1.5", 3, "img", "size"], [1, "font-bold", "text-base", "text-stone-950", "tracking-wider", "uppercase", "font-serif-luxe"], [1, "flex-1", "py-6", "space-y-1.5", "px-3"], ["routerLinkActive", "bg-white text-obsidian font-bold shadow-subtle border border-black/[0.04]", 1, "flex", "items-center", "gap-3", "px-3", "py-2.5", "rounded-2xl", "text-stone-500", "hover:bg-stone-100", "hover:text-stone-900", "transition-all", 3, "routerLink"], ["strokeWidth", "1.5", 1, "flex-shrink-0", 3, "img", "size"], [1, "text-xs", "font-semibold", "whitespace-nowrap"], ["strokeWidth", "1.5", 1, "flex-shrink-0", "text-gold", 3, "img", "size"], [1, "flex", "items-center", "justify-center", "p-3", "m-3", "rounded-2xl", "text-stone-400", "hover:bg-stone-100", "hover:text-stone-800", "transition-colors", 3, "click"]], template: function SidebarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "aside", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "lucide-icon", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, SidebarComponent_Conditional_4_Template, 2, 0, "span", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "nav", 5)(6, "a", 6);
        \u0275\u0275element(7, "lucide-icon", 7);
        \u0275\u0275template(8, SidebarComponent_Conditional_8_Template, 2, 0, "span", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "a", 6);
        \u0275\u0275element(10, "lucide-icon", 7);
        \u0275\u0275template(11, SidebarComponent_Conditional_11_Template, 2, 0, "span", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "a", 6);
        \u0275\u0275element(13, "lucide-icon", 7);
        \u0275\u0275template(14, SidebarComponent_Conditional_14_Template, 2, 0, "span", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "a", 6);
        \u0275\u0275element(16, "lucide-icon", 9);
        \u0275\u0275template(17, SidebarComponent_Conditional_17_Template, 2, 0, "span", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "a", 6);
        \u0275\u0275element(19, "lucide-icon", 7);
        \u0275\u0275template(20, SidebarComponent_Conditional_20_Template, 2, 0, "span", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "button", 10);
        \u0275\u0275listener("click", function SidebarComponent_Template_button_click_21_listener() {
          return ctx.toggleCollapse();
        });
        \u0275\u0275element(22, "lucide-icon", 3);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("w-64", !ctx.collapsed())("w-16", ctx.collapsed());
        \u0275\u0275advance(3);
        \u0275\u0275property("img", ctx.GlobeIcon)("size", 16);
        \u0275\u0275advance();
        \u0275\u0275conditional(4, !ctx.collapsed() ? 4 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("routerLink", "/trips");
        \u0275\u0275advance();
        \u0275\u0275property("img", ctx.CompassIcon)("size", 18);
        \u0275\u0275advance();
        \u0275\u0275conditional(8, !ctx.collapsed() ? 8 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("routerLink", "/itinerary");
        \u0275\u0275advance();
        \u0275\u0275property("img", ctx.MapPinIcon)("size", 18);
        \u0275\u0275advance();
        \u0275\u0275conditional(11, !ctx.collapsed() ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("routerLink", "/planner/preferences");
        \u0275\u0275advance();
        \u0275\u0275property("img", ctx.PlusIcon)("size", 18);
        \u0275\u0275advance();
        \u0275\u0275conditional(14, !ctx.collapsed() ? 14 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("routerLink", "/ai-guide");
        \u0275\u0275advance();
        \u0275\u0275property("img", ctx.SparklesIcon)("size", 18);
        \u0275\u0275advance();
        \u0275\u0275conditional(17, !ctx.collapsed() ? 17 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("routerLink", "/profile");
        \u0275\u0275advance();
        \u0275\u0275property("img", ctx.UserIcon)("size", 18);
        \u0275\u0275advance();
        \u0275\u0275conditional(20, !ctx.collapsed() ? 20 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("img", ctx.collapsed() ? ctx.ChevronRightIcon : ctx.ChevronLeftIcon)("size", 16);
      }
    }, dependencies: [RouterLink, RouterLinkActive, LucideAngularModule, LucideAngularComponent, CommonModule], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "src\\app\\shared\\components\\sidebar\\sidebar.component.ts", lineNumber: 79 });
})();

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  constructor() {
    this.title = "gidiyorum";
  }
  static {
    this.\u0275fac = function AppComponent_Factory(t) {
      return new (t || _AppComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 0, consts: [[1, "flex", "h-screen", "overflow-hidden", "bg-background"], [1, "flex-1", "overflow-y-auto", "relative"], [1, "h-16", "md:hidden"]], template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "app-sidebar");
        \u0275\u0275elementStart(2, "main", 1);
        \u0275\u0275element(3, "router-outlet")(4, "div", 2);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(5, "app-bottom-nav");
      }
    }, dependencies: [RouterOutlet, BottomNavComponent, SidebarComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src\\app\\app.component.ts", lineNumber: 29 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
