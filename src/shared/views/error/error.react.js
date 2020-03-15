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

import errorStyle from './error.scss';

import type { ErrorPropsType } from './error.type';

function Error({ message }: ErrorPropsType): React.Element<'div'> {
  // Get user's current language
  const { language } = useLanguage();

  // Use translator hook to get component's @translations in user's preferred language
  const translatorHooksInput = {
    component: 'error',
    language,
  };

  const errorTranslatorHooksResponse = useTranslator(translatorHooksInput);

  const { translationsData } = errorTranslatorHooksResponse;

  if (message === 'generic') {
    return (
      <div className={errorStyle['error']}>
        {typeof translationsData.genericErrorMessage !== 'undefined' &&
          translationsData.genericErrorMessage}
      </div>
    );
  }

  return <div className={errorStyle['error']}>{message}</div>;
}

export { Error };
