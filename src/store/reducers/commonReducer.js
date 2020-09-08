import { SET_IS_LOADING, RESET_STORES } from 'Constants';

const initialState = {
  isLoading: false,
};

export default function commonReducer(state = initialState, { type, payload }) {
  const newState = { ...state };

  if (type === SET_IS_LOADING) {
    newState.isLoading = payload;
  } else if (type === RESET_STORES) {
    newState.isLoading = false;
  }

  return newState;
}
