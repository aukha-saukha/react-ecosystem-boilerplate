module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: {
    // Allow object dot notation.
    'dot-notation': 0,
    // Exception for dev dependencies
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // Prettier settings
    'prettier/prettier': ['error'],
    // Allow JSX in files with js extensions
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    // Disallow arrow function or bind call as a prop for performance reasons
    'react/jsx-no-bind': 2,
  },
};
