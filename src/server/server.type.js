/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

// Server all request handler log id
export type ServerAllRequestHandlerLogIdType = 'sarh';

// Server all request handler log message type
export type ServerAllRequestHandlerLogMessageType = {|
  // Log id
  li: ServerAllRequestHandlerLogIdType,
  // Request IP address
  ri: string,
  // Request method
  // Unfortunately, request.method in express type definition is a string.
  rm: string,
  // User agent
  // Unfortunately, get in express type definition can be void too.
  ua: string | void,
  // URL
  url: string,
|};

// Server error log id
export type ServerErrorLogIdType = 'se';

// Server error log message type
export type ServerErrorLogMessageType = {|
  // Error message
  em: string,
  // Error stack
  es: string,
  // Log id
  li: ServerErrorLogIdType,
  // Request IP address
  ri: string,
  // Request method
  // Unfortunately, request.method in express type definition is a string.
  rm: string,
|};

// Server exception log id type
export type ServerExceptionLogIdType = 'sue';

// Server exception log message type
export type ServerExceptionLogMessageType = {|
  // Exception message
  exm: string,
  // Exception stack
  exs: string,
  // Log id
  li: ServerExceptionLogIdType,
|};

// Server rejection log id type
export type ServerRejectionLogIdType = 'sur';

// Server rejection log message type
export type ServerRejectionLogMessageType = {|
  // Log id
  li: ServerRejectionLogIdType,
  // Unhandled rejection promise
  urp: string,
  // Unhandled rejection reason
  urr: string,
|};

// Server start event log message id
export type ServerStartEventLogIdType = 'sse';

// Server start event log message type
export type ServerStartEventLogMessageType = {|
  // Log id
  li: ServerStartEventLogIdType,
  // Server start event
  sse: string,
|};

// Server warning type log id type
export type ServerWarningLogIdType = 'sw';

// Server warning type log message type
export type ServerWarningLogMessageType = {|
  // Log id
  li: ServerWarningLogIdType,
  // Warning message
  wm: string,
  // Warning string
  ws: string,
|};
