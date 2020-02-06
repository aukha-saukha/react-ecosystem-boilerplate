// @flow strict-local

import { ChunkExtractor } from '@loadable/server';
import express from 'express';
import type { $Request, $Response } from 'express';
import { resolve } from 'path';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { PORTS } from '../data/constants/app/config';

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
        <title>React ecosystem boilerplate</title>
        <meta name="description" content="React ecosystem boilerplate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
    response.write(`</div>
        ${loadableChunkExtractor.getScriptTags()}
      </body>
    </html>`);
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
