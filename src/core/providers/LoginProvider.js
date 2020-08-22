import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { LoginContext } from 'Contexts';
import {
  NO_VALID_TOKEN_LOCALSTORAGE_KEY,
  JWT_TOKEN_LOCALSTORAGE_KEY,
  JWT_EXPIRATION_TIME_LOCALSTORAGE_KEY,
  LOG_OUT_EVENT
} from 'Constants';

export const LoginProvider = ({ children }) => {
  const expirationTime = localStorage.getItem(JWT_EXPIRATION_TIME_LOCALSTORAGE_KEY);
  const JWTToken = localStorage.getItem(JWT_TOKEN_LOCALSTORAGE_KEY);

  const expirationDate = expirationTime ? new Date(expirationTime) : null;

  const [isLoggedIn, setIsLoggedIn] = useState(!!JWTToken);
  const [tokenExpirationTime, setTokenExpirationTime] = useState(expirationDate);

  const logIn = (token = '', willExpireTime) => {
    if (token.length) {
      setIsLoggedIn(true);
      setTokenExpirationTime(willExpireTime ? new Date(willExpireTime) : null);
      localStorage.setItem(JWT_TOKEN_LOCALSTORAGE_KEY, token);
      localStorage.setItem(JWT_EXPIRATION_TIME_LOCALSTORAGE_KEY, willExpireTime);
    }
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setTokenExpirationTime(null);
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

  return (
    <LoginContext.Provider value={value}>
      <Router>{!isLoggedIn ? <Redirect to='/login' /> : null}</Router>
      {children}
    </LoginContext.Provider>
  );
};
