import {
  Component,
  inject,
  signal,
  computed,
  OnInit,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Clock, Navigation, ChevronLeft, ChevronRight } from 'lucide-angular';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { UiCardComponent } from '../../shared/components/ui-card/ui-card.component';
import { TripPlannerService } from '../../core/services/trip-planner.service';

export interface DailyScheduleItem {
  id: string;
  time: string;
  title: string;
  category: string;
  duration: string;
  walkingInfo: string;
  description: string;
  imageUrl: string;
  lat: number;
  lng: number;
}

export interface DayOption {
  id: string;
  label: string;
  dateStr: string;
  isToday?: boolean;
}

export interface TripMasterConfig {
  cityName: string;
  flag: string;
  pillTitle: string;
  mapCenter: { lat: number; lng: number };
  dayOptions: DayOption[];
  schedulesByDay: Record<string, DailyScheduleItem[]>;
}

const TRIP_DATA_MAP: Record<string, TripMasterConfig> = {
  'trip-rome-01': {
    cityName: 'Roma',
    flag: '🇮🇹',
    pillTitle: 'Roma Rota Haritası',
    mapCenter: { lat: 41.9011, lng: 12.4772 },
    dayOptions: [
      { id: 'day-1', label: '20 Haz Bugün', dateStr: 'Gün 1', isToday: true },
      { id: 'day-2', label: '21 Haz Yarın', dateStr: 'Gün 2' },
      { id: 'day-3', label: '22 Haz Paz', dateStr: 'Gün 3' },
      { id: 'day-4', label: '23 Haz Pzt', dateStr: 'Gün 4' },
      { id: 'day-5', label: '24 Haz Sal', dateStr: 'Gün 5' },
    ],
    schedulesByDay: {
      'day-1': [
        {
          id: 'place-roscioli-120',
          time: '09:00',
          title: 'Giolitti - Geleneksel İtalyan Kahvaltısı',
          category: '☕ Kafe & Tatlı',
          duration: '45 dk',
          walkingInfo: 'Başlangıç noktası',
          description: '1900 yılından beri hizmet veren tarihi mekanda taze kruvasan, espresso ve meşhur Roma dondurması.',
          imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300',
          lat: 41.9011,
          lng: 12.4772,
        },
        {
          id: 'sch-102',
          time: '10:30',
          title: 'Piazza Navona Meydanı & Dört Nehir Çeşmesi',
          category: '🏛️ Meydan & Anıt',
          duration: '1 saat',
          walkingInfo: '🚶 400m (5 dk yürüyüş)',
          description: 'Bernini eserleri, sokak sanatçıları ve Barok mimari atmosferiyle büyüleyici meydan.',
          imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300',
          lat: 41.8992,
          lng: 12.4731,
        },
        {
          id: 'sch-103',
          time: '12:00',
          title: 'Pantheon Tapınağı',
          category: '🏛️ Antik Eser',
          duration: '1.5 saat',
          walkingInfo: '🚶 350m (4 dk yürüyüş)',
          description: 'Antik Roma’dan günümüze en iyi korunmuş kubbeli tapınak yapısı ve Raphael’in mezarı.',
          imageUrl: 'https://images.unsplash.com/photo-1548625361-1845110f0e04?w=300',
          lat: 41.8986,
          lng: 12.4769,
        },
        {
          id: 'sch-104',
          time: '14:30',
          title: 'Trevi Aşk Çeşmesi',
          category: '⛲ Anıt & Manzara',
          duration: '45 dk',
          walkingInfo: '🚶 650m (8 dk yürüyüş)',
          description: 'Dilek parası atmak için dünyaca ünlü çeşme. Barok heykel sanatının zirvesi.',
          imageUrl: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=300',
          lat: 41.9009,
          lng: 12.4833,
        },
        {
          id: 'sch-105',
          time: '19:00',
          title: 'Trastevere - Osteria Da Enzo',
          category: '🍝 Akşam Yemeği',
          duration: '2 saat',
          walkingInfo: '🚶 1.2 km veya otobüs',
          description: 'Tarihi Trastevere sokaklarında geleneksel Carbonara ve Cacio e Pepe makarna ziyafeti.',
          imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300',
          lat: 41.8894,
          lng: 12.4705,
        },
      ],
      'day-2': [
        {
          id: 'sch-201',
          time: '09:00',
          title: 'Kolezyum (Colosseum) Antik Amfitiyatro',
          category: '🏛️ Dünya Mirası',
          duration: '2.5 saat',
          walkingInfo: 'Başlangıç',
          description: 'Gladyatör dövüşlerine ev sahipliği yapmış dünyanın en büyük amfitiyatrosu.',
          imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300',
          lat: 41.8902,
          lng: 12.4922,
        },
        {
          id: 'sch-202',
          time: '12:00',
          title: 'Roman Forumu ve Palatino Tepesi',
          category: '🏛️ Antik Kent',
          duration: '2 saat',
          walkingInfo: '🚶 200m (3 dk)',
          description: 'Antik Roma imparatorluğunun siyasi, hukuki ve dini merkezi kalıntıları.',
          imageUrl: 'https://images.unsplash.com/photo-1548625361-1845110f0e04?w=300',
          lat: 41.8925,
          lng: 12.4853,
        },
      ],
      'day-3': [
        {
          id: 'place-roscioli-120',
          time: '09:00',
          title: 'Giolitti - Geleneksel İtalyan Kahvaltısı',
          category: '☕ Kafe & Tatlı',
          duration: '45 dk',
          walkingInfo: 'Başlangıç noktası',
          description: '1900 yılından beri hizmet veren tarihi mekanda taze kruvasan, espresso ve meşhur Roma dondurması.',
          imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300',
          lat: 41.9011,
          lng: 12.4772,
        },
        {
          id: 'sch-102',
          time: '10:30',
          title: 'Piazza Navona Meydanı & Dört Nehir Çeşmesi',
          category: '🏛️ Meydan & Anıt',
          duration: '1 saat',
          walkingInfo: '🚶 400m (5 dk yürüyüş)',
          description: 'Bernini eserleri, sokak sanatçıları ve Barok mimari atmosferiyle büyüleyici meydan.',
          imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300',
          lat: 41.8992,
          lng: 12.4731,
        },
        {
          id: 'sch-103',
          time: '12:00',
          title: 'Pantheon Tapınağı',
          category: '🏛️ Antik Eser',
          duration: '1.5 saat',
          walkingInfo: '🚶 350m (4 dk yürüyüş)',
          description: 'Antik Roma’dan günümüze en iyi korunmuş kubbeli tapınak yapısı ve Raphael’in mezarı.',
          imageUrl: 'https://images.unsplash.com/photo-1548625361-1845110f0e04?w=300',
          lat: 41.8986,
          lng: 12.4769,
        },
        {
          id: 'sch-104',
          time: '14:30',
          title: 'Trevi Aşk Çeşmesi',
          category: '⛲ Anıt & Manzara',
          duration: '45 dk',
          walkingInfo: '🚶 650m (8 dk yürüyüş)',
          description: 'Dilek parası atmak için dünyaca ünlü çeşme. Barok heykel sanatının zirvesi.',
          imageUrl: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=300',
          lat: 41.9009,
          lng: 12.4833,
        },
        {
          id: 'sch-105',
          time: '19:00',
          title: 'Trastevere - Osteria Da Enzo',
          category: '🍝 Akşam Yemeği',
          duration: '2 saat',
          walkingInfo: '🚶 1.2 km veya otobüs',
          description: 'Tarihi Trastevere sokaklarında geleneksel Carbonara ve Cacio e Pepe makarna ziyafeti.',
          imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300',
          lat: 41.8894,
          lng: 12.4705,
        },
      ],
      'day-4': [
        {
          id: 'sch-401',
          time: '10:00',
          title: 'Villa Borghese Bahçeleri',
          category: '🌿 Park & Doğa',
          duration: '2 saat',
          walkingInfo: 'Başlangıç',
          description: 'Roma’nın en geniş yeşil park alanı, gölet, bisiklet rotaları ve manzara terasları.',
          imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300',
          lat: 41.9142,
          lng: 12.4921,
        },
        {
          id: 'sch-402',
          time: '13:00',
          title: 'Piazza di Spagna & İspanyol Merdivenleri',
          category: '🏛️ İkonik Meydan',
          duration: '1 saat',
          walkingInfo: '🚶 850m (10 dk)',
          description: 'Çiçeklerle süslü 135 basamaklı tarihi merdivenler ve modanın kalbi Via Condotti.',
          imageUrl: 'https://images.unsplash.com/photo-1548625361-1845110f0e04?w=300',
          lat: 41.9059,
          lng: 12.4827,
        },
      ],
      'day-5': [
        {
          id: 'sch-201',
          time: '09:00',
          title: 'Kolezyum (Colosseum) Antik Amfitiyatro',
          category: '🏛️ Dünya Mirası',
          duration: '2.5 saat',
          walkingInfo: 'Başlangıç',
          description: 'Gladyatör dövüşlerine ev sahipliği yapmış dünyanın en büyük amfitiyatrosu.',
          imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300',
          lat: 41.8902,
          lng: 12.4922,
        },
        {
          id: 'sch-202',
          time: '12:00',
          title: 'Roman Forumu ve Palatino Tepesi',
          category: '🏛️ Antik Kent',
          duration: '2 saat',
          walkingInfo: '🚶 200m (3 dk)',
          description: 'Antik Roma imparatorluğunun siyasi, hukuki ve dini merkezi kalıntıları.',
          imageUrl: 'https://images.unsplash.com/photo-1548625361-1845110f0e04?w=300',
          lat: 41.8925,
          lng: 12.4853,
        },
      ],
    },
  },
  'trip-barcelona-02': {
    cityName: 'Barselona',
    flag: '🇪🇸',
    pillTitle: 'Barselona Rota Haritası',
    mapCenter: { lat: 41.4036, lng: 2.1744 },
    dayOptions: [
      { id: 'day-1', label: '15 Tem Gün 1', dateStr: 'Gün 1', isToday: true },
      { id: 'day-2', label: '16 Tem Gün 2', dateStr: 'Gün 2' },
      { id: 'day-3', label: '17 Tem Gün 3', dateStr: 'Gün 3' },
      { id: 'day-4', label: '18 Tem Gün 4', dateStr: 'Gün 4' },
      { id: 'day-5', label: '19 Tem Gün 5', dateStr: 'Gün 5' },
    ],
    schedulesByDay: {
      'day-1': [
        {
          id: 'sch-bcn-101',
          time: '09:00',
          title: 'Sagrada Família Katedrali',
          category: '🏛️ Gaudí Mimarisi',
          duration: '2 saat',
          walkingInfo: 'Başlangıç noktası',
          description: 'Antoni Gaudí’nin tamamlanamayan başyapıtı ve muazzam vitray pencereleri.',
          imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300',
          lat: 41.4036,
          lng: 2.1744,
        },
        {
          id: 'sch-bcn-102',
          time: '11:30',
          title: 'Park Güell Mozaik Bahçeleri',
          category: '🌿 Park & Sanat',
          duration: '1.5 saat',
          walkingInfo: '🚶 Metro 15 dk',
          description: 'Ejderha merdivenleri ve Barselona sahiline bakan panoramik mozaik teraslar.',
          imageUrl: 'https://images.unsplash.com/photo-1564221710304-0b34c0930a59?w=300',
          lat: 41.4145,
          lng: 2.1527,
        },
      ],
      'day-2': [
        {
          id: 'sch-bcn-201',
          time: '10:00',
          title: 'Barri Gòtic (Tarihi Gotik Mahalle)',
          category: '🏛️ Tarihi Sokaklar',
          duration: '2 saat',
          walkingInfo: 'Başlangıç',
          description: 'Dar Ortaçağ sokakları, Barselona Katedrali ve gizli avlular.',
          imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300',
          lat: 41.3833,
          lng: 2.1764,
        },
      ],
      'day-3': [
        {
          id: 'sch-bcn-301',
          time: '11:00',
          title: 'Casa Batlló & Passeig de Gràcia',
          category: '🎨 Modernizm',
          duration: '1.5 saat',
          walkingInfo: 'Başlangıç',
          description: 'Renkli çatı mimarisi ve lüks alışveriş caddesi.',
          imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=300',
          lat: 41.3916,
          lng: 2.1649,
        },
      ],
      'day-4': [
        {
          id: 'sch-bcn-401',
          time: '12:00',
          title: 'Mercat de la Boqueria & Tapas',
          category: '🍷 Gurme Pazar',
          duration: '2 saat',
          walkingInfo: 'Başlangıç',
          description: 'La Rambla üzerindeki tarihi pazarda taze deniz ürünleri ve sangria tadımı.',
          imageUrl: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=300',
          lat: 41.3817,
          lng: 2.1715,
        },
      ],
      'day-5': [
        {
          id: 'sch-bcn-501',
          time: '17:00',
          title: 'Barceloneta Sahili & Deniz Ürünleri',
          category: '🏖️ Sahil',
          duration: '2 saat',
          walkingInfo: 'Başlangıç',
          description: 'Akdeniz esintisinde taze paella ve sahil yürüyüşü.',
          imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300',
          lat: 41.3784,
          lng: 2.1925,
        },
      ],
    },
  },
  'trip-kyoto-03': {
    cityName: 'Kyoto',
    flag: '🇯🇵',
    pillTitle: 'Kyoto & Tokyo Rota Haritası',
    mapCenter: { lat: 35.0037, lng: 135.7772 },
    dayOptions: [
      { id: 'day-1', label: '12 Eki Gün 1', dateStr: 'Gün 1', isToday: true },
      { id: 'day-2', label: '13 Eki Gün 2', dateStr: 'Gün 2' },
      { id: 'day-3', label: '14 Eki Gün 3', dateStr: 'Gün 3' },
      { id: 'day-4', label: '15 Eki Gün 4', dateStr: 'Gün 4' },
    ],
    schedulesByDay: {
      'day-1': [
        {
          id: 'sch-kyo-101',
          time: '08:30',
          title: 'Fushimi Inari Taisha (Kırmızı Torii Kapıları)',
          category: '⛩️ Şinto Tapınağı',
          duration: '2 saat',
          walkingInfo: 'Başlangıç',
          description: 'Dağa doğru uzanan 10.000 kırmızı Torii kapısından geçen büyüleyici patika.',
          imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300',
          lat: 34.9671,
          lng: 135.7727,
        },
      ],
      'day-2': [
        {
          id: 'sch-kyo-201',
          time: '11:30',
          title: 'Kiyomizu-dera Ahşap Teras Tapınağı',
          category: '🏛️ Dünya Mirası',
          duration: '1.5 saat',
          walkingInfo: 'Başlangıç',
          description: 'Çivisiz ahşap mimarisi ve Kyoto vadisine bakan muhteşem manzara.',
          imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300',
          lat: 34.9949,
          lng: 135.7850,
        },
      ],
      'day-3': [
        {
          id: 'sch-kyo-301',
          time: '14:30',
          title: 'Gion Mahallesi & Çay Seremonisi',
          category: '🍵 Kültür & Geyşa',
          duration: '2 saat',
          walkingInfo: 'Başlangıç',
          description: 'Tarihi ahşap Machiya evleri ve geleneksel Matcha çay deneyimi.',
          imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300',
          lat: 35.0037,
          lng: 135.7772,
        },
      ],
      'day-4': [
        {
          id: 'sch-kyo-401',
          time: '16:00',
          title: 'Arashiyama Bambu Ormanı',
          category: '🌿 Doğa',
          duration: '2 saat',
          walkingInfo: 'Başlangıç',
          description: 'Büyüleyici bambu sesleri eşliğinde huzurlu doğa yürüyüşü.',
          imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300',
          lat: 35.0116,
          lng: 135.6777,
        },
      ],
    },
  },
  'trip-amalfi-04': {
    cityName: 'Amalfi',
    flag: '🇮🇹',
    pillTitle: 'Amalfi Kıyıları Rota Haritası',
    mapCenter: { lat: 40.6340, lng: 14.6027 },
    dayOptions: [
      { id: 'day-1', label: '05 Kas Gün 1', dateStr: 'Gün 1', isToday: true },
      { id: 'day-2', label: '06 Kas Gün 2', dateStr: 'Gün 2' },
      { id: 'day-3', label: '07 Kas Gün 3', dateStr: 'Gün 3' },
    ],
    schedulesByDay: {
      'day-1': [
        {
          id: 'sch-aml-101',
          time: '09:30',
          title: 'Sant’Andrea Katedrali & Amalfi Meydanı',
          category: '🏛️ Tarihi Yapı',
          duration: '1.5 saat',
          walkingInfo: 'Başlangıç',
          description: 'Bizans etkili görkemli merdivenler ve limoncello tadımı.',
          imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300',
          lat: 40.6340,
          lng: 14.6027,
        },
      ],
      'day-2': [
        {
          id: 'sch-aml-102',
          time: '12:00',
          title: 'Ravello Tepesi & Villa Rufolo Bahçeleri',
          category: '🌿 Manzara & Bahçe',
          duration: '2 saat',
          walkingInfo: 'Başlangıç',
          description: 'Sonsuzluk terasından Akdeniz’e bakan efsanevi villa bahçeleri.',
          imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300',
          lat: 40.6493,
          lng: 14.6117,
        },
      ],
      'day-3': [
        {
          id: 'sch-aml-103',
          time: '15:30',
          title: 'Positano Dik Yokuşları & Rengarenk Evler',
          category: '🏖️ Sahil Kasabası',
          duration: '2 saat',
          walkingInfo: 'Başlangıç',
          description: 'Kayalıklara tutunmuş dikey Positano mimarisi ve plaj rotası.',
          imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300',
          lat: 40.6281,
          lng: 14.4850,
        },
      ],
    },
  },
  'trip-paris-05': {
    cityName: 'Paris',
    flag: '🇫🇷',
    pillTitle: 'Paris Rota Haritası',
    mapCenter: { lat: 48.8584, lng: 2.2945 },
    dayOptions: [
      { id: 'day-1', label: '10 May Gün 1', dateStr: 'Gün 1', isToday: true },
      { id: 'day-2', label: '11 May Gün 2', dateStr: 'Gün 2' },
      { id: 'day-3', label: '12 May Gün 3', dateStr: 'Gün 3' },
    ],
    schedulesByDay: {
      'day-1': [
        {
          id: 'sch-par-101',
          time: '09:00',
          title: 'Eyfel Kulesi (Tour Eiffel) & Trocadéro',
          category: '🗼 Sembol Yapı',
          duration: '2 saat',
          walkingInfo: 'Başlangıç',
          description: 'Paris’in simgesi kulenin zirvesinden panoramik şehir manzarası.',
          imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300',
          lat: 48.8584,
          lng: 2.2945,
        },
      ],
      'day-2': [
        {
          id: 'sch-par-102',
          time: '11:30',
          title: 'Louvre Müzesi & Cam Piramit',
          category: '🎨 Müze & Sanat',
          duration: '2.5 saat',
          walkingInfo: 'Başlangıç',
          description: 'Mona Lisa, Semadirekli Kanatlı Zafer ve klasik Fransız sanatı.',
          imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300',
          lat: 48.8606,
          lng: 2.3376,
        },
      ],
      'day-3': [
        {
          id: 'sch-par-103',
          time: '18:00',
          title: 'Le Marais Mahallesi & Fransız Butikleri',
          category: '🛍️ Moda & Kafe',
          duration: '2 saat',
          walkingInfo: 'Başlangıç',
          description: 'Tarihi malikaneler, taze kruvasanlar ve şık sanat galerileri.',
          imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300',
          lat: 48.8575,
          lng: 2.3582,
        },
      ],
    },
  },
  'trip-copenhagen-06': {
    cityName: 'Kopenhag',
    flag: '🇩🇰',
    pillTitle: 'Kopenhag Rota Haritası',
    mapCenter: { lat: 55.6761, lng: 12.5683 },
    dayOptions: [
      { id: 'day-1', label: '01 Nis Gün 1', dateStr: 'Gün 1', isToday: true },
      { id: 'day-2', label: '02 Nis Gün 2', dateStr: 'Gün 2' },
      { id: 'day-3', label: '03 Nis Gün 3', dateStr: 'Gün 3' },
    ],
    schedulesByDay: {
      'day-1': [
        {
          id: 'sch-cph-101',
          time: '09:00',
          title: 'Nyhavn Rengarenk Liman Evleri',
          category: '⛵ Liman & Kanal',
          duration: '1.5 saat',
          walkingInfo: 'Başlangıç',
          description: 'Hans Christian Andersen’in yaşadığı renkli liman evleri ve kanal turu.',
          imageUrl: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=300',
          lat: 55.6797,
          lng: 12.5915,
        },
      ],
      'day-2': [
        {
          id: 'sch-cph-102',
          time: '11:30',
          title: 'Amalienborg Kraliyet Sarayı',
          category: '🏛️ Saray & Nöbet',
          duration: '1.5 saat',
          walkingInfo: 'Başlangıç',
          description: 'Danimarka Kraliyet Ailesi ikametgahı ve geleneksel muhafız değişim merasimi.',
          imageUrl: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=300',
          lat: 55.6841,
          lng: 12.5932,
        },
      ],
      'day-3': [
        {
          id: 'sch-cph-103',
          time: '14:00',
          title: 'Küçük Deniz Kızı Heykeli (Den Lille Havfrue)',
          category: '🗿 Sembol Anıt',
          duration: '45 dk',
          walkingInfo: 'Başlangıç',
          description: 'Sahil kayalarında Kopenhag’ın en meşhur bronz heykeli.',
          imageUrl: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=300',
          lat: 55.6889,
          lng: 12.5988,
        },
      ],
    },
  },
  'trip-cappadocia-07': {
    cityName: 'Kapadokya',
    flag: '🇹🇷',
    pillTitle: 'Kapadokya Rota Haritası',
    mapCenter: { lat: 38.6431, lng: 34.8289 },
    dayOptions: [
      { id: 'day-1', label: '18 Şub Gün 1', dateStr: 'Gün 1', isToday: true },
      { id: 'day-2', label: '19 Şub Gün 2', dateStr: 'Gün 2' },
      { id: 'day-3', label: '20 Şub Gün 3', dateStr: 'Gün 3' },
    ],
    schedulesByDay: {
      'day-1': [
        {
          id: 'sch-cap-101',
          time: '05:30',
          title: 'Göreme Sıcak Hava Balon Gün Doğumu',
          category: '🎈 Balon & Manzara',
          duration: '2 saat',
          walkingInfo: 'Transfer',
          description: 'Yüzlerce balon eşliğinde Kapadokya vadileri üzerinde gün doğumu.',
          imageUrl: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=300',
          lat: 38.6431,
          lng: 34.8289,
        },
      ],
      'day-2': [
        {
          id: 'sch-cap-102',
          time: '10:00',
          title: 'Göreme Açık Hava Müzesi & Kaya Kiliseleri',
          category: '🏛️ Dünya Mirası',
          duration: '2 saat',
          walkingInfo: 'Başlangıç',
          description: 'Karanlık Kilise ve Elmalı Kilise’deki eşsiz fresco ve kaya mimarisi.',
          imageUrl: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=300',
          lat: 38.6403,
          lng: 34.8298,
        },
      ],
      'day-3': [
        {
          id: 'sch-cap-103',
          time: '14:00',
          title: 'Paşabağları (Rahipler Vadisi) Peri Bacaları',
          category: '🗿 Doğa Harikası',
          duration: '1.5 saat',
          walkingInfo: 'Başlangıç',
          description: 'Çok başlı mantar formundaki şapkalı peri bacaları yürüyüşü.',
          imageUrl: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=300',
          lat: 38.6775,
          lng: 34.8536,
        },
      ],
    },
  },
  'trip-london-08': {
    cityName: 'Londra',
    flag: '🇬🇧',
    pillTitle: 'Londra Rota Haritası',
    mapCenter: { lat: 51.5007, lng: -0.1246 },
    dayOptions: [
      { id: 'day-1', label: '05 Ara Gün 1', dateStr: 'Gün 1', isToday: true },
      { id: 'day-2', label: '06 Ara Gün 2', dateStr: 'Gün 2' },
      { id: 'day-3', label: '07 Ara Gün 3', dateStr: 'Gün 3' },
    ],
    schedulesByDay: {
      'day-1': [
        {
          id: 'sch-lon-101',
          time: '09:00',
          title: 'Big Ben & Westminster Katedrali',
          category: '🏛️ Sembol Saat Kulesi',
          duration: '1.5 saat',
          walkingInfo: 'Başlangıç',
          description: 'Elizabeth Kulesi (Big Ben) ve Kraliyet taç giyme bazilikası.',
          imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300',
          lat: 51.5007,
          lng: -0.1246,
        },
      ],
      'day-2': [
        {
          id: 'sch-lon-102',
          time: '11:30',
          title: 'London Eye Panoramik Kapsül',
          category: '🎡 Manzara',
          duration: '1 saat',
          walkingInfo: 'Başlangıç',
          description: 'Thames Nehri üzerinde 135 metre yükseklikten Londra panoraması.',
          imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300',
          lat: 51.5033,
          lng: -0.1195,
        },
      ],
      'day-3': [
        {
          id: 'sch-lon-103',
          time: '14:00',
          title: 'British Museum Tarih & Sanat Koleksiyonu',
          category: '🎨 Dünya Müzesi',
          duration: '2.5 saat',
          walkingInfo: 'Başlangıç',
          description: 'Rosetta Taşı, Mısır mumyaları ve antik dünya medeniyetleri.',
          imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300',
          lat: 51.5194,
          lng: -0.1270,
        },
      ],
    },
  },
};

