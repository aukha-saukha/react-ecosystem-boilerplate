/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import type { ClientRecurringLogMessageType } from '@client-utilities/client-logger.type';
import type {
  ClientUniqueLogIdType,
  ClientUniqueLogMessageType,
  ReactRouterPathLogIdType,
  ReactRouterInvalidPathLogIdType,
} from '@views/app/app.type';
import type { ErrorBoundaryErrorLogIdType } from '@views/error-boundary/error-boundary.type';
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
