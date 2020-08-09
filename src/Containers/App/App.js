import React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();
  return <h1>{t('hello.world')}</h1>;
};

export default App;
