# 🌍 SkyCast - Gelişmiş Hava Durumu Uygulaması

SkyCast, sadece hava durumunu söylemekle kalmayan, aradığınız şehrin atmosferini Unsplash API ile ekranınıza taşıyan, dinamik animasyonlara ve interaktif bir haritaya sahip modern bir web uygulamasıdır.

![Proje Görünümü](https://via.placeholder.com/800x400?text=SkyCast+Hava+Durumu+Uygulaması) ## ✨ Özellikler

* **📍 Akıllı Konum:** Tarayıcı üzerinden mevcut konumunuzu otomatik algılar.
* **📸 Dinamik Arka Plan:** Aranan şehre göre Unsplash API üzerinden otomatik şehir fotoğrafları getirir.
* **🌍 Akıllı Yedekleme:** Fotoğraf bulunamayan şehirlerde 4K kalitesinde optimize edilmiş (WebP) dünya görseli devreye girer.
* **🌦️ Canlı Animasyonlar:** Hava durumuna göre (Yağmur, Kar, Güneş, Bulut) Canvas tabanlı performanslı animasyonlar.
* **🗺️ İnteraktif Harita:** Leaflet.js entegrasyonu ile harita üzerinden tıklanan her noktanın hava durumunu anında öğrenin.
* **⏳ Saatlik Tahmin:** Slider (sürgü) özelliği ile günün ilerleyen saatlerindeki hava durumunu görün.
* **🕒 Son Aramalar:** Kolay erişim için son yaptığınız aramaları hafızada tutar.

## 🚀 Teknolojiler

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **API'ler:** * OpenWeatherMap (Hava durumu verileri)
    * Unsplash (Şehir fotoğrafları)
* **Kütüphaneler:** [Leaflet.js](https://leafletjs.com/) (Harita entegrasyonu)

## 🛠️ Kurulum

1.  Projeyi klonlayın:
    ```bash
    git clone [https://github.com/kullaniciadin/proje-adin.git](https://github.com/kullaniciadin/proje-adin.git)
    ```
2.  Klasöre gidin:
    ```bash
    cd proje-adin
    ```
3.  Gerekli paketleri kurun:
    ```bash
    npm install
    ```
4.  `.env` dosyanızı oluşturun ve API anahtarlarınızı ekleyin:
    ```env
    VITE_WEATHER_API_KEY=api_anahtariniz
    VITE_UNSPLASH_ACCESS_KEY=api_anahtariniz
    ```
5.  Uygulamayı başlatın:
    ```bash
    npm run dev
    ```

## 🎨 Tasarım Detayları

* **Hız:** 10MB'lık arka plan görselleri WebP formatına dönüştürülerek %90 oranında küçültülmüş ve yükleme performansı artırılmıştır.
* **GPU Desteği:** Animasyonlar `requestAnimationFrame` kullanılarak 30 FPS'e sabitlenmiş, cihazın yorulması engellenmiştir.

---
🚀 Bu proje öğrenme ve geliştirme amacıyla tasarlanmıştır.






