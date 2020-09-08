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
