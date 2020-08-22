export const AVAILABLE_LANGUAGES = [
  { title: 'language.english', value: 'en' },
  { title: 'language.russian', value: 'ru_RU' },
  { title: 'language.ukrainian', value: 'uk_UA' }
];

export const AVAILABLE_THEMES = [
  { title: 'theme.light', value: 'light' },
  { title: 'theme.dark', value: 'dark' }
];
export const DEFAULT_THEME = AVAILABLE_THEMES[0];

export const NO_VALID_TOKEN_LOCALSTORAGE_KEY = `${window.location.hostname}-no-valid-token`;
export const JWT_TOKEN_LOCALSTORAGE_KEY = 'JWTToken';
export const JWT_EXPIRATION_TIME_LOCALSTORAGE_KEY = 'JWTExpirationTime';

export const LOG_OUT_EVENT = 'log-out';
