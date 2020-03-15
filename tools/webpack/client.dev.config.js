/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LoadablePlugin = require('@loadable/webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { WebpackBundleSizeAnalyzerPlugin } = require('webpack-bundle-size-analyzer');
const WorkboxPlugin = require('workbox-webpack-plugin');

// Common config options
const { BROWSERS_LIST, enhanceManifestFile, PATHS, WEBPACK_RESOLVE } = require('./common.config');

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

      // CSS, SASS loaders.
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
    // Analyze the generated bundles by webpack using a JSON/HTML file
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      generateStatsFile: true,
      openAnalyzer: false,
      reportFilename: `${PATHS.distDevPublicStats}/webpack-client-dev-stats.html`,
      statsFilename: `${PATHS.distDevPublicStats}/webpack-client-dev-stats.json`,
    }),

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

    // Identify duplicate code in webpack bundles
    new DuplicatesPlugin({
      verbose: true,
    }),

    // Plugin to generate stats that can be consumed by '@loadable/server'
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

    // Analyze the generated bundles by webpack using a text file
    new WebpackBundleSizeAnalyzerPlugin(`${PATHS.distDevPublicStats}/webpack-client-dev-stats.txt`),

    new WorkboxPlugin.InjectManifest({
      // Don't cache-bust files since these files have unique URLs.
      dontCacheBustURLsMatching: /\.(css|gif|html|jpg|jpeg|js|json|png|svg)$/,

      // The path and name of the service worker file that will be created by the build process.
      swDest: `${PATHS.distDevPublic}/service-worker.js`,

      // The path to the source service worker file that can contain your own customized code.
      swSrc: `${PATHS.workbox}/service-worker.js`,
    }),
  ],

  // Resolve
  resolve: WEBPACK_RESOLVE,
};
