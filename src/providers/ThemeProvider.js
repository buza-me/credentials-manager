import React, { useState, useMemo, useCallback } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import deepOrange from '@material-ui/core/colors/deepOrange';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { LIGHT_THEME, DARK_THEME, USER_PREFERENCES_LOCALSTORAGE_KEY } from 'Constants';
import { ThemeContext } from 'Contexts';

const { parse, stringify } = JSON;

const setToStorage = (theme) => {
  const userPreferences = parse(localStorage.getItem(USER_PREFERENCES_LOCALSTORAGE_KEY) || '{}');
  localStorage.setItem(USER_PREFERENCES_LOCALSTORAGE_KEY, stringify({ ...userPreferences, theme }));
};

export const ThemeProvider = ({ children }) => {
  const userPreferences = parse(localStorage.getItem(USER_PREFERENCES_LOCALSTORAGE_KEY) || '{}');
  let preferredTheme = userPreferences.theme;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  if (!preferredTheme) {
    preferredTheme = prefersDarkMode ? DARK_THEME : LIGHT_THEME;
    setToStorage(preferredTheme);
  }

  const [themeName, _setThemeName] = useState(preferredTheme);

  const setThemeName = useCallback((value) => {
    setToStorage(value);
    _setThemeName(value);
  }, []);

  const themeObject = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: lightBlue,
          secondary: deepOrange,
          type: themeName,
        },
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
