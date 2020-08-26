const { hostname } = window.location;

export const NO_VALID_TOKEN_LOCALSTORAGE_KEY = `${hostname}_noValidToken`;
export const JWT_TOKEN_LOCALSTORAGE_KEY = `${hostname}_JWTToken`;
export const JWT_EXPIRATION_TIME_LOCALSTORAGE_KEY = `${hostname}_JWTExpirationTime`;
export const PREFERRED_LANGUAGE_LOCALSTORAGE_KEY = `${hostname}_preferredLanguage`;
export const PREFERRED_THEME_LOCALSTORAGE_KEY = `${hostname}_preferredTheme`;
