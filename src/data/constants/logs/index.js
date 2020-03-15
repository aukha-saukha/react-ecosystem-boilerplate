/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

const CLIENT_LOGGER = {
  batchSize: 25,
  url: '/_/csl',
};

const LOG_LEVEL = {
  debug: 'debug',
  error: 'error',
  info: 'info',
  warning: 'warning',
};

// - We can enable either 'all' server logs or limit server logs by specifying an array of enabled
//   log ids. Enabling only a specific log id can be useful in debugging.
// - This is for server logs only. All client logs are on by default. Since client logs are sent in
//   a specified batch size which makes them a bit inefficient for debugging. Besides, there are
//   better ways to debug front end code.
const SERVER_LOG_ENABLED_IDS = {
  console: 'all',
  debug: 'all',
  error: 'all',
  info: 'all',
  warning: 'all',
};

export { CLIENT_LOGGER, LOG_LEVEL, SERVER_LOG_ENABLED_IDS };
