// Common config options
const { BROWSERS_LIST, EXTENSIONS_TO_RESOLVE, PATHS } = require('./common.config');

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
    filename: '[name].js',

    // The target directory where webpack should store the output file(s).
    path: PATHS.distDevPublicJS,

    // Include comments in bundles with information about the contained modules.
    // Use in Dev environment only.
    pathinfo: true,

    // The url to the output directory resolved relative to the HTML page which
    // will be used to serve the bundled file(s).
    publicPath: 'js/',
  },

  // Plugins
  plugins: [
    // Plugin to create required directories if they don't exist already.
    new CreateRequiredDirectoriesPlugin({
      dirs: [PATHS.distBase, PATHS.distBaseDev, PATHS.distDevPublic, PATHS.distDevPublicJS],
    }),
  ],

  // Resolve imports without extensions
  resolve: {
    extensions: EXTENSIONS_TO_RESOLVE,
  },
};
