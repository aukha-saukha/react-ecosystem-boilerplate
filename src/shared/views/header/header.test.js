import { shallow } from 'enzyme';
import React from 'react';

import Header from './header.react';

import { LanguageProvider } from '../../../client/hooks/language';

describe('Header component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
