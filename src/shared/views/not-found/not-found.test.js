import { shallow } from 'enzyme';
import React from 'react';

import NotFound from './not-found.react';

describe('NotFound component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<NotFound />);

    expect(wrapper).toMatchSnapshot();
  });
});
