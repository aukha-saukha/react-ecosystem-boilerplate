/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { shallow } from 'enzyme';
import React from 'react';

import { LanguageProvider } from '@hooks/language';

import { NotFound } from './not-found.react';

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
