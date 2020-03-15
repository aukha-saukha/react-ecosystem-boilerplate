/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import React from 'react';

import { addRecurringLog } from '@client-utilities/client-logger';
import { LOG_LEVEL } from '@constants/logs';
import { getCurrentUtcTimestamp } from '@shared-utilities/date';

import ErrorBoundaryStyle from './error-boundary.scss';

import type {
  ErrorBoundaryErrorLogMessageType,
  ErrorBoundaryPropsType,
  ErrorBoundaryStateType,
  ErrorInfoType,
} from './error-boundary.type';

class ErrorBoundary extends React.Component<ErrorBoundaryPropsType, ErrorBoundaryStateType> {
  state = {
    hasError: false,
  };

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error: Error): ErrorBoundaryStateType {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfoType): mixed {
    addRecurringLog(
      ({
        en: 'ErrorBoundary',
        es: errorInfo.componentStack,
        li: 'eb',
        ll: LOG_LEVEL['error'],
        ts: getCurrentUtcTimestamp(),
      }: ErrorBoundaryErrorLogMessageType)
    );

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(error, errorInfo);
    }
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <h1 className={`align-perfectly-centered ${ErrorBoundaryStyle['error']}`}>
          Something went wrong. Please refresh the page, and try again.
        </h1>
      );
    }

    return children;
  }
}

export { ErrorBoundary };
