/**
 * main.js — Giriş noktası
 *
 * Bu dosyada iş mantığı YOK. Tek görevi modülleri sırayla başlatmak.
 * Böylece "sayfa açılınca ne oluyor?" sorusunun cevabı tek ekranda okunur.
 *
 * KALDIRILAN: initContactForm()
 * Eski hali formu gönderiyormuş gibi yapıp butonu yeşile boyuyordu;
 * hiçbir yere veri gitmiyordu. Form tamamen kaldırıldı —
 * iletişim artık telefon ve WhatsApp üzerinden, gerçekten çalışan
 * yerleşik bağlantılarla yapılıyor.
 */

import { initNavigation } from './navigation.js';
import { initReveal } from './animations.js';
import { initTorch } from './torch.js';

function boot() {
  initNavigation();
  initReveal();
  initTorch();
}

// type="module" scriptleri defer gibi davranır, yani DOM hazır olduktan
// sonra çalışır. Yine de erken çalıştırılma ihtimaline karşı kontrol:
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
