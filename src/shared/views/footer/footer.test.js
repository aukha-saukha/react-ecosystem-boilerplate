import { shallow } from 'enzyme';
import React from 'react';

import Footer from './footer.react';

describe('Footer component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<Footer />);

    expect(wrapper).toMatchSnapshot();
  });
});
