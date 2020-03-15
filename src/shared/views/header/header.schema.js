/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import { APP_GENERAL_INFO } from '@constants/app/config';

import type { LogoType, TopNavItemType } from './header.type';

const LOGO: LogoType = {
  img: {
    alt: APP_GENERAL_INFO.name,
    src: 'img/logo.png',
    srcSet: {
      '1x': 'img/logo-1x.png',
      '2x': 'img/logo-2x.png',
    },
  },
  linkToLocation: '/',
};

const TOP_NAV = [
  ({
    key: 'english',
    languageCode: 'en-us',
    translationKey: 'englishUsDisplayName',
  }: TopNavItemType),
  ({
    key: 'hindi',
    languageCode: 'hi-in',
    translationKey: 'hindiDisplayName',
  }: TopNavItemType),
];

export { LOGO, TOP_NAV };
