import { /* mount, */ shallow } from 'enzyme';
import React from 'react';
// import { MemoryRouter } from 'react-router-dom';

import App from './app.react';
// import NotFound from '../not-found';

function mockClientSideLogger() {
  const original = require.requireActual('../../../client/utilities/client-logger');

  return {
    ...original,
    addRecurringLog: jest.fn(),
    addUniqueLog: jest.fn(),
  };
}

function mockUseLocationHook() {
  const original = require.requireActual('react-router-dom');
  return {
    ...original,
    useLocation: jest.fn().mockReturnValue({
      pathname: '/about-us',
      search: '',
      hash: '',
      state: null,
      key: '5nvxpb',
    }),
  };
}

function mockUserStore() {
  const original = require.requireActual('../../../client/utilities/user-store');

  return {
    ...original,
    addProfileDataToUserStore: jest.fn(),
    getSettingFromUserStore: jest.fn(),
  };
}

jest.mock('../../../client/utilities/client-logger', () => mockClientSideLogger());
jest.mock('../../../client/utilities/user-store', () => mockUserStore());
jest.mock('react-router-dom', () => mockUseLocationHook());

describe('App component', () => {
  // Disabling this test for now because in Enzyme, useEffect is not called in shallow render.
  // Bug https://github.com/airbnb/enzyme/issues/2086 is open.
  // TODO: Fix it once Enzyme supports it.
  // eslint-disable-next-line jest/no-commented-out-tests
  // it('Invalid path renders "Not Found" page', () => {
  //   const wrapper = mount(
  //     <MemoryRouter initialEntries={['/random']}>
  //       <App />
  //     </MemoryRouter>
  //   );
  //   expect(wrapper.find(NotFound)).toHaveLength(1);

  //   wrapper.unmount();
  // });

  it('Renders correctly', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});
