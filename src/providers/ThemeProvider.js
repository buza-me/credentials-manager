import React, { useState, useMemo } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import deepOrange from '@material-ui/core/colors/deepOrange';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { LIGHT_THEME, DARK_THEME, PREFERRED_THEME_LOCALSTORAGE_KEY } from 'Constants';
import { ThemeContext } from 'Contexts';

const setToStorage = (value) => localStorage.setItem(PREFERRED_THEME_LOCALSTORAGE_KEY, value);

export const ThemeProvider = ({ children }) => {
  let preferredTheme = localStorage.getItem(PREFERRED_THEME_LOCALSTORAGE_KEY);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  if (!preferredTheme) {
    preferredTheme = prefersDarkMode ? DARK_THEME : LIGHT_THEME;
    setToStorage(preferredTheme);
  }

  const [themeName, _setThemeName] = useState(preferredTheme);

  const setThemeName = (value) => {
    setToStorage(value);
    _setThemeName(value);
  };

  const themeObject = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: lightBlue,
          secondary: deepOrange,
          type: themeName
        }
      }),
    [themeName]
  );

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <MUIThemeProvider theme={themeObject}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
