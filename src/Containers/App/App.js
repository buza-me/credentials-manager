import React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES } from '../../constants';

const languageChanger = (translationProvider) => {
  const currentLangIndex = AVAILABLE_LANGUAGES.findIndex(
    (item) => item.value === translationProvider.language
  );
  let nextLangIndex = 0;
  if (currentLangIndex > -1 && currentLangIndex < AVAILABLE_LANGUAGES.length - 1) {
    nextLangIndex = currentLangIndex + 1;
  }
  translationProvider.changeLanguage(AVAILABLE_LANGUAGES[nextLangIndex].value);
};

const App = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <h1>{t('hello.world')}</h1>
      <button type='button' onClick={() => languageChanger(i18n)}>
        {t('change.language')}
      </button>
    </>
  );
};

export default App;
