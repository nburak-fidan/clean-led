/**
 * animations.js — Görünürlüğe göre içerik girişi (reveal)
 *
 * TEMEL KURAL (progressive enhancement):
 * Başlangıç "gizli" durumunu CSS tek başına uygulamaz.
 * Önce JS <html>'e `js-reveal` sınıfı ekler, CSS o sınıfın altında gizler.
 * Sebep: JS yüklenmezse (ağ hatası, eski tarayıcı, hata) içerik
 * sonsuza kadar görünmez kalırdı — sayfa bomboş görünürdü.
 * Bu şekilde JS yoksa her şey normal ve görünür.
 */

export function initReveal() {
  // Kullanıcı hareket istemiyorsa hiç uğraşma: içerik zaten görünür kalır.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  // IntersectionObserver desteklenmiyorsa sessizce vazgeç —
  // içerik görünür kalır, hiçbir şey bozulmaz.
  if (!('IntersectionObserver' in window)) return;

  // Gizleme kuralını ANCAK buraya geldiysek devreye sok.
  document.documentElement.classList.add('js-reveal');

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      // Bir kere göründükten sonra izlemeyi bırak:
      // her scroll'da tekrar hesaplamak boşuna iş.
      observer.unobserve(entry.target);
    }
  }, {
    // Element ekranın altından %12 içeri girdiğinde tetikle —
    // kullanıcı tam görmeden animasyon başlamış olsun.
    rootMargin: '0px 0px -12% 0px',
    threshold: 0,
  });

  targets.forEach((el) => observer.observe(el));
}
