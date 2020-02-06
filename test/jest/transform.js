const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-flow',
    '@babel/preset-react',
  ],
});
