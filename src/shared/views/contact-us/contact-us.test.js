import { shallow } from 'enzyme';
import React from 'react';

import ContactUs from './contact-us.react';

import { LanguageProvider } from '../../../client/hooks/language';

describe('ContactUs component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(
      <LanguageProvider>
        <ContactUs />
      </LanguageProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
