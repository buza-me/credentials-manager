import React, { useState } from 'react';
import themeConfig from '../theme';
import { DEFAULT_THEME } from '../../constants';
import { ThemeContext } from '../contexts';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const styles = themeConfig[theme.value] || themeConfig[DEFAULT_THEME.value];
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <style>{styles}</style>
      {children}
    </ThemeContext.Provider>
  );
};
