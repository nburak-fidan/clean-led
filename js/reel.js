/**
 * reel.js — Instagram Reel'i SADECE tıklandığında yükler ("facade" deseni)
 *
 * NEDEN:
 * Instagram'ın resmi gömme kodu `embed.js` betiğini sayfaya ekler.
 * O betik ~100KB'dır, sayfayı açan HERKESE iner ve videoyu izlemeyen
 * ziyaretçinin verisi bile (IP, hangi sayfada olduğu) Meta'ya gider.
 *
 * Burada önce statik bir kart duruyor. Kullanıcı tıklarsa iframe
 * yerleştiriliyor. Yani üçüncü tarafa veri akışı, kullanıcının kendi
 * eylemiyle başlıyor.
 *
 * Ayrıca `embed.js` HİÇ kullanılmıyor: Instagram'ın `/embed` yolu
 * doğrudan iframe'e verilebiliyor. Betiği yüklemenin tek faydası
 * otomatik yükseklik ayarıydı, onu CSS'te aspect-ratio ile çözüyoruz.
 *
 * BOZULMA DURUMLARI:
 * - JS yüklenmezse → <a> normal link gibi çalışır, Reel Instagram'da açılır
 * - iframe engellenirse (kurumsal ağ) → kullanıcı yine linke sahip
 */

export function initReel() {
  document.querySelectorAll('.reel__facade[data-reel]').forEach((facade) => {
    facade.addEventListener('click', (e) => {
      const id = facade.dataset.reel;
      if (!id) return;               // veri yoksa link olarak davranmaya devam et

      e.preventDefault();

      const frame = document.createElement('iframe');
      frame.className = 'reel__frame';
      frame.src = `https://www.instagram.com/reel/${id}/embed/`;
      frame.title = 'CLEAN LED dayanıklılık testi videosu';
      frame.loading = 'lazy';
      frame.allowFullscreen = true;
      // scrolling="no" eski ama Instagram embed'i hâlâ buna bakıyor
      frame.setAttribute('scrolling', 'no');
      frame.setAttribute('allowtransparency', 'true');

      facade.replaceWith(frame);
    });
  });
}
