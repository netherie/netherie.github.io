const CACHE_NAME = `Emoji PWA`;
const report = [];
self.addEventListener('install', async event => {
  console.log('INSTALL');
  
    
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([
      './',
      './script.js',
      './sw.js',
      './style.css',
      './index.html',
      './about.html',
      './favicon.ico', 
      './manifest.json',
      './plug.png',
    ]);
    console.log('added');
    report.push('Файлы закешированы')
  
});

self.addEventListener( 'activate', () => console.log('activated'))

self.addEventListener('fetch', event => {
  console.log('fetch');

  async function answer (event) {
  let response;
  
  if ( event.request.url.endsWith('/log.html')) {
    response = new Response(JSON.stringify(report),{status: 200, headers: { 'Content-Type': 'application/json' } })
  } else {
    const cachedData = await caches.match(event.request);
    if (cachedData) {
      report.push('Загрузка с кэша: ' + event.request.url);
      response = cachedData;
    } else {
      response = await fetch(event.request.url);
      let cache = await caches.open(CACHE_NAME);
      await cache.put(event.request.url, response.clone());
      report.push('Загрузка с сервера: ' + event.request.url);
      
    }
    
  }
  return response;
}
  event.respondWith(answer(event));
  
});