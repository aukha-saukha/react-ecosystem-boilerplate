const fs = require('fs');

// Common config options
const { EXTENSIONS_TO_RESOLVE, PATHS } = require('./common.config');

// Custom plugin to create required directories if they don't exist already
const CreateRequiredDirectoriesPlugin = require('./create-required-directories-plugin');

module.exports = {
  // Base directory for resolving entry points and loaders from configuration.
  context: PATHS.src,

  // Entry points
  entry: {
    // Server
    server: `${PATHS.src}/server`,
  },

  // Keep node_module paths out of the bundle
  externals: fs
    .readdirSync(PATHS.nodeModules)
    .concat(['react-dom/server'])
    .reduce((ext, mod) => {
      const extParam = ext;
      extParam[mod] = `commonjs ${mod}`;
      return extParam;
    }, {}),

  // Mode
  mode: 'production',

  // Loaders
  module: {
    rules: [
      // CSS, SASS loaders. Only .scss extension is allowed.
      {
        exclude: /node_modules/,
        test: /\.(c|sc)ss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                mode: 'local',
              },
              onlyLocals: true,
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
              plugins: ['@loadable/babel-plugin'],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    forceAllTransforms: true,
                    modules: false,
                    targets: {
                      node: 'current',
                    },
                  },
                ],
              ],
            },
          },
        ],
      },

      // JSX loader. We'll use component-name.react.js format.
      // The only js file which is not in *.react.js format that can have JSX is, server index file.
      {
        exclude: /node_modules/,
        test: [/\.react\.js$/, `${PATHS.src}/server`],
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
                      node: 'current',
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

  // Configure whether to polyfill or mock certain Node.js globals and modules
  node: {
    global: false,
    __dirname: false,
    __filename: false,
  },

  // Options related to how webpack emits results
  output: {
    // Name of non-entry chunk files
    chunkFilename: '[name].[contenthash].js',

    // The filename template for entry chunks.
    filename: '[name].js',

    // The target directory where webpack should store the output file(s).
    path: PATHS.distProdPrivateJS,

    // The url to the output directory resolved relative to the HTML page which
    // will be used to serve the bundled file(s).
    publicPath: 'js/',
  },

  // Plugins
  plugins: [
    // Plugin to create required directories if they don't exist already.
    new CreateRequiredDirectoriesPlugin({
      dirs: [PATHS.distBase, PATHS.distBaseProd, PATHS.distProdPrivate, PATHS.distProdPrivateJS],
    }),
  ],

  // Resolve imports without extensions
  resolve: {
    extensions: EXTENSIONS_TO_RESOLVE,
  },

  // Compile for usage in a node.js-like environment
  target: 'node',
};
