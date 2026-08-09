"""
Geliştirme sunucusu — önbelleği kapatır.

NEDEN VAR:
`python -m http.server` hiçbir Cache-Control header'ı göndermez.
Header yoksa tarayıcı "sezgisel önbellekleme" yapar: Last-Modified'a
bakıp dosyayı kendi kararıyla saklar. Sonuç: CSS'i değiştirirsin,
sayfayı yenilersin, hiçbir şey değişmez ve saatlerce yanlış yerde
hata ararsın.

Bu dosya sadece geliştirme içindir. Yayına çıkan sitede tam tersi
istenir: hash'li dosya adları + uzun süreli önbellek.

Kullanım:  python tools/devserver.py [port]
"""

import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # no-store: yanıtı hiç saklama.
        # max-age=0 + must-revalidate: eski tarayıcılar için güvenlik ağı.
        self.send_header("Cache-Control", "no-store, max-age=0, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        # 404'ler görünsün, başarılı istekler konsolu doldurmasın.
        if args and str(args[1]).startswith(("4", "5")):
            super().log_message(fmt, *args)


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
    handler = partial(NoCacheHandler, directory=".")
    with ThreadingHTTPServer(("127.0.0.1", port), handler) as httpd:
        print(f"http://localhost:{port} — onbellek kapali")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
