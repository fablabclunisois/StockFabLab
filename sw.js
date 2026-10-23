const CACHE = 'fablab-stock-v2';
const SHELL = ['./', 'index.html', 'manifest.json', 'icon.svg', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // les appels à l'API GitHub ne passent pas par le cache

  const isData = url.pathname.endsWith('stock.json');
  const isPage = req.mode === 'navigate' || url.pathname.endsWith('index.html');

  // Données et page : réseau d'abord (toujours à jour), cache en secours hors ligne
  if (isData || isPage) {
    const key = isData ? 'stock.json' : req;
    e.respondWith(
      fetch(req).then(r => {
        if (r.ok) {
          const copy = r.clone();
          caches.open(CACHE).then(c => c.put(key, copy));
        }
        return r;
      }).catch(() =>
        caches.match(key).then(hit => hit || (isPage ? caches.match('index.html') : undefined))
      )
    );
    return;
  }

  // Le reste (icônes, manifeste) : cache d'abord
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok) {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return r;
    }))
  );
});
