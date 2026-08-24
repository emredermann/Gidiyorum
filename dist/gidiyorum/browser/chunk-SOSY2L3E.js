import {
  LucideAngularComponent,
  LucideAngularModule
} from "./chunk-RPAFIYH2.js";
import {
  CommonModule,
  EventEmitter,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-C5IKH3YG.js";

// src/app/shared/components/ui-button/ui-button.component.ts
var _c0 = ["*"];
function UiButtonComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 1);
    \u0275\u0275element(1, "circle", 3)(2, "path", 4);
    \u0275\u0275elementEnd();
  }
}
function UiButtonComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("img", ctx_r0.icon)("size", ctx_r0.iconSize);
  }
}
function UiButtonComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.label);
  }
}
var UiButtonComponent = class _UiButtonComponent {
  constructor() {
    this.label = "";
    this.variant = "primary";
    this.size = "md";
    this.type = "button";
    this.disabled = false;
    this.loading = false;
    this.fullWidth = false;
    this.icon = null;
    this.clicked = new EventEmitter();
  }
  get iconSize() {
    return this.size === "sm" ? 14 : this.size === "lg" ? 18 : 16;
  }
  get buttonClasses() {
    const base = "inline-flex items-center justify-center gap-2 font-medium tracking-tight rounded-2xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-obsidian/20";
    const variants = {
      primary: "bg-obsidian text-white hover:bg-stone-900 shadow-sm active:scale-[0.99]",
      secondary: "bg-stone-100 text-stone-900 border border-stone-200/60 hover:bg-stone-200/70",
      ghost: "bg-transparent text-stone-600 hover:bg-stone-100/80 hover:text-stone-900",
      danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100/80",
      gold: "bg-gold text-stone-950 font-semibold hover:bg-gold-light shadow-sm"
    };
    const sizes = {
      sm: "px-3.5 py-1.5 text-xs",
      md: "px-4 py-2.5 text-xs sm:text-sm",
      lg: "px-6 py-3.5 text-sm sm:text-base font-semibold"
    };
    return [base, variants[this.variant], sizes[this.size], this.fullWidth ? "w-full" : ""].join(" ");
  }
  static {
    this.\u0275fac = function UiButtonComponent_Factory(t) {
      return new (t || _UiButtonComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UiButtonComponent, selectors: [["app-ui-button"]], inputs: { label: "label", variant: "variant", size: "size", type: "type", disabled: "disabled", loading: "loading", fullWidth: "fullWidth", icon: "icon" }, outputs: { clicked: "clicked" }, standalone: true, features: [\u0275\u0275StandaloneFeature], ngContentSelectors: _c0, decls: 5, vars: 7, consts: [[3, "click", "type", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-4", "w-4"], ["strokeWidth", "1.5", 3, "img", "size"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "3", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z", 1, "opacity-75"]], template: function UiButtonComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "button", 0);
        \u0275\u0275listener("click", function UiButtonComponent_Template_button_click_0_listener($event) {
          return ctx.clicked.emit($event);
        });
        \u0275\u0275template(1, UiButtonComponent_Conditional_1_Template, 3, 0, ":svg:svg", 1)(2, UiButtonComponent_Conditional_2_Template, 1, 2, "lucide-icon", 2)(3, UiButtonComponent_Conditional_3_Template, 2, 1, "span");
        \u0275\u0275projection(4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classMap(ctx.buttonClasses);
        \u0275\u0275property("type", ctx.type)("disabled", ctx.disabled || ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275conditional(1, ctx.loading ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(2, ctx.icon && !ctx.loading ? 2 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(3, ctx.label ? 3 : -1);
      }
    }, dependencies: [CommonModule, LucideAngularModule, LucideAngularComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UiButtonComponent, { className: "UiButtonComponent", filePath: "src\\app\\shared\\components\\ui-button\\ui-button.component.ts", lineNumber: 35 });
})();

export {
  UiButtonComponent
};
//# sourceMappingURL=chunk-SOSY2L3E.js.map
