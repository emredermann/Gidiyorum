import { Injectable, signal, computed } from '@angular/core';

export interface PlannerPreferences {
  destination: string;
  daysCount: number;
  interests: string[];
  travelStyle: 'Rahat' | 'Orta' | 'Aktif';
  dailyBudget: '€' | '€€' | '€€€';
  walkingPreference: 'Az' | 'Orta' | 'Çok';
}

export interface PlanSummaryData {
  city: string;
  country: string;
  daysCount: number;
  temperature: string;
  totalActivities: number;
  totalPlaces: number;
  estimatedWalkingKm: string;
  cityImageUrl: string;
  highlights: string[];
}

@Injectable({ providedIn: 'root' })
export class TripPlannerService {
  // Signals for form preferences
  readonly destination = signal('Roma, İtalya');
  readonly daysCount = signal(5);

  readonly selectedInterests = signal<string[]>([
    'Tarihi Yerler',
    'Yemek & Mekan',
    'Müze & Sanat',
  ]);

  readonly travelStyle = signal<'Rahat' | 'Orta' | 'Aktif'>('Orta');
  readonly dailyBudget = signal<'€' | '€€' | '€€€'>('€€');
  readonly walkingPreference = signal<'Az' | 'Orta' | 'Çok'>('Orta');

  // Available options for selection grids
  readonly availableInterests = [
    { id: 'tarih', label: 'Tarihi Yerler', icon: '🏛️', description: 'Antik kalıntılar ve saraylar' },
    { id: 'yemek', label: 'Yemek & Mekan', icon: '🍽️', description: 'Yerel lezzetler ve gurme duraklar' },
    { id: 'doga', label: 'Doğa', icon: '🌿', description: 'Parklar, bahçeler ve manzaralar' },
    { id: 'alisveris', label: 'Alışveriş', icon: '🛍️', description: 'Butikler ve yerel pazarlar' },
    { id: 'gece', label: 'Gece Hayatı', icon: '🌙', description: 'Barlar ve canlı müzik' },
    { id: 'muze', label: 'Müze & Sanat', icon: '🎨', description: 'Galeri ve sergiler' },
  ];

  readonly travelStyleOptions = [
    { value: 'Rahat' as const, label: 'Rahat', icon: '☕', desc: 'Ateşsiz, dinlendirici tempo' },
    { value: 'Orta' as const, label: 'Orta', icon: '🚶', desc: 'Dengeli keşif rotası' },
    { value: 'Aktif' as const, label: 'Aktif', icon: '⚡', desc: 'Dolu dolu yoğun program' },
  ];

  readonly budgetOptions = [
    { value: '€' as const, label: '€', name: 'Ekonomik', desc: 'Uygun fiyatlı yerel seçimler' },
    { value: '€€' as const, label: '€€', name: 'Dengeli', desc: 'Orta bütçe ve konforlu duraklar' },
    { value: '€€€' as const, label: '€€€', name: 'Lüks', desc: 'Gurme ve seçkin mekanlar' },
  ];

  readonly walkingOptions = [
    { value: 'Az' as const, label: 'Az', icon: '🚗', desc: 'Toplu taşıma ağır basan' },
    { value: 'Orta' as const, label: 'Orta', icon: '🚶', desc: 'Kısa ve keyifli yürüyüşler' },
    { value: 'Çok' as const, label: 'Çok', icon: '🏃', desc: 'Yürüyerek şehri keşfetme' },
  ];

  // Computed summary card data based on selected preferences
  readonly generatedSummary = computed<PlanSummaryData>(() => {
    const style = this.travelStyle();
    const days = this.daysCount();
    const interests = this.selectedInterests();

    const activityMult = style === 'Aktif' ? 5 : style === 'Orta' ? 4 : 3;
    const placesCount = Math.round(days * activityMult * 0.85);

    return {
      city: 'Roma',
      country: 'İtalya',
      daysCount: days,
      temperature: '24°C',
      totalActivities: days * activityMult,
      totalPlaces: placesCount,
      estimatedWalkingKm: `~${days * (style === 'Aktif' ? 5 : style === 'Orta' ? 3.5 : 2)} km`,
      cityImageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1000',
      highlights: [
        '✨ En iyi yerel lezzet durakları ve İtalyan mutfağı rotaları',
        '🏛️ Antik Roma eserleri ve sıra beklemeden geçiş ipuçları',
        '🌿 Kalabalıktan uzak gizli parklar ve manzara tepeleri',
        '🚌 Toplu taşıma ve yürüyüş rotası optimizasyonu',
        ...(interests.includes('Gece Hayatı') ? ['🌙 Trastevere bölgesinde akşam yemeği ve canlı müzik rotası'] : []),
      ],
    };
  });

  // Active created trips signal
  readonly createdTrips = signal<any[]>([
    {
      id: 'trip-rome-01',
      title: 'Roma Antik Çağ & Lezzet Keşfi',
      city: 'Roma',
      country: 'İtalya',
      dateRangeStr: '20 - 24 Haziran 2026',
      daysRemainingStr: '5 gün kaldı',
      isUpcoming: true,
      coverImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
      tags: ['Tarih', 'Yemek', 'Mimari'],
    },
    {
      id: 'trip-barcelona-02',
      title: 'Barselona Mimarisi ve Plaj Rotası',
      city: 'Barselona',
      country: 'İspanya',
      dateRangeStr: '15 - 20 Temmuz 2026',
      daysRemainingStr: '26 gün kaldı',
      isUpcoming: true,
      coverImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
      tags: ['Sanat', 'Plaj', 'Yemek'],
    },
    {
      id: 'trip-paris-03',
      title: 'Paris Sanat ve Gurme Turu',
      city: 'Paris',
      country: 'Fransa',
      dateRangeStr: '10 - 15 Mayıs 2026',
      daysRemainingStr: 'Tamamlandı',
      isUpcoming: false,
      coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      tags: ['Müze', 'Lüks'],
    },
  ]);

  toggleInterest(label: string): void {
    this.selectedInterests.update(current => {
      if (current.includes(label)) {
        return current.length > 1 ? current.filter(i => i !== label) : current;
      } else {
        return [...current, label];
      }
    });
  }

  setTravelStyle(style: 'Rahat' | 'Orta' | 'Aktif'): void {
    this.travelStyle.set(style);
  }

  setDailyBudget(budget: '€' | '€€' | '€€€'): void {
    this.dailyBudget.set(budget);
  }

  setWalkingPreference(pref: 'Az' | 'Orta' | 'Çok'): void {
    this.walkingPreference.set(pref);
  }

  confirmCurrentPlan() {
    const summary = this.generatedSummary();
    const newTrip = {
      id: `trip-new-${Date.now()}`,
      title: `${summary.city} ${summary.daysCount} Günlük Özel Concierge Rotası`,
      city: summary.city,
      country: summary.country,
      dateRangeStr: '01 - 05 Eylül 2026',
      daysRemainingStr: 'Yeni Oluşturuldu ✨',
      isUpcoming: true,
      coverImage: summary.cityImageUrl,
      tags: this.selectedInterests(),
    };

    this.createdTrips.update(trips => [newTrip, ...trips]);
    return newTrip;
  }
}
