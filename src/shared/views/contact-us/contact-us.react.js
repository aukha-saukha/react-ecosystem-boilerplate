/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import * as React from 'react';

import { useLanguage } from '@hooks/language';
import { useTranslator } from '@hooks/translator';

import { Error } from '@views/error';
import { Loading } from '@views/loading';

function ContactUs(): React.Element<'main'> {
  // Get user's current language
  const { language } = useLanguage();

  // Use translator hook to get component's @translations in user's preferred language
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

export { ContactUs };
