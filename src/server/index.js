/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import { ChunkExtractor } from '@loadable/server';
import express from 'express';
import type { $Request, $Response } from 'express';
import { createWriteStream } from 'fs';
import morgan from 'morgan';
import { resolve } from 'path';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { App } from '@views/app';

import { APP_GENERAL_INFO, DEFAULT_LOCALE, PORTS, SUPPORTED_LOCALES } from '@constants/app/config';
import { CLIENT_LOGGER, LOG_LEVEL } from '@constants/logs';
import { logger } from './utilities/server-logger';

import type {
  ServerAllRequestHandlerLogMessageType,
  ServerErrorLogMessageType,
  ServerExceptionLogMessageType,
  ServerRejectionLogMessageType,
  ServerStartEventLogMessageType,
  ServerWarningLogMessageType,
} from './server.type';

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

// Morgan log stream
const morganLogStream = createWriteStream(
  resolve(__dirname, '../../../../logs/server/morgan.log'),
  { flags: 'a' }
);

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

// Save logs using morgan
server.use(morgan('combined', { stream: morganLogStream }));

// Parse incoming requests with JSON payload.
server.use(express.json());

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

function normalizeLocale(locale) {
  return locale ? locale.toLowerCase().replace('_', '-') : locale;
}

// Client logger
server.post(CLIENT_LOGGER['url'], (request: $Request, response: $Response) => {
  const clientLogsArray =
    request.body !== null &&
    typeof request.body === 'object' &&
    typeof request.body.cla !== 'undefined' &&
    Array.isArray(request.body.cla)
      ? request.body.cla
      : [{}];

  clientLogsArray.forEach((clientLog) => {
    let logLevel;
    const logMessage = {};

    if (clientLog !== null && typeof clientLog === 'object') {
      Object.entries(clientLog).forEach(([clientLogKey, clientLogValue]) => {
        if (
          clientLog !== null &&
          typeof clientLog === 'object' &&
          typeof clientLog['li'] !== 'string' &&
          process.env.NODE_ENV !== 'production'
        ) {
          // The reason to disable no-console rule here is because we want to show this warning to the
          // developer if log id is missing.
          // eslint-disable-next-line no-console
          console.warn('The log id is missing from the log.');
        }

        if (
          clientLog !== null &&
          typeof clientLog === 'object' &&
          Object.keys(LOG_LEVEL).includes(clientLog['ll'])
        ) {
          logLevel = clientLog['ll'];
        } else if (process.env.NODE_ENV !== 'production') {
          // The reason to disable no-console rule here is because we want to show this warning to the
          // developer if log level is missing.
          // eslint-disable-next-line no-console
          console.warn(
            'Log level is either missing from the log or have a wrong type. The log will not be recorded.'
          );
        }

        // Combine all except "ll" log entries to logMessage.
        if (clientLogKey !== 'll') {
          logMessage[clientLogKey] = clientLogValue;
        }
      });

      if (typeof logLevel !== 'undefined') {
        // The reason to disable flow here is because we're dynamically assigning log keys to
        // logMessage. Flow engine is not able to check if required log keys are present or not
        // since logMessage is initialized as an empty object. Since we're type checking in the
        // client logger file, we should be okay. Flow can't correlate them as we're receiving the
        // "client Logs Array" as part of request body.
        // flow-disable-line
        logger(logLevel, logMessage, 'client');
      }
    }
  });

  response.sendStatus(200);
});

// Render to node stream
server.get('*', (request: $Request, response: $Response) => {
  // Quick and basic way to set language at the server. The w3c recommends 2 letters lang, but we
  // currently support 4 letters for now.
  const acceptedLanguages = request.headers['accept-language'];
  const acceptedLanguagesSplitByComma = acceptedLanguages.split(',');
  const normalizedLocale = normalizeLocale(acceptedLanguagesSplitByComma[0]);
  const lang = SUPPORTED_LOCALES.includes(normalizedLocale) ? normalizedLocale : DEFAULT_LOCALE;

  response.set('content-type', 'text/html');

  response.write(`<!DOCTYPE html>
    <html lang="${lang}">
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
            addEventListener('error', window.__error=function f(e){f.a=f.a||[];f.a.push({d: new Date().toUTCString(), e})});

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

  logger(
    LOG_LEVEL['info'],
    ({
      li: 'sarh',
      ri: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
      rm: request.method,
      ua: request.get('User-Agent'),
      url: request.url,
    }: ServerAllRequestHandlerLogMessageType),
    'server'
  );
});

server.use((error: Error, request: $Request, _response: $Response) => {
  logger(
    LOG_LEVEL['error'],
    ({
      em: error.message,
      es: error.stack,
      li: 'se',
      ri: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
      rm: request.method,
    }: ServerErrorLogMessageType),
    'server'
  );
});

// Bind and listen for connections on the specified port.
server.listen(port, () => {
  logger(
    LOG_LEVEL['info'],
    ({
      li: 'sse',
      sse: `Express server is listening on port ${port}`,
    }: ServerStartEventLogMessageType),
    'server'
  );
});

process
  .on('uncaughtException', (exception) => {
    logger(
      LOG_LEVEL['error'],
      ({
        exm: exception.message,
        exs: exception.stack,
        li: 'sue',
      }: ServerExceptionLogMessageType),
      'server'
    );

    process.exit(1);
  })
  .on('unhandledRejection', (reason, promise) => {
    logger(
      LOG_LEVEL['error'],
      ({
        li: 'sur',
        urp: `Unhandled rejection at promise ${promise}`,
        urr: reason.stack || reason,
      }: ServerRejectionLogMessageType),
      'server'
    );
  })
  .on('warning', (warning) => {
    logger(
      LOG_LEVEL['warning'],
      ({
        li: 'sw',
        wm: warning.message,
        ws: warning.stack,
      }: ServerWarningLogMessageType),
      'server'
    );
  });
