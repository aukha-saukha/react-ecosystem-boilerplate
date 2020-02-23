import { shallow } from 'enzyme';
import React from 'react';

import NotFound from './not-found.react';

import { LanguageProvider } from '../../../client/hooks/language';

describe('NotFound component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(
      <LanguageProvider>
        <NotFound />
      </LanguageProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
