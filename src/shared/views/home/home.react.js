// @flow strict

import * as React from 'react';

import Error from '../error';
import Loading from '../loading';

import { useLanguage } from '../../../client/hooks/language';
import useTranslator from '../../../client/hooks/translator';

function Home(): React.Element<'main'> {
  // Language hook
  const { language } = useLanguage();

  // Translator hook
  const homeTranslatorHooksInput = {
    component: 'home',
    language,
  };

  const homeTranslatorHooksResponse = useTranslator(homeTranslatorHooksInput);
  const { doesContainError, isLoading, translationsData } = homeTranslatorHooksResponse;

  return (
    <main className="font-size-16">
      {doesContainError === true && <Error message="generic" />}
      {isLoading === true ? (
        <Loading />
      ) : (
        <p>
          {typeof translationsData.homePageMessage !== 'undefined' &&
            translationsData.homePageMessage}
        </p>
      )}
    </main>
  );
}

export default Home;
