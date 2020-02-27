const CopyPlugin = require('copy-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

// Common config options
const {
  BROWSERS_LIST,
  enhanceManifestFile,
  EXTENSIONS_TO_RESOLVE,
  PATHS,
} = require('./common.config');

// Custom plugin to create required directories if they don't exist already
const CreateRequiredDirectoriesPlugin = require('./create-required-directories-plugin');

module.exports = {
  // Base directory for resolving entry points and loaders from configuration.
  context: PATHS.src,

  // Enable source map
  devtool: 'source-map',

  // Entry points
  entry: {
    // Client
    client: `${PATHS.src}/client`,
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
          {
            loader: MiniCssExtractPlugin.loader,
          },
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
          {
            loader: MiniCssExtractPlugin.loader,
          },
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

      // JS loader
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-runtime', '@loadable/babel-plugin'],
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
                '@loadable/babel-plugin',
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

  // Optimization
  optimization: {
    splitChunks: {
      cacheGroups: {
        // Create a custom vendor chunk.
        vendor: {
          chunks: 'all',
          enforce: true,
          name: 'vendor',
          test: /[\\/]node_modules[\\/](@loadable\/component|react|react-dom|react-router-dom)[\\/]/,
        },
      },
    },
  },

  // Options related to how webpack emits results
  output: {
    // The filename template for entry chunks.
    filename: '[name].[chunkhash].js',

    // The target directory where webpack should store the output file(s).
    path: PATHS.distDevPublicJS,

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
    new CopyPlugin([
      { from: `${PATHS.staticBase}/img`, to: PATHS.distDevPublicImage },
      {
        from: `${PATHS.staticBase}/manifest.json`,
        to: PATHS.distDevPublic,
        transform(content) {
          return enhanceManifestFile(content);
        },
      },
      { from: `${PATHS.staticBase}/robots.txt`, to: PATHS.distDevPublic },
    ]),

    // Plugin to create required directories if they don't exist already.
    new CreateRequiredDirectoriesPlugin({
      dirs: [
        PATHS.distBase,
        PATHS.distBaseDev,
        PATHS.distDevPublic,
        PATHS.distDevPublicCSS,
        PATHS.distDevPublicJS,
        PATHS.distDevPublicImage,
        PATHS.distDevPublicStats,
      ],
    }),

    new LoadablePlugin({
      // Manifest file name
      filename: '../stats/loadable-stats.json',

      // Write assets to disk at given filename location
      writeToDisk: true,
    }),

    // Extract CSS to an external file
    new MiniCssExtractPlugin({
      filename: '../css/[name].[contenthash].css',
    }),

    new WorkboxPlugin.InjectManifest({
      // Don't cache-bust files since these files have unique URLs.
      dontCacheBustURLsMatching: /\.(css|gif|html|jpg|jpeg|js|json|png|svg)$/,

      // The path and name of the service worker file that will be created by the build process.
      swDest: `${PATHS.distDevPublic}/service-worker.js`,

      // The path to the source service worker file that can contain your own customized code.
      swSrc: `${PATHS.workbox}/service-worker.js`,
    }),
  ],

  // Resolve imports without extensions
  resolve: {
    extensions: EXTENSIONS_TO_RESOLVE,
  },
};
