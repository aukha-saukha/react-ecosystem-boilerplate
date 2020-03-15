/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// flow strict

const ROUTES = [
  {
    componentName: 'about-us',
    isExact: true,
    pathToMatch: '/about-us',
  },
  {
    componentName: 'contact-us',
    isExact: true,
    pathToMatch: '/contact-us',
  },
  {
    componentName: 'home',
    isExact: true,
    pathToMatch: '/',
  },
];

export { ROUTES };
