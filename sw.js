// 예전 웹게임(픽셀 모험단)의 오프라인 캐시를 지우고 스스로 꺼지는 파일이에요.
// 이 주소는 이제 '봉인 기사단' 안내 페이지예요. 예전 웹게임은 old/ 에 있어요.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.registration.unregister();
    const cs = await self.clients.matchAll({ type: 'window' });
    cs.forEach(c => c.navigate(c.url));
  })());
});
