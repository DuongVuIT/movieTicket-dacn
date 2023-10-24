import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'react-native-localize';
const STORE_LANGUAGE_KEY = 'settings.lang';
const languageDetector = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then(language => {
        if (language) {
          return callback(language);
        } else {
          const locale = (Localization as any).locale; // Sử dụng "as any" để tránh lỗi kiểm tra kiểu
          return callback(locale);
        }
      });
    } catch (error) {
      console.log('Error reading language', error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {}
  },
};
module.exports = {languageDetector};
