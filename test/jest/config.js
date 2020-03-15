/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { resolve } = require('path');

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files.
  coverageDirectory: '<rootDir>/test/jest/coverage',

  // Handle CSS module
  moduleNameMapper: {
    '^.+\\.(c|sc)ss$': 'identity-obj-proxy',
    '^@client-utilities(.*)$': '<rootDir>/src/client/utilities$1',
    '^@constants(.*)$': '<rootDir>/src/data/constants$1',
    '^@hooks(.*)$': '<rootDir>/src/client/hooks$1',
    '^@routes(.*)$': '<rootDir>/src/shared/routes$1',
    '^@server-utilities(.*)$': '<rootDir>/src/server/utilities$1',
    '^@shared-utilities(.*)$': '<rootDir>/src/shared/utilities$1',
    '^@static(.*)$': '<rootDir>/src/static$1',
    '^@translations(.*)$': '<rootDir>/src/data/translations$1',
    '^@views(.*)$': '<rootDir>/src/shared/views$1',
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
