const CACHE_NAME = "saph-v1";
const ARQUIVOS_DO_APP = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./assets/logo.png",
    "./assets/icon-192.png",
    "./assets/icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ARQUIVOS_DO_APP))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((chaves) =>
            Promise.all(
                chaves
                    .filter((chave) => chave !== CACHE_NAME)
                    .map((chave) => caches.delete(chave))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((respostaDaRede) => {
                const copia = respostaDaRede.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
                return respostaDaRede;
            })
            .catch(() =>
                caches.match(event.request).then((respostaEmCache) =>
                    respostaEmCache || caches.match("./index.html")
                )
            )
    );
});
