import {en, vi} from '@i18n/translations';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
const {languageDetector} = require('@i18n/utils/languageDetector');
const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
