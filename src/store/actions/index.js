import {
  UPDATE_USER_PREFERENCES,
  READ_USER_PREFERENCES,
  CREATE_FOLDER,
  UPDATE_FOLDER,
  DELETE_FOLDER,
  CREATE_RECORD,
  UPDATE_RECORD,
  DELETE_RECORD,
  READ_FILES,
  SET_IS_LOADING,
  SET_IS_LOADING_PREFERENCES,
  FOLDER_URL,
  RECORD_URL,
  COLLECTION_URL,
  PREFERENCES_URL,
  RESET_STORES,
} from 'Constants';

import { makeRequest } from 'Utils';

import { createAction, getAsyncActionFactory, createLoadingWrapper } from './helpers';

const { stringify } = JSON;

export const resetStores = createAction(RESET_STORES);

export const updateUserPreferences = createAction(UPDATE_USER_PREFERENCES);

const readUserPreferences = createAction(READ_USER_PREFERENCES);

const createFolder = createAction(CREATE_FOLDER);

const updateFolder = createAction(UPDATE_FOLDER);

const deleteFolder = createAction(DELETE_FOLDER);

const createRecord = createAction(CREATE_RECORD);

const updateRecord = createAction(UPDATE_RECORD);

const deleteRecord = createAction(DELETE_RECORD);

const readFiles = createAction(READ_FILES);

export const setIsLoading = createAction(SET_IS_LOADING);

export const setIsLoadingPreferences = createAction(SET_IS_LOADING_PREFERENCES);

const createAsyncAction = getAsyncActionFactory(createLoadingWrapper(setIsLoading));

const createPreferencesAsyncAction = getAsyncActionFactory(
  createLoadingWrapper(setIsLoadingPreferences)
);

export const updateUserPreferencesAsync = createPreferencesAsyncAction(
  async (dispatch, payload) => {
    const response = await makeRequest({
      url: PREFERENCES_URL,
      expectedStatuses: [200],
      method: 'PATCH',
      body: stringify(payload),
    });
    const parsedResponse = await response.json();
    dispatch(updateUserPreferences(parsedResponse));
  }
);

export const readUserPreferencesAsync = createPreferencesAsyncAction(async (dispatch) => {
  const response = await makeRequest({
    url: PREFERENCES_URL,
    expectedStatuses: [200, 304],
    method: 'GET',
  });
  const parsedResponse = await response.json();
  dispatch(readUserPreferences(parsedResponse));
});

export const createFolderAsync = createAsyncAction(async (dispatch, payload) => {
  const response = await makeRequest({
    expectedStatuses: [201],
    url: FOLDER_URL,
    method: 'POST',
    body: stringify(payload),
  });
  const parsedResponse = await response.json();
  dispatch(createFolder(parsedResponse));
});

export const updateFolderAsync = createAsyncAction(async (dispatch, payload) => {
  const response = await makeRequest({
    url: `${FOLDER_URL}/?$id=${payload._id}`,
    expectedStatuses: [200],
    method: 'PATCH',
    body: stringify(payload),
  });
  const parsedResponse = await response.json();
  dispatch(updateFolder(parsedResponse));
});

export const deleteFolderAsync = createAsyncAction(async (dispatch, payload) => {
  await makeRequest({
    url: `${FOLDER_URL}/?$id=${payload._id}`,
    expectedStatuses: [200],
    method: 'DELETE',
  });
  dispatch(deleteFolder(payload));
});

export const createRecordAsync = createAsyncAction(async (dispatch, payload) => {
  const response = await makeRequest({
    url: RECORD_URL,
    method: 'POST',
    body: stringify(payload),
    expectedStatuses: [201],
  });
  const parsedResponse = await response.json();
  dispatch(createRecord(parsedResponse));
});

export const updateRecordAsync = createAsyncAction(async (dispatch, payload) => {
  const response = await makeRequest({
    url: `${RECORD_URL}/?$id=${payload._id}`,
    expectedStatuses: [200],
    method: 'PATCH',
    body: stringify(payload),
  });
  const parsedResponse = await response.json();
  dispatch(updateRecord(parsedResponse));
});

export const deleteRecordAsync = createAsyncAction(async (dispatch, payload) => {
  await makeRequest({
    url: `${RECORD_URL}/?$id=${payload._id}`,
    expectedStatuses: [200],
    method: 'DELETE',
  });
  dispatch(deleteRecord(payload));
});

export const readFilesAsync = createAsyncAction(async (dispatch) => {
  const response = await makeRequest({
    url: COLLECTION_URL,
    method: 'GET',
    expectedStatuses: [200, 304],
  });
  const parsedResponse = await response.json();
  dispatch(readFiles(parsedResponse));
});
