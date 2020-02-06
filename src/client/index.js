// @flow strict-local

import { loadableReady } from '@loadable/component';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '../shared/views/app';

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
