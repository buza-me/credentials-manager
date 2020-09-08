import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useRouteMatch, useLocation } from 'react-router-dom';
import { LoginContext } from 'Contexts';
import {
  NO_VALID_TOKEN_LOCALSTORAGE_KEY,
  JWT_TOKEN_LOCALSTORAGE_KEY,
  JWT_EXPIRATION_TIME_LOCALSTORAGE_KEY,
  LOG_OUT_EVENT,
  FILES_ROUTE,
  USER_ID_LOCALSTORAGE_KEY,
  ROOT_ROUTE,
} from 'Constants';

import { updateUserPreferences, resetStores } from 'Store/actions';
import { LOG_IN_ROUTE } from '../constants/routes.constants';

const LoginProviderBase = ({ clearPreferences, resetStoresAction, children }) => {
  const location = useLocation();

  const expirationTime = localStorage.getItem(JWT_EXPIRATION_TIME_LOCALSTORAGE_KEY);
  const JWTToken = localStorage.getItem(JWT_TOKEN_LOCALSTORAGE_KEY);

  const expirationDate = expirationTime ? new Date(expirationTime) : null;

  const [isLoggedIn, setIsLoggedIn] = useState(!!JWTToken);
  const [tokenExpirationTime, setTokenExpirationTime] = useState(expirationDate);

  const logOut = () => {
    localStorage.removeItem(USER_ID_LOCALSTORAGE_KEY);
    localStorage.removeItem(JWT_TOKEN_LOCALSTORAGE_KEY);
    localStorage.removeItem(JWT_EXPIRATION_TIME_LOCALSTORAGE_KEY);
    clearPreferences();
    resetStoresAction();
    setTokenExpirationTime(null);
    setIsLoggedIn(false);
  };

  const logIn = ({ token = '', willExpireTime, userId = '' }) => {
    if (token.length && userId.length) {
      logOut();
      localStorage.setItem(USER_ID_LOCALSTORAGE_KEY, userId);
      localStorage.setItem(JWT_TOKEN_LOCALSTORAGE_KEY, token);
      localStorage.setItem(JWT_EXPIRATION_TIME_LOCALSTORAGE_KEY, willExpireTime);
      setTokenExpirationTime(willExpireTime ? new Date(willExpireTime) : null);
      setIsLoggedIn(true);
    } else {
      throw new Error('Login error, no token or user id provided');
    }
  };

  window.addEventListener('storage', (event = {}) => {
    switch (event.key) {
      case JWT_TOKEN_LOCALSTORAGE_KEY:
        setIsLoggedIn(!!event.newValue);
        break;
      case NO_VALID_TOKEN_LOCALSTORAGE_KEY:
        logOut();
        break;
      case JWT_EXPIRATION_TIME_LOCALSTORAGE_KEY:
        setTokenExpirationTime(new Date(event.newValue));
        break;
      default:
        break;
    }
  });

  window.addEventListener(LOG_OUT_EVENT, () => logOut());

  const value = {
    isLoggedIn,
    tokenExpirationTime,
    setIsLoggedIn,
    setTokenExpirationTime,
    logOut,
    logIn,
  };

  const profileRouteMatch = useRouteMatch(FILES_ROUTE);
  const isForbidden = !isLoggedIn && profileRouteMatch && location.pathname !== LOG_IN_ROUTE;

  return (
    <LoginContext.Provider value={value}>
      {isForbidden ? <Redirect to={ROOT_ROUTE} /> : null}
      {children}
    </LoginContext.Provider>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearPreferences: () => dispatch(updateUserPreferences(null)),
  resetStoresAction: () => dispatch(resetStores()),
});

export const LoginProvider = connect(() => ({}), mapDispatchToProps)(LoginProviderBase);
