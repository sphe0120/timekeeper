const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/', // HTMLファイル（ルート）
    '/index.html', // 必要に応じて具体的なパスを指定
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // キャッシュがあればそれを返し、なければネットワークから取得
                return response || fetch(event.request);
            })
    );
});
