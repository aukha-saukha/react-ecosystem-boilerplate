const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const Webpack = require('webpack');

// App config
const { APP_GENERAL_INFO, DEFAULT_LOCALE, PORTS } = require('../../src/data/constants/app/config');

// Common config options
const { BROWSERS_LIST, EXTENSIONS_TO_RESOLVE, PATHS } = require('./common.config');

module.exports = {
  // Base directory for resolving entry points and loaders from configuration.
  context: PATHS.src,

  // Options related to webpack-dev-server
  devServer: {
    before: () => {
      // Make distBaseWds  i.e. dist/wds directory if it doesn't exist already.
      if (!fs.existsSync(PATHS.distBaseWds)) {
        fs.mkdirSync(PATHS.distBaseWds, {
          recursive: true,
        });
      }

      const indexFile = `${PATHS.distBaseWds}/index.html`;

      // Create index.html file under distBaseWds i.e. dist/wds directory if it doesn't exist.
      if (fs.existsSync(indexFile)) {
        return;
      }
      fs.writeFile(
        indexFile,
        `<!DOCTYPE html>
        <html lang="${DEFAULT_LOCALE}">
          <head>
            <meta charset="UTF-8" />
            <title>${APP_GENERAL_INFO.name}</title>
            <meta name="description" content=${APP_GENERAL_INFO.description} />
            <meta name="theme-color" content=${APP_GENERAL_INFO.themeColor}  />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link href="/img/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
            <link href="/img/favicon.png" rel="icon" type="image/png" />
            <link href="/img/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
            <link href="/img/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
            <link href="/img/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />
            <link href="/img/favicon-192x192.png" rel="icon" sizes="192x192" type="image/png" />
            <link href="/img/favicon-512x512.png" rel="icon" sizes="512x512" type="image/png" />

            <link href="https://fonts.googleapis.com/css?family=Open+Sans|Raleway&display=swap" rel="stylesheet">
          </head>
          <body>
            <div id="root"></div>
            <script src='js/client.js'></script>
            <script src='js/vendor.js'></script>
          </body>
        </html>`,
        function writeFileError(err) {
          if (err) {
            // The reason to disable no-console rule here is because we need error details as
            // console log.
            // eslint-disable-next-line no-console
            console.log(err);
          }
        }
      );
    },

    // Base path for the content.
    contentBase: PATHS.distBaseWds,

    // Enable history API fallback
    historyApiFallback: true,

    // Enable HMR on the server
    // Important side note: Unlike the cli flag, this doesn't set
    // HotModuleReplacementPlugin. It needs to be set separately via plugins
    // if hot is part of config, not cli.
    hot: true,

    // Enables Hot Module Replacement without page refresh in case of build failures.
    hotOnly: true,

    // Embed the webpack-dev-server runtime into the bundle.
    inline: true,

    // Port
    port: PORTS.webpackDevServer,

    // The relative path from where bundle is served from memory.
    publicPath: '/js',

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // Write files to disk (required for static assets such as images to work). The
    // `copy-webpack-plugin` plugin needs this flag to be true for webpack-dev-server.
    writeToDisk: true,
  },

  // Enable source map
  devtool: 'source-map',

  // Entry points
  entry: {
    // Client
    client: `${PATHS.src}/client`,

    // Vendor
    vendor: [
      '@loadable/component',
      'react',
      'react-dom',
      'react-router-dom',
      `webpack-dev-server/client?http://localhost:${PORTS.webpackDevServer}`,
    ],
  },

  // Mode
  mode: 'development',

  // Loaders
  module: {
    rules: [
      // base.scss loader. Global styles so CSS modules should not be enabled.
      {
        exclude: /node_modules/,
        test: `${PATHS.src}/static/css/base.scss`,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      // CSS, SASS loaders. Only .scss extension is allowed.
      {
        exclude: [/node_modules/, `${PATHS.src}/static/css`],
        test: /\.(c|sc)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                mode: 'local',
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      //   JS loader
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-runtime'],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: BROWSERS_LIST,
                    },
                  },
                ],
              ],
            },
          },
        ],
      },

      // JSX loader. We'll use component-name.react.js format.
      // The only js file which is not in *.react.js format that can have JSX is, client index file.
      {
        exclude: /node_modules/,
        test: [/\.react\.js$/, `${PATHS.src}/client`],
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-transform-runtime',
                'react-hot-loader/babel',
              ],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: BROWSERS_LIST,
                    },
                  },
                ],
                '@babel/preset-flow',
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
    ],
  },

  // Options related to how webpack emits results
  output: {
    // The filename template for entry chunks.
    filename: '[name].js',

    // The target directory where webpack should store the output file(s).
    path: `${PATHS.distBaseWds}/js`,

    // Include comments in bundles with information about the contained modules.
    // Use in Dev environment only.
    pathinfo: true,

    // The url to the output directory resolved relative to the HTML page which
    // will be used to serve the bundled file(s).
    publicPath: '/js/',
  },

  // Plugins
  plugins: [
    // Copy images from static image directory to public distribution image directory
    new CopyPlugin([{ from: `${PATHS.staticBase}/img`, to: `${PATHS.distBaseWds}/img` }]),

    // Define plugin
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('devServer'),
    }),

    // Enable Hot Module Replacement
    new Webpack.HotModuleReplacementPlugin(),
  ],

  // Resolve imports without extensions
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },

    extensions: EXTENSIONS_TO_RESOLVE,
  },
};
