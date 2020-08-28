export const createAction = (type) => (payload) => ({
  type,
  payload
});

export const getWrappedAsyncActionFactory = (wrapper) => (fn) => (payload, options) => async (
  dispatch
) => wrapper(fn, payload, options, dispatch);

export const createLoadingWrapper = (loadingAction) => async (fn, payload, options, dispatch) => {
  try {
    dispatch(loadingAction(true));
    await fn(dispatch, payload);
  } catch (error) {
    if (!options.shouldCatch) {
      throw error;
    }
  }
  dispatch(loadingAction(false));
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
  headers,
  expectedStatus,
  errorTextGetter
}) => {
  if (body) {
    headers = { ...(headers || {}), 'Content-Type': 'application/json' };
  }
  const options = {
    method,
    // adds property to an object, only if it is passed to arguments
    ...(headers ? { headers } : {}),
    ...(body ? { body: JSON.stringify(body) } : {})
  };
  const response = await fetch(url, options);
  throwErrorIfNotStatus(response, expectedStatus, errorTextGetter);
  return response;
};
