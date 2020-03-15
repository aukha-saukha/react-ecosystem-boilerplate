/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { useLanguage } from '@hooks/language';
import { useTranslator } from '@hooks/translator';

import footerStyle from './footer.scss';

import { FOOTER_LINKS } from './footer.schema';

function Footer(): React.Element<'footer'> {
  // Get user's current language
  const { language } = useLanguage();

  // Use translator hook to get component's translations in user's preferred language
  const footerTranslatorHooksInput = {
    component: 'footer',
    language,
  };

  const footerTranslatorHooksResponse = useTranslator(footerTranslatorHooksInput);
  const { doesContainError, translationsData } = footerTranslatorHooksResponse;

  if (doesContainError === true) {
    // Failing silently in case translations fail to load.
    // TODO: add logger.
  }

  return (
    <footer
      className={`display-flex flex-items-align-center padding-all-15 ${footerStyle['footer']}`}
    >
      <nav>
        <ul className="display-flex">
          {FOOTER_LINKS.map((footerLink) => (
            <li key={footerLink.translationKey}>
              <NavLink
                className={footerStyle['links']}
                data-test={footerLink.dataTest}
                to={footerLink.linkToLocation}
              >
                {translationsData[footerLink.translationKey]}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}

export { Footer };
