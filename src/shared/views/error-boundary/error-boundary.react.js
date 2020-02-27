// @flow strict

import React from 'react';

import ErrorBoundaryStyle from './error-boundary.scss';

import { addRecurringLog } from '../../../client/utilities/client-logger';
import { LOG_LEVEL } from '../../../data/constants/logs';
import { getCurrentUtcTimestamp } from '../../utilities/date';

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

export default ErrorBoundary;
