/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { /* mount, */ shallow } from 'enzyme';
import React from 'react';
// import { MemoryRouter } from 'react-router-dom';

// import { FOOTER_LINKS } from './footer.schema';

import { LanguageProvider } from '@hooks/language';
import { Footer } from './footer.react';

function mockUserStore() {
  const original = require.requireActual('@client-utilities/user-store');

  return {
    ...original,
    getSettingFromUserStore: jest.fn(),
  };
}

jest.mock('@client-utilities/user-store', () => mockUserStore());

describe('Footer component', () => {
  // Disabling this test for now because in Enzyme, useEffect is not called in shallow render.
  // Bug https://github.com/airbnb/enzyme/issues/2086 is open.
  // TODO: Fix it once Enzyme supports it.
  // eslint-disable-next-line jest/no-commented-out-tests
  // it('has all navigation links defined in the footer schema', () => {
  //   const wrapper = mount(
  //     <MemoryRouter>
  //       <LanguageProvider>
  //         <Footer />
  //       </LanguageProvider>
  //     </MemoryRouter>
  //   );

  //   // Check if number of footer links is equivalent of links defined in footer schema
  //   expect(wrapper.find('a')).toHaveLength(FOOTER_LINKS.length);

  //   // Grab all link using their href property, and confirm their text matches to their respective
  //   // values in footer schema.
  //   FOOTER_LINKS.forEach((footerLink) => {
  //     expect(wrapper.find(`a[href='${footerLink.linkToLocation}']`).text()).toEqual(
  //       `${footerLink.name}`
  //     );
  //   });

  //   wrapper.unmount();
  // });

  it('Renders correctly', () => {
    const wrapper = shallow(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
