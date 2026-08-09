# Kalan işler

İletişim bilgileri **gerçek verilerle dolduruldu**:
telefon `0555 454 55 35`, WhatsApp `wa.me/905554545535`,
Instagram `@cleanled.tr`. Aşağıdakiler hâlâ yer tutucu.

---

## 0. DURUM ÖZETİ

| Bölüm | Durum |
|---|---|
| Hero (fotoğraf + metin) | ✔ tamam |
| Özellikler (3 kart) | ✔ tamam |
| Ürün (3 madde) | ✔ tamam |
| Videolar (2 Instagram Reel) | ✔ tamam |
| Galeri (4 gerçek kare) | ✔ tamam |
| İletişim / CTA | ✔ tamam |
| **og:image** | ✖ eksik — WhatsApp önizlemesi çıkmıyor |
| **Video kapak kareleri** | ✖ eksik — kartlar boş görünüyor |
| **Hortuma takılı karesi** | ✖ eksik — "uyar mı?" sorusu cevapsız |
| Favicon (gerçek logo) | ✖ şimdilik CSS ile çizilmiş |

---

## 1. Hero — TAMAM ✔ (ince ayar kaldı)

Hero artık tam ekran fotoğraf + üstüne yerleşen metin + sahnenin
içinde duran 3D ürün. Bölünmüş "solda yazı sağda görsel" düzeni yok.

- Arka plan: `hero-bg.webp` 1920×1080 **130 KB**
  (telefon `hero-bg-mobile.webp` 900×506 **31 KB** indiriyor)
- 3D ürün: `assets/model/cleanled.glb` — **12 MB, HENÜZ OPTİMİZE DEĞİL**
- Hareket: `nozzle-work` CSS animasyonu — süpürgenin aşağı-yukarı gidişi

### Ayar noktaları (hepsi tek satır)

| Ne | Nerede | Şu anki değer |
|---|---|---|
| Kamera açısı | `index.html` → `data-orbit` | `25deg 72deg 105%` |
| Ürünün yönü | `index.html` → `data-orientation` | `0deg 180deg 0deg` |
| Ürünün konumu | `css/main.css` → `.hero__model-host` | `right:-2% bottom:4%` |
| Hareket hızı/mesafesi | `css/main.css` → `@keyframes nozzle-work` | 3.4sn, 14px |
| Işımanın yeri | `css/main.css` → `--beam-x` / `--beam-y` | `50% / 50%` |
| Fotoğraf kadrajı | `css/main.css` → `.hero__bg img` `object-position` | `62% 60%` |

### ⚠️ Model optimizasyonu — yapılmayı bekliyor

`cleanled.glb` şu an **12 MB**. Görünüşü onayladıktan sonra
görüntüyü bozmadan ~3-4 MB'a inebilir:
- Dokular 2048 → 1024 px (hero boyutunda fark edilmez)
- Geometri hassasiyeti quantize (şekil aynı kalır)

Sadeleştirme (`--simplify`) **KULLANILMAMALI** — denendi, ürünün
düz panelleri ve keskin kenarları bozuldu, "buruşmuş" göründü.

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
