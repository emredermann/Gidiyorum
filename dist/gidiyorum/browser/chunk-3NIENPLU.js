import {
  ArrowLeft,
  Bell,
  LucideAngularComponent,
  LucideAngularModule,
  Search
} from "./chunk-RPAFIYH2.js";
import {
  Location,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-C5IKH3YG.js";

// src/app/shared/components/header/header.component.ts
function HeaderComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275element(1, "lucide-icon", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.ArrowLeftIcon)("size", 18);
  }
}
function HeaderComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 4);
    \u0275\u0275element(1, "lucide-icon", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.SearchIcon)("size", 18);
  }
}
function HeaderComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 4);
    \u0275\u0275element(1, "lucide-icon", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.BellIcon)("size", 18);
  }
}
var HeaderComponent = class _HeaderComponent {
  constructor() {
    this.title = "Gidiyorum";
    this.showBack = false;
    this.showSearch = false;
    this.showNotifications = false;
    this.location = inject(Location);
    this.ArrowLeftIcon = ArrowLeft;
    this.SearchIcon = Search;
    this.BellIcon = Bell;
  }
  goBack() {
    this.location.back();
  }
  static {
    this.\u0275fac = function HeaderComponent_Factory(t) {
      return new (t || _HeaderComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], inputs: { title: "title", showBack: "showBack", showSearch: "showSearch", showNotifications: "showNotifications" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 7, vars: 4, consts: [[1, "sticky", "top-0", "z-40", "bg-[#F9F8F6]/85", "backdrop-blur-md", "border-b", "border-black/[0.05]"], [1, "flex", "items-center", "gap-3", "px-4", "h-14", "max-w-2xl", "mx-auto"], ["title", "Geri", 1, "w-9", "h-9", "flex", "items-center", "justify-center", "rounded-2xl", "hover:bg-stone-200/60", "text-stone-800", "transition-colors"], [1, "flex-1", "font-semibold", "text-stone-950", "text-base", "tracking-tight"], [1, "w-9", "h-9", "flex", "items-center", "justify-center", "rounded-2xl", "hover:bg-stone-200/60", "text-stone-700", "transition-colors"], ["title", "Geri", 1, "w-9", "h-9", "flex", "items-center", "justify-center", "rounded-2xl", "hover:bg-stone-200/60", "text-stone-800", "transition-colors", 3, "click"], ["strokeWidth", "1.5", 3, "img", "size"]], template: function HeaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "header", 0)(1, "div", 1);
        \u0275\u0275template(2, HeaderComponent_Conditional_2_Template, 2, 2, "button", 2);
        \u0275\u0275elementStart(3, "h1", 3);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, HeaderComponent_Conditional_5_Template, 2, 2, "button", 4)(6, HeaderComponent_Conditional_6_Template, 2, 2, "button", 4);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275conditional(2, ctx.showBack ? 2 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.title);
        \u0275\u0275advance();
        \u0275\u0275conditional(5, ctx.showSearch ? 5 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(6, ctx.showNotifications ? 6 : -1);
      }
    }, dependencies: [LucideAngularModule, LucideAngularComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src\\app\\shared\\components\\header\\header.component.ts", lineNumber: 36 });
})();

export {
  HeaderComponent
};
//# sourceMappingURL=chunk-3NIENPLU.js.map
