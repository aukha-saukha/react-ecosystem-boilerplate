// @flow strict

import * as React from 'react';

import Error from '../error';
import Loading from '../loading';

import { useLanguage } from '../../../client/hooks/language';
import useTranslator from '../../../client/hooks/translator';

function NotFound(): React.Element<'main'> {
  // Language hook
  const { language } = useLanguage();

  // Translator hook
  const translatorHooksInput = {
    component: 'not-found',
    language,
  };

  const notFoundTranslatorHooksResponse = useTranslator(translatorHooksInput);

  const { doesContainError, isLoading, translationsData } = notFoundTranslatorHooksResponse;

  return (
    <main className="font-size-16">
      {doesContainError === true && <Error message="generic" />}
      {isLoading === true ? (
        <Loading />
      ) : (
        <p>
          {typeof translationsData.notFoundErrorMessage !== 'undefined' &&
            translationsData.notFoundErrorMessage}
        </p>
      )}
    </main>
  );
}

export default NotFound;
