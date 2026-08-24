import {
  UiButtonComponent
} from "./chunk-SOSY2L3E.js";
import "./chunk-GDWRDWRE.js";
import "./chunk-3NIENPLU.js";
import {
  Calendar,
  ChevronRight,
  LucideAngularComponent,
  LucideAngularModule,
  MapPin,
  Plus
} from "./chunk-RPAFIYH2.js";
import {
  SupabaseService
} from "./chunk-3WGHE6CE.js";
import {
  CommonModule,
  RouterLink,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-C5IKH3YG.js";
import {
  __async
} from "./chunk-POPFE7MN.js";

// src/app/features/trips/trips.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = (a0) => ["/trips", a0, "itinerary"];
function TripsComponent_For_15_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trip_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u23F3 ", trip_r1.daysRemainingStr, " ");
  }
}
function TripsComponent_For_15_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trip_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2713 ", trip_r1.daysRemainingStr, " ");
  }
}
function TripsComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 10)(1, "div", 12)(2, "div", 13);
    \u0275\u0275element(3, "img", 14)(4, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 16);
    \u0275\u0275template(6, TripsComponent_For_15_Conditional_6_Template, 2, 1, "span", 17)(7, TripsComponent_For_15_Conditional_7_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 18)(9, "div", 19);
    \u0275\u0275element(10, "lucide-icon", 20);
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "h3", 21);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 22)(16, "div", 23);
    \u0275\u0275element(17, "lucide-icon", 5);
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 24)(21, "span");
    \u0275\u0275text(22, "Rotay\u0131 \u0130ncele");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "lucide-icon", 5);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const trip_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(14, _c0, trip_r1.id));
    \u0275\u0275advance(3);
    \u0275\u0275property("src", trip_r1.coverImage, \u0275\u0275sanitizeUrl)("alt", trip_r1.title);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(6, trip_r1.isUpcoming ? 6 : 7);
    \u0275\u0275advance(4);
    \u0275\u0275property("img", ctx_r1.MapPinIcon)("size", 12);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", trip_r1.city, ", ", trip_r1.country, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", trip_r1.title, " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("img", ctx_r1.CalendarIcon)("size", 13);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trip_r1.dateRangeStr);
    \u0275\u0275advance(4);
    \u0275\u0275property("img", ctx_r1.ChevronRightIcon)("size", 14);
  }
}
function TripsComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 26);
    \u0275\u0275text(2, " \u2708\uFE0F ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "h3", 27);
    \u0275\u0275text(5, "Bu kategoride seyahat bulunamad\u0131");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 28);
    \u0275\u0275text(7, " Yeni bir concierge plan\u0131 olu\u015Fturun ve rotan\u0131z\u0131 haz\u0131rlay\u0131n. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "a", 29);
    \u0275\u0275element(9, "app-ui-button", 30);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("icon", ctx_r1.PlusIcon);
  }
}
var TripsComponent = class _TripsComponent {
  constructor() {
    this.supabase = inject(SupabaseService);
    this.activeTab = signal("upcoming");
    this.loading = signal(true);
    this.PlusIcon = Plus;
    this.MapPinIcon = MapPin;
    this.CalendarIcon = Calendar;
    this.ChevronRightIcon = ChevronRight;
    this.allTrips = signal([
      {
        id: "trip-rome-01",
        title: "Roma Antik \xC7a\u011F & Lezzet Ke\u015Ffi",
        city: "Roma",
        country: "\u0130talya",
        dateRangeStr: "20 - 24 Haziran 2026",
        daysRemainingStr: "5 g\xFCn kald\u0131",
        isUpcoming: true,
        coverImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
        tags: ["Tarih", "Yemek", "Mimari"]
      },
      {
        id: "trip-barcelona-02",
        title: "Barselona Mimarisi ve Plaj Rotas\u0131",
        city: "Barselona",
        country: "\u0130spanya",
        dateRangeStr: "15 - 20 Temmuz 2026",
        daysRemainingStr: "26 g\xFCn kald\u0131",
        isUpcoming: true,
        coverImage: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800",
        tags: ["Sanat", "Plaj", "Yemek"]
      },
      {
        id: "trip-paris-03",
        title: "Paris Sanat ve Gurme Turu",
        city: "Paris",
        country: "Fransa",
        dateRangeStr: "10 - 15 May\u0131s 2026",
        daysRemainingStr: "Tamamland\u0131",
        isUpcoming: false,
        coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        tags: ["M\xFCze", "L\xFCks"]
      }
    ]);
    this.upcomingTrips = () => this.allTrips().filter((t) => t.isUpcoming);
    this.pastTrips = () => this.allTrips().filter((t) => !t.isUpcoming);
    this.displayedTrips = () => this.activeTab() === "upcoming" ? this.upcomingTrips() : this.pastTrips();
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.loading.set(false);
    });
  }
  static {
    this.\u0275fac = function TripsComponent_Factory(t) {
      return new (t || _TripsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TripsComponent, selectors: [["app-trips"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 17, vars: 21, consts: [[1, "min-h-screen", "bg-background", "pb-20"], [1, "sticky", "top-0", "z-40", "bg-[#F9F8F6]/90", "backdrop-blur-md", "border-b", "border-black/[0.05]"], [1, "flex", "items-center", "justify-between", "px-4", "h-14", "max-w-2xl", "mx-auto"], [1, "font-bold", "text-stone-950", "text-base", "tracking-tight", "font-serif-luxe"], ["routerLink", "/planner/preferences", "aria-label", "Yeni Seyahat Ekle", "title", "Yeni Seyahat Ekle", 1, "w-8", "h-8", "bg-obsidian", "text-white", "rounded-full", "flex", "items-center", "justify-center", "shadow-sm", "hover:bg-stone-900", "transition-all"], ["strokeWidth", "1.5", 3, "img", "size"], [1, "px-4", "py-6", "max-w-2xl", "mx-auto", "space-y-6"], [1, "bg-stone-200/60", "p-1", "rounded-full", "flex", "items-center", "border", "border-black/[0.04]"], ["type", "button", 1, "flex-1", "py-2", "rounded-full", "text-xs", "font-bold", "transition-all", "text-center", 3, "click"], [1, "space-y-5"], [1, "block", "group", 3, "routerLink"], [1, "flex", "flex-col", "items-center", "justify-center", "py-16", "text-center", "bg-white", "rounded-3xl", "border", "border-black/[0.05]", "p-6", "space-y-4", "shadow-subtle"], [1, "relative", "rounded-3xl", "overflow-hidden", "shadow-luxe", "border", "border-black/[0.05]", "transition-all", "duration-300", "group-hover:-translate-y-0.5", "bg-stone-900"], [1, "h-48", "sm:h-52", "w-full", "overflow-hidden", "relative"], [1, "w-full", "h-full", "object-cover", "group-hover:scale-105", "transition-transform", "duration-500", "opacity-85", 3, "src", "alt"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-black/85", "via-black/30", "to-transparent"], [1, "absolute", "top-4", "right-4", "z-10"], [1, "px-3", "py-1", "rounded-full", "text-[11px]", "font-extrabold", "shadow-sm", "backdrop-blur-md", "bg-white/90", "text-stone-950", "inline-flex", "items-center", "gap-1", "border", "border-black/[0.04]"], [1, "absolute", "bottom-5", "left-5", "right-5", "z-10", "text-white"], [1, "flex", "items-center", "gap-1.5", "text-xs", "text-white/80", "font-medium", "mb-1"], ["strokeWidth", "1.5", 1, "text-gold", 3, "img", "size"], [1, "text-xl", "sm:text-2xl", "font-serif-luxe", "font-normal", "tracking-tight", "text-white", "group-hover:text-gold", "transition-colors"], [1, "flex", "items-center", "justify-between", "mt-3", "pt-2.5", "border-t", "border-white/15", "text-xs", "text-white/90", "font-medium"], [1, "flex", "items-center", "gap-1.5"], [1, "flex", "items-center", "gap-1", "font-bold", "text-white", "group-hover:translate-x-1", "transition-transform"], [1, "px-3", "py-1", "rounded-full", "text-[11px]", "font-bold", "shadow-sm", "backdrop-blur-md", "bg-stone-100/90", "text-stone-700", "inline-flex", "items-center", "gap-1", "border", "border-black/[0.04]"], [1, "w-14", "h-14", "rounded-full", "bg-stone-100", "flex", "items-center", "justify-center", "text-2xl"], [1, "font-bold", "text-stone-950", "text-sm"], [1, "text-stone-400", "text-xs", "mt-1", "max-w-xs", "mx-auto"], ["routerLink", "/planner/preferences"], ["label", "Yeni Plan Ekle", 3, "icon"]], template: function TripsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "h1", 3);
        \u0275\u0275text(4, "Seyahatlerim");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "a", 4);
        \u0275\u0275element(6, "lucide-icon", 5);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 6)(8, "div", 7)(9, "button", 8);
        \u0275\u0275listener("click", function TripsComponent_Template_button_click_9_listener() {
          return ctx.activeTab.set("upcoming");
        });
        \u0275\u0275text(10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "button", 8);
        \u0275\u0275listener("click", function TripsComponent_Template_button_click_11_listener() {
          return ctx.activeTab.set("past");
        });
        \u0275\u0275text(12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 9);
        \u0275\u0275repeaterCreate(14, TripsComponent_For_15_Template, 24, 16, "a", 10, _forTrack0);
        \u0275\u0275template(16, TripsComponent_Conditional_16_Template, 10, 1, "div", 11);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("img", ctx.PlusIcon)("size", 16);
        \u0275\u0275advance(3);
        \u0275\u0275classProp("bg-obsidian", ctx.activeTab() === "upcoming")("text-white", ctx.activeTab() === "upcoming")("shadow-sm", ctx.activeTab() === "upcoming")("text-stone-600", ctx.activeTab() !== "upcoming");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" Yakla\u015Fanlar (", ctx.upcomingTrips().length, ") ");
        \u0275\u0275advance();
        \u0275\u0275classProp("bg-obsidian", ctx.activeTab() === "past")("text-white", ctx.activeTab() === "past")("shadow-sm", ctx.activeTab() === "past")("text-stone-600", ctx.activeTab() !== "past");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" Ge\xE7mi\u015F (", ctx.pastTrips().length, ") ");
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.displayedTrips());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(16, ctx.displayedTrips().length === 0 ? 16 : -1);
      }
    }, dependencies: [
      CommonModule,
      RouterLink,
      LucideAngularModule,
      LucideAngularComponent,
      UiButtonComponent
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TripsComponent, { className: "TripsComponent", filePath: "src\\app\\features\\trips\\trips.component.ts", lineNumber: 169 });
})();
export {
  TripsComponent
};
//# sourceMappingURL=chunk-4NN4QJMV.js.map
