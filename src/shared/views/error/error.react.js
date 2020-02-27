// @flow strict

import * as React from 'react';

import { useLanguage } from '../../../client/hooks/language';
import useTranslator from '../../../client/hooks/translator';

import errorStyle from './error.scss';

import type { ErrorPropsType } from './error.type';

function Error({ message }: ErrorPropsType): React.Element<'div'> {
  // Language hook
  const { language } = useLanguage();

  // Translator hook
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

export default Error;
