import { shallow } from 'enzyme';
import React from 'react';

import ContactUs from './contact-us.react';

describe('ContactUs component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<ContactUs />);

    expect(wrapper).toMatchSnapshot();
  });
});
