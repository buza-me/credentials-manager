import React, { useContext, useEffect } from 'react';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ThemeContext, LoginContext } from 'Contexts';
import { PAGE_TRANSITION_DURATION } from 'Constants';
import { readUserPreferencesAsync } from 'Store/actions';

const PageBase = ({ children, preferences, readUserPreferences, isLoadingPreferences }) => {
  const { i18n } = useTranslation();
  const { themeName, setThemeName } = useContext(ThemeContext);
  const { isLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    if (isLoggedIn && !preferences) {
      window.requestAnimationFrame(() => {
        if (!isLoadingPreferences) {
          readUserPreferences();
        }
      });
    }
    if (preferences && i18n.language !== preferences.language) {
      i18n.changeLanguage(preferences.language);
    }
    if (preferences && themeName !== preferences.theme) {
      setThemeName(preferences.theme);
    }
  });

  return (
    <Fade in timeout={PAGE_TRANSITION_DURATION}>
      {children}
    </Fade>
  );
};

const mapStateToProps = ({ preferencesReducer }) => ({
  preferences: preferencesReducer.preferences,
  isLoadingPreferences: preferencesReducer.isLoadingPreferences
});

const mapDispatchToProps = (dispatch) => ({
  readUserPreferences: () => dispatch(readUserPreferencesAsync())
});

export const Page = connect(mapStateToProps, mapDispatchToProps)(PageBase);
