import { UPDATE_USER_PREFERENCES, READ_USER_PREFERENCES } from 'Constants';

const initialState = {
  preferences: {}
};

// eslint-disable-next-line no-unused-vars
export default function preferencesReducer(state = initialState, { type, payload }) {
  const newState = { ...state };

  if (type === READ_USER_PREFERENCES || type === UPDATE_USER_PREFERENCES) {
    newState.preferences = payload;
  }

  return newState;
}
