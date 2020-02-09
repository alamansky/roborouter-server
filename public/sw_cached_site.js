const cacheName = "v1";

// call install event
self.addEventListener("install", e => {
  console.log("Service Worker: Installed");
});

// call activate event
self.addEventListener("activate", e => {
  console.log("Service Worker: Activated");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("Service Worker: CLearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// call fetch event
self.addEventListener("fetch", e => {
  console.log("Service Worker: Fetching");
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // make clone of response
        const resClone = res.clone();
        // open cache
        caches.open(cacheName).then(cache => {
          // add the response tot the cache
          cache.put(e.reqest, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});
