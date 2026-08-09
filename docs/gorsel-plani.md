# Görsel planı — hangi görsel nereye, nasıl üretilir

Sitede görsel gereken **4 yer** var. Her biri için: ne lazım,
elindeki fotoğraflardan hangisi uyar, yoksa Gemini prompt'u.

**Genel kural:** Ürünü GERÇEK fotoğrafla göster. AI görselini sadece
ortam/atmosfer için kullan. Müşteri ürünü eline aldığında farklı
bulursa güven gider — ortamın farklı olması kimsenin umurunda değil.

---

## 1. Hero arka planı — karanlık araç içi (ÜRÜNSÜZ)

**Neden ürünsüz:** Ürünü zaten 3D model sağlıyor. Arka planda ikinci
bir ürün olursa iki ürün görünür, kompozisyon dağılır.

**Hedef:** `assets/images/hero.webp` · 1920×1080 · WebP · <200 KB

### Gemini prompt'u
> Photorealistic interior of a car at night, viewed low and close: the
> footwell and the area under a front seat. Dark gray fabric carpet,
> seat rails, plastic trim. Almost no light — deep shadows, only faint
> cool blue ambient light from outside. Empty scene: no people, no
> objects, no tools, no text. Cinematic, shallow depth of field,
> moody automotive photography. The left third of the frame is very
> dark and uncluttered. Horizontal 16:9 composition.

**Kritik kısımlar ve nedenleri:**
- `no objects, no tools` → AI boş sahneye ıvır zıvır koymayı sever
- `left third is very dark and uncluttered` → başlık metni orada
- `almost no light` → huzmenin aydınlatacağı karanlık lazım;
  zaten aydınlık bir sahnede LED'in anlamı kalmaz

Beğenmezsen ekleyebileceklerin: `black rubber floor mat`,
`crumbs and dust visible on the carpet` (kir görünürse ürünün
işlevi daha net anlaşılır).

---

## 2. Galeri — 4 kare görsel (GERÇEK FOTOĞRAF)

Buraya **AI görseli koyma.** Elindeki fotoğraflar bu iş için
AI'dan daha ikna edici — çünkü gerçekler.

**Hedef:** `assets/images/ig-1..4.webp` · 600×600 · WebP · <80 KB

### Elindekilerden seçim önerisi

| Sıra | Hangi fotoğraf | Neden |
|---|---|---|
| 1 | Araç içi, mavi eldivenli el, ürün koltuk arasında | İş başında + insan eli = güven |
| 2 | `IMG_5915` / `IMG_5916` — karanlıkta mavi LED yanarken | Ürünün TEK farkı bu, en güçlü kare |
| 3 | `IMG_5917` / `IMG_5918` — LED açık, açılı görünüm | Aynı sebep, farklı açı |
| 4 | `IMG_7623` — ürünün net, temiz açılı çekimi | Ürünün ne olduğunu gösteren referans kare |

### Kullanmadıklarım ve nedeni
- **Tornavidalı masa fotoğrafları** → dağınık arka plan, amatör
- **Beyaz duvar/fayans önü çekimler** → ışık düz, ürün sıkıcı duruyor
- **Kırmızı/mor kumaş üstü** → arka plan rengi marka paletiyle çakışıyor
- **AI banner'lar (`IMG_7630/7631`)** → sitede zaten başlık var, tekrar

### Zayıf fotoğrafı kurtarmak istersen (Gemini)
Fotoğrafı yükleyip:
> Keep the product exactly as it is — do not change its shape, color,
> proportions, or any detail. Replace only the background with a clean
> dark studio backdrop, deep charcoal gradient, soft rim light from the
> upper left. Product stays sharp and centered. Photorealistic.

`do not change its shape/color/proportions` cümlesi şart — yoksa
Gemini ürünü "güzelleştirip" başka bir ürüne çevirir.

---

## 3. Tanıtım videosu (opsiyonel)

Instagram'daki Reels'lerden biri doğrudan kullanılabilir.
`.video-slot` içine gerçek `<video>` gelene kadar yer tutucu duruyor.

**Hedef:** 16:9 · H.264 mp4 · 1080p · <10 MB

```bash
ffmpeg -i reel.mp4 -vf "scale=1280:-2,fps=25" -c:v libx264 -crf 27 \
  -preset slow -an -movflags +faststart assets/video/tanitim.mp4
```
`-an` sesi siler (susturulacak zaten), `+faststart` videonun
inmeden oynamaya başlamasını sağlar.

---

## 4. og:image — WhatsApp paylaşım kartı

Link WhatsApp'ta paylaşılınca çıkan görsel. Trafiğin çoğu oradan
geleceği için önemli.

**Hedef:** `assets/images/og-cover.jpg` · **1200×630** · <300 KB

En kolayı: Instagram'daki logo görselini 1200×630 tuvale ortala.
```bash
magick logo.jpg -resize 560x560 -background "#050810" -gravity center \
  -extent 1200x630 -quality 85 assets/images/og-cover.jpg
```

---

## Dönüştürme komutları (hepsi için)

**Kare galeri görselleri:**
```bash
magick giris.jpg -resize 600x600^ -gravity center -extent 600x600 -quality 82 assets/images/ig-1.webp
```

**Hero (yatay):**
```bash
magick giris.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 78 assets/images/hero.webp
```

**Boyut kontrolü — hedefi tutturduk mu:**
```bash
ls -lh assets/images/
```

Hero >200 KB çıkarsa `-quality` değerini 70'e düşür.
Galeri >80 KB çıkarsa 75'e düşür.

---

## Yerleştirdikten sonra

Görselleri koyduktan sonra `index.html`'de:
- Hero: `.hero__stage` etiketine `style="--hero-image:url('./assets/images/hero.webp')"`
- Galeri: her `.media-slot` div'ini `<a>` + `<img>` ile değiştir
  (örnek kod `docs/TODO.md` içinde)
- `alt` metinleri gerçekten görselde ne olduğunu anlatsın:
  "ürün fotoğrafı" ❌ → "LED ışıkla koltuk altı temizliği" ✔
