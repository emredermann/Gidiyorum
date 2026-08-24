import {
  UiCardComponent
} from "./chunk-GDWRDWRE.js";
import {
  TripPlannerService
} from "./chunk-IC2QVEZH.js";
import {
  HeaderComponent
} from "./chunk-3NIENPLU.js";
import {
  LucideAngularModule
} from "./chunk-RPAFIYH2.js";
import {
  CommonModule,
  Router,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-C5IKH3YG.js";
import "./chunk-POPFE7MN.js";

// src/app/features/planner/plan-summary.component.ts
function PlanSummaryComponent_For_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 37)(1, "span", 42);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 43);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.substring(0, 2));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.substring(2));
  }
}
var PlanSummaryComponent = class _PlanSummaryComponent {
  constructor() {
    this.planner = inject(TripPlannerService);
    this.router = inject(Router);
    this.summary = this.planner.generatedSummary;
  }
  goBackToPreferences() {
    this.router.navigate(["/planner/preferences"]);
  }
  confirmPlan() {
    this.router.navigate(["/itinerary"]);
  }
  static {
    this.\u0275fac = function PlanSummaryComponent_Factory(t) {
      return new (t || _PlanSummaryComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlanSummaryComponent, selectors: [["app-plan-summary"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 90, vars: 14, consts: [[1, "min-h-screen", "bg-background", "pb-16"], ["title", "Plan \xD6zeti", 3, "showBack"], [1, "max-w-2xl", "mx-auto", "px-4", "py-8", "space-y-7"], [1, "bg-white", "rounded-3xl", "p-5", "border", "border-black/[0.05]", "shadow-subtle"], [1, "flex", "items-center", "justify-between", "relative"], [1, "flex", "items-center", "gap-3.5", "z-10", "opacity-60"], [1, "w-8", "h-8", "rounded-full", "bg-stone-900", "text-white", "flex", "items-center", "justify-center", "font-semibold", "text-xs"], [1, "hidden", "sm:block"], [1, "text-[10px]", "font-semibold", "text-stone-400", "tracking-wider", "uppercase", "block"], [1, "text-xs", "font-semibold", "text-stone-700"], [1, "flex-1", "h-px", "bg-black/[0.06]", "mx-4"], [1, "flex", "items-center", "gap-3.5", "z-10"], [1, "w-8", "h-8", "rounded-full", "bg-obsidian", "text-white", "flex", "items-center", "justify-center", "font-semibold", "text-xs", "shadow-sm", "ring-4", "ring-black/5"], [1, "text-[10px]", "font-bold", "text-stone-400", "tracking-wider", "uppercase", "block"], [1, "text-xs", "font-bold", "text-stone-950"], [1, "relative", "rounded-3xl", "overflow-hidden", "shadow-luxe", "h-72", "border", "border-black/[0.05]"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-black/85", "via-black/30", "to-transparent"], [1, "absolute", "top-4", "right-4", "bg-white/90", "backdrop-blur-md", "px-3.5", "py-1.5", "rounded-full", "flex", "items-center", "gap-2", "shadow-sm", "border", "border-black/[0.04]"], [1, "text-sm"], [1, "text-[10px]", "text-stone-500", "font-medium"], [1, "absolute", "bottom-6", "left-6", "right-6", "text-white"], [1, "flex", "items-center", "gap-2", "mb-2"], [1, "px-3", "py-0.5", "bg-gold", "text-stone-950", "text-[10px]", "font-bold", "rounded-full", "uppercase", "tracking-wider"], [1, "text-xs", "text-white/80", "font-medium"], [1, "text-3xl", "sm:text-4xl", "font-serif-luxe", "font-normal", "tracking-tight", "leading-tight"], [1, "text-xs", "text-white/80", "mt-1", "font-medium"], [1, "grid", "grid-cols-2", "sm:grid-cols-4", "gap-3"], [1, "bg-white", "p-4", "rounded-3xl", "border", "border-black/[0.05]", "shadow-subtle", "flex", "flex-col", "items-center", "text-center"], [1, "text-xl", "mb-1.5"], [1, "text-[10px]", "text-stone-400", "font-medium", "uppercase", "tracking-wider"], [1, "text-sm", "font-extrabold", "text-stone-950", "mt-0.5"], [1, "space-y-4"], [1, "flex", "items-center", "gap-2", "border-b", "border-black/[0.05]", "pb-3.5"], [1, "text-gold", "text-lg"], [1, "font-bold", "text-stone-950", "text-sm", "tracking-tight"], [1, "space-y-2.5"], [1, "flex", "items-start", "gap-3", "text-xs", "text-stone-700", "leading-relaxed", "bg-stone-50", "p-3", "rounded-2xl", "border", "border-black/[0.03]"], [1, "grid", "grid-cols-2", "gap-3", "pt-2"], ["type", "button", 1, "py-3.5", "px-4", "rounded-2xl", "border", "border-stone-300", "text-stone-800", "font-bold", "text-xs", "hover:bg-stone-100", "transition-all", "flex", "items-center", "justify-center", "gap-2", 3, "click"], ["type", "button", 1, "py-3.5", "px-4", "rounded-2xl", "bg-obsidian", "text-white", "font-bold", "text-xs", "hover:bg-stone-900", "transition-all", "shadow-luxe", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "text-gold"], [1, "text-base", "flex-shrink-0", "leading-none", "mt-0.5"], [1, "font-medium", "text-stone-800"]], template: function PlanSummaryComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "app-header", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6);
        \u0275\u0275text(7, " \u2713 ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 7)(9, "span", 8);
        \u0275\u0275text(10, "Tamamland\u0131");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "h3", 9);
        \u0275\u0275text(12, "Tercihler");
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(13, "div", 10);
        \u0275\u0275elementStart(14, "div", 11)(15, "div", 12);
        \u0275\u0275text(16, " 2 ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "div")(18, "span", 13);
        \u0275\u0275text(19, "Ad\u0131m 2");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "h3", 14);
        \u0275\u0275text(21, "Plan \xD6zeti");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(22, "div", 15);
        \u0275\u0275element(23, "img", 16)(24, "div", 17);
        \u0275\u0275elementStart(25, "div", 18)(26, "span", 19);
        \u0275\u0275text(27, "\u{1F324}\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "span", 14);
        \u0275\u0275text(29);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "span", 20);
        \u0275\u0275text(31, "G\xFCne\u015Fli");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "div", 21)(33, "div", 22)(34, "span", 23);
        \u0275\u0275text(35, " Concierge Rota ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "span", 24);
        \u0275\u0275text(37);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "h1", 25);
        \u0275\u0275text(39);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "p", 26);
        \u0275\u0275text(41);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(42, "div", 27)(43, "div", 28)(44, "span", 29);
        \u0275\u0275text(45, "\u{1F4C5}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "span", 30);
        \u0275\u0275text(47, "G\xFCn Say\u0131s\u0131");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "span", 31);
        \u0275\u0275text(49);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(50, "div", 28)(51, "span", 29);
        \u0275\u0275text(52, "\u{1F3AF}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "span", 30);
        \u0275\u0275text(54, "Aktivite");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "span", 31);
        \u0275\u0275text(56);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(57, "div", 28)(58, "span", 29);
        \u0275\u0275text(59, "\u{1F4CD}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "span", 30);
        \u0275\u0275text(61, "Mekan");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "span", 31);
        \u0275\u0275text(63);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(64, "div", 28)(65, "span", 29);
        \u0275\u0275text(66, "\u{1F6B6}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "span", 30);
        \u0275\u0275text(68, "Mesafe");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(69, "span", 31);
        \u0275\u0275text(70);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(71, "app-ui-card")(72, "div", 32)(73, "div", 33)(74, "span", 34);
        \u0275\u0275text(75, "\u2726");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(76, "h2", 35);
        \u0275\u0275text(77, "\xD6ne \xC7\u0131kan Rota Detaylar\u0131");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(78, "ul", 36);
        \u0275\u0275repeaterCreate(79, PlanSummaryComponent_For_80_Template, 5, 2, "li", 37, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(81, "div", 38)(82, "button", 39);
        \u0275\u0275listener("click", function PlanSummaryComponent_Template_button_click_82_listener() {
          return ctx.goBackToPreferences();
        });
        \u0275\u0275elementStart(83, "span");
        \u0275\u0275text(84, "Plan\u0131 D\xFCzenle");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(85, "button", 40);
        \u0275\u0275listener("click", function PlanSummaryComponent_Template_button_click_85_listener() {
          return ctx.confirmPlan();
        });
        \u0275\u0275elementStart(86, "span");
        \u0275\u0275text(87, "Plan\u0131 Onayla");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(88, "span", 41);
        \u0275\u0275text(89, "\u2726");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("showBack", true);
        \u0275\u0275advance(22);
        \u0275\u0275property("src", ctx.summary().cityImageUrl, \u0275\u0275sanitizeUrl)("alt", ctx.summary().city);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.summary().temperature);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate2("\u{1F4CD} ", ctx.summary().city, ", ", ctx.summary().country, "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate2(" ", ctx.summary().daysCount, " G\xFCnl\xFCk ", ctx.summary().city, " Plan\u0131n\u0131z ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate2(" ", ctx.planner.travelStyle(), " tempo \xB7 ", ctx.planner.dailyBudget(), " b\xFCt\xE7e \xF6l\xE7e\u011Fi ");
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate1("", ctx.summary().daysCount, " G\xFCn");
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1("", ctx.summary().totalActivities, " Aktivite");
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1("", ctx.summary().totalPlaces, " Mekan");
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.summary().estimatedWalkingKm);
        \u0275\u0275advance(9);
        \u0275\u0275repeater(ctx.summary().highlights);
      }
    }, dependencies: [CommonModule, LucideAngularModule, HeaderComponent, UiCardComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlanSummaryComponent, { className: "PlanSummaryComponent", filePath: "src\\app\\features\\planner\\plan-summary.component.ts", lineNumber: 150 });
})();
export {
  PlanSummaryComponent
};
//# sourceMappingURL=chunk-XW7OY4I3.js.map
