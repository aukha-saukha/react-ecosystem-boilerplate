/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

export type LogoType =
  | {|
      img: {|
        alt: string,
        src: string,
        srcSet: {|
          '1x': string,
          '2x': string,
        |},
      |},
      linkToLocation: '/',
    |}
  | {|
      linkToLocation: string,
      name: string,
    |};

export type TopNavItemType = {|
  key: string,
  languageCode: 'en-us' | 'hi-in',
  translationKey: string,
|};
