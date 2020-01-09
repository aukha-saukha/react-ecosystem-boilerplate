import { shallow } from 'enzyme';
import React from 'react';

import App from './app.react';

describe('App component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});
