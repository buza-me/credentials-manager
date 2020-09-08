import {
  UPDATE_USER_PREFERENCES,
  READ_USER_PREFERENCES,
  SET_IS_LOADING_PREFERENCES
} from 'Constants';

const initialState = {
  preferences: null,
  isLoadingPreferences: false
};

// eslint-disable-next-line no-unused-vars
export default function preferencesReducer(state = initialState, { type, payload }) {
  const newState = { ...state };

  if (type === READ_USER_PREFERENCES || type === UPDATE_USER_PREFERENCES) {
    newState.preferences = payload;
  } else if (type === SET_IS_LOADING_PREFERENCES) {
    newState.isLoadingPreferences = payload;
  }

  return newState;
}
