// SCS 재고관리 - 바탕화면 아이콘(설치)용. 늘 인터넷에서 새로 받고(새 판이 바로 보이게), 안 될 때만 지난번 것을 씀
const CACHE = "scs-app";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const req = e.request, u = new URL(req.url);
  if (req.method !== "GET" || u.origin !== self.location.origin) return;   // 구글 창구·글자 인식 파일은 건드리지 않음
  e.respondWith(fetch(req).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)) } return r })
    .catch(() => caches.match(req, { ignoreSearch: true })));
});
