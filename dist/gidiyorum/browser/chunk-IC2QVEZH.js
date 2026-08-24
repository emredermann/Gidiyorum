import {
  computed,
  signal,
  ɵɵdefineInjectable
} from "./chunk-C5IKH3YG.js";

// src/app/core/services/trip-planner.service.ts
var TripPlannerService = class _TripPlannerService {
  constructor() {
    this.destination = signal("Roma, \u0130talya");
    this.daysCount = signal(5);
    this.selectedInterests = signal([
      "Tarihi Yerler",
      "Yemek & Mekan",
      "M\xFCze & Sanat"
    ]);
    this.travelStyle = signal("Orta");
    this.dailyBudget = signal("\u20AC\u20AC");
    this.walkingPreference = signal("Orta");
    this.availableInterests = [
      { id: "tarih", label: "Tarihi Yerler", icon: "\u{1F3DB}\uFE0F", description: "Antik kal\u0131nt\u0131lar ve saraylar" },
      { id: "yemek", label: "Yemek & Mekan", icon: "\u{1F37D}\uFE0F", description: "Yerel lezzetler ve gurme duraklar" },
      { id: "doga", label: "Do\u011Fa", icon: "\u{1F33F}", description: "Parklar, bah\xE7eler ve manzaralar" },
      { id: "alisveris", label: "Al\u0131\u015Fveri\u015F", icon: "\u{1F6CD}\uFE0F", description: "Butikler ve yerel pazarlar" },
      { id: "gece", label: "Gece Hayat\u0131", icon: "\u{1F319}", description: "Barlar ve canl\u0131 m\xFCzik" },
      { id: "muze", label: "M\xFCze & Sanat", icon: "\u{1F3A8}", description: "Galeri ve sergiler" }
    ];
    this.travelStyleOptions = [
      { value: "Rahat", label: "Rahat", icon: "\u2615", desc: "Ate\u015Fsiz, dinlendirici tempo" },
      { value: "Orta", label: "Orta", icon: "\u{1F6B6}", desc: "Dengeli ke\u015Fif rotas\u0131" },
      { value: "Aktif", label: "Aktif", icon: "\u26A1", desc: "Dolu dolu yo\u011Fun program" }
    ];
    this.budgetOptions = [
      { value: "\u20AC", label: "\u20AC", name: "Ekonomik", desc: "Uygun fiyatl\u0131 yerel se\xE7imler" },
      { value: "\u20AC\u20AC", label: "\u20AC\u20AC", name: "Dengeli", desc: "Orta b\xFCt\xE7e ve konforlu duraklar" },
      { value: "\u20AC\u20AC\u20AC", label: "\u20AC\u20AC\u20AC", name: "L\xFCks", desc: "Gurme ve se\xE7kin mekanlar" }
    ];
    this.walkingOptions = [
      { value: "Az", label: "Az", icon: "\u{1F697}", desc: "Toplu ta\u015F\u0131ma a\u011F\u0131r basan" },
      { value: "Orta", label: "Orta", icon: "\u{1F6B6}", desc: "K\u0131sa ve keyifli y\xFCr\xFCy\xFC\u015Fler" },
      { value: "\xC7ok", label: "\xC7ok", icon: "\u{1F3C3}", desc: "Y\xFCr\xFCyerek \u015Fehri ke\u015Ffetme" }
    ];
    this.generatedSummary = computed(() => {
      const style = this.travelStyle();
      const days = this.daysCount();
      const interests = this.selectedInterests();
      const activityMult = style === "Aktif" ? 5 : style === "Orta" ? 4 : 3;
      const placesCount = Math.round(days * activityMult * 0.85);
      return {
        city: "Roma",
        country: "\u0130talya",
        daysCount: days,
        temperature: "24\xB0C",
        totalActivities: days * activityMult,
        totalPlaces: placesCount,
        estimatedWalkingKm: `~${days * (style === "Aktif" ? 5 : style === "Orta" ? 3.5 : 2)} km`,
        cityImageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1000",
        highlights: [
          "\u2728 En iyi yerel lezzet duraklar\u0131 ve \u0130talyan mutfa\u011F\u0131 rotalar\u0131",
          "\u{1F3DB}\uFE0F Antik Roma eserleri ve s\u0131ra beklemeden ge\xE7i\u015F ipu\xE7lar\u0131",
          "\u{1F33F} Kalabal\u0131ktan uzak gizli parklar ve manzara tepeleri",
          "\u{1F68C} Toplu ta\u015F\u0131ma ve y\xFCr\xFCy\xFC\u015F rotas\u0131 optimizasyonu",
          ...interests.includes("Gece Hayat\u0131") ? ["\u{1F319} Trastevere b\xF6lgesinde ak\u015Fam yeme\u011Fi ve canl\u0131 m\xFCzik rotas\u0131"] : []
        ]
      };
    });
  }
  toggleInterest(label) {
    this.selectedInterests.update((current) => {
      if (current.includes(label)) {
        return current.length > 1 ? current.filter((i) => i !== label) : current;
      } else {
        return [...current, label];
      }
    });
  }
  setTravelStyle(style) {
    this.travelStyle.set(style);
  }
  setDailyBudget(budget) {
    this.dailyBudget.set(budget);
  }
  setWalkingPreference(pref) {
    this.walkingPreference.set(pref);
  }
  static {
    this.\u0275fac = function TripPlannerService_Factory(t) {
      return new (t || _TripPlannerService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TripPlannerService, factory: _TripPlannerService.\u0275fac, providedIn: "root" });
  }
};

export {
  TripPlannerService
};
//# sourceMappingURL=chunk-IC2QVEZH.js.map
