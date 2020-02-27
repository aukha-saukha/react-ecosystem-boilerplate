// @flow strict

import * as React from 'react';

import type { UseTranslatorParametersType } from './translator.type';

const translationsFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_FAILURE':
      return {
        ...state,
        doesContainError: true,
        isLoading: false,
      };

    case 'FETCH_INIT':
      return {
        ...state,
        doesContainError: false,
        isLoading: true,
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        doesContainError: false,
        isLoading: false,
        translationsData: action.payload,
      };

    default:
      throw new Error();
  }
};

const useTranslator = ({ component, language }: UseTranslatorParametersType) => {
  const [state, dispatch] = React.useReducer(translationsFetchReducer, {
    doesContainError: false,
    isLoading: false,
    translationsData: {},
  });

  React.useEffect(() => {
    let didCancel = false;
    const getRequestData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        // The reason to disable flow here is because if we want to have a dynamic import, the
        // import path can't be a string.
        // flow-disable-line
        const result = await import(`../../../data/translations/${component}/${language}`);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result });
        }
      } catch (error) {
        // TODO: Add a logger
        if (process.env.NODE_ENV !== 'production') {
          // The reason to disable `no-console` rule here is because we want developers to see the error
          // in development environment.
          // eslint-disable-next-line no-console
          console.log(error);
        }

        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    getRequestData();

    return () => {
      didCancel = true;
    };
  }, [component, language]);

  return state;
};

export default useTranslator;
