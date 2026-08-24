import {
  UiCardComponent
} from "./chunk-GDWRDWRE.js";
import "./chunk-3NIENPLU.js";
import {
  Calendar,
  Clock,
  CreditCard,
  Heart,
  LucideAngularComponent,
  LucideAngularModule,
  MapPin,
  Navigation,
  Share2,
  Star
} from "./chunk-RPAFIYH2.js";
import {
  SupabaseService
} from "./chunk-3WGHE6CE.js";
import {
  ActivatedRoute,
  CommonModule,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵtextInterpolate1
} from "./chunk-C5IKH3YG.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-POPFE7MN.js";

// src/app/features/places/place-detail.component.ts
function PlaceDetailComponent_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tag_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" # ", tag_r1, " ");
  }
}
var PlaceDetailComponent = class _PlaceDetailComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.supabase = inject(SupabaseService);
    this.isFavorited = signal(false);
    this.MapPinIcon = MapPin;
    this.ClockIcon = Clock;
    this.StarIcon = Star;
    this.HeartIcon = Heart;
    this.Share2Icon = Share2;
    this.CalendarIcon = Calendar;
    this.CreditCardIcon = CreditCard;
    this.NavigationIcon = Navigation;
    this.placeData = signal({
      name: "Da Enzo al 29",
      subtitle: "Restoran \u2022 Trastevere, Roma \u2022 \u20AC\u20AC",
      rating: "4.7",
      reviewCount: "1,820",
      tags: ["\u0130talyan", "Taze Makarna", "Yerel", "Otantik"],
      description: "Trastevere\u2019in tarihi ve samimi sokaklar\u0131nda geleneksel Roma mutfa\u011F\u0131n\u0131n en se\xE7kin lezzetlerini sunan otantik bir trattoria. G\xFCnl\xFCk taze yap\u0131lan Cacio e Pepe, Carbonara ve Enginar k\u0131zartmas\u0131 (Carciofi alla Giudia) ile me\u015Fhurdur.",
      openingHours: "12:30 - 15:00 / 19:30 - 23:00",
      averagePrice: "\u20AC\u20AC (20 - 30 \u20AC)",
      reservation: "\xD6nerilir (Ak\u015Fam s\u0131ras\u0131 beklememek i\xE7in)",
      distance: "1.2 km (Mevcut konumunuzdan)",
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000",
      lat: 41.8894,
      lng: 12.4705
    });
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id && id !== "place-roscioli-120") {
      this.loadPlaceFromSupabase(id);
    }
  }
  loadPlaceFromSupabase(id) {
    return __async(this, null, function* () {
      const { data } = yield this.supabase.from("itinerary_items").select("*").eq("id", id).single();
      if (data) {
        const item = data;
        this.placeData.update((current) => __spreadProps(__spreadValues({}, current), {
          name: item.place_name,
          subtitle: `${item.category || "Mekan"} \u2022 Roma \u2022 \u20AC\u20AC`,
          description: item.description || current.description,
          imageUrl: item.image_url || current.imageUrl,
          lat: item.latitude || current.lat,
          lng: item.longitude || current.lng
        }));
      }
    });
  }
  goBack() {
    window.history.back();
  }
  toggleFavorite() {
    this.isFavorited.update((v) => !v);
  }
  sharePlace() {
    if (navigator.share) {
      navigator.share({
        title: this.placeData().name,
        text: `${this.placeData().name} - Gidiyorum Rehberi`,
        url: window.location.href
      });
    } else {
      alert("Mekan ba\u011Flant\u0131s\u0131 panoya kopyaland\u0131! \u{1F4CB}");
    }
  }
  openDirections() {
    const p = this.placeData();
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`, "_blank");
  }
  makeReservation() {
    alert(`${this.placeData().name} i\xE7in masa rezervasyon talebiniz al\u0131nd\u0131! \u{1F377}`);
  }
  static {
    this.\u0275fac = function PlaceDetailComponent_Factory(t) {
      return new (t || _PlaceDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlaceDetailComponent, selectors: [["app-place-detail"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 80, vars: 31, consts: [[1, "min-h-screen", "bg-background", "pb-24"], [1, "relative", "h-72", "sm:h-80", "w-full", "overflow-hidden", "bg-stone-900"], [1, "w-full", "h-full", "object-cover", "opacity-90", 3, "src", "alt"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-black/85", "via-black/30", "to-transparent"], [1, "absolute", "top-4", "left-4", "right-4", "flex", "justify-between", "items-center", "z-10"], ["type", "button", 1, "w-9", "h-9", "bg-white/90", "backdrop-blur-md", "rounded-2xl", "flex", "items-center", "justify-center", "shadow-sm", "font-bold", "text-stone-900", "hover:bg-white", "transition-all", "text-xs", 3, "click"], [1, "flex", "items-center", "gap-2"], ["type", "button", 1, "w-9", "h-9", "bg-white/90", "backdrop-blur-md", "rounded-2xl", "flex", "items-center", "justify-center", "shadow-sm", "transition-colors", 3, "click"], ["strokeWidth", "1.5", 3, "img", "size"], ["type", "button", 1, "w-9", "h-9", "bg-white/90", "backdrop-blur-md", "rounded-2xl", "flex", "items-center", "justify-center", "shadow-sm", "text-stone-700", "hover:bg-white", "transition-all", 3, "click"], [1, "absolute", "bottom-6", "left-6", "right-6", "text-white"], [1, "flex", "items-center", "gap-2", "mb-2"], [1, "px-2.5", "py-0.5", "bg-gold", "text-stone-950", "text-[10px]", "font-bold", "rounded-full", "flex", "items-center", "gap-1", "shadow-sm", "uppercase", "tracking-wider"], [1, "text-stone-950", 3, "img", "size"], [1, "text-xs", "text-white/80", "font-medium"], [1, "text-2xl", "sm:text-3xl", "font-serif-luxe", "font-normal", "tracking-tight"], [1, "text-xs", "sm:text-sm", "text-white/90", "mt-1", "font-medium"], [1, "max-w-2xl", "mx-auto", "px-4", "py-8", "space-y-6"], [1, "flex", "flex-wrap", "gap-2"], [1, "px-3", "py-1", "bg-white", "text-stone-800", "text-xs", "font-semibold", "rounded-full", "border", "border-black/[0.06]", "shadow-subtle"], [1, "space-y-2"], [1, "font-bold", "text-stone-950", "text-xs", "tracking-wider", "uppercase"], [1, "text-xs", "sm:text-sm", "text-stone-600", "leading-relaxed"], [1, "space-y-3"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-3"], [1, "bg-white", "p-3.5", "rounded-3xl", "border", "border-black/[0.05]", "shadow-subtle", "flex", "items-center", "gap-3"], [1, "w-9", "h-9", "rounded-2xl", "bg-stone-100", "text-stone-900", "flex", "items-center", "justify-center", "flex-shrink-0"], [1, "text-[10px]", "text-stone-400", "font-medium", "block"], [1, "text-xs", "font-bold", "text-stone-950"], [1, "fixed", "bottom-0", "left-0", "right-0", "z-40", "bg-[#F9F8F6]/95", "backdrop-blur-md", "border-t", "border-black/[0.06]", "px-4", "py-3", "shadow-lg", 2, "padding-bottom", "max(12px, env(safe-area-inset-bottom))"], [1, "max-w-2xl", "mx-auto", "grid", "grid-cols-2", "gap-3"], ["type", "button", 1, "py-3.5", "px-4", "rounded-2xl", "border", "border-stone-300", "text-stone-900", "font-bold", "text-xs", "hover:bg-stone-100", "transition-all", "flex", "items-center", "justify-center", "gap-2", 3, "click"], ["type", "button", 1, "py-3.5", "px-4", "rounded-2xl", "bg-obsidian", "text-white", "font-bold", "text-xs", "hover:bg-stone-900", "transition-all", "shadow-luxe", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "text-gold"]], template: function PlaceDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275element(2, "img", 2)(3, "div", 3);
        \u0275\u0275elementStart(4, "div", 4)(5, "button", 5);
        \u0275\u0275listener("click", function PlaceDetailComponent_Template_button_click_5_listener() {
          return ctx.goBack();
        });
        \u0275\u0275text(6, " \u2190 ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 6)(8, "button", 7);
        \u0275\u0275listener("click", function PlaceDetailComponent_Template_button_click_8_listener() {
          return ctx.toggleFavorite();
        });
        \u0275\u0275element(9, "lucide-icon", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "button", 9);
        \u0275\u0275listener("click", function PlaceDetailComponent_Template_button_click_10_listener() {
          return ctx.sharePlace();
        });
        \u0275\u0275element(11, "lucide-icon", 8);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 10)(13, "div", 11)(14, "span", 12);
        \u0275\u0275element(15, "lucide-icon", 13);
        \u0275\u0275text(16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "span", 14);
        \u0275\u0275text(18);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "h1", 15);
        \u0275\u0275text(20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "p", 16);
        \u0275\u0275text(22);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(23, "div", 17)(24, "section", 18);
        \u0275\u0275repeaterCreate(25, PlaceDetailComponent_For_26_Template, 2, 1, "span", 19, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "app-ui-card")(28, "div", 20)(29, "h2", 21);
        \u0275\u0275text(30, "Hakk\u0131nda");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "p", 22);
        \u0275\u0275text(32);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(33, "section", 23)(34, "h2", 21);
        \u0275\u0275text(35, "Mekan Bilgileri");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "div", 24)(37, "div", 25)(38, "div", 26);
        \u0275\u0275element(39, "lucide-icon", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "div")(41, "span", 27);
        \u0275\u0275text(42, "\xC7al\u0131\u015Fma Saatleri");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "span", 28);
        \u0275\u0275text(44);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(45, "div", 25)(46, "div", 26);
        \u0275\u0275element(47, "lucide-icon", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "div")(49, "span", 27);
        \u0275\u0275text(50, "Ortalama Fiyat");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "span", 28);
        \u0275\u0275text(52);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(53, "div", 25)(54, "div", 26);
        \u0275\u0275element(55, "lucide-icon", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "div")(57, "span", 27);
        \u0275\u0275text(58, "Rezervasyon");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "span", 28);
        \u0275\u0275text(60);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(61, "div", 25)(62, "div", 26);
        \u0275\u0275element(63, "lucide-icon", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "div")(65, "span", 27);
        \u0275\u0275text(66, "Mesafe");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "span", 28);
        \u0275\u0275text(68);
        \u0275\u0275elementEnd()()()()()();
        \u0275\u0275elementStart(69, "div", 29)(70, "div", 30)(71, "button", 31);
        \u0275\u0275listener("click", function PlaceDetailComponent_Template_button_click_71_listener() {
          return ctx.openDirections();
        });
        \u0275\u0275element(72, "lucide-icon", 8);
        \u0275\u0275elementStart(73, "span");
        \u0275\u0275text(74, "Yol Tarifi");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(75, "button", 32);
        \u0275\u0275listener("click", function PlaceDetailComponent_Template_button_click_75_listener() {
          return ctx.makeReservation();
        });
        \u0275\u0275elementStart(76, "span");
        \u0275\u0275text(77, "Rezervasyon Yap");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(78, "span", 33);
        \u0275\u0275text(79, "\u{1F377}");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275property("src", ctx.placeData().imageUrl, \u0275\u0275sanitizeUrl)("alt", ctx.placeData().name);
        \u0275\u0275advance(6);
        \u0275\u0275classProp("text-red-500", ctx.isFavorited())("text-stone-700", !ctx.isFavorited());
        \u0275\u0275advance();
        \u0275\u0275property("img", ctx.HeartIcon)("size", 16);
        \u0275\u0275advance(2);
        \u0275\u0275property("img", ctx.Share2Icon)("size", 16);
        \u0275\u0275advance(4);
        \u0275\u0275property("img", ctx.StarIcon)("size", 11);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.placeData().rating, " \u2605 ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("(", ctx.placeData().reviewCount, " De\u011Ferlendirme)");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.placeData().name, " ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.placeData().subtitle, " ");
        \u0275\u0275advance(3);
        \u0275\u0275repeater(ctx.placeData().tags);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1(" ", ctx.placeData().description, " ");
        \u0275\u0275advance(7);
        \u0275\u0275property("img", ctx.ClockIcon)("size", 16);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.placeData().openingHours);
        \u0275\u0275advance(3);
        \u0275\u0275property("img", ctx.CreditCardIcon)("size", 16);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.placeData().averagePrice);
        \u0275\u0275advance(3);
        \u0275\u0275property("img", ctx.CalendarIcon)("size", 16);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.placeData().reservation);
        \u0275\u0275advance(3);
        \u0275\u0275property("img", ctx.MapPinIcon)("size", 16);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.placeData().distance);
        \u0275\u0275advance(4);
        \u0275\u0275property("img", ctx.NavigationIcon)("size", 14);
      }
    }, dependencies: [CommonModule, LucideAngularModule, LucideAngularComponent, UiCardComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlaceDetailComponent, { className: "PlaceDetailComponent", filePath: "src\\app\\features\\places\\place-detail.component.ts", lineNumber: 193 });
})();
export {
  PlaceDetailComponent
};
//# sourceMappingURL=chunk-FI3BWQF5.js.map
