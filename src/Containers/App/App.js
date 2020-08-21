import './App.css';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../core';
import { AVAILABLE_LANGUAGES, AVAILABLE_THEMES } from '../../constants';

const App = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);

  const languageChanger = () => {
    const currentLangIndex = AVAILABLE_LANGUAGES.findIndex((item) => item.value === i18n.language);
    let nextLangIndex = 0;
    if (currentLangIndex > -1 && currentLangIndex < AVAILABLE_LANGUAGES.length - 1) {
      nextLangIndex = currentLangIndex + 1;
    }
    i18n.changeLanguage(AVAILABLE_LANGUAGES[nextLangIndex].value);
  };

  const themeChanger = () => {
    const currentThemeIndex = AVAILABLE_THEMES.findIndex((item) => item.value === theme.value);
    let nextThemeIndex = 0;
    if (currentThemeIndex > -1 && currentThemeIndex < AVAILABLE_THEMES.length - 1) {
      nextThemeIndex = currentThemeIndex + 1;
    }
    setTheme(AVAILABLE_THEMES[nextThemeIndex]);
  };

  return (
    <>
      <h1 style={{ color: 'var(--main-color)' }}>{t('hello.world')}</h1>
      <button type='button' onClick={languageChanger}>
        {t('change.language')}
      </button>
      <button type='button' onClick={themeChanger}>
        {t('change.theme')}
      </button>
    </>
  );
};

export default App;
