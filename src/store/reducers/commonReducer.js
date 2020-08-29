import { SET_IS_LOADING } from 'Constants';

const initialState = {
  isLoading: false
};

export default function commonReducer(state = initialState, { type, payload }) {
  const newState = { ...state };

  if (type === SET_IS_LOADING) {
    newState.isLoading = payload;
  }

  return newState;
}
