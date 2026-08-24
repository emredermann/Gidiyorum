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
  NgClass,
  Router,
  inject,
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-C5IKH3YG.js";
import "./chunk-POPFE7MN.js";

// src/app/features/planner/preferences.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.value;
var _c0 = (a0, a1) => ({ "bg-obsidian text-white border-obsidian shadow-luxe": a0, "bg-white text-stone-900 border-black/[0.06] hover:border-stone-300": a1 });
var _c1 = (a0, a1) => ({ "bg-obsidian text-white border-obsidian": a0, "bg-white text-stone-900 border-black/[0.06]": a1 });
function PreferencesComponent_For_33_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1, " \u2713 ");
    \u0275\u0275elementEnd();
  }
}
function PreferencesComponent_For_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function PreferencesComponent_For_33_Template_button_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.planner.toggleInterest(item_r2.label));
    });
    \u0275\u0275template(1, PreferencesComponent_For_33_Conditional_1_Template, 2, 0, "span", 29);
    \u0275\u0275elementStart(2, "span", 30);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 31);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 32);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(5, _c0, ctx_r2.planner.selectedInterests().includes(item_r2.label), !ctx_r2.planner.selectedInterests().includes(item_r2.label)));
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r2.planner.selectedInterests().includes(item_r2.label) ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r2.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r2.description, " ");
  }
}
function PreferencesComponent_For_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function PreferencesComponent_For_42_Template_button_click_0_listener() {
      const opt_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.planner.setTravelStyle(opt_r5.value));
    });
    \u0275\u0275elementStart(1, "span", 34);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 35);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const opt_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(4, _c1, ctx_r2.planner.travelStyle() === opt_r5.value, ctx_r2.planner.travelStyle() !== opt_r5.value));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r5.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r5.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r5.desc);
  }
}
function PreferencesComponent_For_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function PreferencesComponent_For_51_Template_button_click_0_listener() {
      const opt_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.planner.setDailyBudget(opt_r7.value));
    });
    \u0275\u0275elementStart(1, "span", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 35);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const opt_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(6, _c1, ctx_r2.planner.dailyBudget() === opt_r7.value, ctx_r2.planner.dailyBudget() !== opt_r7.value));
    \u0275\u0275advance();
    \u0275\u0275classProp("text-gold", ctx_r2.planner.dailyBudget() === opt_r7.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r7.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r7.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r7.desc);
  }
}
function PreferencesComponent_For_60_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function PreferencesComponent_For_60_Template_button_click_0_listener() {
      const opt_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.planner.setWalkingPreference(opt_r9.value));
    });
    \u0275\u0275elementStart(1, "span", 34);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 35);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const opt_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(4, _c1, ctx_r2.planner.walkingPreference() === opt_r9.value, ctx_r2.planner.walkingPreference() !== opt_r9.value));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r9.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r9.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r9.desc);
  }
}
var PreferencesComponent = class _PreferencesComponent {
  constructor() {
    this.planner = inject(TripPlannerService);
    this.router = inject(Router);
  }
  goToPlanSummary() {
    this.router.navigate(["/planner/summary"]);
  }
  static {
    this.\u0275fac = function PreferencesComponent_Factory(t) {
      return new (t || _PreferencesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PreferencesComponent, selectors: [["app-preferences"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 67, vars: 2, consts: [[1, "min-h-screen", "bg-background", "pb-16"], ["title", "Concierge Planner", 3, "showBack"], [1, "max-w-2xl", "mx-auto", "px-4", "py-8", "space-y-9"], [1, "bg-white", "rounded-3xl", "p-5", "border", "border-black/[0.05]", "shadow-subtle"], [1, "flex", "items-center", "justify-between", "relative"], [1, "flex", "items-center", "gap-3.5", "z-10"], [1, "w-8", "h-8", "rounded-full", "bg-obsidian", "text-white", "flex", "items-center", "justify-center", "font-semibold", "text-xs", "shadow-sm"], [1, "text-[10px]", "font-bold", "text-stone-400", "tracking-wider", "uppercase", "block"], [1, "text-xs", "font-bold", "text-stone-950"], [1, "flex-1", "h-px", "bg-black/[0.06]", "mx-4"], [1, "flex", "items-center", "gap-3.5", "z-10", "opacity-40"], [1, "w-8", "h-8", "rounded-full", "bg-stone-200", "text-stone-500", "flex", "items-center", "justify-center", "font-semibold", "text-xs"], [1, "hidden", "sm:block"], [1, "text-[10px]", "font-semibold", "text-stone-400", "tracking-wider", "uppercase", "block"], [1, "text-xs", "font-semibold", "text-stone-500"], [1, "space-y-3.5"], [1, "flex", "items-center", "justify-between"], [1, "text-base", "font-bold", "text-stone-950", "tracking-tight"], [1, "text-xs", "text-stone-500", "mt-0.5"], [1, "text-[11px]", "font-bold", "px-3", "py-1", "bg-stone-100", "text-stone-700", "rounded-full", "border", "border-black/[0.04]"], [1, "grid", "grid-cols-2", "sm:grid-cols-3", "gap-3"], ["type", "button", 1, "relative", "flex", "flex-col", "items-start", "p-4", "rounded-3xl", "border", "text-left", "transition-all", "duration-200", 3, "ngClass"], [1, "space-y-3"], [1, "grid", "grid-cols-3", "gap-3"], ["type", "button", 1, "flex", "flex-col", "items-center", "justify-center", "p-4", "rounded-3xl", "border", "text-center", "transition-all", 3, "ngClass"], [1, "pt-4"], ["type", "button", 1, "w-full", "py-4", "px-6", "rounded-2xl", "bg-obsidian", "text-white", "font-bold", "text-sm", "hover:bg-stone-900", "transition-all", "duration-200", "shadow-luxe", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "text-gold"], ["type", "button", 1, "relative", "flex", "flex-col", "items-start", "p-4", "rounded-3xl", "border", "text-left", "transition-all", "duration-200", 3, "click", "ngClass"], [1, "absolute", "top-3.5", "right-3.5", "w-4", "h-4", "rounded-full", "bg-gold", "text-stone-950", "flex", "items-center", "justify-center", "text-[10px]", "font-bold"], [1, "text-xl", "mb-2"], [1, "font-bold", "text-xs"], [1, "text-[10px]", "mt-1", "leading-tight", "opacity-75"], ["type", "button", 1, "flex", "flex-col", "items-center", "justify-center", "p-4", "rounded-3xl", "border", "text-center", "transition-all", 3, "click", "ngClass"], [1, "text-xl", "mb-1"], [1, "text-[10px]", "mt-0.5", "opacity-70"], [1, "text-base", "font-bold", "mb-0.5"]], template: function PreferencesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "app-header", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6);
        \u0275\u0275text(7, " 1 ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div")(9, "span", 7);
        \u0275\u0275text(10, "Ad\u0131m 1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "h3", 8);
        \u0275\u0275text(12, "Tercihlerinizi Belirleyin");
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(13, "div", 9);
        \u0275\u0275elementStart(14, "div", 10)(15, "div", 11);
        \u0275\u0275text(16, " 2 ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "div", 12)(18, "span", 13);
        \u0275\u0275text(19, "Ad\u0131m 2");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "h3", 14);
        \u0275\u0275text(21, "Plan \xD6zeti");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(22, "section", 15)(23, "div", 16)(24, "div")(25, "h2", 17);
        \u0275\u0275text(26, "\u0130lgi Alanlar\u0131");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "p", 18);
        \u0275\u0275text(28, "Rotan\u0131za eklenmesini istedi\u011Finiz deneyim alanlar\u0131");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "span", 19);
        \u0275\u0275text(30);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(31, "div", 20);
        \u0275\u0275repeaterCreate(32, PreferencesComponent_For_33_Template, 8, 8, "button", 21, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(34, "section", 22)(35, "div")(36, "h2", 17);
        \u0275\u0275text(37, "Seyahat Temposu");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "p", 18);
        \u0275\u0275text(39, "G\xFCnl\xFCk gezi yo\u011Funlu\u011Fu tercihi");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(40, "div", 23);
        \u0275\u0275repeaterCreate(41, PreferencesComponent_For_42_Template, 7, 7, "button", 24, _forTrack1);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(43, "section", 22)(44, "div")(45, "h2", 17);
        \u0275\u0275text(46, "B\xFCt\xE7e Seviyesi");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "p", 18);
        \u0275\u0275text(48, "Gastronomi ve konaklama harcama \xF6l\xE7e\u011Fi");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(49, "div", 23);
        \u0275\u0275repeaterCreate(50, PreferencesComponent_For_51_Template, 7, 9, "button", 24, _forTrack1);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "section", 22)(53, "div")(54, "h2", 17);
        \u0275\u0275text(55, "Y\xFCr\xFCme Mesafesi");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "p", 18);
        \u0275\u0275text(57, "\u015Eehir i\xE7i ula\u015F\u0131m ve y\xFCr\xFCy\xFC\u015F dengesi");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(58, "div", 23);
        \u0275\u0275repeaterCreate(59, PreferencesComponent_For_60_Template, 7, 7, "button", 24, _forTrack1);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(61, "div", 25)(62, "button", 26);
        \u0275\u0275listener("click", function PreferencesComponent_Template_button_click_62_listener() {
          return ctx.goToPlanSummary();
        });
        \u0275\u0275elementStart(63, "span");
        \u0275\u0275text(64, "Plan\u0131m\u0131 Olu\u015Ftur");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(65, "span", 27);
        \u0275\u0275text(66, "\u2726");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("showBack", true);
        \u0275\u0275advance(29);
        \u0275\u0275textInterpolate1(" ", ctx.planner.selectedInterests().length, " Se\xE7ildi ");
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.planner.availableInterests);
        \u0275\u0275advance(9);
        \u0275\u0275repeater(ctx.planner.travelStyleOptions);
        \u0275\u0275advance(9);
        \u0275\u0275repeater(ctx.planner.budgetOptions);
        \u0275\u0275advance(9);
        \u0275\u0275repeater(ctx.planner.walkingOptions);
      }
    }, dependencies: [CommonModule, NgClass, LucideAngularModule, HeaderComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PreferencesComponent, { className: "PreferencesComponent", filePath: "src\\app\\features\\planner\\preferences.component.ts", lineNumber: 179 });
})();
export {
  PreferencesComponent
};
//# sourceMappingURL=chunk-66IXQFHM.js.map
