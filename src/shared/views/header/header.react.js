// @flow strict

import * as React from 'react';
import { NavLink } from 'react-router-dom';

import headerStyle from './header.scss';

import LOGO from '../../../data/views-schema/header';

function Header(): React.Element<'header'> {
  const logoImage = typeof LOGO.img !== 'undefined' && LOGO.img;

  let logoElement;

  if (logoImage !== false) {
    if (typeof logoImage.srcSet !== 'undefined') {
      const srcSetKeysArray = Object.keys(logoImage.srcSet);
      let srcSet = '';

      // Go through each srcSet entry, and add it to srcSet variable.
      srcSetKeysArray.forEach((resolutionScaleFactor, index) => {
        const srcSetPath = logoImage.srcSet[resolutionScaleFactor];

        // In "img/logo-1x.png 1x" format
        srcSet += `${srcSetPath} ${resolutionScaleFactor}`;

        // Add ', ' to each srcSet entry except the last one.
        if (index !== srcSetKeysArray.length - 1) {
          srcSet += ', ';
        }
      });

      logoElement = <img alt={logoImage.alt} src={logoImage.src} srcSet={srcSet} />;
    } else {
      logoElement = <img alt={logoImage.alt} src={logoImage.src} />;
    }
  } else {
    logoElement = LOGO.name;
  }

  return (
    <header
      className={`display-flex flex-items-align-center padding-all-15 ${headerStyle['header']}`}
    >
      <h1>
        <NavLink className={`width-100 ${headerStyle['logo']}`} to={LOGO.linkToLocation}>
          {logoElement}
        </NavLink>
      </h1>
    </header>
  );
}

export default Header;
