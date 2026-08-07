# CLEAN LED — Proje Kuralları

Bu dosyayı Claude her oturumda otomatik okur. Buradaki kurallar
her promptta tekrar yazılmak zorunda değildir.

## Ürün

LED aydınlatmalı süpürge başlığı. Oto yıkama ve araç içi temizlik
yapan profesyonellere satılıyor.

**Sitenin tek işi:** ziyaretçiyi telefon veya WhatsApp ile iletişime
geçirmek. Form yok, sepet yok, üyelik yok.

**Doğrulanmış ürün bilgileri** (sadece bunlar kullanılabilir):
- Araç içi **sanayi tipi** süpürge makinesi başlığı
- LED aydınlatmalı — "araç içi temizlikte aydınlık çözümler"
- **Türkiye ve dünyada tek patentli**, kendi üretimi
- Kalem pil ile çalışır, uzun ömürlü (❌ USB-C DEĞİL, ❌ Li-ion DEĞİL)
- Tüm büyük boy yıkamacı süpürgeleriyle uyumlu aparat
- Hafif ve dengeli tutuş

**Doğrulanmamış hiçbir sayı/iddia yazılmaz.** "3x daha güçlü emiş",
"12 saat batarya", "IP54" gibi ifadeler uydurmaydı ve kaldırıldı.

## İletişim (gerçek)

- Telefon: `0555 454 55 35` → `tel:+905554545535`
- WhatsApp: `https://wa.me/905554545535`
- Instagram: `https://www.instagram.com/cleanled.tr/`

## Marka kimliği

Logodan türetildi: koyu lacivert-siyah zemin, krom/gümüş gövde,
elektrik mavisi ışık huzmesi.

- Accent: `--accent: #2e9bff` (logonun huzme mavisi)
- Metin/başlık: `--chrome: #d6e2f0`
- **Tek accent kuralı:** mavi sadece küçük alanlarda (ikon, buton,
  ince çizgi, kısa vurgu kelimesi). Büyük yüzeyler nötr kalır.
  Eski sitedeki "cırtlak" hissinin sebebi rengin tonu değil,
  6 farklı accent'in büyük alanlarda kullanılmasıydı.
- **Gradient metin kullanılmaz** — okunabilirliği düşürür ve
  "AI şablonu" görüntüsünün en tipik işaretidir.

## Teknik kurallar

### Mimari
- Statik site: HTML + CSS + vanilla JS. Sunucu yok.
- **İzin almadan bağımlılık/framework/kütüphane eklenmez.** Her paket bir borçtur.
- Bir davranışı platform (CSS/HTML) zaten sunuyorsa JS yazılmaz.

### Dürüstlük
- **Çalışmayan hiçbir şey çalışıyormuş gibi gösterilmez.**
  Sahte başarı mesajı, boş video oynatıcı, `href="#"` linki yasak.
- Yer tutucular açıkça yer tutucu görünür (`.media-slot` gibi).
- Emin olunmayan şey söylenir, uydurulmaz.

### CSS
- Renk/ölçü/boşluk daima `base.css`'teki token'lardan gelir. Bileşene hex yazılmaz.
- **Tek accent rengi** (`--accent`, LED amber). İkinci bir accent eklenmez.
  Tek istisna: marka renkleri (WhatsApp yeşili).
- İsimlendirme BEM: `blok__eleman--varyant`.
- `!important` kullanılmaz.
- Mümkün olduğunda medya sorgusu yerine `clamp()`, `auto-fit`, `minmax()`.

### Erişilebilirlik (hedef: WCAG AA)
- Etkileşimli her şey `<button>` veya `<a>`. `<div onclick>` yasak.
- Klavyeyle her yere ulaşılır, `:focus-visible` görünür.
- Açılır katmanlar ESC ile kapanır, odak geri döner.
- Metin kontrastı en az 4.5:1.
- `prefers-reduced-motion` her animasyonda dikkate alınır.

### Performans bütçesi
- Hero görseli **< 200KB**, diğer görseller < 100KB.
- Görseller WebP/AVIF, `width`+`height` zorunlu (CLS için),
  LCP görseli hariç hepsi `loading="lazy"`.
- Toplam JS < 30KB.
- Hedef: LCP < 2.5sn, CLS < 0.1, INP < 200ms.

### SEO
- Her sayfada: title, description, canonical, OG etiketleri.
- Structured data sadece doğrulanmış veriyle.

## Çalışma şekli

- Kod yazmadan önce, birden fazla yol varsa seçenekleri ve önerini söyle.
- Her değişiklikten sonra: **ben söylemediğim halde hangi kararları verdin?**
- Değişiklik küçük ve tek konulu olsun; 200 satırı geçen diff bölünür.
- Test edilmemiş / emin olunmayan yerler açıkça belirtilir.
