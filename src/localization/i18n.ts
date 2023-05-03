import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en';
import vi from './vi';
import storageService from 'services/storageService';

const resources = {
  en,
  vi,
};

const getLang = async () => {
  const lang = (await storageService.getString('language')) || 'en';
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3', //To make it work for Android devices, add this line.
    resources,
    lng: lang,
    interpolation: {
      escapeValue: false,
    },
  });
};

getLang();

export default i18n;
