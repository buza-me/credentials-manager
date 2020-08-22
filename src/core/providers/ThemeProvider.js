import React, { useState } from 'react';
import { DEFAULT_THEME } from 'Constants';
import { ThemeContext } from 'Contexts';
import themeConfig from '../theme';

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
