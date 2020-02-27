module.exports = {
  env: {
    browser: true,
    'jest/globals': true,
    node: true,
  },
  extends: ['airbnb', 'plugin:jest/recommended', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['jest', 'prettier', 'react-hooks'],
  rules: {
    // Allow object dot notation.
    'dot-notation': 0,
    // Exception for dev dependencies
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // Ignore unused vars rule for variables starting with an underscore.
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    // Prettier settings
    'prettier/prettier': ['error'],
    // Checks hooks rules
    'react-hooks/rules-of-hooks': 'error',
    // Checks effect dependencies
    'react-hooks/exhaustive-deps': 'warn',
    // Allow JSX in files with js extensions
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    // Disallow arrow function or bind call as a prop for performance reasons
    'react/jsx-no-bind': 2,
    // Turn off prop types warning, because we'll use flow for react components.
    'react/prop-types': 0,
    // Enforce state initialization style to be with a class property.
    'react/state-in-constructor': [1, 'never'],
  },
};
