import { shallow } from 'enzyme';
import React from 'react';

import Header from './header.react';

describe('Header component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper).toMatchSnapshot();
  });
});
