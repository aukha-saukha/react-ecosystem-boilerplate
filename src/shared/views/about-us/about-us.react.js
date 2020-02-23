// @flow strict

import * as React from 'react';

import Error from '../error';
import Loading from '../loading';

import { useLanguage } from '../../../client/hooks/language';
import useTranslator from '../../../client/hooks/translator';

function AboutUs(): React.Element<'main'> {
  // Language hook
  const { language } = useLanguage();

  // Translator hook
  const aboutUsTranslatorHooksInput = {
    component: 'about-us',
    language,
  };

  const aboutUsTranslatorHooksResponse = useTranslator(aboutUsTranslatorHooksInput);
  const { doesContainError, isLoading, translationsData } = aboutUsTranslatorHooksResponse;

  return (
    <main className="font-size-16">
      {doesContainError === true && <Error message="generic" />}
      {isLoading === true ? (
        <Loading />
      ) : (
        <p>
          {typeof translationsData.aboutUsPageMessage !== 'undefined' &&
            translationsData.aboutUsPageMessage}
        </p>
      )}
    </main>
  );
}

export default AboutUs;
