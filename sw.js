// SCS 재고관리 - 바탕화면 아이콘(설치)용. 열 때마다 GitHub에서 새로 받고(폰이 기억해 둔 예전 판을 쓰지 않음), 인터넷이 안 될 때만 지난번 것을 씀
const CACHE = "scs-app";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const req = e.request, u = new URL(req.url);
  if (req.method !== "GET" || u.origin !== self.location.origin) return;   // 구글 창구·글자 인식 파일은 건드리지 않음
  e.respondWith(fetch(req, { cache: "no-store" }).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)) } return r })
    .catch(() => caches.match(req, { ignoreSearch: true })));
});
