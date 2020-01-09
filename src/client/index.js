import React from 'react';
import { hydrate, render } from 'react-dom';

import App from '../shared/views/app';

const rootElement = document.getElementById('root');

if (module.hot) {
  const renderApp = () => {
    if (rootElement === null) {
      throw new Error('Element with id #root is not found.');
    } else {
      render(<App />, rootElement);
    }
  };

  renderApp();

  module.hot.accept('../shared/views/app', () => {
    renderApp();
  });
} else {
  if (rootElement === null) {
    throw new Error('Element with id #root is not found.');
  } else {
    hydrate(<App />, rootElement);
  }
}
