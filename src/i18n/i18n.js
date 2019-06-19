import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE, STORAGE_KEY } from 'redux/ducks/LanguageDuck';
import { isRunningInJest } from 'utils/commonUtils';

const lang = window.localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    load: 'languageOnly',
    ns: ['translations'],
    defaultNS: 'translations',
    lng: lang,
    preload: [DEFAULT_LANGUAGE],

    debug: false,
    parseMissingKeyHandler: key => {
      if (!isRunningInJest()) {
        // eslint-disable-next-line no-console
        console.warn(`Missing translated key: ${key}`);
      }

      return key;
    },
    missingInterpolationHandler: text => {
      if (!['CI', 'production'].includes(process.env.NODE_ENV) && !isRunningInJest()) {
        // eslint-disable-next-line no-console
        console.warn(`Missing interpolation key in "${text}"`);
      }
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      wait: true,
      useSuspense: false,
    },
  });

export default i18n;
