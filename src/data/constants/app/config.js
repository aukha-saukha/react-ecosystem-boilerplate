/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

const APP_GENERAL_INFO = {
  backgroundColor: '#0c77f8',
  description:
    'React ecosystem boilerplate. The simplest, easiest way to build a world class, production ready app.',
  name: 'React ecosystem boilerplate',
  shortName: 'REB',
  themeColor: '#0c77f8',
};

const DEFAULT_LOCALE = 'en-us';

const PORTS = {
  dev: 5005,
  prod: 5014,
  webpackDevServer: 5023,
};

const SUPPORTED_LOCALES = ['en-us', 'hi-in'];

module.exports = { APP_GENERAL_INFO, DEFAULT_LOCALE, PORTS, SUPPORTED_LOCALES };
