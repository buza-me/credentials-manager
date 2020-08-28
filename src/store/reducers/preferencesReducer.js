/* eslint-disable no-underscore-dangle */
import { WRITE_RECORDS, WRITE_RECORD, UPDATE_RECORD, DELETE_RECORD } from 'Constants';

const initialState = {
  records: []
};

export default function preferencesReducer(state = initialState, { type, records, record, id }) {
  const newState = { ...state };

  switch (type) {
    case WRITE_RECORDS:
      newState.records = records;
      break;
    case WRITE_RECORD:
      newState.records.push(record);
      break;
    case UPDATE_RECORD:
      newState.records = newState.records.map((recordFromState) =>
        recordFromState._id === record._id ? record : recordFromState
      );
      break;
    case DELETE_RECORD:
      newState.records = newState.records.filter((recordFromState) => recordFromState._id !== id);
      break;
    default:
      return newState;
  }

  return newState;
}
