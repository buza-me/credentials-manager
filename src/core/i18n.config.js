import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { PREFERRED_LANGUAGE_LOCALSTORAGE_KEY } from 'Constants';
import resources from './i18n';

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en', // use en if detected lng is not available
    saveMissing: true, // send not translated keys to endpoint
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

i18n.on('languageChanged', (lang) =>
  localStorage.setItem(PREFERRED_LANGUAGE_LOCALSTORAGE_KEY, lang)
);

const preferredLanguage = localStorage.getItem(PREFERRED_LANGUAGE_LOCALSTORAGE_KEY);

if (preferredLanguage) {
  i18n.changeLanguage(preferredLanguage);
}

export default i18n;
