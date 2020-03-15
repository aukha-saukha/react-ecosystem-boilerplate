/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { setCacheNameDetails } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching';
import { NavigationRoute, registerRoute, setCatchHandler } from 'workbox-routing';
import { CacheFirst, NetworkFirst, NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies';

// Set default cache name
setCacheNameDetails({
  precache: 'install-time',
  prefix: 'reb-precache',
  runtime: 'run-time',
  suffix: 'v1',
});

cleanupOutdatedCaches();

const CURRENT_CACHES = {
  googleFontsCache: `google-fonts-cache-v1`,
};

// The reason to disable these rules here is, because this is how workbox works.
// eslint-disable-next-line no-underscore-dangle, no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST);

const htmlCache = `html-cache-${Math.random()}`;

precacheAndRoute([{ url: '/app-shell.html', revision: htmlCache }], {
  cleanUrls: false,
});

const handler = createHandlerBoundToURL('/app-shell.html');

const navigationRoute = new NavigationRoute(handler);
registerRoute(navigationRoute);

// CSS files
registerRoute(
  // Cache CSS files
  /.*\.css$/,

  // If response is in the cache, the Request will be fulfilled using the cached response.
  // If response is not in the cache, then *only* request will be fulfilled by network request,
  // and the response will be cached for the next time. It should work fine since CSS file names
  // use content hash, so if they change, the file will have a different name.
  new CacheFirst()
);

// Cache the Google fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    // Use 'google-fonts-cache-v${number}' as the cache name
    cacheName: CURRENT_CACHES.googleFontsCache,
  })
);

// Cache the Google font files with a cache-first strategy for 1 year.
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    // Use 'google-fonts-cache-v${number}' as the cache name
    cacheName: CURRENT_CACHES.googleFontsCache,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// Cache font files
registerRoute(
  /\.(?:ttf|woff|woff2)$/,

  // Use stale but revalidate
  new StaleWhileRevalidate()
);

// Images strategy
registerRoute(
  /\.(?:gif|jpg|jpeg|png|svg|webp)$/,
  new CacheFirst({
    plugins: [
      new ExpirationPlugin({
        // Cache only 1000 images
        maxEntries: 1000,

        // Cache for 30 days
        maxAgeSeconds: 30 * 24 * 60 * 60,

        // Automatically cleanup if quota is exceeded.
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// JavaScript (client and vendor files)
registerRoute(
  // Cache client and vendor files
  // * below is used because of content hash.
  /(?:client|vendor).*\.js$/,

  // If response is in the cache, the Request will be fulfilled using the cached response.
  // If response is not in the cache, then *only* request will be fulfilled by network request,
  // and the response will be cached for the next time. It should work fine since client and
  // vendor javascript files use content hash, so if they change, the file will have a different
  // names.
  new CacheFirst()
);

// JavaScript (other than client and vendor files)
registerRoute(
  /^(?!client|vendor).*\.js$/,

  // If response is in the cache, the Request will be fulfilled using the cached response.
  // If response is not in the cache, then *only* request will be fulfilled by network request,
  // and the response will be cached for the next time. It should work fine since client and
  // vendor javascript files use content hash, so if they change, the file will have a different
  // names.
  new CacheFirst()
);

// JSON files
registerRoute(
  /.*\.(?:json)/,

  // Use stale but revalidate
  // new StaleWhileRevalidate()
  new NetworkFirst()
);

// The reason to disable these rules here is, because this is how workbox works.
// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    // The reason to disable these rules here is, because this is how workbox works.
    // eslint-disable-next-line no-restricted-globals
    self.skipWaiting();
  }
});

// If anything goes wrong when handling a route, return the network response.
setCatchHandler(new NetworkOnly());
