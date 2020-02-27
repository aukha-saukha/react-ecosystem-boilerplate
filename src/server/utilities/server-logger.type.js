// @flow strict

import type {
  ClientUniqueLogIdType,
  ClientUniqueLogMessageType,
  ReactRouterPathLogIdType,
  ReactRouterInvalidPathLogIdType,
} from '../../shared/views/app/app.type';
import type { ClientRecurringLogMessageType } from '../../client/utilities/client-logger.type';
import type { ErrorBoundaryErrorLogIdType } from '../../shared/views/error-boundary/error-boundary.type';
import type {
  ServerAllRequestHandlerLogIdType,
  ServerAllRequestHandlerLogMessageType,
  ServerErrorLogIdType,
  ServerErrorLogMessageType,
  ServerExceptionLogIdType,
  ServerExceptionLogMessageType,
  ServerStartEventLogIdType,
  ServerStartEventLogMessageType,
  ServerRejectionLogIdType,
  ServerRejectionLogMessageType,
  ServerWarningLogIdType,
  ServerWarningLogMessageType,
} from '../server.type';

export type LogIdType =
  | ClientUniqueLogIdType
  | ErrorBoundaryErrorLogIdType
  | ReactRouterPathLogIdType
  | ReactRouterInvalidPathLogIdType
  | ServerAllRequestHandlerLogIdType
  | ServerErrorLogIdType
  | ServerExceptionLogIdType
  | ServerStartEventLogIdType
  | ServerRejectionLogIdType
  | ServerWarningLogIdType;

// Unfortunately, flow can't determine type based of constants from an external file. In this case,
// LOG_LEVEL from "../../data/constants/logs". See: https://github.com/facebook/flow/issues/4279
export type LogLevelType = 'debug' | 'error' | 'info' | 'warning';

export type LogMessageType =
  | ClientRecurringLogMessageType
  | ClientUniqueLogMessageType
  | ServerAllRequestHandlerLogMessageType
  | ServerErrorLogMessageType
  | ServerExceptionLogMessageType
  | ServerStartEventLogMessageType
  | ServerRejectionLogMessageType
  | ServerWarningLogMessageType;

export type LogSourceType = 'client' | 'server';
