// @flow strict

import * as React from 'react';
import { NavLink } from 'react-router-dom';

import headerStyle from './header.scss';

import { LOGO, TOP_NAV } from './header.schema';

import { useLanguage } from '../../../client/hooks/language';
import useTranslator from '../../../client/hooks/translator';
import { updateSettingToUserStore } from '../../../client/utilities/user-store';

function Header(): React.Element<'header'> {
  // Language hook
  const { language, setLanguage } = useLanguage();

  // Translator hook
  const headerTranslatorHooksInput = {
    component: 'header',
    language,
  };

  const translatorHooksResponse = useTranslator(headerTranslatorHooksInput);
  const { doesContainError, translationsData } = translatorHooksResponse;

  // Logo
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

  // Top nav
  let topNavItem;

  if (doesContainError === true) {
    // Failing silently in case translations fail to load. This way, the user will be able to use
    // logo link at least.
    // TODO: add logger.
  }

  function changeLanguage(languageCode) {
    setLanguage(languageCode);
    updateSettingToUserStore('lang', languageCode);

    if (typeof document.documentElement !== 'undefined' && document.documentElement !== null) {
      document.documentElement.setAttribute('lang', languageCode);
    }
  }

  TOP_NAV.forEach((topNavElement) => {
    if (topNavElement.languageCode !== language) {
      topNavItem = (
        <li className={headerStyle['nav-list-item']} key={topNavElement.key}>
          <button
            className="font-size-16"
            onClick={() => changeLanguage(topNavElement.languageCode)}
            type="button"
          >
            {translationsData[topNavElement.translationKey]}
          </button>
        </li>
      );
    }
  });

  const topNav = (
    <nav className={headerStyle['nav']}>
      <ul className={headerStyle['nav-list-holder']}>{topNavItem}</ul>
    </nav>
  );

  return (
    <header className={`align-perfectly-centered padding-all-15 ${headerStyle['header']}`}>
      <h1>
        <NavLink className={`width-100 ${headerStyle['logo']}`} to={LOGO.linkToLocation}>
          {logoElement}
        </NavLink>
      </h1>
      {topNav}
    </header>
  );
}

export default Header;
