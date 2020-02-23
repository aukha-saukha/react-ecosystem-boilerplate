import { shallow } from 'enzyme';
import React from 'react';

import AboutUs from './about-us.react';

import { LanguageProvider } from '../../../client/hooks/language';

describe('AboutUs component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(
      <LanguageProvider>
        <AboutUs />
      </LanguageProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
