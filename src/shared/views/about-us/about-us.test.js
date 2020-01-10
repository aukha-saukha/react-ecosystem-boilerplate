import { shallow } from 'enzyme';
import React from 'react';

import AboutUs from './about-us.react';

describe('AboutUs component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<AboutUs />);

    expect(wrapper).toMatchSnapshot();
  });
});
