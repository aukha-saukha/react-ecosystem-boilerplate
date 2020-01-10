import { shallow } from 'enzyme';
import React from 'react';

import Home from './home.react';

describe('Home component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper).toMatchSnapshot();
  });
});
