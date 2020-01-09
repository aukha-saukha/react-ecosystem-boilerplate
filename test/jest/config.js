const { resolve } = require('path');

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files.
  coverageDirectory: '<rootDir>/test/jest/coverage',

  // Handle CSS module
  moduleNameMapper: {
    '^.+\\.(c|sc)ss$': 'identity-obj-proxy',
  },

  // Root directory
  rootDir: resolve(__dirname, '../../'),

  // Setup file
  setupFiles: ['<rootDir>/test/jest/setup.js'],

  // Snapshot serializer
  snapshotSerializers: ['enzyme-to-json/serializer'],

  // Only ${ComponentName}.test.js is allowed as test files for the sake of consistency.
  testMatch: ['<rootDir>/src/**/?(*.)+(test).js'],

  // Custom transform
  transform: {
    '^.+\\.js$': '<rootDir>/test/jest/transform.js',
  },
};
