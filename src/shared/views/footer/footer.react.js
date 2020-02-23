// @flow strict-local

import * as React from 'react';
import { NavLink } from 'react-router-dom';

import footerStyle from './footer.scss';

import { FOOTER_LINKS } from './footer.schema';

import { useLanguage } from '../../../client/hooks/language';
import useTranslator from '../../../client/hooks/translator';

function Footer(): React.Element<'footer'> {
  // Language hook
  const { language } = useLanguage();

  // Translator hook
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

export default Footer;
