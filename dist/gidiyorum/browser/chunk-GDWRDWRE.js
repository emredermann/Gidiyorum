import {
  CommonModule,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-C5IKH3YG.js";

// src/app/shared/components/ui-card/ui-card.component.ts
var _c0 = ["*"];
var UiCardComponent = class _UiCardComponent {
  constructor() {
    this.elevated = true;
    this.hoverable = false;
    this.padding = "normal";
  }
  static {
    this.\u0275fac = function UiCardComponent_Factory(t) {
      return new (t || _UiCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UiCardComponent, selectors: [["app-ui-card"]], inputs: { elevated: "elevated", hoverable: "hoverable", padding: "padding" }, standalone: true, features: [\u0275\u0275StandaloneFeature], ngContentSelectors: _c0, decls: 2, vars: 12, consts: [[1, "bg-white", "rounded-3xl", "border", "border-black/[0.05]", "transition-all", "duration-300"]], template: function UiCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275projection(1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classProp("shadow-subtle", ctx.elevated)("shadow-luxe", ctx.hoverable)("hover:-translate-y-0", ctx.hoverable)("p-4", ctx.padding === "normal")("p-6", ctx.padding === "large")("p-0", ctx.padding === "none");
      }
    }, dependencies: [CommonModule], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UiCardComponent, { className: "UiCardComponent", filePath: "src\\app\\shared\\components\\ui-card\\ui-card.component.ts", lineNumber: 22 });
})();

export {
  UiCardComponent
};
//# sourceMappingURL=chunk-GDWRDWRE.js.map
