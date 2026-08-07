/**
 * torch.js — Hero'daki "el feneri" huzmesini imlece bağlar
 *
 * Yaptığı tek şey: imleç konumunu iki CSS değişkenine yazmak.
 * Görsel işin TAMAMI CSS'te (main.css → .hero__torch).
 * JS "nerede" der, CSS "nasıl görünür" der. Sınır net kalır.
 *
 * YETENEK TESPİTİ:
 * `@media (hover: hover)` veya `matchMedia('(hover:hover)')`
 * KULLANILMIYOR. Bu sorgu bazı ortamlarda yanlış cevap veriyor
 * (bu projede masaüstünde `hover: none` döndüğü test edildi).
 * Yerine gerçekleşen olaya bakıyoruz: `pointermove` geldiyse
 * ve kaynağı dokunma değilse, imleç vardır.
 *
 * BOZULMA DURUMLARI:
 * - Bu dosya yüklenmezse → CSS'teki süzülme animasyonu çalışmaya
 *   devam eder, hero tamamen okunur durumda kalır.
 * - Dokunmatik cihaz → pointerType 'touch' gelir, takip açılmaz.
 * - reduced-motion → hiç devreye girmez.
 */

export function initTorch() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Hareket kısıtlaması isteyen kullanıcıyı takip etmiyoruz.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let pending = false;
  let x = 0;
  let y = 0;

  const paint = () => {
    hero.style.setProperty('--torch-x', x.toFixed(2) + '%');
    hero.style.setProperty('--torch-y', y.toFixed(2) + '%');
    pending = false;
  };

  const onMove = (e) => {
    // Dokunmayla sürükleme huzmeyi ele geçirmesin:
    // parmağın altı zaten görünmez, otomatik süzülme daha iyi.
    if (e.pointerType === 'touch') return;

    // İlk gerçek imleç hareketi: süzülmeyi durdur, takibe geç.
    if (!hero.classList.contains('has-pointer')) {
      hero.classList.add('has-pointer');
    }

    const r = hero.getBoundingClientRect();
    x = ((e.clientX - r.left) / r.width) * 100;
    y = ((e.clientY - r.top) / r.height) * 100;

    // Her pointermove'da stil yazmak main thread'i doldurur ve
    // INP'yi bozar. rAF ile ekran yenilemesi başına en fazla bir yazma.
    if (pending) return;
    pending = true;
    requestAnimationFrame(paint);
  };

  hero.addEventListener('pointermove', onMove, { passive: true });

  // İmleç alandan çıkınca huzme sakin varsayılana döner.
  // has-pointer KALDIRILMAZ: süzülme yeniden başlarsa ışık zıplar.
  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--torch-x', '68%');
    hero.style.setProperty('--torch-y', '42%');
  });
}
