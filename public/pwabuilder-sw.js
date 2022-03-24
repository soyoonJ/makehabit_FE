// This is the "Offline page" service worker

// importScripts(
//   "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
// );

// const CACHE = "pwabuilder-page";

// // TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
// const offlineFallbackPage = "offline.html";
var CACHE = "습관삼끼";
var urlsToCache = [
  "./index.html", //캐싱할 파일들
  "./offline.html", //오프라인일때 보여줄 페이지 (네트워크가 아예 끊겼을때 새로고침하면 나오는 페이지)
];

// self = this 추가 맞는지 모르겠음
var self = this;

// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });

// self.addEventListener("install", async (event) => {
//   event.waitUntil(caches.open(CACHE).then((cache) => cache.add(urlsToCache)));
// });

// Install a service worker
self.addEventListener("install", (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache); //캐싱할 파일들 전부 저장소에 저장
    })
  );
});

// if (workbox.navigationPreload.isSupported()) {
//   workbox.navigationPreload.enable();
// }

// self.addEventListener("fetch", (event) => {
//   if (event.request.mode === "navigate") {
//     event.respondWith(
//       (async () => {
//         try {
//           const preloadResp = await event.preloadResponse;

//           if (preloadResp) {
//             return preloadResp;
//           }

//           const networkResp = await fetch(event.request);
//           return networkResp;
//         } catch (error) {
//           const cache = await caches.open(CACHE);
//           const cachedResp = await cache.match(offlineFallbackPage);
//           return cachedResp;
//         }
//       })()
//     );
//   }
// });

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Update a service worker
self.addEventListener("activate", (event) => {
  //업데이트용
  let cacheWhitelist = []; // 여기에 들어간 캐시파일들이 업데이트 되는 파일들
  cacheWhitelist.push(CACHE);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); //화이트리스트에 들어가지않은 캐싱된 파일들은 전부 삭제
          }
        })
      );
    })
  );
});
