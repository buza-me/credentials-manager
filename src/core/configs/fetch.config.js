import {
  NO_VALID_TOKEN_LOCALSTORAGE_KEY,
  JWT_TOKEN_LOCALSTORAGE_KEY,
  LOG_OUT_EVENT
} from 'Constants';

// modify fetch to automatically add authorization (JWT) header and throw error if it is invalid.
const fetchCopy = fetch;
window.fetch = (url = '', opts = {}) => {
  const options = { ...opts };
  const JWTToken = localStorage.getItem(JWT_TOKEN_LOCALSTORAGE_KEY);
  if (JWTToken) {
    options.headers = options.headers || {};
    options.headers.Authorization = `bearer ${JWTToken}`;
  }
  return fetchCopy(url, options).then((resp) => {
    if (resp.status === 401) {
      // set specific localStorage item to listen to window.onstorage event in all tabs.
      window.dispatchEvent(new CustomEvent(LOG_OUT_EVENT));
      localStorage.setItem(NO_VALID_TOKEN_LOCALSTORAGE_KEY, new Date());
      throw resp;
    }
    return resp;
  });
};
