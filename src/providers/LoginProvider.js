import React, { useState } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { LoginContext } from 'Contexts';
import {
  NO_VALID_TOKEN_LOCALSTORAGE_KEY,
  JWT_TOKEN_LOCALSTORAGE_KEY,
  JWT_EXPIRATION_TIME_LOCALSTORAGE_KEY,
  LOG_OUT_EVENT,
  FILES_ROUTE,
  USER_ID_LOCALSTORAGE_KEY
} from 'Constants';

export const LoginProvider = ({ children }) => {
  const expirationTime = localStorage.getItem(JWT_EXPIRATION_TIME_LOCALSTORAGE_KEY);
  const JWTToken = localStorage.getItem(JWT_TOKEN_LOCALSTORAGE_KEY);

  const expirationDate = expirationTime ? new Date(expirationTime) : null;

  const [isLoggedIn, setIsLoggedIn] = useState(!!JWTToken);
  const [tokenExpirationTime, setTokenExpirationTime] = useState(expirationDate);

  const logIn = ({ token = '', willExpireTime, userId = '' }) => {
    if (token.length && userId.length) {
      setIsLoggedIn(true);
      setTokenExpirationTime(willExpireTime ? new Date(willExpireTime) : null);
      localStorage.setItem(USER_ID_LOCALSTORAGE_KEY, userId);
      localStorage.setItem(JWT_TOKEN_LOCALSTORAGE_KEY, token);
      localStorage.setItem(JWT_EXPIRATION_TIME_LOCALSTORAGE_KEY, willExpireTime);
    } else {
      throw new Error('Login error, no token or user id provided');
    }
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setTokenExpirationTime(null);
    localStorage.removeItem(USER_ID_LOCALSTORAGE_KEY);
    localStorage.removeItem(JWT_TOKEN_LOCALSTORAGE_KEY);
    localStorage.removeItem(JWT_EXPIRATION_TIME_LOCALSTORAGE_KEY);
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
    logIn
  };

  const profileRouteMatch = useRouteMatch(FILES_ROUTE);
  const isForbidden = !isLoggedIn && profileRouteMatch;

  return (
    <LoginContext.Provider value={value}>
      {isForbidden ? <Redirect to='/' /> : null}
      {children}
    </LoginContext.Provider>
  );
};
