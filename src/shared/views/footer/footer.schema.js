/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import type { FooterItemType } from './footer.type';

const FOOTER_LINKS = [
  ({
    dataTest: 'about-us',
    linkToLocation: '/about-us',
    translationKey: 'aboutUsLink',
  }: FooterItemType),
  ({
    dataTest: 'contact-us',
    linkToLocation: '/contact-us',
    translationKey: 'contactUsLink',
  }: FooterItemType),
];

export { FOOTER_LINKS };
