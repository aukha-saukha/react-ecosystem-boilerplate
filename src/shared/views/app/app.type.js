/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import type { BaseClientLogMessageType } from '@client-utilities/client-logger.type';

// Client unique log message id
export type ClientUniqueLogIdType = 'ul';

// Client unique log type
export type ClientUniqueLogMessageType = {|
  ...BaseClientLogMessageType,
  // Device info
  di: {|
    // Screen depth
    sd: string,
    // Screen resolution
    sr: string,
    // View port
    vp: string,
  |},
  // Log id
  li: ClientUniqueLogIdType,
  // User info
  ui: {|
    // Connection type
    ct: string,
    // User language
    ul: string,
  |},
|};

// React router path log id type
export type ReactRouterPathLogIdType = 'rrp';

// React router path log message type
export type ReactRouterPathLogMessageType = {|
  ...BaseClientLogMessageType,
  // Log id
  li: ReactRouterPathLogIdType,
  // Page visited
  pv: string,
|};

// React router invalid path log id type
export type ReactRouterInvalidPathLogIdType = 'rrip';

// React router invalid path log message type
export type ReactRouterInvalidPathLogMessageType = {|
  ...ReactRouterPathLogMessageType,
  // Error code
  ec: number,
  // Log id
  li: ReactRouterInvalidPathLogIdType,
|};
