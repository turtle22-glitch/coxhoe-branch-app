// Increment this version number whenever you push major layout changes
const CACHE_VERSION = 'coxhoe-safc-v15';
const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install: Cache core assets and force immediate activation
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Activate: Delete old caches from previous versions immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-First strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_VERSION).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Push Event Listener (for Web Push payloads)
self.addEventListener('push', (event) => {
  let payload = {
    title: 'Coxhoe Branch SAFC',
    body: 'New matchday update available.',
    targetTab: 'view-hud'
  };

  if (event.data) {
    try {
      payload = Object.assign(payload, event.data.json());
    } catch (e) {
      payload.body = event.data.text();
    }
  }

  const options = {
    body: payload.body,
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [150, 75, 150],
    data: { targetTab: payload.targetTab || 'view-hud' }
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});

// Notification Tap Handler: Focus app and open the relevant tab
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetTab = (event.notification.data && event.notification.data.targetTab)
    ? event.notification.data.targetTab
    : 'view-hud';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if ('focus' in client) {
          client.focus();
          client.postMessage({ type: 'OPEN_TAB_FROM_NOTIFICATION', targetTab: targetTab });
          return;
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('./');
      }
    })
  );
});