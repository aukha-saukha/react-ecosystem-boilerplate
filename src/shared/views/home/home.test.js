import { shallow } from 'enzyme';
import React from 'react';

import Home from './home.react';

import { LanguageProvider } from '../../../client/hooks/language';

describe('Home component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(
      <LanguageProvider>
        <Home />
      </LanguageProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
