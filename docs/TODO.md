# Kalan işler

İletişim bilgileri **gerçek verilerle dolduruldu**:
telefon `0555 454 55 35`, WhatsApp `wa.me/905554545535`,
Instagram `@cleanled.tr`. Aşağıdakiler hâlâ yer tutucu.

---

## 1. Hero arka plan fotoğrafı — EN YÜKSEK ETKİ

Hero'da "el feneri" etkisi var: imleç bir LED huzmesi gibi arkadaki
katmanı aydınlatıyor. Şu an aydınlanan şey CSS ile çizilmiş ışık
çizgileri. **Gerçek bir fotoğraf koyunca etki asıl anlamını kazanır.**

`index.html` içinde:
```html
<div class="hero__stage" style="--hero-image:url('./assets/images/hero.webp')"></div>
```

İdeal fotoğraf (Instagram'daki içeriklerden biri birebir uyuyor):
- **Karanlık araç içi**, ürün çalışırken, LED ışığı görünüyor
- Yatay, 1920×1080 civarı
- **WebP, 200KB altı**
- Sol taraf koyu/sade olmalı — başlık metni orada duruyor

Dönüştürme:
```bash
magick foto.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 78 assets/images/hero.webp
```

## 2. Tanıtım videosu

`.video-slot` içine gerçek video geldiğinde:
```html
<video src="./assets/video/tanitim.mp4"
       poster="./assets/images/video-poster.webp"
       controls preload="none" playsinline></video>
```
- `preload="none"` önemli: kullanıcı oynatmazsa tek byte inmez
- `poster` olmadan video siyah kare görünür
- 16:9, H.264 mp4, 1080p, 10 MB altı
- Instagram Reels'lerden biri doğrudan kullanılabilir

## 3. Galeri görselleri (4 adet)

Her `.media-slot` kutusunu şununla değiştir:
```html
<a class="media-slot" href="INSTAGRAM_GONDERI_LINKI" target="_blank" rel="noopener">
  <img src="./assets/images/ig-1.webp" alt="Ürün koltuk altını temizlerken"
       width="600" height="600" loading="lazy">
</a>
```
- Kare (1:1), 600×600, WebP, her biri 80KB altı
- `alt` metni gerçekten görselde ne olduğunu anlatmalı
  ("ürün fotoğrafı" değil → "LED ışıkla koltuk altı temizliği")

Toplu dönüştürme:
```bash
magick ig-ham-1.jpg -resize 600x600^ -gravity center -extent 600x600 -quality 82 assets/images/ig-1.webp
```

## 4. og:image — paylaşım kartı

1200×630 px. WhatsApp'ta link paylaşılınca çıkan görsel.
Instagram'daki logo görseli iyi bir başlangıç (kare olduğu için
1200×630 tuvale ortalanmalı).
`assets/images/og-cover.jpg` olarak kaydet.

## 5. Favicon

Şu an data URI ile çizilmiş basit bir ikon var.
Gerçek logodan `favicon.svg` + `apple-touch-icon.png` (180×180) üret.

## 6. Alan adı

`<link rel="canonical">` ve `og:url` şu an GitHub Pages adresini
gösteriyor. Alan adı alınınca ikisi de güncellenmeli.

---

## Repo temizliği

Kökte commit'lenmiş, kullanılmayan iki dosya:

```bash
git rm --cached .DS_Store
git rm "WhatsApp Image 2026-06-06 at 13.53.25.jpeg"
```

`assets/images/product-hero.jpeg` (550KB, 1536×2048) artık hiçbir
yerde kullanılmıyor. Galeriye girecekse önce WebP'ye çevrilmeli.

---

## Yayına almadan önce son kontrol

- [ ] Gerçek telefondan aç, ağı 3G'ye kıs
- [ ] "Ara" ve "WhatsApp" butonları gerçekten arıyor/açıyor mu
- [ ] Sadece klavyeyle (Tab) tüm sayfayı gez — odak halkası hep görünür mü
- [ ] DevTools → Lighthouse: LCP < 2.5sn, CLS < 0.1
- [ ] Linki kendine WhatsApp'tan at — önizleme kartı çıkıyor mu
