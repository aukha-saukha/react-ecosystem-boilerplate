// @flow strict

import type { Node } from 'react';

import type { BaseClientLogMessageType } from '../../../client/utilities/client-logger.type';

export type ErrorBoundaryErrorLogIdType = 'eb';

// Error boundary type
export type ErrorBoundaryErrorLogMessageType = {|
  ...BaseClientLogMessageType,
  // Error name
  en: string,
  // Error stack
  es: string,
  // Log id
  li: ErrorBoundaryErrorLogIdType,
|};

// Error boundary props type
export type ErrorBoundaryPropsType = {|
  children: Node,
|};

// Error boundary state type
export type ErrorBoundaryStateType = {|
  hasError: boolean,
|};

// The reason to disable flow here is, because we can't use the exact type for ErrorInfoType, which
// is throwing the `implicit-inexact-object` warning.
// flow-disable-line
export type ErrorInfoType = {
  componentStack: string,
};
