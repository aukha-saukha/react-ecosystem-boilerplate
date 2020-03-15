/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mount, shallow } from 'enzyme';
import React from 'react';

import { ErrorBoundary } from './error-boundary.react';

function ChildWithError() {
  throw Error('Intentional error');
}

function mockAddRecurringLog() {
  const original = require.requireActual('@client-utilities/client-logger');

  return {
    ...original,
    addRecurringLog: jest.fn(),
  };
}

jest.mock('@client-utilities/client-logger', () => mockAddRecurringLog());

// There are console error and log messages which are typically useful, but can be suppressed
// because we intentionally introduced an error.
function swallowConsoleError(codeToRun) {
  // Copy console.error and console.log implementation in temporary variables
  const { error, log } = console;

  // Assign console.error and console.log to empty arrow functions.
  // eslint-disable-next-line no-console
  console.error = () => {};
  // eslint-disable-next-line no-console
  console.log = () => {};

  // Run the code that shows console error and log messages
  codeToRun();

  // Re-implement the original console.error and console.log implementation
  // eslint-disable-next-line no-console
  console.error = error;
  // eslint-disable-next-line no-console
  console.log = log;
}

describe('"Error boundary" component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<ErrorBoundary />);

    expect(wrapper).toMatchSnapshot();
  });

  test('Shows the correct error message.', () => {
    swallowConsoleError(() => {
      const wrapper = mount(
        <ErrorBoundary>
          <ChildWithError />
        </ErrorBoundary>
      );

      const text = wrapper.text();

      expect(text).toEqual('Something went wrong. Please refresh the page, and try again.');

      wrapper.unmount();
    });
  });

  test('Shows the correct error stack.', () => {
    swallowConsoleError(() => {
      const spy = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');

      const wrapper = mount(
        <ErrorBoundary>
          <ChildWithError />
        </ErrorBoundary>
      );

      expect(spy).toHaveBeenCalled();

      // prettier-ignore
      expect(spy.mock.calls[0][1]).toEqual(
        {
          componentStack: `
    in ChildWithError
    in ErrorBoundary (created by WrapperComponent)
    in WrapperComponent`
        }
      );

      spy.mockClear();
      spy.mockReset();
      spy.mockRestore();
      wrapper.unmount();
    });
  });
});