@Component({
  selector: 'app-daily-route',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    HeaderComponent,
    UiCardComponent,
  ],
  template: `
    <div id="daily-route-page" class="min-h-screen bg-background pb-20">
      <!-- 1. Üst Alan & Başlık -->
      <app-header [title]="pageTitle()" [showNotifications]="true"></app-header>

      <!-- Gün Seçici (Sola / Sağa Kaydırılabilir Monocle Style Pill Bar) -->
      <div id="daily-route-day-picker-sticky" class="bg-[#F9F8F6]/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-black/[0.05] dark:border-white/10 sticky top-14 z-30">
        <div id="daily-route-day-picker-wrapper" class="relative max-w-2xl mx-auto flex items-center px-2 py-2">

          <!-- Sol Kaydırma Butonu -->
          <button
            type="button"
            (click)="scrollDaysLeft()"
            class="flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-black/[0.08] dark:border-white/10 shadow-sm flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-700 transition-all mr-1.5 z-10 cursor-pointer"
            title="Sola Kaydır"
          >
            <lucide-icon [img]="ChevronLeftIcon" [size]="16" strokeWidth="2"></lucide-icon>
          </button>

          <!-- Scrollable Pill Bar Container -->
          <div
            #dayScrollContainer
            id="daily-route-day-picker-container"
            class="flex-1 flex items-center gap-2 overflow-x-auto scroll-smooth hide-scrollbar px-1 py-1"
          >
            @for (day of activeDayOptions(); track day.id) {
              <button
                type="button"
                (click)="selectDay(day)"
                [ngClass]="{
                  'bg-obsidian text-white border-obsidian shadow-sm dark:bg-gold dark:text-stone-950 dark:border-gold': selectedDay().id === day.id,
                  'bg-white text-stone-600 border-black/[0.06] dark:bg-stone-800 dark:text-stone-300 dark:border-white/10': selectedDay().id !== day.id
                }"
                class="flex-shrink-0 px-4 py-2 rounded-full border text-xs font-bold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                @if (day.isToday) {
                  <span
                    [ngClass]="{
                      'bg-gold': selectedDay().id === day.id,
                      'bg-obsidian dark:bg-gold': selectedDay().id !== day.id
                    }"
                    class="w-1.5 h-1.5 rounded-full"
                  ></span>
                }
                <span>{{ day.label }}</span>
                <span class="opacity-60 font-normal text-[11px]">({{ day.dateStr }})</span>
              </button>
            }
          </div>

          <!-- Sağ Kaydırma Butonu -->
          <button
            type="button"
            (click)="scrollDaysRight()"
            class="flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-black/[0.08] dark:border-white/10 shadow-sm flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-700 transition-all ml-1.5 z-10 cursor-pointer"
            title="Sağa Kaydır"
          >
            <lucide-icon [img]="ChevronRightIcon" [size]="16" strokeWidth="2"></lucide-icon>
          </button>

        </div>
      </div>

      <!-- 2. Harita Bileşeni (Monocle / Airbnb Luxe Style Map) -->
      <div id="daily-route-map-wrapper" class="relative w-full h-64 sm:h-80 bg-stone-100 border-b border-black/[0.05] overflow-hidden">
        <div id="daily-route-map" class="w-full h-full"></div>

        <!-- Harita Yükleniyor Overlay -->
        @if (!mapLoaded()) {
          <div id="daily-route-map-loading-overlay" class="absolute inset-0 bg-[#F2F0EB] flex items-center justify-center pointer-events-none">
            <div id="daily-route-map-loading-box" class="text-center">
              <span class="text-3xl animate-bounce">🗺️</span>
              <p class="text-xs font-semibold text-stone-500 mt-2">Harita Yükleniyor...</p>
            </div>
          </div>
        }

        <!-- Quiet Luxury Floating City Info Pill -->
        <div id="daily-route-city-pill" class="absolute top-4 right-4 z-10 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/[0.05] dark:border-white/10 shadow-subtle flex items-center gap-2">
          <span class="text-xs">{{ activeTripConfig().flag }}</span>
          <span class="text-xs font-bold text-stone-950 dark:text-white">{{ activeTripConfig().pillTitle }}</span>
          <span class="text-[10px] text-stone-900 dark:text-stone-100 font-bold px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded-full border border-black/[0.05] dark:border-white/10">
            {{ currentSchedule().length }} Durak
          </span>
        </div>
      </div>

      <!-- 3. Zaman Çizelgesi (Linear / Quiet Luxury Timeline) -->
      <div id="daily-route-timeline-container" class="max-w-2xl mx-auto px-4 py-8">

        <!-- Mükerrer Gün Uyarısı Banner -->
        @if (hasDuplicateDays()) {
          <div id="daily-route-duplicate-warning-banner" class="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3 text-amber-900 dark:text-amber-300 shadow-sm">
            <span class="text-lg leading-none">⚠️</span>
            <div class="text-xs">
              <h4 class="font-bold">Mükerrer Plan Tespit Edildi</h4>
              <p class="mt-0.5 opacity-90 leading-relaxed">
                Bu seyahat rotasında aynı içeriğe sahip tekrarlayan günler tespit edildi. Mükerrer günler elenerek yalnızca ilk gün gösterilmektedir.
              </p>
            </div>
          </div>
        }

        <div id="daily-route-timeline-header" class="flex items-center justify-between mb-6">
          <div id="daily-route-timeline-title-box">
            <h2 class="text-base font-bold text-stone-950 tracking-tight">Günün Akışı ⏰</h2>
            <p class="text-xs text-stone-500">Saat saat optimize edilmiş rotanız</p>
          </div>
          <span class="text-xs font-semibold text-stone-400">
            Toplam {{ currentSchedule().length }} Mekan
          </span>
        </div>

        <!-- Timeline Container -->
        <div id="daily-route-timeline-list" class="relative pl-3 space-y-6">

          <!-- Hairline Vertical Line -->
          <div id="daily-route-timeline-vertical-line" class="absolute left-6 top-3 bottom-6 w-px bg-black/[0.08]"></div>

          @for (item of currentSchedule(); track item.id; let i = $index) {
            <div [id]="'daily-route-item-row-' + item.id" class="relative flex items-start gap-4 group">

              <!-- Monocle Donut Marker Ring Node -->
              <div [id]="'daily-route-marker-node-' + item.id" class="relative z-10 flex-shrink-0 w-7 h-7 rounded-full bg-obsidian text-white font-bold text-xs flex items-center justify-center shadow-sm border-2 border-white ring-1 ring-black/10">
                {{ i + 1 }}
              </div>

              <!-- Content Card -->
              <div [id]="'daily-route-item-card-' + item.id" class="flex-1 bg-white rounded-3xl p-4 border border-black/[0.05] shadow-subtle hover:shadow-luxe transition-all duration-300">

                <div [id]="'daily-route-card-content-' + item.id" class="flex items-start justify-between gap-3">
                  <!-- Sol / Orta Alan -->
                  <div [id]="'daily-route-card-main-' + item.id" class="flex-1 min-w-0">

                    <!-- Saat & Kategori Badges -->
                    <div [id]="'daily-route-card-badges-' + item.id" class="flex items-center flex-wrap gap-2 mb-1.5">
                      <span class="inline-flex items-center gap-1 font-bold text-xs px-2.5 py-0.5 bg-stone-100 text-stone-900 rounded-full">
                        <lucide-icon [img]="ClockIcon" [size]="12" strokeWidth="1.5"></lucide-icon>
                        {{ item.time }}
                      </span>
                      <span class="text-[11px] font-medium px-2.5 py-0.5 bg-stone-50 text-stone-600 rounded-full border border-black/[0.03]">
                        {{ item.category }}
                      </span>
                    </div>

                    <!-- Mekan Adı -->
                    <a
                      [routerLink]="['/places', item.id]"
                      class="font-bold text-sm sm:text-base text-stone-950 leading-snug group-hover:text-gold transition-colors block cursor-pointer"
                    >
                      {{ item.title }}
                    </a>

                    <!-- Açıklama -->
                    <p class="text-xs text-stone-500 mt-1 leading-relaxed line-clamp-2">
                      {{ item.description }}
                    </p>

                    <!-- Süre & Yürüyüş Detayları -->
                    <div [id]="'daily-route-card-duration-' + item.id" class="flex items-center gap-3 mt-3 pt-2.5 border-t border-black/[0.04] text-[11px] text-stone-400 font-medium">
                      <span class="flex items-center gap-1">⏱️ {{ item.duration }}</span>
                      <span>•</span>
                      <span class="flex items-center gap-1">{{ item.walkingInfo }}</span>
                    </div>
                  </div>

                  <!-- Sağ Alan: Yuvarlak Küçük Önizleme Görseli -->
                  <div [id]="'daily-route-card-thumb-' + item.id" class="relative flex-shrink-0">
                    <a [routerLink]="['/places', item.id]">
                      <img
                        [src]="item.imageUrl"
                        [alt]="item.title"
                        class="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-black/[0.06] shadow-sm group-hover:scale-105 transition-transform cursor-pointer"
                      />
                    </a>
                  </div>
                </div>

                <!-- Yol Tarifi Al Butonu -->
                <div [id]="'daily-route-card-action-' + item.id" class="mt-3 text-right">
                  <button
                    type="button"
                    (click)="openGoogleMaps(item)"
                    class="inline-flex items-center gap-1 text-xs font-bold text-stone-900 hover:text-gold transition-colors"
                  >
                    <span>Yol tarifi al</span>
                    <lucide-icon [img]="NavigationIcon" [size]="12" strokeWidth="1.5"></lucide-icon>
                  </button>
                </div>

              </div>

            </div>
          }

        </div>

      </div>
    </div>
  `,
})
export class DailyRouteComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  planner = inject(TripPlannerService);

  @ViewChild('dayScrollContainer') dayScrollContainer!: ElementRef<HTMLDivElement>;

  mapLoaded = signal(false);
  private mapInstance: any = null;

  protected ClockIcon = Clock;
  protected NavigationIcon = Navigation;
  protected ChevronLeftIcon = ChevronLeft;
  protected ChevronRightIcon = ChevronRight;

  scrollDaysLeft() {
    if (this.dayScrollContainer?.nativeElement) {
      this.dayScrollContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }

  scrollDaysRight() {
    if (this.dayScrollContainer?.nativeElement) {
      this.dayScrollContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }

  activeTripId = signal<string>('trip-rome-01');

  activeTripConfig = computed(() => {
    const id = this.activeTripId();
    return TRIP_DATA_MAP[id] || TRIP_DATA_MAP['trip-rome-01'];
  });

  pageTitle = computed(() => `${this.activeTripConfig().cityName} Rotam 📍`);

  filteredDaysResult = computed(() => {
    const config = this.activeTripConfig();
    const options = config.dayOptions || [];
    const seenSignatures = new Set<string>();
    const uniqueDays: DayOption[] = [];
    let foundDup = false;

    for (const day of options) {
      const schedule = config.schedulesByDay[day.id] || [];
      const signature = this.getScheduleSignature(schedule);

      if (seenSignatures.has(signature)) {
        foundDup = true;
      } else {
        seenSignatures.add(signature);
        uniqueDays.push(day);
      }
    }

    return { uniqueDays, foundDup };
  });

  activeDayOptions = computed(() => this.filteredDaysResult().uniqueDays);
  hasDuplicateDays = computed(() => this.filteredDaysResult().foundDup);

  selectedDay = signal<DayOption>({ id: 'day-1', label: '1. Gün', dateStr: 'Gün 1' });
  currentSchedule = signal<DailyScheduleItem[]>([]);

  private getScheduleSignature(items: DailyScheduleItem[]): string {
    if (!items || items.length === 0) return 'empty';
    return items.map(item => `${item.title.trim()}-${item.time}`).sort().join('|');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const paramId = params.get('id');
      const queryId = this.route.snapshot.queryParamMap.get('tripId');
      const targetId = paramId || queryId || 'trip-rome-01';
      this.loadTrip(targetId);
    });
  }

  private loadTrip(targetId: string) {
    if (TRIP_DATA_MAP[targetId]) {
      this.activeTripId.set(targetId);
    } else {
      this.activeTripId.set('trip-rome-01');
    }

    const config = this.activeTripConfig();
    const validDays = this.activeDayOptions();
    const initialDay = validDays.length > 0 ? validDays[0] : (config.dayOptions[0] || { id: 'day-1', label: '1. Gün', dateStr: 'Gün 1' });

    this.selectedDay.set(initialDay);
    const schedule = config.schedulesByDay[initialDay.id] || config.schedulesByDay['day-1'] || [];
    this.currentSchedule.set(schedule);

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.renderMap(), 50);
    }
  }

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      await this.renderMap();
    }
  }

  ngOnDestroy() {
    if (this.mapInstance) {
      try {
        this.mapInstance.off();
        this.mapInstance.remove();
      } catch {}
      this.mapInstance = null;
    }
  }

  selectDay(day: DayOption) {
    this.selectedDay.set(day);
    const config = this.activeTripConfig();
    const schedule = config.schedulesByDay[day.id] || config.schedulesByDay['day-1'] || [];
    this.currentSchedule.set(schedule);
    if (isPlatformBrowser(this.platformId)) {
      this.renderMap();
    }
  }

  openGoogleMaps(item: DailyScheduleItem) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`, '_blank');
  }

  private async renderMap() {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const container = document.getElementById('daily-route-map');
      if (!container) return;

      if (this.mapInstance) {
        try {
          this.mapInstance.off();
          this.mapInstance.remove();
        } catch {}
        this.mapInstance = null;
      }

      if ((container as any)._leaflet_id) {
        (container as any)._leaflet_id = null;
      }

      const L = await import('leaflet');

      (L.Icon.Default.prototype as any)._getIconUrl = undefined;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const schedule = this.currentSchedule();
      const config = this.activeTripConfig();
      const firstLoc = (schedule && schedule.length > 0)
        ? { lat: schedule[0].lat, lng: schedule[0].lng }
        : config.mapCenter;

      const map = L.map(container, {
        zoomControl: true,
        scrollWheelZoom: false,
      }).setView([firstLoc.lat, firstLoc.lng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      const bounds: [number, number][] = [];
      const latLngs: [number, number][] = [];

      if (schedule && schedule.length > 0) {
        schedule.forEach((item, index) => {
          const coords: [number, number] = [item.lat, item.lng];
          bounds.push(coords);
          latLngs.push(coords);

          const customMarkerHtml = `
            <div style="background-color:#0F1012;color:white;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:11px;border:2px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.2)">
              ${index + 1}
            </div>
          `;

          const customIcon = L.divIcon({
            html: customMarkerHtml,
            className: 'custom-leaflet-marker',
            iconSize: [26, 26],
            iconAnchor: [13, 13],
          });

          L.marker(coords, { icon: customIcon })
            .bindPopup(
              `<div style="font-family:sans-serif;padding:2px">
                <span style="font-size:10px;color:#C5A880;font-weight:bold">${item.time}</span>
                <br><b>${item.title}</b>
                <br><small style="color:#666">${item.category}</small>
              </div>`
            )
            .addTo(map);
        });
      }

      if (latLngs.length > 1) {
        L.polyline(latLngs, {
          color: '#0F1012',
          weight: 2.5,
          opacity: 0.7,
          dashArray: '6, 6',
        }).addTo(map);
      }

      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [35, 35] });
      }

      this.mapInstance = map;
      this.mapLoaded.set(true);

      setTimeout(() => {
        try {
          map.invalidateSize();
        } catch {}
      }, 250);
    } catch (e) {
      console.error('Daily route Leaflet render error:', e);
      this.mapLoaded.set(true);
    }
  }
}
