import { mount, shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { FOOTER_LINKS } from '../../../data/views-schema/footer';
import Footer from './footer.react';

describe('Footer component', () => {
  it('has all navigation links defined in the footer schema', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Check if number of footer links is equivalent of links defined in footer schema
    expect(wrapper.find('a')).toHaveLength(FOOTER_LINKS.length);

    // Grab all link using their href property, and confirm their text matches to their respective
    // values in footer schema.
    FOOTER_LINKS.forEach((footerLink) => {
      expect(wrapper.find(`a[href='${footerLink.linkToLocation}']`).text()).toEqual(
        `${footerLink.name}`
      );
    });

    wrapper.unmount();
  });

  it('Renders correctly', () => {
    const wrapper = shallow(<Footer />);

    expect(wrapper).toMatchSnapshot();
  });
});
