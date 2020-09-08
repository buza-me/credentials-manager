import { FILES_ROUTE } from 'Constants';

export const validateEmail = (email) => !!email && !/\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => !!password && password.length < 8;

export const validateName = (name) => /[^A-Za-zА-Яа-я0-9_іІїЇґҐ]/.test(name || '');

export const throwErrorIfNotStatuses = (response, validStatuses, errorTextGetter) => {
  const shouldThrowError = !validStatuses.some((status) => response.status === status);
  if (shouldThrowError) {
    throw new Error(errorTextGetter ? errorTextGetter(response) : `${response.status} error`);
  }
};

export const makeRequest = async ({
  url,
  method,
  body,
  headers,
  expectedStatuses,
  errorTextGetter,
}) => {
  const options = {};
  if (method) {
    options.method = method;
  }
  if (body) {
    const withContentType = { 'Content-Type': 'application/json' };
    headers = headers ? { ...withContentType, ...headers } : withContentType;
    options.body = body;
  }
  options.headers = headers;
  const response = await fetch(url, options);

  throwErrorIfNotStatuses(response, expectedStatuses, errorTextGetter);
  return response;
};

export const clone = (item) => JSON.parse(JSON.stringify(item));

export const buildFilePathname = (id) => `${FILES_ROUTE}/${id}`;
