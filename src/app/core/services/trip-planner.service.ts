import { Injectable, signal, computed } from '@angular/core';

export interface CityOption {
  name: string;
  imageUrl: string;
  temperature: string;
}

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
  cities: CityOption[];
}

export interface PlannerPreferences {
  country: string;
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

export interface DynamicCityResult {
  name: string;
  country: string;
  flag: string;
  imageUrl: string;
  temperature: string;
  lat: number;
  lng: number;
}

@Injectable({ providedIn: 'root' })
export class TripPlannerService {
  // Pre-configured popular cities with flags and photos
  readonly popularCities: DynamicCityResult[] = [
    { name: 'Roma', country: 'İtalya', flag: '🇮🇹', imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1000', temperature: '24°C', lat: 41.9028, lng: 12.4964 },
    { name: 'Paris', country: 'Fransa', flag: '🇫🇷', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1000', temperature: '20°C', lat: 48.8566, lng: 2.3522 },
    { name: 'Barselona', country: 'İspanya', flag: '🇪🇸', imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1000', temperature: '26°C', lat: 41.3851, lng: 2.1734 },
    { name: 'İstanbul', country: 'Türkiye', flag: '🇹🇷', imageUrl: 'https://images.unsplash.com/photo-1527838832700-54595d164a3e?w=1000', temperature: '25°C', lat: 41.0082, lng: 28.9784 },
    { name: 'Tokyo', country: 'Japonya', flag: '🇯🇵', imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1000', temperature: '22°C', lat: 35.6762, lng: 139.6503 },
    { name: 'Londra', country: 'İngiltere', flag: '🇬🇧', imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1000', temperature: '18°C', lat: 51.5074, lng: -0.1278 },
    { name: 'Prag', country: 'Çekya', flag: '🇨🇿', imageUrl: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=1000', temperature: '21°C', lat: 50.0755, lng: 14.4378 },
    { name: 'Viyana', country: 'Avusturya', flag: '🇦🇹', imageUrl: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1000', temperature: '22°C', lat: 48.2082, lng: 16.3738 },
    { name: 'Amsterdam', country: 'Hollanda', flag: '🇳🇱', imageUrl: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1000', temperature: '18°C', lat: 52.3676, lng: 4.9041 },
    { name: 'New York', country: 'ABD', flag: '🇺🇸', imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1000', temperature: '23°C', lat: 40.7128, lng: -74.0060 },
    { name: 'Berlin', country: 'Almanya', flag: '🇩🇪', imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1000', temperature: '19°C', lat: 52.5200, lng: 13.4050 },
    { name: 'Dubai', country: 'BAE', flag: '🇦🇪', imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000', temperature: '32°C', lat: 25.2048, lng: 55.2708 },
  ];

  // Signals for form preferences
  readonly selectedCountry = signal<string>('İtalya');
  readonly selectedCity = signal<string>('Roma');
  readonly selectedCityData = signal<DynamicCityResult>(this.popularCities[0]);

  readonly searchResults = signal<DynamicCityResult[]>([]);
  readonly isSearchingCity = signal<boolean>(false);

  readonly daysCount = signal<number>(5);

  readonly destination = computed(() => `${this.selectedCity()}, ${this.selectedCountry()}`);

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

  selectDynamicCity(city: DynamicCityResult): void {
    this.selectedCity.set(city.name);
    this.selectedCountry.set(city.country);
    this.selectedCityData.set(city);
    this.searchResults.set([]);
  }

  setCity(cityName: string): void {
    const found = this.popularCities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    if (found) {
      this.selectDynamicCity(found);
    } else {
      this.selectedCity.set(cityName);
      this.selectedCityData.set({
        name: cityName,
        country: this.selectedCountry(),
        flag: '📍',
        imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1000',
        temperature: '22°C',
        lat: 41.9028,
        lng: 12.4964,
      });
    }
  }

  async searchCityDynamic(query: string): Promise<void> {
    const q = query.trim();
    if (!q || q.length < 2) {
      this.searchResults.set([]);
      this.isSearchingCity.set(false);
      return;
    }

    this.isSearchingCity.set(true);

    try {
      // 1. OpenStreetMap Nominatim API Geocoding
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=5&accept-language=tr,en`;
      const res = await fetch(nominatimUrl);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        const results: DynamicCityResult[] = [];
        const seenKeys = new Set<string>();

        for (const item of data) {
          const address = item.address || {};
          const cityName = address.city || address.town || address.village || address.municipality || address.county || item.display_name.split(',')[0];
          const countryName = address.country || 'Dünya';
          const countryCode = (address.country_code || 'tr').toUpperCase();

          const key = `${cityName.toLowerCase().trim()}_${countryName.toLowerCase().trim()}`;
          if (seenKeys.has(key)) {
            continue;
          }
          seenKeys.add(key);

          const lat = parseFloat(item.lat);
          const lng = parseFloat(item.lon);

          // Get flag emoji
          const flag = this.getCountryFlag(countryCode);

          // Fetch weather from Open-Meteo
          let tempStr = '22°C';
          try {
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
            const weatherData = await weatherRes.json();
            if (weatherData && weatherData.current_weather) {
              tempStr = `${Math.round(weatherData.current_weather.temperature)}°C`;
            }
          } catch {}

          // Image matching
          const popMatch = this.popularCities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
          const imageUrl = popMatch ? popMatch.imageUrl : `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1000`;

          results.push({
            name: cityName,
            country: countryName,
            flag,
            imageUrl,
            temperature: tempStr,
            lat,
            lng,
          });
        }

        this.searchResults.set(results);
      } else {
        this.searchResults.set([]);
      }
    } catch {
      // Local fallback filter if offline
      const localMatches = this.popularCities.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.country.toLowerCase().includes(q.toLowerCase()));
      this.searchResults.set(localMatches);
    } finally {
      this.isSearchingCity.set(false);
    }
  }

  private getCountryFlag(code: string): string {
    if (!code || code.length !== 2) return '🌐';
    const codePoints = code
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  readonly startDateIso = signal<string>('2026-09-01');
  readonly endDateIso = signal<string>('2026-09-05');

  readonly dateRangeFormatted = computed(() => {
    const startIso = this.startDateIso();
    const endIso = this.endDateIso();
    if (!startIso || !endIso) return '01 - 05 Eylül 2026';
    const start = new Date(startIso);
    const end = new Date(endIso);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return '01 - 05 Eylül 2026';

    const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const startDay = String(start.getDate()).padStart(2, '0');
    const endDay = String(end.getDate()).padStart(2, '0');
    const startMonth = monthNames[start.getMonth()];
    const endMonth = monthNames[end.getMonth()];
    const year = start.getFullYear();

    if (startMonth === endMonth) {
      return `${startDay} - ${endDay} ${startMonth} ${year}`;
    } else {
      return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
    }
  });

  setStartDate(iso: string): void {
    if (!iso) return;
    this.startDateIso.set(iso);
    if (this.endDateIso() < iso) {
      this.endDateIso.set(iso);
    }
    this.recalculateDaysFromDates();
  }

  setEndDate(iso: string): void {
    if (!iso) return;
    this.endDateIso.set(iso);
    if (iso < this.startDateIso()) {
      this.startDateIso.set(iso);
    }
    this.recalculateDaysFromDates();
  }

  private recalculateDaysFromDates(): void {
    const start = new Date(this.startDateIso());
    const end = new Date(this.endDateIso());
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const diffMs = end.getTime() - start.getTime();
      const diffDays = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1);
      this.daysCount.set(Math.min(30, diffDays));
    }
  }

  setDaysCount(days: number): void {
    const clamped = Math.max(1, Math.min(30, days));
    this.daysCount.set(clamped);
  }

  // Computed summary card data based on selected preferences
  readonly generatedSummary = computed<PlanSummaryData>(() => {
    const style = this.travelStyle();
    const days = this.daysCount();
    const interests = this.selectedInterests();
    const cityData = this.selectedCityData();
    const city = cityData.name;
    const country = cityData.country;

    const activityMult = style === 'Aktif' ? 5 : style === 'Orta' ? 4 : 3;
    const placesCount = Math.round(days * activityMult * 0.85);

    return {
      city,
      country,
      daysCount: days,
      temperature: cityData.temperature,
      totalActivities: days * activityMult,
      totalPlaces: placesCount,
      estimatedWalkingKm: `~${days * (style === 'Aktif' ? 5 : style === 'Orta' ? 3.5 : 2)} km`,
      cityImageUrl: cityData.imageUrl,
      highlights: [
        `✨ En iyi yerel lezzet durakları ve ${country} mutfağı rotaları`,
        `🏛️ ${city} bölgesinin tarihi eserleri ve sıra beklemeden geçiş ipuçları`,
        `🌿 Kalabalıktan uzak gizli parklar ve manzara tepeleri`,
        `🚌 Toplu taşıma ve yürüyüş rotası optimizasyonu`,
        ...(interests.includes('Gece Hayatı') ? [`🌙 ${city} merkezinde akşam yemeği ve canlı müzik rotası`] : []),
      ],
    };
  });

  // Active created trips signal (Diversified dummy data)
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
      lat: 41.9028,
      lng: 12.4964,
    },
    {
      id: 'trip-barcelona-02',
      title: 'Barselona Gaudi & Akdeniz Esintisi',
      city: 'Barselona',
      country: 'İspanya',
      dateRangeStr: '15 - 20 Temmuz 2026',
      daysRemainingStr: '26 gün kaldı',
      isUpcoming: true,
      coverImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
      tags: ['Sanat', 'Plaj', 'Yemek'],
      lat: 41.3851,
      lng: 2.1734,
    },
    {
      id: 'trip-kyoto-03',
      title: 'Kyoto & Tokyo Tapınaklar ve Gurme Turu',
      city: 'Kyoto',
      country: 'Japonya',
      dateRangeStr: '12 - 20 Ekim 2026',
      daysRemainingStr: '48 gün kaldı',
      isUpcoming: true,
      coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
      tags: ['Doğa', 'Kültür', 'Gastronomi'],
      lat: 35.0116,
      lng: 135.7681,
    },
    {
      id: 'trip-amalfi-04',
      title: 'Amalfi Kıyıları & Capri Tekne Rotaları',
      city: 'Amalfi',
      country: 'İtalya',
      dateRangeStr: '05 - 10 Kasım 2026',
      daysRemainingStr: '72 gün kaldı',
      isUpcoming: true,
      coverImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
      tags: ['Manzara', 'Lüks', 'Deniz'],
      lat: 40.6340,
      lng: 14.6027,
    },
    {
      id: 'trip-paris-05',
      title: 'Paris Sanat, Moda & Gurme Turu',
      city: 'Paris',
      country: 'Fransa',
      dateRangeStr: '10 - 15 Mayıs 2026',
      daysRemainingStr: 'Tamamlandı',
      isUpcoming: false,
      coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      tags: ['Müze', 'Moda', 'Gurme'],
      lat: 48.8566,
      lng: 2.3522,
    },
    {
      id: 'trip-copenhagen-06',
      title: 'Kopenhag & İskandinav Tasarım Gezisi',
      city: 'Kopenhag',
      country: 'Danimarka',
      dateRangeStr: '01 - 06 Nisan 2026',
      daysRemainingStr: 'Tamamlandı',
      isUpcoming: false,
      coverImage: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800',
      tags: ['Tasarım', 'Kahve', 'Bisiklet'],
      lat: 55.6761,
      lng: 12.5683,
    },
    {
      id: 'trip-cappadocia-07',
      title: 'Kapadokya Balon & Peri Bacaları Turu',
      city: 'Nevşehir',
      country: 'Türkiye',
      dateRangeStr: '18 - 22 Şubat 2026',
      daysRemainingStr: 'Tamamlandı',
      isUpcoming: false,
      coverImage: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=800',
      tags: ['Macera', 'Doğa', 'Fotoğraf'],
      lat: 38.6431,
      lng: 34.8289,
    },
    {
      id: 'trip-london-08',
      title: 'Londra Tiyatrolar & Müze Rotaları',
      city: 'Londra',
      country: 'İngiltere',
      dateRangeStr: '05 - 10 Aralık 2025',
      daysRemainingStr: 'Tamamlandı',
      isUpcoming: false,
      coverImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
      tags: ['Tiyatro', 'Müze', 'Alışveriş'],
      lat: 51.5074,
      lng: -0.1278,
    },
  ]);

  readonly createdTripConfigs = signal<Record<string, any>>({});
  readonly latestTripConfig = signal<any | null>(null);
  readonly selectedPlaceItem = signal<any | null>(null);

  selectPlaceItem(item: any) {
    const placeData = {
      id: item.id,
      name: item.title || item.name || 'Mekan Detayı',
      subtitle: `${item.category || 'Mekan'} • ${item.cityName || 'Destinasyon'}, ${item.flag || '📍'} • €€`,
      rating: item.rating || '4.8',
      reviewCount: item.reviewCount || '1,240',
      tags: item.tags || [item.category ? item.category.replace(/^[^\w\s]+/, '').trim() : 'Mekan', item.cityName || 'Destinasyon', 'Kültür', 'Özel Deneyim'],
      description: item.description || `${item.title} - Şehrin öne çıkan özel ziyaret ve lezzet durağı.`,
      openingHours: item.openingHours || '09:00 - 22:00',
      averagePrice: item.averagePrice || '€€ (15 - 35 €)',
      reservation: item.reservation || 'Önerilir',
      distance: item.walkingInfo || item.distance || 'Şehir Merkezinde',
      imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000',
      lat: item.lat || 41.9028,
      lng: item.lng || 12.4964,
    };
    this.selectedPlaceItem.set(placeData);
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('gidiyorum_selected_place', JSON.stringify(placeData));
      } catch {}
    }
  }

  getTripConfig(tripId: string): any {
    if (this.createdTripConfigs()[tripId]) {
      return this.createdTripConfigs()[tripId];
    }

    const trip = this.createdTrips().find(t => t.id === tripId);
    if (trip) {
      return this.generateDynamicTripConfig(trip);
    }

    const latest = this.latestTripConfig();
    if (latest && (latest.id === tripId || tripId === 'latest')) {
      return latest;
    }

    return null;
  }

  generateDynamicTripConfig(trip: any): any {
    const cityName = trip.city || 'Şehir';
    const countryName = trip.country || 'Ülke';
    const flag = trip.flag || (countryName === 'Japonya' ? '🇯🇵' : countryName === 'İtalya' ? '🇮🇹' : countryName === 'Türkiye' ? '🇹🇷' : countryName === 'Çekya' ? '🇨🇿' : countryName === 'Avusturya' ? '🇦🇹' : countryName === 'Fransa' ? '🇫🇷' : countryName === 'İspanya' ? '🇪🇸' : countryName === 'İngiltere' ? '🇬🇧' : '🌐');

    const lat = trip.lat || (cityName === 'Kyoto' ? 35.0116 : cityName === 'Amalfi' ? 40.6340 : cityName.toLowerCase().includes('izmir') ? 38.4237 : cityName === 'Prag' ? 50.0755 : cityName === 'Viyana' ? 48.2082 : cityName === 'New York' ? 40.7128 : 41.9028);
    const lng = trip.lng || (cityName === 'Kyoto' ? 135.7681 : cityName === 'Amalfi' ? 14.6027 : cityName.toLowerCase().includes('izmir') ? 27.1428 : cityName === 'Prag' ? 14.4378 : cityName === 'Viyana' ? 16.3738 : cityName === 'New York' ? -74.0060 : 12.4964);

    const dayOptions = [
      { id: 'day-1', label: '01 Eylül Gün 1', dateStr: 'Gün 1', isToday: true },
      { id: 'day-2', label: '02 Eylül Gün 2', dateStr: 'Gün 2' },
      { id: 'day-3', label: '03 Eylül Gün 3', dateStr: 'Gün 3' },
      { id: 'day-4', label: '04 Eylül Gün 4', dateStr: 'Gün 4' },
      { id: 'day-5', label: '05 Eylül Gün 5', dateStr: 'Gün 5' },
    ];

    let schedulesByDay: Record<string, any[]> = {};

    const lowerCity = cityName.toLowerCase().trim();

    if (lowerCity.includes('roma') || lowerCity.includes('rome')) {
      const prefix = trip.id ? `place-${trip.id}` : `place-roma`;
      schedulesByDay = {
        'day-1': [
          { id: `${prefix}-101`, time: '09:00', title: 'Giolitti - Geleneksel İtalyan Kahvaltısı & Dondurma', category: '☕ Kafe & Tatlı', duration: '1 saat', walkingInfo: 'Başlangıç', description: '1900 yılından beri hizmet veren tarihi mekanda taze kruvasan, espresso ve meşhur Roma dondurması.', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300', lat: 41.9011, lng: 12.4772 },
          { id: `${prefix}-102`, time: '10:30', title: 'Piazza Navona Meydanı & Dört Nehir Çeşmesi', category: '🏛️ Meydan & Anıt', duration: '1.5 saat', walkingInfo: '🚶 400m (5 dk)', description: 'Bernini eserleri, sokak sanatçıları ve Barok mimari atmosferiyle büyüleyici tarihi meydan.', imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300', lat: 41.8992, lng: 12.4731 },
          { id: `${prefix}-103`, time: '12:00', title: 'Pantheon Tapınağı & Tarihi Kubbe', category: '🏛️ Antik Roma', duration: '1.5 saat', walkingInfo: '🚶 350m (4 dk)', description: 'Antik Roma’dan günümüze en iyi korunmuş kubbeli tapınak yapısı ve Raphael’in mezarı.', imageUrl: 'https://images.unsplash.com/photo-1548625361-1845110f0e04?w=300', lat: 41.8986, lng: 12.4769 },
          { id: `${prefix}-104`, time: '14:30', title: 'Trevi Aşk Çeşmesi', category: '⛲ Anıt & Manzara', duration: '45 dk', walkingInfo: '🚶 650m (8 dk)', description: 'Dilek parası atmak için dünyaca ünlü çeşme. Barok heykel sanatının zirvesi.', imageUrl: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=300', lat: 41.9009, lng: 12.4833 },
          { id: `${prefix}-105`, time: '19:00', title: 'Trattoria Osteria Da Enzo al 29', category: '🍝 Akşam Yemeği', duration: '2 saat', walkingInfo: '🚶 1.2 km', description: 'Tarihi Trastevere sokaklarında geleneksel Carbonara ve Cacio e Pepe makarna ziyafeti.', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300', lat: 41.8894, lng: 12.4705 },
        ],
        'day-2': [
          { id: `${prefix}-201`, time: '09:00', title: 'Kolezyum (Colosseum) Antik Amfitiyatro', category: '🏟️ Dünya Mirası', duration: '2.5 saat', walkingInfo: 'Başlangıç', description: 'Gladyatör dövüşlerine ev sahipliği yapmış dünyanın en büyük amfitiyatrosu.', imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300', lat: 41.8902, lng: 12.4922 },
          { id: `${prefix}-202`, time: '12:00', title: 'Roman Forumu ve Palatino Tepesi', category: '🏛️ Antik Kent', duration: '2 saat', walkingInfo: '🚶 200m (3 dk)', description: 'Antik Roma imparatorluğunun siyasi, hukuki ve dini merkezi kalıntıları.', imageUrl: 'https://images.unsplash.com/photo-1548625361-1845110f0e04?w=300', lat: 41.8925, lng: 12.4853 },
        ],
      };
    } else if (lowerCity.includes('kyoto')) {
      const prefix = trip.id ? `place-${trip.id}` : `place-kyoto`;
      schedulesByDay = {
        'day-1': [
          { id: `${prefix}-101`, time: '09:00', title: 'Fushimi Inari Taisha & Torii Kapıları', category: '⛩️ Tapınak & Yürüyüş', duration: '2 saat', walkingInfo: 'Başlangıç', description: 'Yüzlerce kiremit kırmızısı torii kapısının altından geçen ikonik yürüyüş yolu.', imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300', lat: 34.9671, lng: 135.7727 },
          { id: `${prefix}-102`, time: '11:30', title: 'Arashiyama Bambu Ormanı & Tenryu-ji', category: '🎋 Doğa & Park', duration: '1.5 saat', walkingInfo: '🚶 Tren 20 dk', description: 'Dev bambu kamışlarının arasında büyüleyici ve dingin doğa atmosferi.', imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300', lat: 35.0170, lng: 135.6713 },
          { id: `${prefix}-103`, time: '14:00', title: 'Kinkaku-ji Altın Köşk Tapınağı', category: '✨ Dünya Mirası', duration: '1.5 saat', walkingInfo: '🚶 Otobüs 15 dk', description: 'Göl üzerindeki altın varak kaplı tapınak ve Zen bahçesi yansıması.', imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300', lat: 35.0394, lng: 135.7292 },
          { id: `${prefix}-104`, time: '18:30', title: 'Gion Geyşa Mahallesi & Pontocho Çarşısı', category: '🍵 Tarihi Sokak & Yemek', duration: '2 saat', walkingInfo: '🚶 1.5 km', description: 'Geleneksel ahşap çay evleri ve Kamogawa nehri kıyısında akşam yemeği.', imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300', lat: 35.0037, lng: 135.7733 },
        ],
        'day-2': [
          { id: `${prefix}-201`, time: '09:30', title: 'Kiyomizu-dera Tapınağı & Manzara Terası', category: '⛩️ Tarihi Ahşap Tapınak', duration: '2 saat', walkingInfo: 'Başlangıç', description: 'Kyoto şehrine kuşbakışı bakan tarihi ahşap teras.', imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300', lat: 34.9949, lng: 135.7850 },
        ],
      };
    } else if (lowerCity.includes('amalfi')) {
      const prefix = trip.id ? `place-${trip.id}` : `place-amalfi`;
      schedulesByDay = {
        'day-1': [
          { id: `${prefix}-101`, time: '09:30', title: 'Duomo di Amalfi Katedrali & Meydanı', category: '🏛️ İkonik Katedral', duration: '1.5 saat', walkingInfo: 'Başlangıç', description: 'Bizans etkisindeki görkemli merdivenler ve tarihi Amalfi meydanı.', imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300', lat: 40.6342, lng: 14.6027 },
          { id: `${prefix}-102`, time: '11:30', title: 'Positano Rengarenk Uçurum Evleri', category: '🏖️ Sahil & Manzara', duration: '2 saat', walkingInfo: '🚶 Tekne 20 dk', description: 'Tarihi dik sokaklar, şık butikler ve taze limonata keyfi.', imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300', lat: 40.6281, lng: 14.4850 },
          { id: `${prefix}-103`, time: '14:30', title: 'Ravello & Villa Rufolo Bahçeleri', category: '🌺 Manzara & Bahçe', duration: '2 saat', walkingInfo: '🚶 Otobüs 15 dk', description: 'Akdeniz’in en muazzam panoramik deniz manzarasına sahip tarihi villa.', imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300', lat: 40.6496, lng: 14.6115 },
          { id: `${prefix}-104`, time: '19:00', title: 'Amalfi Limanı & Taze Limoncello Ziyafeti', category: '🐟 Akşam Yemeği', duration: '2 saat', walkingInfo: '🚶 Sahil kenarı', description: 'Deniz kıyısında taze Akdeniz balıkları ve ev yapımı limoncello.', imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300', lat: 40.6325, lng: 14.6010 },
        ],
        'day-2': [
          { id: `${prefix}-201`, time: '10:00', title: 'Capri Adası & Mavi Mağara (Grotta Azzurra)', category: '🚤 Tekne Turu', duration: '3 saat', walkingInfo: 'Başlangıç', description: 'Kristal berraklığındaki turkuaz sularda tekne keşfi.', imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300', lat: 40.5532, lng: 14.2224 },
        ],
      };
    } else if (lowerCity.includes('izmir')) {
      const prefix = trip.id ? `place-${trip.id}` : `place-izmir`;
      schedulesByDay = {
        'day-1': [
          { id: `${prefix}-101`, time: '09:00', title: 'Alsancak Kordon Boyu & Sıcak Boyoz Kahvaltısı', category: '☕ Geleneksel Kahvaltı', duration: '1 saat', walkingInfo: 'Başlangıç', description: 'Sıcak İzmir gevreği, boyoz ve tulum peyniri ile deniz kıyısında kahvaltı.', imageUrl: 'https://images.unsplash.com/photo-1527838832700-54595d164a3e?w=300', lat: 38.4350, lng: 27.1400 },
          { id: `${prefix}-102`, time: '10:30', title: 'Konak Meydanı & Tarihi Saat Kulesi', category: '🏛️ Sembol Anıt', duration: '1 saat', walkingInfo: '🚶 1.5 km (15 dk)', description: '1901 yapımı İzmir’in simgesi tarihi Saat Kulesi ve Yalı Camii.', imageUrl: 'https://images.unsplash.com/photo-1527838832700-54595d164a3e?w=300', lat: 38.4192, lng: 27.1287 },
          { id: `${prefix}-103`, time: '12:00', title: 'Kemeraltı Çarşısı & Kızlarağası Hanı Dibek Kahvesi', category: '🛍️ Çarşı & Kahve', duration: '2 saat', walkingInfo: '🚶 300m (4 dk)', description: 'Tarihi handa fincanda pişen dibek kahvesi ve otantik alışveriş.', imageUrl: 'https://images.unsplash.com/photo-1527838832700-54595d164a3e?w=300', lat: 38.4183, lng: 27.1331 },
          { id: `${prefix}-104`, time: '14:30', title: 'Tarihi Asansör & Karataş Seyir Terası', category: '🌅 Manzara & Tarih', duration: '1.5 saat', walkingInfo: '🚶 1.2 km', description: 'İzmir Körfezi’nin en güzel kuşbakışı panoramik manzarası.', imageUrl: 'https://images.unsplash.com/photo-1527838832700-54595d164a3e?w=300', lat: 38.4085, lng: 27.1172 },
          { id: `${prefix}-105`, time: '19:00', title: 'Pasaport İskelesi Ege Mezeleri & Balık Restoranı', category: '🐟 Akşam Yemeği', duration: '2 saat', walkingInfo: '🚶 Sahil yürüyüşü', description: 'Deniz kenarında Ege otları mezeleri ve taze deniz ürünleri.', imageUrl: 'https://images.unsplash.com/photo-1527838832700-54595d164a3e?w=300', lat: 38.4280, lng: 27.1350 },
        ],
        'day-2': [
          { id: `${prefix}-201`, time: '09:30', title: 'Efes Antik Kenti & Celsus Kütüphanesi', category: '🏛️ Dünya Mirası', duration: '3 saat', walkingInfo: 'Günübirlik Rota', description: 'Antik dünyanın en büyük kütüphanesi ve tiyatrosu kalıntıları.', imageUrl: 'https://images.unsplash.com/photo-1527838832700-54595d164a3e?w=300', lat: 37.9407, lng: 27.3416 },
        ],
      };
    } else if (lowerCity.includes('paris')) {
      const prefix = trip.id ? `place-${trip.id}` : `place-paris`;
      schedulesByDay = {
        'day-1': [
          { id: `${prefix}-101`, time: '09:00', title: 'Café de Flore - Saint-Germain Kahvaltısı', category: '☕ Fransız Kafesi', duration: '1 saat', walkingInfo: 'Başlangıç', description: 'Sartre ve Camus’nün uğrak yeri tarihi ikonik Paris kafesinde taze kruvasan ve espresso.', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300', lat: 48.8542, lng: 2.3325 },
          { id: `${prefix}-102`, time: '10:30', title: 'Eyfel Kulesi (Tour Eiffel) & Trocadéro Terası', category: '🗼 Sembol Yapı', duration: '2 saat', walkingInfo: '🚶 Metro 15 dk', description: 'Paris’in simgesi kulenin zirvesinden panoramik şehir manzarası.', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300', lat: 48.8584, lng: 2.2945 },
          { id: `${prefix}-103`, time: '13:00', title: 'Louvre Müzesi & Cam Piramit', category: '🎨 Müze & Sanat', duration: '2.5 saat', walkingInfo: '🚶 Metro 10 dk', description: 'Mona Lisa, Semadirekli Kanatlı Zafer ve klasik Fransız sanatı koleksiyonu.', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300', lat: 48.8606, lng: 2.3376 },
          { id: `${prefix}-104`, time: '16:00', title: 'Le Marais Mahallesi & Fransız Butikleri', category: '🛍️ Moda & Kafe', duration: '2 saat', walkingInfo: '🚶 1.5 km', description: 'Tarihi malikaneler, makaron dükkanları ve şık sanat galerileri.', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300', lat: 48.8575, lng: 2.3582 },
          { id: `${prefix}-105`, time: '19:30', title: 'Le Train Bleu - Geleneksel Fransız Akşam Yemeği', category: '🍷 Gurme Restoran', duration: '2 saat', walkingInfo: '🚶 Metro 12 dk', description: 'Gare de Lyon içinde 1900’lerin gösterişli tavan freskleri eşliğinde Fransız mutfağı.', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300', lat: 48.8448, lng: 2.3735 },
        ],
      };
    } else if (lowerCity.includes('barcelona') || lowerCity.includes('barselona')) {
      const prefix = trip.id ? `place-${trip.id}` : `place-bcn`;
      schedulesByDay = {
        'day-1': [
          { id: `${prefix}-101`, time: '09:00', title: 'Café El Magnífico - Gothic Quarter Kahvaltısı', category: '☕ Kafe', duration: '1 saat', walkingInfo: 'Başlangıç', description: 'Tarihi Gotik mahallenin dar sokaklarında taze kavrulmuş özel kahve ve hamur işleri.', imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300', lat: 41.3835, lng: 2.1812 },
          { id: `${prefix}-102`, time: '10:30', title: 'Sagrada Família Katedrali', category: '🏛️ Gaudí Mimarisi', duration: '2 saat', walkingInfo: '🚶 Metro 15 dk', description: 'Antoni Gaudí’nin tamamlanamayan başyapıtı ve muazzam vitray pencereleri.', imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300', lat: 41.4036, lng: 2.1744 },
          { id: `${prefix}-103`, time: '13:00', title: 'Park Güell Mozaik Bahçeleri', category: '🌿 Park & Sanat', duration: '1.5 saat', walkingInfo: '🚶 Metro 15 dk', description: 'Ejderha merdivenleri ve Barselona sahiline bakan panoramik mozaik teraslar.', imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300', lat: 41.4145, lng: 2.1527 },
          { id: `${prefix}-104`, time: '15:30', title: 'Mercat de la Boqueria Pazarı & Tapas', category: '🍤 Gurme Pazar', duration: '1.5 saat', walkingInfo: '🚶 La Rambla yürüyüşü', description: 'Taze deniz ürünleri, jamón ibérico ve İspanyol tapas tadımları.', imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300', lat: 41.3817, lng: 2.1716 },
          { id: `${prefix}-105`, time: '19:30', title: 'Bar Barceloneta - Akdeniz Paella Ziyafeti', category: '🥘 Akşam Yemeği', duration: '2 saat', walkingInfo: '🚶 Sahil kenarı', description: 'Kıyı deniz ürünleri restoranında taze Paella ve Sangria keyfi.', imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300', lat: 41.3785, lng: 2.1895 },
        ],
      };
    } else if (lowerCity.includes('prag') || lowerCity.includes('prague')) {
      const prefix = trip.id ? `place-${trip.id}` : `place-prag`;
      schedulesByDay = {
        'day-1': [
          { id: `${prefix}-101`, time: '09:00', title: 'Café Louvre - Tarihi Çek Kahvaltısı', category: '☕ Tarihi Kafe', duration: '1 saat', walkingInfo: 'Başlangıç', description: 'Einstein ve Kafka’nın müdavimi olduğu tarihi atmosferde kahvaltı.', imageUrl: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=300', lat: 50.0821, lng: 14.4184 },
          { id: `${prefix}-102`, time: '10:30', title: 'Eski Şehir Meydanı & Astronomik Saat Kulesi', category: '🏰 Sembol Meydan', duration: '1.5 saat', walkingInfo: '🚶 600m (7 dk)', description: 'Orta Çağ’dan kalan ünlü astronomik saat gösterisi ve tarihi meydan.', imageUrl: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=300', lat: 50.0870, lng: 14.4207 },
          { id: `${prefix}-103`, time: '12:30', title: 'Karl Köprüsü (Charles Bridge) & Vltava Nehri', category: '🌉 İkonik Köprü', duration: '1 saat', walkingInfo: '🚶 500m (6 dk)', description: 'Aziz heykelleriyle süslü Vltava Nehri üzerindeki tarihi taş köprü.', imageUrl: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=300', lat: 50.0865, lng: 14.4114 },
          { id: `${prefix}-104`, time: '14:30', title: 'Prag Kalesi & St. Vitus Katedrali', category: '🏛️ Dünya Mirası', duration: '2 saat', walkingInfo: '🚶 800m (10 dk)', description: 'Dünyanın en büyük kale komplekslerinden biri ve Gotik mimari.', imageUrl: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=300', lat: 50.0909, lng: 14.4005 },
          { id: `${prefix}-105`, time: '19:00', title: 'U Fleků - Geleneksel Çek Restoranı & İçecek Ziyafeti', category: '🍺 Akşam Yemeği', duration: '2 saat', walkingInfo: '🚶 1.2 km', description: '1499 yılından beri açık olan tarihi restoranda Gulaş ve özel içecekler.', imageUrl: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=300', lat: 50.0788, lng: 14.4172 },
        ],
      };
    } else {
      const img = trip.coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300';
      const prefix = trip.id ? `place-${trip.id}` : `place-${cityName.toLowerCase().replace(/\s+/g, '')}`;
      schedulesByDay = {
        'day-1': [
          { id: `${prefix}-101`, time: '09:00', title: `Café ${cityName} - Geleneksel Kahvaltı & Taze Kahve`, category: '☕ Kahvaltı & Kafe', duration: '1 saat', walkingInfo: 'Başlangıç', description: `${cityName} şehir merkezinin en popüler tarihi kafesinde taze espresso ve yerel lezzetler.`, imageUrl: img, lat: lat, lng: lng },
          { id: `${prefix}-102`, time: '10:30', title: `${cityName} Eski Kent Meydanı & Tarihi Saat Kulesi`, category: '🏛️ Sembol Meydan', duration: '1.5 saat', walkingInfo: '🚶 400m (5 dk)', description: `${cityName} bölgesinin en meşhur tarihi meydanı, mimarisi ve sembol yapısı.`, imageUrl: img, lat: lat + 0.003, lng: lng + 0.003 },
          { id: `${prefix}-103`, time: '12:30', title: `${cityName} Ulusal Kültür & Sanat Müzesi`, category: '🎨 Müze & Sanat', duration: '2 saat', walkingInfo: '🚶 500m (6 dk)', description: `${countryName} tarihini, klasik tablolarını ve kültürel miraslarını sergileyen ana müze.`, imageUrl: img, lat: lat - 0.002, lng: lng + 0.004 },
          { id: `${prefix}-104`, time: '15:00', title: `${cityName} Panoramik Seyir Terası & Şehir Parkı`, category: '🌿 Manzara & Park', duration: '1.5 saat', walkingInfo: '🚶 800m (10 dk)', description: `${cityName} kuşbakışı manzarası, botanik bahçeleri ve dinlendirici yeşil alan.`, imageUrl: img, lat: lat + 0.006, lng: lng - 0.004 },
          { id: `${prefix}-105`, time: '19:00', title: `Trattoria / Bistro ${cityName} - Seçkin Akşam Yemeği`, category: '🍽️ Yerel Mutfak', duration: '2 saat', walkingInfo: '🚶 1 km', description: `${countryName} mutfağının taze ve özgün lezzetleriyle hazırlanan akşam yemeği menüsü.`, imageUrl: img, lat: lat - 0.003, lng: lng - 0.002 },
        ],
        'day-2': [
          { id: `${prefix}-201`, time: '09:30', title: `${cityName} Tarihi Çarşı & Otantik Butikler`, category: '🛍️ Çarşı & Alışveriş', duration: '2 saat', walkingInfo: 'Başlangıç', description: `${cityName} merkezinde hediyelik eşyalar, yerel pazar ve sanat galerileri.`, imageUrl: img, lat: lat + 0.002, lng: lng - 0.003 },
        ],
      };
    }

    return {
      cityName,
      flag,
      pillTitle: `${cityName} Rota Haritası`,
      mapCenter: { lat, lng },
      dayOptions,
      schedulesByDay,
    };
  }

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
    const cityData = this.selectedCityData();
    const tripId = `trip-new-${Date.now()}`;

    const newTrip = {
      id: tripId,
      title: `${summary.city} ${summary.daysCount} Günlük Özel Concierge Rotası`,
      city: summary.city,
      country: summary.country,
      dateRangeStr: '01 - 05 Eylül 2026',
      daysRemainingStr: 'Yeni Oluşturuldu ✨',
      isUpcoming: true,
      coverImage: summary.cityImageUrl,
      tags: [...this.selectedInterests()],
      lat: cityData.lat,
      lng: cityData.lng,
      flag: cityData.flag,
    };

    const config = this.generateDynamicTripConfig(newTrip);
    config.id = tripId;
    this.latestTripConfig.set(config);
    this.createdTripConfigs.update(map => ({ ...map, [tripId]: config }));
    this.createdTrips.update(trips => [newTrip, ...trips]);
    this.saveToLocalStorage();
    return newTrip;
  }

  private saveToLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('gidiyorum_created_trips', JSON.stringify(this.createdTrips()));
        localStorage.setItem('gidiyorum_created_trip_configs', JSON.stringify(this.createdTripConfigs()));
      } catch {}
    }
  }

  private loadFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      try {
        const savedTrips = localStorage.getItem('gidiyorum_created_trips');
        const savedConfigs = localStorage.getItem('gidiyorum_created_trip_configs');
        if (savedTrips) {
          const parsed = JSON.parse(savedTrips);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.createdTrips.set(parsed);
          }
        }
        if (savedConfigs) {
          const parsed = JSON.parse(savedConfigs);
          if (parsed && typeof parsed === 'object') {
            this.createdTripConfigs.set(parsed);
          }
        }
      } catch {}
    }
  }

  // Predefined known places dictionary for direct lookup
  readonly knownPlaces: Record<string, any> = {
    'place-roscioli-120': {
      name: 'Roscioli Salumeria con Cucina',
      subtitle: 'Restoran • Trastevere, Roma • €€',
      rating: '4.6',
      reviewCount: '2,410',
      tags: ['İtalyan', 'Taze Makarna', 'Şarküteri', 'Otantik'],
      description: 'Trastevere yakınlarında taze yapılan Cacio e Pepe, Carbonara ve şarküteri çeşitleriyle dünyaca ünlü otantik Roma restoranı.',
      openingHours: '12:30 - 16:00 / 19:00 - 23:30',
      averagePrice: '€€ (25 - 40 €)',
      reservation: 'Şiddetle Önerilir',
      distance: '120 m (Konumunuzdan)',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000',
      lat: 41.8894,
      lng: 12.4705,
    },
    'sch-101': {
      name: 'Giolitti Kafe & Dondurma',
      subtitle: 'Kafe & Tatlı • Roma • €',
      rating: '4.7',
      reviewCount: '5,120',
      tags: ['İtalyan Kahvaltısı', 'Espresso', 'Dondurma', 'Tarihi'],
      description: '1900 yılından beri hizmet veren tarihi mekanda taze kruvasan, espresso ve meşhur Roma dondurması.',
      openingHours: '07:30 - 01:00',
      averagePrice: '€ (5 - 15 €)',
      reservation: 'Gerekli Değil',
      distance: 'Başlangıç Noktası',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000',
      lat: 41.9011,
      lng: 12.4772,
    },
    'sch-102': {
      name: 'Piazza Navona Meydanı & Dört Nehir Çeşmesi',
      subtitle: 'Meydan & Anıt • Roma • Ücretsiz',
      rating: '4.8',
      reviewCount: '12,500',
      tags: ['Barok Mimari', 'Meydan', 'Bernini', 'Sokak Sanatı'],
      description: 'Bernini eserleri, sokak sanatçıları ve Barok mimari atmosferiyle büyüleyici tarihi meydan.',
      openingHours: '24 Saat Açık',
      averagePrice: 'Ücretsiz',
      reservation: 'Gerekli Değil',
      distance: '🚶 400m (5 dk)',
      imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1000',
      lat: 41.8992,
      lng: 12.4731,
    },
    'sch-103': {
      name: 'Pantheon Tapınağı',
      subtitle: 'Antik Eser • Roma • €',
      rating: '4.9',
      reviewCount: '18,900',
      tags: ['Antik Roma', 'Kubbe', 'Tarih', 'Raphael Mezarı'],
      description: 'Antik Roma’dan günümüze en iyi korunmuş kubbeli tapınak yapısı ve Raphael’in mezarı.',
      openingHours: '09:00 - 19:00',
      averagePrice: '€ (5 € Giriş)',
      reservation: 'Hafta sonu önerilir',
      distance: '🚶 350m (4 dk)',
      imageUrl: 'https://images.unsplash.com/photo-1548625361-1845110f0e04?w=1000',
      lat: 41.8986,
      lng: 12.4769,
    },
    'sch-104': {
      name: 'Trevi Aşk Çeşmesi',
      subtitle: 'Anıt & Manzara • Roma • Ücretsiz',
      rating: '4.8',
      reviewCount: '25,400',
      tags: ['Barok', 'Aşk Çeşmesi', 'Dilek Parası', 'İkonik'],
      description: 'Dilek parası atmak için dünyaca ünlü çeşme. Barok heykel sanatının zirvesi.',
      openingHours: '24 Saat Açık',
      averagePrice: 'Ücretsiz',
      reservation: 'Gerekli Değil',
      distance: '🚶 650m (8 dk)',
      imageUrl: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1000',
      lat: 41.9009,
      lng: 12.4833,
    },
    'sch-105': {
      name: 'Da Enzo al 29',
      subtitle: 'Restoran • Trastevere, Roma • €€',
      rating: '4.7',
      reviewCount: '1,820',
      tags: ['İtalyan', 'Taze Makarna', 'Yerel', 'Otantik'],
      description: 'Trastevere’in tarihi ve samimi sokaklarında geleneksel Roma mutfağının en seçkin lezzetlerini sunan otantik bir trattoria.',
      openingHours: '12:30 - 15:00 / 19:30 - 23:00',
      averagePrice: '€€ (20 - 30 €)',
      reservation: 'Önerilir',
      distance: '🚶 1.2 km',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000',
      lat: 41.8894,
      lng: 12.4705,
    },
    'sch-201': {
      name: 'Kolezyum (Colosseum) Antik Amfitiyatro',
      subtitle: 'Dünya Mirası • Roma • €€',
      rating: '4.9',
      reviewCount: '32,000',
      tags: ['Gladyatör', 'Antik Roma', 'Amfitiyatro', 'Dünya Mirası'],
      description: 'Gladyatör dövüşlerine ev sahipliği yapmış dünyanın en büyük antik amfitiyatrosu.',
      openingHours: '08:30 - 19:15',
      averagePrice: '€€ (16 € Giriş)',
      reservation: 'Sıra beklemeden bilet önerilir',
      distance: 'Şehir Merkezinde',
      imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1000',
      lat: 41.8902,
      lng: 12.4922,
    },
    'sch-bcn-101': {
      name: 'Sagrada Família Katedrali',
      subtitle: 'Gaudí Mimarisi • Barselona • €€',
      rating: '4.9',
      reviewCount: '28,500',
      tags: ['Antoni Gaudí', 'Katedral', 'Modernizm', 'Vitray'],
      description: 'Antoni Gaudí’nin tamamlanamayan başyapıtı ve muazzam vitray pencereleri.',
      openingHours: '09:00 - 20:00',
      averagePrice: '€€ (26 € Giriş)',
      reservation: 'Önceden Bilet Alınmalı',
      distance: 'Metro İle Yakın',
      imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1000',
      lat: 41.4036,
      lng: 2.1744,
    },
    'sch-kyo-101': {
      name: 'Fushimi Inari Taisha & Torii Kapıları',
      subtitle: 'Tapınak & Yürüyüş • Kyoto, Japonya • Ücretsiz',
      rating: '4.9',
      reviewCount: '19,400',
      tags: ['Japon Tapınağı', 'Torii Kapısı', 'Şinto', 'Doğa Yolu'],
      description: 'Yüzlerce kiremit kırmızısı torii kapısının altından geçen ikonik ve mistik Japon yürüyüş yolu.',
      openingHours: '24 Saat Açık',
      averagePrice: 'Ücretsiz',
      reservation: 'Gerekli Değil',
      distance: 'Inari İstasyonu Yakını',
      imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000',
      lat: 34.9671,
      lng: 135.7727,
    },
    'sch-ama-101': {
      name: 'Duomo di Amalfi Katedrali & Meydanı',
      subtitle: 'İkonik Katedral • Amalfi, İtalya • €',
      rating: '4.8',
      reviewCount: '4,200',
      tags: ['Bizans Mimarisi', 'Katedral', 'Amalfi Meydanı', 'Tarihi'],
      description: 'Bizans ve Arap mimarisi etkisindeki görkemli merdivenler ve tarihi Amalfi katedral meydanı.',
      openingHours: '10:00 - 18:30',
      averagePrice: '€ (3 € Giriş)',
      reservation: 'Gerekli Değil',
      distance: 'Amalfi Merkezinde',
      imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1000',
      lat: 40.6342,
      lng: 14.6027,
    },
    'sch-izm-101': {
      name: 'Kordon Boyu & Alsancak Kahvaltısı',
      subtitle: 'Geleneksel Kahvaltı • İzmir, Türkiye • €',
      rating: '4.8',
      reviewCount: '3,800',
      tags: ['Ege Kahvaltısı', 'Gevrek', 'Boyoz', 'Deniz Manzarası'],
      description: 'Sıcak İzmir gevreği, boyoz, tulum peyniri ve çay ile Ege deniz kıyısında unutulmaz kahvaltı.',
      openingHours: '07:00 - 23:00',
      averagePrice: '€ (10 - 20 €)',
      reservation: 'Gerekli Değil',
      distance: 'Alsancak Kordon Kıyısında',
      imageUrl: 'https://images.unsplash.com/photo-1527838832700-54595d164a3e?w=1000',
      lat: 38.4350,
      lng: 27.1400,
    },
    'sch-izm-102': {
      name: 'Konak Meydanı & Tarihi Saat Kulesi',
      subtitle: 'Sembol Anıt • İzmir, Türkiye • Ücretsiz',
      rating: '4.9',
      reviewCount: '8,900',
      tags: ['İzmir Sembolü', 'Saat Kulesi', 'Konak Meydanı', 'Tarih'],
      description: '1901 yılında Osmanlı ve Mağrip mimarisi tarzında inşa edilen İzmir’in dünyaca ünlü sembol yapısı.',
      openingHours: '24 Saat Açık',
      averagePrice: 'Ücretsiz',
      reservation: 'Gerekli Değil',
      distance: '🚶 1.5 km (15 dk)',
      imageUrl: 'https://images.unsplash.com/photo-1527838832700-54595d164a3e?w=1000',
      lat: 38.4192,
      lng: 27.1287,
    },
  };

  findPlaceById(id: string): any {
    this.loadFromLocalStorage();

    // 0. Active clicked place item
    const selected = this.selectedPlaceItem();
    if (selected && (selected.id === id || !id || id === 'selected')) {
      return selected;
    }
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = localStorage.getItem('gidiyorum_selected_place');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && (parsed.id === id || parsed.name)) {
            return parsed;
          }
        }
      } catch {}
    }

    // 1. Direct dictionary match
    if (this.knownPlaces[id]) {
      return this.knownPlaces[id];
    }

    // 2. Search all dynamic created trip configs
    const allConfigs = Object.values(this.createdTripConfigs());
    for (const config of allConfigs) {
      if (config.schedulesByDay) {
        for (const dayItems of Object.values(config.schedulesByDay)) {
          const item = (dayItems as any[]).find(i => i.id === id);
          if (item) {
            return {
              name: item.title,
              subtitle: `${item.category || 'Mekan'} • ${config.cityName}, ${config.flag} • €€`,
              rating: '4.8',
              reviewCount: '1,240',
              tags: [item.category ? item.category.replace(/^[^\w\s]+/, '').trim() : 'Mekan', config.cityName, 'Kültür', 'Özel Deneyim'],
              description: item.description || `${config.cityName} şehrinde öne çıkan ve yoğun ilgi gören özel ziyaret noktası.`,
              openingHours: '09:00 - 20:00',
              averagePrice: '€€ (15 - 35 €)',
              reservation: 'Önerilir',
              distance: item.walkingInfo || 'Şehir Merkezinde',
              imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000',
              lat: item.lat || config.mapCenter?.lat || 41.9028,
              lng: item.lng || config.mapCenter?.lng || 12.4964,
            };
          }
        }
      }
    }

    // 3. Extract trip ID from place ID (e.g. place-trip-new-1787770122286-101)
    let extractedTripId = '';
    if (id.startsWith('place-trip-')) {
      const parts = id.split('-');
      if (id.includes('trip-new-')) {
        const timePart = parts[3];
        extractedTripId = `trip-new-${timePart}`;
      } else if (parts.length >= 4) {
        extractedTripId = `trip-${parts[2]}-${parts[3]}`;
      }
    } else if (id.startsWith('sch-dyn-') || id.startsWith('sch-1') || id.startsWith('sch-2')) {
      const latest = this.latestTripConfig();
      if (latest) {
        extractedTripId = latest.id;
      }
    }

    if (extractedTripId) {
      const tripConfig = this.getTripConfig(extractedTripId);
      if (tripConfig && tripConfig.schedulesByDay) {
        for (const dayItems of Object.values(tripConfig.schedulesByDay)) {
          const item = (dayItems as any[]).find(i => i.id === id);
          if (item) {
            return {
              name: item.title,
              subtitle: `${item.category || 'Mekan'} • ${tripConfig.cityName}, ${tripConfig.flag} • €€`,
              rating: '4.8',
              reviewCount: '1,240',
              tags: [item.category ? item.category.replace(/^[^\w\s]+/, '').trim() : 'Mekan', tripConfig.cityName, 'Kültür', 'Özel Deneyim'],
              description: item.description || `${tripConfig.cityName} şehrinde öne çıkan ve yoğun ilgi gören özel ziyaret noktası.`,
              openingHours: '09:00 - 20:00',
              averagePrice: '€€ (15 - 35 €)',
              reservation: 'Önerilir',
              distance: item.walkingInfo || 'Şehir Merkezinde',
              imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000',
              lat: item.lat || tripConfig.mapCenter?.lat || 41.9028,
              lng: item.lng || tripConfig.mapCenter?.lng || 12.4964,
            };
          }
        }

        // Generate tailored place info using tripConfig city
        const city = tripConfig.cityName;
        const flag = tripConfig.flag;
        let placeName = `${city} Öne Çıkan Ziyaret Noktası`;
        let category = 'Gezilecek Yer';

        if (id.includes('101')) {
          placeName = `${city} Merkez Kafe & Yerel Kahvaltı`;
          category = 'Kahvaltı & Kafe';
        } else if (id.includes('102')) {
          placeName = `${city} Tarihi Meydan & İkonik Anıt`;
          category = 'Sembol Anıt';
        } else if (id.includes('103')) {
          placeName = `${city} Kültür & Sanat Müzesi`;
          category = 'Müze & Sanat';
        } else if (id.includes('104')) {
          placeName = `${city} Seyir Terası & Şehir Parkı`;
          category = 'Manzara & Park';
        } else if (id.includes('105')) {
          placeName = `${city} Geleneksel Akşam Yemeği`;
          category = 'Yerel Mutfak';
        } else if (id.includes('201')) {
          placeName = `${city} Eski Şehir Çarşısı & Alışveriş`;
          category = 'Çarşı & Butik';
        }

        return {
          name: placeName,
          subtitle: `${category} • ${city}, ${flag} • €€`,
          rating: '4.8',
          reviewCount: '1,560',
          tags: [category, city, 'Otantik'],
          description: `${city} şehrinde gezginlerin en çok tercih ettiği yerel lezzet ve kültür duraklarından biri.`,
          openingHours: '09:00 - 22:00',
          averagePrice: '€€ (15 - 30 €)',
          reservation: 'Önerilir',
          distance: 'Şehir Merkezinde',
          imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000',
          lat: tripConfig.mapCenter?.lat || 41.9028,
          lng: tripConfig.mapCenter?.lng || 12.4964,
        };
      }
    }

    // 4. Fallback for any custom place ID
    const activeCityData = this.selectedCityData();
    const city = activeCityData.name || 'Destinasyon';
    const country = activeCityData.country || '';
    const flag = activeCityData.flag || '📍';

    let placeName = `${city} Öne Çıkan Ziyaret Noktası`;
    let category = 'Gezilecek Yer';

    if (id.includes('101')) {
      placeName = `${city} Merkez Kafe & Yerel Kahvaltı`;
      category = 'Kahvaltı & Kafe';
    } else if (id.includes('102')) {
      placeName = `${city} Tarihi Meydan & İkonik Anıt`;
      category = 'Sembol Anıt';
    } else if (id.includes('103')) {
      placeName = `${city} Kültür & Sanat Müzesi`;
      category = 'Müze & Sanat';
    } else if (id.includes('104')) {
      placeName = `${city} Seyir Terası & Şehir Parkı`;
      category = 'Manzara & Park';
    } else if (id.includes('105')) {
      placeName = `${city} Geleneksel Akşam Yemeği`;
      category = 'Yerel Mutfak';
    }

    return {
      name: placeName,
      subtitle: `${category} • ${city}, ${flag} • €€`,
      rating: '4.8',
      reviewCount: '1,560',
      tags: [category, city, country, 'Otantik'],
      description: `${city} şehrinde gezginlerin en çok tercih ettiği yerel lezzet ve kültür duraklarından biri.`,
      openingHours: '09:00 - 22:00',
      averagePrice: '€€ (15 - 30 €)',
      reservation: 'Önerilir',
      distance: 'Şehir Merkezinde',
      imageUrl: activeCityData.imageUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000',
      lat: activeCityData.lat || 41.9028,
      lng: activeCityData.lng || 12.4964,
    };
  }
}
