import React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';

const languages = ['ru_RU', 'uk_UA', 'en'];
const clickCallback = (i18n) => {
  const langIndex = languages.indexOf(i18n.language);
  const nextLocale = langIndex === languages.length - 1 ? languages[0] : languages[langIndex + 1];
  i18n.changeLanguage(nextLocale, () => moment && console.log(moment.locale()));
};

const App = () => {
  const { t, i18n } = useTranslation();
  return <h1 onClick={() => clickCallback(i18n)}>{t('hello.world')}</h1>;
};

export default App;
