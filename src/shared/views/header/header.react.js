// @flow strict

import * as React from 'react';
import { NavLink } from 'react-router-dom';

import headerStyle from './header.scss';

import { LOGO } from '../../../data/views-schema/header';

function Header(): React.Element<'header'> {
  return (
    <header
      className={`display-flex flex-items-align-center padding-all-15 ${headerStyle['header']}`}
    >
      <h1>
        <NavLink className={`width-100 ${headerStyle['logo']}`} to={LOGO.linkToLocation}>
          {LOGO.name}
        </NavLink>
      </h1>
    </header>
  );
}

export default Header;
