// @flow strict

import type {
  ReactRouterPathLogMessageType,
  ReactRouterInvalidPathLogMessageType,
} from '../../shared/views/app/app.type';
import type { ErrorBoundaryErrorLogMessageType } from '../../shared/views/error-boundary/error-boundary.type';
import type { LogLevelType } from '../../server/utilities/server-logger.type';

type PageErrorLogId = 'pe';

// Base client log type
export type BaseClientLogMessageType = {|
  // Log level
  ll: LogLevelType,
  // Timestamp
  ts: Date,
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
