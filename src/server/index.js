import express from 'express';
import { resolve } from 'path';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import { PORTS } from '../data/constants/app/config';

import App from '../shared/views/app';

let stats;

// Please don't refactor, and use runTimeEnvironment instead of process.env.NODE_ENV in the
// condition below. Webpack doesn't compile successfully.
if (process.env.NODE_ENV === 'production') {
  /* eslint-disable import/no-unresolved */
  import('../../dist/prod/public/stats/manifest.json')
    .then((module) => {
      stats = module.default;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(`Error: ${err.message}`);
    });
}

// Run time environment
const runTimeEnvironment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

// Distribution path based on run time environment
const distPathPublic = resolve(
  __dirname,
  `../../../${runTimeEnvironment === 'prod' ? 'prod' : 'dev'}/public`
);

// Port - first try to use port from process environment.
// If it's not found, use it from the app config file.
// If it doesn't exist in the app config file either, use 3000.
const port = process.env.PORT || runTimeEnvironment === 'prod' ? PORTS.prod : PORTS.dev || 3000;

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
server.get('*', (request, response) => {
  response.write(`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>React ecosystem boilerplate</title>
        <meta name="description" content="React ecosystem boilerplate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="${
          runTimeEnvironment === 'prod' ? stats['styles'] : '/css/styles.css'
        }" rel="stylesheet" />
      </head>
      <body>
        <div id="root">`);

  const stream = renderToNodeStream(<App />);

  stream.pipe(response, { end: false });

  stream.on('end', () => {
    response.write(`</div>
        <script src=${runTimeEnvironment === 'prod' ? stats['client'] : 'js/client.js'}></script>
        <script src=${runTimeEnvironment === 'prod' ? stats['vendor'] : 'js/vendor.js'}></script>
      </body>
    </html>`);
    response.end();
  });
});

// Bind and listen for connections on the specified port.
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${port}`);
});
