// @flow strict

import React from 'react';

import ErrorBoundaryStyle from './error-boundary.scss';

import type {
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

  componentDidCatch(error: Error, errorInfo: ErrorInfoType): void {
    // TODO: use a logger such as winston, and remove the following console log statement.
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
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
