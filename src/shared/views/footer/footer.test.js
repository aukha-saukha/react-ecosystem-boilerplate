import { /* mount, */ shallow } from 'enzyme';
import React from 'react';
// import { MemoryRouter } from 'react-router-dom';

// import { FOOTER_LINKS } from './footer.schema';

import Footer from './footer.react';
import { LanguageProvider } from '../../../client/hooks/language';

function mockUserStore() {
  const original = require.requireActual('../../../client/utilities/user-store');

  return {
    ...original,
    getSettingFromUserStore: jest.fn(),
  };
}

jest.mock('../../../client/utilities/user-store', () => mockUserStore());

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
