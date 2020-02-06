// @flow strict

import type { Node } from 'react';

export type ErrorBoundaryPropsType = {|
  children: Node,
|};

export type ErrorBoundaryStateType = {|
  hasError: boolean,
|};

// The reason to disable flow here is, because we can't use the exact type for ErrorInfoType, which
// is throwing the `implicit-inexact-object` warning.
// flow-disable-line
export type ErrorInfoType = {
  componentStack: string,
};
