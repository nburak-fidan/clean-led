/**
 * navigation.js — Navbar scroll durumu + mobil menü
 *
 * BURADA OLMAYAN ŞEY: smooth scroll.
 * Eskiden 15 satırlık bir JS handler'ı vardı; artık CSS'te tek satır:
 *     html { scroll-behavior: smooth }
 * CSS versiyonu daha iyi çünkü:
 *   - prefers-reduced-motion'a otomatik uyuyor
 *   - URL'deki #hash'i bozmuyor (JS preventDefault ediyordu → geri tuşu çalışmıyordu)
 *   - JS yüklenmese de çalışıyor
 * Bir davranışı platform zaten sunuyorsa JS yazma.
 */

const SCROLL_THRESHOLD = 24;

export function initNavigation() {
  initScrollState();
  initMobileMenu();
}

/** Sayfa kaydırılınca navbar'a kenarlık/zemin ekler. */
function initScrollState() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  // Scroll her pikselde tetiklenir. Doğrudan iş yapmak yerine
  // requestAnimationFrame ile ekran yenilemesine senkronlanır —
  // yoksa main thread dolar ve INP (etkileşim gecikmesi) bozulur.
  let ticking = false;

  const update = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > SCROLL_THRESHOLD);
    ticking = false;
  };

  // passive: true → tarayıcıya "preventDefault çağırmayacağım" der,
  // böylece kaydırmayı bloklamadan devam edebilir.
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();
}

/**
 * Mobil menü.
 * Erişilebilirlik gereği dört davranış: aç/kapa, ESC, dışarı tıklama,
 * ve kapanınca odağın butona geri dönmesi.
 */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const panel = document.getElementById('nav-mobile');
  if (!toggle || !panel) return;

  const setOpen = (open) => {
    panel.classList.toggle('is-open', open);
    // aria-expanded ekran okuyucuya menünün açık olduğunu söyler.
    // String olmak zorunda — ARIA öznitelikleri boolean kabul etmez.
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');

    if (open) {
      // Menü açılınca odak içeri gitsin; klavye kullanıcısı
      // aksi halde görünmeyen bir yerde kalır.
      panel.querySelector('a')?.focus();
    } else {
      // Kapanınca odak tetikleyen butona döner — kaybolmaz.
      toggle.focus();
    }
  };

  const isOpen = () => panel.classList.contains('is-open');

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  // Menüdeki bir linke tıklanınca kapan (aynı sayfa içi navigasyon)
  panel.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });

  // ESC ile kapat — her açılır katmanın olması gereken davranışı.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) setOpen(false);
  });

  // Menünün dışına tıklayınca kapat
  document.addEventListener('click', (e) => {
    if (!isOpen()) return;
    if (panel.contains(e.target) || toggle.contains(e.target)) return;
    setOpen(false);
  });

  // Masaüstü genişliğine geçilince açık kalmış menüyü kapat.
  // matchMedia, resize'dan ucuzdur: sadece eşik geçilince tetiklenir.
  window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => {
    if (e.matches && isOpen()) {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}
