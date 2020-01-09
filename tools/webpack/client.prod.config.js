const TerserWebpackPlugin = require('terser-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

// Common config options
const { BROWSERS_LIST, EXTENSIONS_TO_RESOLVE, PATHS } = require('./common.config');

// Custom plugin to create required directories if they don't exist already
const CreateRequiredDirectoriesPlugin = require('./create-required-directories-plugin');

module.exports = {
  // Base directory for resolving entry points and loaders from configuration.
  context: PATHS.src,

  // Entry points
  entry: {
    // Client
    client: `${PATHS.src}/client`,
  },

  // Mode
  mode: 'production',

  // Loaders
  module: {
    rules: [
      // JS loader
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    forceAllTransforms: true,
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
              presets: [
                [
                  '@babel/preset-env',
                  {
                    forceAllTransforms: true,
                    modules: false,
                    targets: {
                      browsers: BROWSERS_LIST,
                    },
                  },
                ],
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
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],

    splitChunks: {
      cacheGroups: {
        // Create a custom vendor chunk.
        vendor: {
          chunks: 'all',
          enforce: true,
          name: 'vendor',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        },
      },
    },
  },

  // Options related to how webpack emits results
  output: {
    // The filename template for entry chunks.
    filename: '[name].[chunkhash].js',

    // The target directory where webpack should store the output file(s).
    path: PATHS.distProdPublicJS,

    // The url to the output directory resolved relative to the HTML page which
    // will be used to serve the bundled file(s).
    publicPath: 'js/',
  },

  // Show warning if chunk size is too large
  performance: {
    hints: 'warning',
  },

  // Plugins
  plugins: [
    // Plugin to create required directories if they don't exist already.
    new CreateRequiredDirectoriesPlugin({
      dirs: [
        PATHS.distBase,
        PATHS.distBaseProd,
        PATHS.distProdPublic,
        PATHS.distProdPublicJS,
        PATHS.distProdPublicStats,
      ],
    }),

    // Plug in to generate an asset manifest
    new WebpackManifestPlugin({
      fileName: `${PATHS.distProdPublicStats}/manifest.json`,

      // The below function removes extension from the key values of the manifest file.
      map: (file) => {
        return {
          ...file,
          name: file.name
            .split('.')
            .slice(0, -1)
            .join('.'),
        };
      },
    }),
  ],

  // Resolve imports without extensions
  resolve: {
    extensions: EXTENSIONS_TO_RESOLVE,
  },
};
