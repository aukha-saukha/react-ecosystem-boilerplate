// @flow strict-local

import { ChunkExtractor } from '@loadable/server';
import express from 'express';
import type { $Request, $Response } from 'express';
import { resolve } from 'path';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { APP_GENERAL_INFO, PORTS } from '../data/constants/app/config';

import App from '../shared/views/app';

// Run time environment
const runTimeEnvironment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

// Distribution path based on run time environment
const distPathPublic = resolve(
  __dirname,
  `../../../${runTimeEnvironment === 'prod' ? 'prod' : 'dev'}/public`
);

// Loadable stats file
const loadableStatsFile = resolve(`${distPathPublic}/stats/loadable-stats.json`);

// Loadable Chunk Extractor
const loadableChunkExtractor = new ChunkExtractor({
  statsFile: loadableStatsFile,
  entrypoints: ['client'],
});

// Port - first try to use port from process environment.
// If it's not found or not correct type, use it from the app config file based on environment.
// If it doesn't exist or of wrong type in the app config file, then use 3000.
let port = 3000;
if (typeof process.env.PORT === 'number') {
  port = process.env.PORT;
} else if (runTimeEnvironment === 'prod' && typeof PORTS.prod === 'number') {
  port = PORTS.prod;
} else if (runTimeEnvironment === 'dev' && typeof PORTS.dev === 'number') {
  port = PORTS.dev;
}

// Replace 'js/../css' to 'css'
const styleTags = loadableChunkExtractor.getStyleTags().replace(/js\/..\/css/g, 'css');

// Create a server
const server = express();

// Disable x-powered-by header
server.disable('x-powered-by');

// Serve static files from the distPath directory
server.use(
  express.static(distPathPublic, {
    // Disable directory indexing to prevent express from using index file under distPathPublic.
    index: false,
    dotfiles: 'deny',
    setHeaders(response) {
      if (runTimeEnvironment === 'prod') {
        response.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000');
      }
    },
  })
);

// Render to node stream
server.get('*', (request: $Request, response: $Response) => {
  response.set('content-type', 'text/html');

  response.write(`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${APP_GENERAL_INFO.name}</title>
        <meta name="description" content="${APP_GENERAL_INFO.description}" />
        <meta name="theme-color" content=${APP_GENERAL_INFO.themeColor}  />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link href="/img/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/img/favicon.png" rel="icon" type="image/png" />
        <link href="/img/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/img/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/img/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />
        <link href="/img/favicon-192x192.png" rel="icon" sizes="192x192" type="image/png" />
        <link href="/img/favicon-512x512.png" rel="icon" sizes="512x512" type="image/png" />

        <link href="/manifest.json" rel="manifest" />

        <link href="https://fonts.googleapis.com/css?family=Open+Sans|Raleway&display=swap" rel="stylesheet">

        ${styleTags}
      </head>
      <body>
        <div id="root">`);

  const stream = renderToNodeStream(
    loadableChunkExtractor.collectChunks(
      <StaticRouter context={{}} location={request.url}>
        <App />
      </StaticRouter>
    )
  );

  stream.pipe(response, { end: false });

  stream.on('end', () => {
    response.write(
      `</div>
      <section id="upgrade-app" class="display-none">
        <p>
          A new ${
            APP_GENERAL_INFO.shortName
          } version is available. Please click <button id="refresh-app-button" type="button">here</button> to upgrade.
        </p>
      </section>
       ${loadableChunkExtractor.getScriptTags()}
       <script>
          let newServiceWorker;

          window.addEventListener('load', () => {
            document.getElementById('refresh-app-button').addEventListener('click', function() {
              newServiceWorker.postMessage({ action: 'skipWaiting' });
            });
          });

          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker
                .register('/service-worker.js', { scope: '/' })
                .then((registration) => {
                  if ('${runTimeEnvironment}' !== 'prod') {
                    console.log(
                      'ServiceWorker registration successful with scope: ',
                      registration.scope
                    );
                  }

                  registration.addEventListener('updatefound', () => {
                    newServiceWorker = registration.installing;

                    newServiceWorker.addEventListener('statechange', () => {
                      // Has the network.state changed?
                      switch (newServiceWorker.state) {
                        case 'installed':
                          if (navigator.serviceWorker.controller) {
                            // Since a new update available, let's show the "upgrade-app" section
                            let upgradeAppElement = document.getElementById('upgrade-app');
                            if (upgradeAppElement.classList.contains("display-none")) {
                              upgradeAppElement.classList.remove("display-none");
                            }

                            upgradeAppElement.classList.add("display-block");
                          }

                          break;
                      }
                    });
                  });
                })
                .catch((registrationError) => {
                  if ('${runTimeEnvironment}' !== 'prod') {
                    console.log('SW registration failed: ', registrationError);
                  }
                });
            });

            let isAppAlreadyRefreshed;
            navigator.serviceWorker.addEventListener('controllerchange', function() {
              if (isAppAlreadyRefreshed) {
                return;
              }

              window.location.reload();

              isAppAlreadyRefreshed = true;
            });
          }
        </script>
      </body>
    </html>`
    );
    response.end();
  });
});

// Bind and listen for connections on the specified port.
server.listen(port, () => {
  // The reason to disable no-console rule here is because, we need "server is listening"
  // confirmation message along with port information as console log.
  // eslint-disable-next-line no-console
  console.log(`Express server is listening on port ${port}`);
});
