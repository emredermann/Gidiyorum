# ✈️ Gidiyorum — Yapay Zeka Destekli Akıllı Seyahat Asistanı

![Angular](https://img.shields.io/badge/Angular-17.3-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![CI/CD](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

**Gidiyorum**, kullanıcıların gitmek istedikleri şehre, tarih aralıklarına, ilgi alanlarına ve seyahat tarzlarına göre **kişiselleştirilmiş, reaktif ve saat saat optimize edilmiş günlük seyahat rotaları** oluşturan modern bir web uygulamasıdır.

---

## 🌟 Öne Çıkan Özellikler

- 🗺️ **Reaktif & Dinamik Günlük Rotalar (`/trips/:id/itinerary`):**
  - Seçilen şehre özel otantik mekan, katedral, müze, manzara terası ve restorandan oluşan kişiselleştirilmiş seyahat planı.
  - Roma, Paris, Barselona, Prag, Kyoto, Amalfi, İzmir, New York, Tokyo gibi popüler lokasyonlar için özel veritabanı.
  - Dünyanın her yeri için dinamik üreteç desteği.

- 🏛️ **Zengin Mekan Detayları (`/places/:id`):**
  - **2x2 İnteraktif Mikro-Dashboard:** Çalışma saatleri, ortalama fiyatlar, rezervasyon durumu ve mesafe bilgileri.
  - **Detaylı Özellikler Tablosu:** Puan, mekan türü, ideal ziyaret süresi ve temassız ödeme seçenekleri.

- 📅 **Tarih Aralığı Seçici & Tercih Paneli (`/planner/preferences`):**
  - Gidiş ve dönüş tarihlerine göre otomatik gün sayısı hesaplama.
  - Bütçe, yürüme tercihi ve ilgi alanı (Müze, Kahve, Gastronomi vb.) seçimi.

- 🔍 **Canlı Şehir Arama & Hava Durumu:**
  - **OpenStreetMap (Nominatim)** entegrasyonu ile filtrelenmiş canlı şehir araması.
  - **Open-Meteo API** ile anlık hava durumu sıcaklık bilgisi gösterimi.

- 🗺️ **İnteraktif Harita Entegrasyonu:**
  - **Leaflet.js** ile dinamik harita pinleri ve harita üzerinde rota takibi.

---

## 🛠️ Teknoloji Yığını

| Kategori | Teknolojiler |
| :--- | :--- |
| **Frontend Framework** | Angular 17 (Standalone Components & Reactive Signals) |
| **Stil & Tasarım** | Tailwind CSS, Lucide Angular Icons |
| **Harita & Konum** | Leaflet.js, OpenStreetMap Nominatim |
| **API & Veri** | Supabase JS Client, Open-Meteo Weather API |
| **Test & CI/CD** | Karma, Jasmine, GitHub Actions |

---

## 🚀 Kurulum ve Çalıştırma

### 1. Projeyi Klonlayın ve Bağımlılıkları Yükleyin

```bash
git clone https://github.com/KULLANICI_ADI/Gidiyorum.git
cd Gidiyorum
npm install
```

### 2. Geliştirme Sunucusunu Başlatın

```bash
npm start
```
Uygulama varsayılan olarak `http://localhost:4200/` adresinde çalışacaktır.

### 3. Üretim Yapısı (Build) Oluşturun

```bash
npm run build:gh
```

---

## 🧪 Birim Testleri (Unit Testing) & CI/CD

Projeye otomatik birim test kontrolü ve yayınlama hattı eklenmiştir.

### Yerel Ortamda Testleri Çalıştırma

```bash
# Karma arayüzü ile canlı test
npm test

# CI (Headless Chrome) modunda tek seferlik test
npm run test:ci
```

---

## 🤖 Eklenen GitHub Actions CI/CD Pipelineları

Projenize 4 adet uçtan uca üretim seviyesinde **GitHub Actions Workflow** hattı eklenmiştir:

| Workflow Dosyası | Amacı & Tetiklenme Zamanı |
| :--- | :--- |
| **`ci.yml`** | Birim Testler (Headless Chrome), Derleme ve GitHub Pages Otomatik Canlıya Alma. |
| **`code-quality.yml`** | TypeScript Statik Tip Kontrolü (`tsc --noEmit`) & Geliştirici Derleme Denetimi. |
| **`security-audit.yml`** | Bağımlılık Güvenlik Taraması (`npm audit`) & Her Pazartesi Otomatik Zamanlanmış Güvenlik Taraması. |
| **`release-automation.yml`** | Yeni versiyon etiketi (`v*.*.*`) push edildiğinde Otomatik GitHub Release Oluşturma ve Zip Paketleme. |

---

### Pipeline 1: Test, Build & GitHub Pages Deploy (`.github/workflows/ci.yml`)

```yaml
name: Gidiyorum CI / CD Pipeline

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test-and-build:
    name: Unit Test & Build Pipeline
    runs-on: ubuntu-latest

    steps:
      - name: 🔍 Checkout Repository
        uses: actions/checkout@v4

      - name: 🟢 Setup Node.js (v20)
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: 📦 Install Dependencies
        run: npm ci

      - name: 🧪 Run Unit Tests (Headless Chrome)
        run: npm run test:ci

      - name: 🛠️ Build Project
        run: npm run build:gh

      - name: 🚀 Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/gidiyorum/browser
```

### Pipeline 2: Kod Kalitesi ve Tip Kontrolü (`.github/workflows/code-quality.yml`)

Her Pull Request açıldığında TypeScript derleme hatalarını ve tip uyuşmazlıklarını sıfır hata politikasıyla kontrol eder.

### Pipeline 3: Güvenlik Denetimi (`.github/workflows/security-audit.yml`)

Güvenlik açığı barındıran npm paketlerini otomatik denetler ve her Pazartesi zamanlanmış cron ile raporlar.

### Pipeline 4: Otomatik Versiyonlama & Release (`.github/workflows/release-automation.yml`)

Projenize `git tag v1.0.0` ekleyip `git push origin v1.0.0` yaptığınızda otomatik olarak derlenmiş üretimi `.zip` paketler ve GitHub Release oluşturur.

---

### GitHub Üzerinde Pipelineları Aktif Etmek İçin Adımlar

1. Oluşturulan `.github/workflows/` dizinindeki workflow dosyalarını depolunuza commit ve push edin:
   ```bash
   git add .
   git commit -m "feat: Add GitHub Actions CI/CD workflows"
   git push origin main
   ```
2. GitHub reponuzda **Actions** sekmesine gidin. Tüm otomasyonların başarıyla çalıştığını görebilirsiniz.
3. GitHub Pages otomatik yayını için repository ayarlarında **Settings > Pages > Build and deployment** bölümünden Source seçeneğini **gh-pages** dalı olarak ayarlayın.

---

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
