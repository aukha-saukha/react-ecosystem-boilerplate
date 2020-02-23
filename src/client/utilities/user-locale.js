// @flow strict

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../../data/constants/app/config';

import { getSettingFromUserStore } from './user-store';

function normalizeLocale(locale) {
  return typeof locale === 'string' ? locale.toLowerCase().replace('_', '-') : locale;
}

function getLocaleFromHtmlTag() {
  let locale;

  if (typeof document.documentElement !== 'undefined' && document.documentElement !== null) {
    locale = document.documentElement.lang;
  }

  return locale;
}

function getLocaleFromQueryString() {
  let locale;

  if (typeof window !== 'undefined') {
    const query = window.location.search.substring(1);

    if (query !== '') {
      const params = query.split('&');
      for (let i = 0; i < params.length; i += 1) {
        const equalSignPosition = params[i].indexOf('=');
        if (equalSignPosition > 0) {
          const key = params[i].substring(0, equalSignPosition);
          const value = params[i].substring(equalSignPosition + 1);
          if (key === 'lang' && SUPPORTED_LOCALES.includes(value)) {
            locale = value.toLowerCase();
          }
        }
      }
    }
  }

  return locale;
}

function getLocaleFromNavigator() {
  let locale;

  if (typeof window !== 'undefined') {
    if (navigator.languages && navigator.languages.length) {
      // The reason to disable prefer-destructuring is because, we just need the first element
      // from the array. So, it's kind of okay.
      // eslint-disable-next-line prefer-destructuring
      locale = navigator.languages[0];
    }

    // The reason to disable flow here is because some of these navigator properties are not
    // standard. That's why they're missing in the navigator object.
    // flow-disable-line
    locale = navigator.userLanguage || navigator.language || navigator.browserLanguage;
    locale = normalizeLocale(locale);
  }

  return SUPPORTED_LOCALES.includes(locale) ? locale : undefined;
}

async function getLocaleFromUserStore() {
  let locale;

  locale = await getSettingFromUserStore('lang');

  if (typeof locale !== 'undefined' && locale !== null) {
    locale = locale.toLowerCase();
  }

  return locale;
}

/*
 * We determine the user locale based on the following logic:
 * 1. The first preference is given lang query string.
 * 2. Otherwise, we try to get the user locale from the IndexedDB if it has a preference set.
 * 3. Otherwise, we try to get it from HTML tag's lang attribute which gets set at server side.
 * 4. Then, we try to find locale based on navigator object.
 * 5. If nothing else works, the function returns the app's default locale.
 */
async function getUserLocale() {
  const localeFromQueryString = getLocaleFromQueryString();

  if (typeof localeFromQueryString !== 'undefined') {
    return localeFromQueryString;
  }

  const localeFromUserStore = await getLocaleFromUserStore();

  if (typeof localeFromUserStore !== 'undefined') {
    return localeFromUserStore;
  }

  const localeFromHtmlTag = getLocaleFromHtmlTag();

  if (typeof localeFromHtmlTag !== 'undefined' && localeFromHtmlTag !== '') {
    return localeFromHtmlTag;
  }

  const localeFromNavigator = getLocaleFromNavigator();

  if (typeof localeFromNavigator !== 'undefined') {
    return localeFromNavigator;
  }

  return DEFAULT_LOCALE;
}

export default getUserLocale;
