export const createAction = (type) => (payload) => ({
  type,
  payload
});

export const getAsyncActionFactory = (wrapper) => (fn) => (payload, options) => async (dispatch) =>
  wrapper(fn, payload, options, dispatch);

export const createLoadingWrapper = (loadingAction) => async (
  fn,
  payload,
  options = { useLoading: true, useCatch: true },
  dispatch
) => {
  try {
    if (options.useLoading) {
      dispatch(loadingAction(true));
    }
    await fn(dispatch, payload);
  } catch (error) {
    if (!options.useCatch) {
      throw error;
    }
  }
  if (options.useLoading) {
    dispatch(loadingAction(false));
  }
};

export const throwErrorIfNotStatus = (response, status, errorTextGetter) => {
  if (response.status !== status) {
    throw new Error(errorTextGetter ? errorTextGetter(response) : `${response.status} error`);
  }
};

export const makeRequest = async ({
  url,
  method,
  body,
  headers = {},
  expectedStatus,
  errorTextGetter
}) => {
  const options = {};
  if (method) {
    options.method = method;
  }
  if (body) {
    headers = { 'Content-Type': 'application/json', ...headers };
    options.body = JSON.stringify(body);
  }
  options.headers = headers;
  const response = await fetch(url, options);
  throwErrorIfNotStatus(response, expectedStatus, errorTextGetter);
  return response;
};
