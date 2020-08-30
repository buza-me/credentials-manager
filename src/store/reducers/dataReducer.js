/* eslint-disable no-underscore-dangle */
import {
  CREATE_FOLDER,
  UPDATE_FOLDER,
  DELETE_FOLDER,
  CREATE_RECORD,
  UPDATE_RECORD,
  DELETE_RECORD,
  READ_FILES
} from 'Constants';

import { clone, getStructuredFiles, getDestructuredFiles } from './helpers';

const initialState = {
  rootFolder: {},
  folders: [],
  records: []
};

// eslint-disable-next-line no-unused-vars
export default function dataReducer(state = initialState, { type, payload }) {
  let newState = type !== READ_FILES ? { ...state } : null;

  switch (type) {
    case READ_FILES:
      const rootFolder = clone(payload);
      const { folders, records } = getDestructuredFiles(clone(payload));
      newState = {
        rootFolder,
        folders,
        records
      };
      break;
    case CREATE_FOLDER:
      newState.folders = [...newState.folders, clone(payload)];
      newState.rootFolder = getStructuredFiles(clone(newState.folders));
      break;
    case UPDATE_FOLDER:
      newState.folders = [
        ...newState.folders.filter((folder) => folder._id !== payload._id),
        clone(payload)
      ];
      newState.rootFolder = getStructuredFiles(clone(newState.folders));
      break;
    case DELETE_FOLDER:
      newState.folders = [...newState.folders.filter((folder) => folder._id !== payload)];
      newState.rootFolder = getStructuredFiles(clone(newState.folders));
      break;
    case CREATE_RECORD:
      newState.records = [...newState.records, clone(payload)];
      newState.rootFolder = getStructuredFiles(clone(newState.folders));
      break;
    case UPDATE_RECORD:
      newState.records = [
        ...newState.records.filter((record) => record._id !== payload._id),
        clone(payload)
      ];
      newState.rootFolder = getStructuredFiles(clone(newState.folders));
      break;
    case DELETE_RECORD:
      newState.records = [...newState.records.filter((record) => record._id !== payload)];
      newState.rootFolder = getStructuredFiles(clone(newState.folders));
      break;
    default:
      break;
  }

  return newState;
}
