/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import { loadableReady } from '@loadable/component';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@views/app';

const rootElement = document.getElementById('root');

// flow-disable-line
if (module.hot) {
  const renderApp = () => {
    if (rootElement === null) {
      throw new Error('Element with id #root is not found.');
    }

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      rootElement
    );
  };

  renderApp();

  // flow-disable-line
  module.hot.accept('../shared/views/app', () => {
    renderApp();
  });
} else {
  if (rootElement === null) {
    throw new Error('Element with id #root is not found.');
  }

  loadableReady(() => {
    hydrate(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      rootElement
    );
  });
}
