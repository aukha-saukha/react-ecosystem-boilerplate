// @flow strict

import * as React from 'react';

import Error from '../error';
import Loading from '../loading';

import { useLanguage } from '../../../client/hooks/language';
import useTranslator from '../../../client/hooks/translator';

function ContactUs(): React.Element<'main'> {
  // Language hook
  const { language } = useLanguage();

  // Translator hook
  const contactUsTranslatorHooksInput = {
    component: 'contact-us',
    language,
  };

  const contactUsTranslatorHooksResponse = useTranslator(contactUsTranslatorHooksInput);
  const { doesContainError, isLoading, translationsData } = contactUsTranslatorHooksResponse;
  return (
    <main className="font-size-16">
      {doesContainError === true && <Error message="generic" />}
      {isLoading === true ? (
        <Loading />
      ) : (
        <p>
          {typeof translationsData.contactUsPageMessage !== 'undefined' &&
            translationsData.contactUsPageMessage}
        </p>
      )}
    </main>
  );
}

export default ContactUs;
