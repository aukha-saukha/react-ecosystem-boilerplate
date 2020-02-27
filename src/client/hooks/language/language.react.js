// @flow strict

import * as React from 'react';

import { DEFAULT_LOCALE } from '../../../data/constants/app/config';

import getUserLocale from '../../utilities/user-locale';

import type { LanguageProviderParametersType } from './language.type';

// TODO: Fix flow error here.
const LanguageContext: React.Context<
  [string, (((string) => string) | string) => void]
  // flow-disable-line
> = React.createContext();

LanguageContext.displayName = 'LanguageContext';

function LanguageProvider(props: LanguageProviderParametersType) {
  const { children } = props;
  const [language, setLanguage] = React.useState<string>(DEFAULT_LOCALE);

  React.useEffect(() => {
    async function getUserLocaleFromLocaleUtility() {
      const userLanguage = await getUserLocale();
      setLanguage(userLanguage);
    }

    getUserLocaleFromLocaleUtility();
  }, [language]);

  const providerValue = React.useMemo(() => [language, setLanguage], [language]);
  return <LanguageContext.Provider value={providerValue}>{children}</LanguageContext.Provider>;
}

function useLanguage() {
  const context = React.useContext(LanguageContext);

  if (typeof context === 'undefined') {
    throw new Error(`useLanguage must be used within a LanguageProvider`);
  }

  const [language, setLanguage] = context;

  return {
    language,
    setLanguage,
  };
}

export { LanguageProvider, useLanguage };
