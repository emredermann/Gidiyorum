# 📚 Gidiyorum — Proje Wiki & Geliştirici Dokümantasyon Rehberi

![Gidiyorum Banner](https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200)

**Gidiyorum**, yapay zeka destekli akıllı algoritmalar ve reaktif mimari kullanarak seyahat tutkunlarına özel, saat saat optimize edilmiş kişisel gezi rotaları oluşturan modern bir web platformudur.

Bu Wiki dokümanı, uygulamanın teknik mimarisini, veri akışını, bileşen yapısını, CI/CD süreçlerini ve geliştirici rehberini eksiksiz olarak açıklamaktadır.

---

## 📑 İçindekiler

1. [📌 Mimari ve Teknoloji Yığını](#-mimari-ve-teknoloji-yığını)
2. [📂 Proje Dizin Yapısı](#-proje-dizin-yapısı)
3. [🚀 Ana Modüller ve Kullanıcı Akışları](#-ana-modüller-ve-kullanıcı-akışları)
4. [⚡ Servisler ve Reaktif State Yönetimi](#-servisler-ve-reaktif-state-yönetimi)
5. [🤖 CI/CD Otomasyon Hattı (GitHub Actions)](#-cicd-otomasyon-hattı-github-actions)
6. [🛠️ Kurulum, Test ve Yayına Alma Rehberi](#-kurulum-test-ve-yayına-alma-rehberi)

---

## 📌 Mimari ve Teknoloji Yığını

Gidiyorum, yüksek performans, erişilebilirlik ve sürdürülebilirlik ilkeleri doğrultusunda **Angular 17 Standalone Architecture** ve **Angular Signals** kullanılarak inşa edilmiştir.

### Kullanılan Ana Teknolojiler

- **Core Framework:** Angular 17.3 (Standalone Components, Signals, Control Flow `@if / @for`)
- **Stil & Tasarım:** Tailwind CSS (v3.4), Lucide Angular Icons
- **Harita & Konum:** Leaflet.js, OpenStreetMap Nominatim Geocoding API
- **Hava Durumu:** Open-Meteo Forecast API
- **Veritabanı & Hibrit Katman:** Supabase JS Client + Browser LocalStorage Persistence
- **Test ve CI/CD:** Jasmine, Karma (ChromeHeadlessCI), GitHub Actions

---

## 📂 Proje Dizin Yapısı

```
Gidiyorum/
├── .github/
│   └── workflows/                # GitHub Actions CI/CD Pipeline Dosyaları
│       ├── ci.yml                # Unit Test, Build ve GitHub Pages Deploy
│       ├── code-quality.yml      # TypeScript Tip Kontrolü & Derleme Denetimi
│       ├── security-audit.yml    # npm Güvenlik Açığı Taraması
│       └── release-automation.yml# Otomatik GitHub Release & Zip Paketleme
├── src/
│   ├── app/
│   │   ├── core/                 # Servisler, Modeller ve Mock Veriler
│   │   │   ├── models/           # TypeScript Arabirimleri (Trip, Place, Itinerary)
│   │   │   ├── services/         # TripPlannerService, SupabaseService
│   │   │   └── mock-data.ts      # Varsayılan Mock Veritabanı
│   │   ├── features/             # Uygulama Sayfa Bileşenleri (Features)
│   │   │   ├── itinerary/        # Bugünkü Rotam & Harita (DailyRouteComponent)
│   │   │   ├── places/           # Mekan Detayları (PlaceDetailComponent)
│   │   │   ├── planner/          # Tercihler & Plan Özeti (PreferencesComponent, PlanSummaryComponent)
│   │   │   └── trips/            # Seyahatlerim Listesi (TripsComponent)
│   │   ├── shared/               # Ortak Kullanılan Bileşenler (Header, Cards)
│   │   ├── app.component.ts      # Kök Bileşen
│   │   └── app.routes.ts         # Angular Route Tanımları
│   ├── assets/                   # Statik Görseller ve İkonlar
│   ├── styles.css                # Küresel Stil Dosyası & Tailwind Direktifleri
│   └── main.ts                   # Uygulama Giriş Noktası
├── angular.json                  # Angular CLI Yapılandırması
├── karma.conf.js                 # Karma Unit Test Yapılandırması
├── tsconfig.json                 # TypeScript Ana Yapılandırması
├── tsconfig.spec.json            # TypeScript Test Yapılandırması
└── README.md                     # Genel Proje Özeti
```

---

## 🚀 Ana Modüller ve Kullanıcı Akışları

Uygulama 4 temel kullanıcı akışı etrafında şekillenmektedir:

### 1. Tercihler & Plan Oluşturma (`/planner/preferences` & `/planner/summary`)
- **Canlı Şehir Araması:** OpenStreetMap Nominatim API ile filtrelenmiş canlı arama (mükerrer şehir sonuçları otomatik engellenir).
- **Hava Durumu:** Open-Meteo API ile anlık canlı hava durumu gösterimi.
- **Seyahat Tarih Aralığı Seçici:** Gidiş ve dönüş tarihlerine göre otomatik gün sayısı hesaplama.
- **Kişiselleştirme:** Bütçe (`€`, `€€`, `€€€`), Yürüme Tercihi ve İlgi Alanı (Müze, Kahve, Gastronomi vb.) seçimi.

### 2. Seyahatlerim Listesi (`/trips`)
- Kullanıcının tüm geçmiş ve yaklaşan seyahatlerinin listelendiği yönetim paneli.
- Üst üste binmeyen temiz kart tasarımı, kalan gün rozeti, lokasyon ve etiket gösterimi.

### 3. Bugünkü Rotam & Harita (`/trips/:id/itinerary`)
- **Leaflet.js İnteraktif Harita:** Günlük rotadaki mekanların harita pinleri ve rota çizgileri.
- **Dinamik Şehir Rota Jeneratörü:** Roma, Paris, Barselona, Prag, Kyoto, Amalfi, İzmir, New York, Tokyo gibi popüler şehirler için otantik mekan ve restoran rotaları.
- Saat saat sıralanmış gezi kartları (Süre, yürüme mesafesi ve mekan kategorisi).

### 4. Zengin Mekan Detay Sayfası (`/places/:id`)
- **2x2 İnteraktif Mikro-Dashboard:** Çalışma saatleri, ortalama fiyatlar, rezervasyon durumu ve mesafe.
- **Detaylı Özellikler Tablosu:** Genel puan, mekan türü, ideal ziyaret süresi ve temassız ödeme seçenekleri.
- **Eğlenceli Tooltip'li Buton:** Devre dışı kalmış "Rezervasyon Yap" butonu üzerinde hover ile açılan eğlenceli bilgilendirme tooltip'i (`🔮 Garsonu çağırdık, masanı hazırlıyor!...`).

---

## ⚡ Servisler ve Reaktif State Yönetimi

### `TripPlannerService` (`src/app/core/services/trip-planner.service.ts`)
Uygulamanın kalbini oluşturan merkezi reaktif state deposudur.
- **`createdTrips` & `createdTripConfigs` Signals:** Kullanıcı tarafından oluşturulan seyahatleri ve rotaları saklar.
- **`startDateIso` & `endDateIso` Signals:** Seçilen tarih aralıklarını yönetir ve `daysCount` değerini otomatik hesaplar.
- **`selectPlaceItem(item)`:** Tıklanan mekana özel puan (4.6 - 4.9), değerlendirme sayısı (850 - 4.200) ve konuyla eşleşen Unsplash görsellerini reaktif olarak üretir.
- **`localStorage` Kalıcılığı:** Sayfa yenilendiğinde seyahat verilerinin kaybolmaması için tarayıcı ön belleğiyle senkronize çalışır.

### `SupabaseService` (`src/app/core/services/supabase.service.ts`)
Uygulamanın veritabanı ve kimlik doğrulama katmanıdır. Hem canlı Supabase bağlantısını hem de offline geliştirme için mock modunu destekler.

---

## 🤖 CI/CD Otomasyon Hattı (GitHub Actions)

Projede 4 adet otomatik iş akışı (workflow) tanımlanmıştır:

| Pipeline | Tetikleyici | Görevi |
| :--- | :--- | :--- |
| **`ci.yml`** | Push / Pull Request | Headless Chrome ile Unit Testleri çalıştırır, derler ve `main` dalında GitHub Pages'e yayınlar. |
| **`code-quality.yml`** | Push / Pull Request | TypeScript statik tip denetimi (`tsc --noEmit`) ve derleme denetimi yapar. |
| **`security-audit.yml`** | Push / PR / Her Pazartesi Cron | npm paketlerindeki güvenlik açıklarını tarar. |
| **`release-automation.yml`** | Versiyon Etiketi (`v*.*.*`) Push | Üretim çıktısını `.zip` paketler ve GitHub Release açar. |

---

## 🛠️ Kurulum, Test ve Yayına Alma Rehberi

### Yerel Ortamda Çalıştırma

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm start
```
Uygulama `http://localhost:4200/` adresinde açılacaktır.

### Birim Testleri Çalıştırma

```bash
# Canlı Karma arayüzü ile
npm test

# CI (Headless Chrome) modunda
npm run test:ci
```

### GitHub Pages'e Canlıya Alma

```bash
npm run build:gh
npx angular-cli-ghpages --dir=dist/gidiyorum/browser
```

---

*Bu Wiki dokümanı **Gidiyorum** geliştirici ekibi tarafından sürekli güncellenmektedir.*
