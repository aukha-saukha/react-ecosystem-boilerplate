/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import type { LogLevelType } from '@server-utilities/server-logger.type';
import type {
  ReactRouterPathLogMessageType,
  ReactRouterInvalidPathLogMessageType,
} from '@views/app/app.type';
import type { ErrorBoundaryErrorLogMessageType } from '@views/error-boundary/error-boundary.type';

type PageErrorLogId = 'pe';

// Base client log type
export type BaseClientLogMessageType = {|
  // Log level
  ll: LogLevelType,
  // Timestamp
  ts: string,
|};

// Page error log message ype
export type PageErrorLogMessageType = {|
  ...BaseClientLogMessageType,
  // Error message
  em: string,
  // Error name
  en: string,
  // Error stack
  es: string,
  // Log id
  li: PageErrorLogId,
  // User id
  uid: string,
|};

export type ClientRecurringLogMessageType =
  | ErrorBoundaryErrorLogMessageType
  | ReactRouterInvalidPathLogMessageType
  | ReactRouterPathLogMessageType;
