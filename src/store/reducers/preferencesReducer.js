/* eslint-disable no-underscore-dangle */
const initialState = {
  records: []
};

// eslint-disable-next-line no-unused-vars
export default function preferencesReducer(state = initialState, { type, payload }) {
  const newState = { ...state };

  switch (type) {
    default:
      break;
  }

  return newState;
}
