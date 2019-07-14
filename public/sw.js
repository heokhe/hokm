/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    url: 'bundle.css',
    revision: '2212143e244bb610f7ec665f5b25d20d'
  },
  {
    url: 'bundle.js',
    revision: 'bda96f1bd52034cef2a7de1f5d720b9c'
  },
  {
    url: 'favicon.png',
    revision: 'c64beab291de80970aa4887a5a1c9135'
  },
  {
    url: 'index.html',
    revision: '0b543af78fe7475a3b4f56f2e7e42140'
  },
  {
    url: 'robots.txt',
    revision: 'd3087b14b5dc8dce0f8cb6e07d107d29'
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
