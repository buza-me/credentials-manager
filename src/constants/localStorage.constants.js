const { hostname } = window.location;

export const NO_VALID_TOKEN_LOCALSTORAGE_KEY = `${hostname}_noValidToken`;
export const JWT_TOKEN_LOCALSTORAGE_KEY = `${hostname}_JWTToken`;
export const JWT_EXPIRATION_TIME_LOCALSTORAGE_KEY = `${hostname}_JWTExpirationTime`;
export const USER_PREFERENCES_LOCALSTORAGE_KEY = `${hostname}_userPreferences`;
export const USER_ID_LOCALSTORAGE_KEY = `${hostname}_userId`;
