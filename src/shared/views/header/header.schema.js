import { APP_GENERAL_INFO } from '../../../data/constants/app/config';

const LOGO = {
  img: {
    alt: APP_GENERAL_INFO.name,
    src: 'img/logo.png',
    srcSet: {
      '1x': 'img/logo-1x.png',
      '2x': 'img/logo-2x.png',
    },
  },
  linkToLocation: '/',
};

const TOP_NAV = [
  {
    key: 'english',
    languageCode: 'en-us',
    translationKey: 'englishUsDisplayName',
  },
  {
    key: 'hindi',
    languageCode: 'hi-in',
    translationKey: 'hindiDisplayName',
  },
];

export { LOGO, TOP_NAV };
