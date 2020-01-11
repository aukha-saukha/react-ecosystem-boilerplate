module.exports = {
  env: {
    browser: true,
    'jest/globals': true,
    node: true,
  },
  extends: ['airbnb', 'plugin:jest/recommended', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['jest', 'prettier'],
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
    // Turn off prop types warning, because we'll use flow for react components.
    'react/prop-types': 0,
  },
};
