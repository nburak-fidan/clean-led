/**
 * hero3d.js — Hero'daki 3D ürünü TEMBEL yükler
 *
 * NEDEN DİNAMİK IMPORT:
 * model-viewer 282 KB + model 241 KB (gzip) = yarım megabayt.
 * Bunu ana pakete koymak, sayfanın ilk boyanmasını bekletir ve
 * JS bütçemizi (30 KB) tek başına 10'a katlar.
 * Bu yüzden:
 *   - HTML+CSS hero'yu TAM olarak kurar (arka plan, huzme, metin, butonlar)
 *   - 3D ürün, sayfa etkileşime hazır olduktan SONRA yüklenir
 *   - Yüklenmezse hiçbir şey kırılmaz; hero eksiksiz çalışmaya devam eder
 *
 * Yani 3D bir SÜS katmanıdır, temel değil. Ürünü aramak isteyen
 * kullanıcı 139 KB'ı beklemek zorunda kalmaz.
 *
 * YÜKLEMEME KOŞULLARI:
 *   - Kullanıcı "veri tasarrufu" açmışsa (Save-Data)
 *   - Bağlantı 2g/slow-2g ise
 *   - Hero hiç görünmeden sayfa terk edilirse (IntersectionObserver)
 */

const VENDOR = '../assets/vendor/model-viewer.min.js';

function shouldSkip() {
  const c = navigator.connection;
  if (!c) return false;
  if (c.saveData) return true;
  return /(^|-)2g$/.test(c.effectiveType || '');
}

export function initHero3d() {
  const host = document.querySelector('[data-hero-model]');
  if (!host) return;

  if (shouldSkip()) {
    // Sessizce vazgeç: hero zaten kendi başına eksiksiz.
    host.remove();
    return;
  }

  const load = async () => {
    try {
      await import(VENDOR);
      // Bileşen tanımlandıktan sonra <model-viewer>'ı oluştur.
      // Önceden HTML'e yazsaydık, tanımlanana kadar boş kutu dururdu.
      const mv = document.createElement('model-viewer');
      mv.className = 'hero__model';
      mv.setAttribute('src', host.dataset.src);
      mv.setAttribute('alt', 'CLEAN LED süpürge başlığının üç boyutlu görünümü');
      mv.setAttribute('camera-controls', '');
      mv.setAttribute('disable-zoom', '');
      mv.setAttribute('disable-pan', '');
      // touch-action olmadan mobilde ürünü döndürmeye çalışırken
      // sayfa dikey kaymaz — kullanıcı sayfada sıkışır.
      mv.setAttribute('touch-action', 'pan-y');
      mv.setAttribute('interaction-prompt', 'none');
      // Mesafe SABİT DEĞİL, yüzde: "%115" = model-viewer'ın otomatik
      // hesapladığı çerçeveleme mesafesinin 1.15 katı.
      // Sabit metre yazmak hataydı: ürün 2 birim uzunlukta ve dar
      // ekranda çerçeveden taşıyordu. Yüzde her viewport'ta doğru sığar.
      mv.setAttribute('camera-orbit', host.dataset.orbit || '25deg 72deg 105%');
      mv.setAttribute('camera-target', 'auto auto auto');
      // Modelin KENDİ dönüşü. Kamerayı çevirmek yerine modeli çevirmenin
      // sebebi: kamerayı 180° çevirseydik ışık ve kompozisyon da dönerdi.
      // Model dönünce sahne sabit kalır, sadece ürünün ucu yön değiştirir.
      if (host.dataset.orientation) {
        mv.setAttribute('orientation', host.dataset.orientation);
      }
      mv.setAttribute('environment-image', 'neutral');
      mv.setAttribute('exposure', '1.05');
      mv.setAttribute('shadow-intensity', '0');
      mv.setAttribute('loading', 'eager');

      // TAM TUR DÖNÜŞ KALDIRILDI.
      // Dönen bir ürün "vitrin tablası" anlatır; bizim anlatmak
      // istediğimiz ise ÇALIŞMA hareketi — süpürge aşağı yukarı gider.
      // Bu yüzden hareket CSS'e taşındı (.hero__model-host animasyonu):
      // GPU'da compositor'da koşar, JS main thread'e hiç dokunmaz.

      mv.addEventListener('load', () => host.classList.add('is-ready'), { once: true });
      host.appendChild(mv);
    } catch {
      // Ağ hatası, dosya bulunamadı, tarayıcı desteklemiyor — hepsi aynı:
      // 3D yok, hero çalışmaya devam ediyor.
      host.remove();
    }
  };

  // Hero görünür olunca yükle. Hero sayfanın en üstünde olduğu için
  // pratikte hemen tetiklenir; ama bu kurgu ileride 3D'yi aşağı bir
  // bölüme taşırsak da doğru çalışır.
  const io = new IntersectionObserver((entries, obs) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    obs.disconnect();

    // requestIdleCallback: tarayıcı boştayken yükle, ilk boyamayı bekletme.
    // AMA: sekme arka plandayken idle callback HİÇ tetiklenmiyor
    // (test edildi: gizli sekmede 20sn boyunca çalışmadı).
    // `timeout` seçeneği bu yüzden şart — yoksa kullanıcı sekmeye
    // dönene kadar 3D asla yüklenmez.
    if (window.requestIdleCallback) {
      requestIdleCallback(load, { timeout: 2500 });
    } else {
      setTimeout(load, 300);
    }
  }, { rootMargin: '200px' });

  io.observe(host);
}
