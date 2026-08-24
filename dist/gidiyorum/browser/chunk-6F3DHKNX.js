import "./chunk-GDWRDWRE.js";
import {
  TripPlannerService
} from "./chunk-IC2QVEZH.js";
import {
  HeaderComponent
} from "./chunk-3NIENPLU.js";
import {
  Clock,
  LucideAngularComponent,
  LucideAngularModule,
  Navigation
} from "./chunk-RPAFIYH2.js";
import {
  CommonModule,
  NgClass,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  signal,
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
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-C5IKH3YG.js";
import {
  __async
} from "./chunk-POPFE7MN.js";

// src/app/features/itinerary/daily-route.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = (a0, a1) => ({ "bg-obsidian text-white border-obsidian shadow-sm": a0, "bg-white text-stone-600 border-black/[0.06]": a1 });
var _c1 = (a0, a1) => ({ "bg-gold": a0, "bg-obsidian": a1 });
function DailyRouteComponent_For_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 21);
  }
  if (rf & 2) {
    const day_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(1, _c1, ctx_r2.selectedDay().id === day_r2.id, ctx_r2.selectedDay().id !== day_r2.id));
  }
}
function DailyRouteComponent_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 20);
    \u0275\u0275listener("click", function DailyRouteComponent_For_5_Template_button_click_0_listener() {
      const day_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectDay(day_r2));
    });
    \u0275\u0275template(1, DailyRouteComponent_For_5_Conditional_1_Template, 1, 4, "span", 21);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 22);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const day_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(4, _c0, ctx_r2.selectedDay().id === day_r2.id, ctx_r2.selectedDay().id !== day_r2.id));
    \u0275\u0275advance();
    \u0275\u0275conditional(1, day_r2.isToday ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(day_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", day_r2.dateStr, ")");
  }
}
function DailyRouteComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 23)(2, "span", 24);
    \u0275\u0275text(3, "\u{1F5FA}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 25);
    \u0275\u0275text(5, "Harita Y\xFCkleniyor...");
    \u0275\u0275elementEnd()()();
  }
}
function DailyRouteComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 27)(4, "div", 28)(5, "div", 29)(6, "div", 30)(7, "span", 31);
    \u0275\u0275element(8, "lucide-icon", 32);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 33);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "h3", 34);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 35);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 36)(17, "span", 37);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 37);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 38);
    \u0275\u0275element(24, "img", 39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 40)(26, "button", 41);
    \u0275\u0275listener("click", function DailyRouteComponent_For_28_Template_button_click_26_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openGoogleMaps(item_r5));
    });
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28, "Yol tarifi al");
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "lucide-icon", 32);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const i_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", i_r6 + 1, " ");
    \u0275\u0275advance(6);
    \u0275\u0275property("img", ctx_r2.ClockIcon)("size", 12);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r5.time, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r5.category, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r5.title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r5.description, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u23F1\uFE0F ", item_r5.duration, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r5.walkingInfo);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", item_r5.imageUrl, \u0275\u0275sanitizeUrl)("alt", item_r5.title);
    \u0275\u0275advance(5);
    \u0275\u0275property("img", ctx_r2.NavigationIcon)("size", 12);
  }
}
var DailyRouteComponent = class _DailyRouteComponent {
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.planner = inject(TripPlannerService);
    this.mapLoaded = signal(false);
    this.mapInstance = null;
    this.ClockIcon = Clock;
    this.NavigationIcon = Navigation;
    this.dayOptions = [
      { id: "day-1", label: "20 Haz Bug\xFCn", dateStr: "G\xFCn 1", isToday: true },
      { id: "day-2", label: "21 Haz Yar\u0131n", dateStr: "G\xFCn 2" },
      { id: "day-3", label: "22 Haz Paz", dateStr: "G\xFCn 3" },
      { id: "day-4", label: "23 Haz Pzt", dateStr: "G\xFCn 4" },
      { id: "day-5", label: "24 Haz Sal", dateStr: "G\xFCn 5" }
    ];
    this.selectedDay = signal(this.dayOptions[0]);
    this.schedulesByDay = {
      "day-1": [
        {
          id: "sch-101",
          time: "09:00",
          title: "Giolitti - Geleneksel \u0130talyan Kahvalt\u0131s\u0131",
          category: "\u2615 Kafe & Tatl\u0131",
          duration: "45 dk",
          walkingInfo: "Ba\u015Flang\u0131\xE7 noktas\u0131",
          description: "1900 y\u0131l\u0131ndan beri hizmet veren tarihi mekanda taze kruvasan, espresso ve me\u015Fhur Roma dondurmas\u0131.",
          imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300",
          lat: 41.9011,
          lng: 12.4772
        },
        {
          id: "sch-102",
          time: "10:30",
          title: "Piazza Navona Meydan\u0131 & D\xF6rt Nehir \xC7e\u015Fmesi",
          category: "\u{1F3DB}\uFE0F Meydan & An\u0131t",
          duration: "1 saat",
          walkingInfo: "\u{1F6B6} 400m (5 dk y\xFCr\xFCy\xFC\u015F)",
          description: "Bernini eserleri, sokak sanat\xE7\u0131lar\u0131 ve Barok mimari atmosferiyle b\xFCy\xFCleyici meydan.",
          imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300",
          lat: 41.8992,
          lng: 12.4731
        },
        {
          id: "sch-103",
          time: "12:00",
          title: "Pantheon Tap\u0131na\u011F\u0131",
          category: "\u{1F3DB}\uFE0F Antik Eser",
          duration: "1.5 saat",
          walkingInfo: "\u{1F6B6} 350m (4 dk y\xFCr\xFCy\xFC\u015F)",
          description: "Antik Roma\u2019dan g\xFCn\xFCm\xFCze en iyi korunmu\u015F kubbeli tap\u0131nak yap\u0131s\u0131 ve Raphael\u2019in mezar\u0131.",
          imageUrl: "https://images.unsplash.com/photo-1548625361-1845110f0e04?w=300",
          lat: 41.8986,
          lng: 12.4769
        },
        {
          id: "sch-104",
          time: "14:30",
          title: "Trevi A\u015Fk \xC7e\u015Fmesi",
          category: "\u26F2 An\u0131t & Manzara",
          duration: "45 dk",
          walkingInfo: "\u{1F6B6} 650m (8 dk y\xFCr\xFCy\xFC\u015F)",
          description: "Dilek paras\u0131 atmak i\xE7in d\xFCnyaca \xFCnl\xFC \xE7e\u015Fme. Barok heykel sanat\u0131n\u0131n zirvesi.",
          imageUrl: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=300",
          lat: 41.9009,
          lng: 12.4833
        },
        {
          id: "sch-105",
          time: "19:00",
          title: "Trastevere - Osteria Da Enzo",
          category: "\u{1F35D} Ak\u015Fam Yeme\u011Fi",
          duration: "2 saat",
          walkingInfo: "\u{1F6B6} 1.2 km veya otob\xFCs",
          description: "Tarihi Trastevere sokaklar\u0131nda geleneksel Carbonara ve Cacio e Pepe makarna ziyafeti.",
          imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300",
          lat: 41.8894,
          lng: 12.4705
        }
      ],
      "day-2": [
        {
          id: "sch-201",
          time: "09:00",
          title: "Kolezyum (Colosseum) Antik Amfitiyatro",
          category: "\u{1F3DB}\uFE0F D\xFCnya Miras\u0131",
          duration: "2.5 saat",
          walkingInfo: "Ba\u015Flang\u0131\xE7",
          description: "Gladyat\xF6r d\xF6v\xFC\u015Flerine ev sahipli\u011Fi yapm\u0131\u015F d\xFCnyan\u0131n en b\xFCy\xFCk amfitiyatrosu.",
          imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300",
          lat: 41.8902,
          lng: 12.4922
        },
        {
          id: "sch-202",
          time: "12:00",
          title: "Roman Forumu ve Palatino Tepesi",
          category: "\u{1F3DB}\uFE0F Antik Kent",
          duration: "2 saat",
          walkingInfo: "\u{1F6B6} 200m (3 dk)",
          description: "Antik Roma imparatorlu\u011Funun siyasi, hukuki ve dini merkezi kal\u0131nt\u0131lar\u0131.",
          imageUrl: "https://images.unsplash.com/photo-1548625361-1845110f0e04?w=300",
          lat: 41.8925,
          lng: 12.4853
        }
      ]
    };
    this.currentSchedule = signal(this.schedulesByDay["day-1"]);
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    return __async(this, null, function* () {
      if (isPlatformBrowser(this.platformId)) {
        yield this.renderMap();
      }
    });
  }
  ngOnDestroy() {
    if (this.mapInstance) {
      try {
        this.mapInstance.remove();
      } catch {
      }
    }
  }
  selectDay(day) {
    this.selectedDay.set(day);
    const schedule = this.schedulesByDay[day.id] || this.schedulesByDay["day-1"];
    this.currentSchedule.set(schedule);
    if (isPlatformBrowser(this.platformId)) {
      this.renderMap();
    }
  }
  openGoogleMaps(item) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`, "_blank");
  }
  renderMap() {
    return __async(this, null, function* () {
      try {
        const L = yield import("./chunk-7VSGRNJJ.js");
        const container = document.getElementById("daily-route-map");
        if (!container)
          return;
        if (this.mapInstance) {
          this.mapInstance.remove();
          this.mapInstance = null;
        }
        L.Icon.Default.prototype._getIconUrl = void 0;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
        });
        const schedule = this.currentSchedule();
        const firstLoc = schedule[0] || { lat: 41.9011, lng: 12.4772 };
        const map = L.map(container, {
          zoomControl: true,
          scrollWheelZoom: false
        }).setView([firstLoc.lat, firstLoc.lng], 14);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "\xA9 OpenStreetMap",
          maxZoom: 19
        }).addTo(map);
        const bounds = [];
        const latLngs = [];
        schedule.forEach((item, index) => {
          const coords = [item.lat, item.lng];
          bounds.push(coords);
          latLngs.push(coords);
          const customMarkerHtml = `
          <div style="background-color:#0F1012;color:white;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:11px;border:2px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.2)">
            ${index + 1}
          </div>
        `;
          const customIcon = L.divIcon({
            html: customMarkerHtml,
            className: "custom-leaflet-marker",
            iconSize: [26, 26],
            iconAnchor: [13, 13]
          });
          L.marker(coords, { icon: customIcon }).bindPopup(`<div style="font-family:sans-serif;padding:2px">
              <span style="font-size:10px;color:#C5A880;font-weight:bold">${item.time}</span>
              <br><b>${item.title}</b>
              <br><small style="color:#666">${item.category}</small>
            </div>`).addTo(map);
        });
        if (latLngs.length > 1) {
          L.polyline(latLngs, {
            color: "#0F1012",
            weight: 2.5,
            opacity: 0.7,
            dashArray: "6, 6"
          }).addTo(map);
        }
        if (bounds.length > 0) {
          map.fitBounds(bounds, { padding: [35, 35] });
        }
        this.mapInstance = map;
        this.mapLoaded.set(true);
      } catch (e) {
        console.error("Daily route Leaflet render error:", e);
      }
    });
  }
  static {
    this.\u0275fac = function DailyRouteComponent_Factory(t) {
      return new (t || _DailyRouteComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DailyRouteComponent, selectors: [["app-daily-route"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 29, vars: 4, consts: [[1, "min-h-screen", "bg-background", "pb-20"], ["title", "Bug\xFCnk\xFC Rotam \u{1F4CD}", 3, "showNotifications"], [1, "bg-[#F9F8F6]/90", "backdrop-blur-md", "border-b", "border-black/[0.05]", "sticky", "top-14", "z-30"], [1, "flex", "items-center", "gap-2", "px-4", "py-3", "overflow-x-auto", "hide-scrollbar", "max-w-2xl", "mx-auto"], ["type", "button", 1, "flex-shrink-0", "px-4", "py-2", "rounded-full", "border", "text-xs", "font-bold", "transition-all", "duration-200", "flex", "items-center", "gap-1.5", 3, "ngClass"], [1, "relative", "w-full", "h-64", "sm:h-80", "bg-stone-100", "border-b", "border-black/[0.05]", "overflow-hidden"], ["id", "daily-route-map", 1, "w-full", "h-full"], [1, "absolute", "inset-0", "bg-[#F2F0EB]", "flex", "items-center", "justify-center", "pointer-events-none"], [1, "absolute", "top-4", "left-4", "z-10", "bg-white/90", "backdrop-blur-md", "px-3.5", "py-1.5", "rounded-full", "border", "border-black/[0.05]", "shadow-subtle", "flex", "items-center", "gap-2"], [1, "text-xs"], [1, "text-xs", "font-bold", "text-stone-950"], [1, "text-[10px]", "text-stone-900", "font-bold", "px-2", "py-0.5", "bg-stone-100", "rounded-full", "border", "border-black/[0.05]"], [1, "max-w-2xl", "mx-auto", "px-4", "py-8"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "text-base", "font-bold", "text-stone-950", "tracking-tight"], [1, "text-xs", "text-stone-500"], [1, "text-xs", "font-semibold", "text-stone-400"], [1, "relative", "pl-3", "space-y-6"], [1, "absolute", "left-6", "top-3", "bottom-6", "w-px", "bg-black/[0.08]"], [1, "relative", "flex", "items-start", "gap-4", "group"], ["type", "button", 1, "flex-shrink-0", "px-4", "py-2", "rounded-full", "border", "text-xs", "font-bold", "transition-all", "duration-200", "flex", "items-center", "gap-1.5", 3, "click", "ngClass"], [1, "w-1.5", "h-1.5", "rounded-full", 3, "ngClass"], [1, "opacity-60", "font-normal", "text-[11px]"], [1, "text-center"], [1, "text-3xl", "animate-bounce"], [1, "text-xs", "font-semibold", "text-stone-500", "mt-2"], [1, "relative", "z-10", "flex-shrink-0", "w-7", "h-7", "rounded-full", "bg-obsidian", "text-white", "font-bold", "text-xs", "flex", "items-center", "justify-center", "shadow-sm", "border-2", "border-white", "ring-1", "ring-black/10"], [1, "flex-1", "bg-white", "rounded-3xl", "p-4", "border", "border-black/[0.05]", "shadow-subtle", "hover:shadow-luxe", "transition-all", "duration-300"], [1, "flex", "items-start", "justify-between", "gap-3"], [1, "flex-1", "min-w-0"], [1, "flex", "items-center", "flex-wrap", "gap-2", "mb-1.5"], [1, "inline-flex", "items-center", "gap-1", "font-bold", "text-xs", "px-2.5", "py-0.5", "bg-stone-100", "text-stone-900", "rounded-full"], ["strokeWidth", "1.5", 3, "img", "size"], [1, "text-[11px]", "font-medium", "px-2.5", "py-0.5", "bg-stone-50", "text-stone-600", "rounded-full", "border", "border-black/[0.03]"], [1, "font-bold", "text-sm", "sm:text-base", "text-stone-950", "leading-snug", "group-hover:text-gold", "transition-colors"], [1, "text-xs", "text-stone-500", "mt-1", "leading-relaxed", "line-clamp-2"], [1, "flex", "items-center", "gap-3", "mt-3", "pt-2.5", "border-t", "border-black/[0.04]", "text-[11px]", "text-stone-400", "font-medium"], [1, "flex", "items-center", "gap-1"], [1, "relative", "flex-shrink-0"], [1, "w-14", "h-14", "sm:w-16", "sm:h-16", "rounded-full", "object-cover", "border", "border-black/[0.06]", "shadow-sm", "group-hover:scale-105", "transition-transform", 3, "src", "alt"], [1, "mt-3", "text-right"], ["type", "button", 1, "inline-flex", "items-center", "gap-1", "text-xs", "font-bold", "text-stone-900", "hover:text-gold", "transition-colors", 3, "click"]], template: function DailyRouteComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "app-header", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "div", 3);
        \u0275\u0275repeaterCreate(4, DailyRouteComponent_For_5_Template, 6, 7, "button", 4, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 5);
        \u0275\u0275element(7, "div", 6);
        \u0275\u0275template(8, DailyRouteComponent_Conditional_8_Template, 6, 0, "div", 7);
        \u0275\u0275elementStart(9, "div", 8)(10, "span", 9);
        \u0275\u0275text(11, "\u{1F1EE}\u{1F1F9}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "span", 10);
        \u0275\u0275text(13, "Roma Rota Haritas\u0131");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "span", 11);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(16, "div", 12)(17, "div", 13)(18, "div")(19, "h2", 14);
        \u0275\u0275text(20, "G\xFCn\xFCn Ak\u0131\u015F\u0131 \u23F0");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "p", 15);
        \u0275\u0275text(22, "Saat saat optimize edilmi\u015F rotan\u0131z");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "span", 16);
        \u0275\u0275text(24);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "div", 17);
        \u0275\u0275element(26, "div", 18);
        \u0275\u0275repeaterCreate(27, DailyRouteComponent_For_28_Template, 30, 13, "div", 19, _forTrack0);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("showNotifications", true);
        \u0275\u0275advance(3);
        \u0275\u0275repeater(ctx.dayOptions);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(8, !ctx.mapLoaded() ? 8 : -1);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1(" ", ctx.currentSchedule().length, " Durak ");
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate1(" Toplam ", ctx.currentSchedule().length, " Mekan ");
        \u0275\u0275advance(3);
        \u0275\u0275repeater(ctx.currentSchedule());
      }
    }, dependencies: [CommonModule, NgClass, LucideAngularModule, LucideAngularComponent, HeaderComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DailyRouteComponent, { className: "DailyRouteComponent", filePath: "src\\app\\features\\itinerary\\daily-route.component.ts", lineNumber: 201 });
})();
export {
  DailyRouteComponent
};
//# sourceMappingURL=chunk-6F3DHKNX.js.map
