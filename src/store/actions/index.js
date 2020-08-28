import {
  UPDATE_USER_PREFERENCES,
  READ_USER_PREFERENCES,
  CREATE_FOLDER,
  UPDATE_FOLDER,
  DELETE_FOLDER,
  CREATE_RECORD,
  UPDATE_RECORD,
  DELETE_RECORD,
  READ_PROFILE,
  SET_IS_LOADING,
  FOLDER_URL,
  RECORD_URL,
  COLLECTION_URL,
  PREFERENCES_URL
} from 'Constants';

import {
  createAction,
  getWrappedAsyncActionFactory,
  createLoadingWrapper,
  makeRequest
} from './helpers';

const updateUserPreferences = createAction(UPDATE_USER_PREFERENCES);

const readUserPreferences = createAction(READ_USER_PREFERENCES);

const createFolder = createAction(CREATE_FOLDER);

const updateFolder = createAction(UPDATE_FOLDER);

const deleteFolder = createAction(DELETE_FOLDER);

const createRecord = createAction(CREATE_RECORD);

const updateRecord = createAction(UPDATE_RECORD);

const deleteRecord = createAction(DELETE_RECORD);

const readCollection = createAction(READ_PROFILE);

export const setIsLoading = createAction(SET_IS_LOADING);

const createAsyncAction = getWrappedAsyncActionFactory(createLoadingWrapper(setIsLoading));

export const updateUserPreferencesAsync = createAsyncAction(async (dispatch, { id, body }) => {
  const response = await makeRequest({
    url: `${PREFERENCES_URL}/$id=${id}`,
    expectedStatus: 200,
    method: 'PATCH',
    body
  });
  const parsedResponse = await response.json();
  dispatch(updateUserPreferences(parsedResponse));
});

export const readUserPreferencesAsync = createAsyncAction(async (dispatch) => {
  const response = await makeRequest({
    url: PREFERENCES_URL,
    expectedStatus: 200,
    method: 'GET'
  });
  const parsedResponse = await response.json();
  dispatch(readUserPreferences(parsedResponse));
});

export const createFolderAsync = createAsyncAction(async (dispatch, payload) => {
  const response = await makeRequest({
    expectedStatus: 201,
    url: FOLDER_URL,
    method: 'POST',
    body: payload
  });
  const parsedResponse = await response.json();
  dispatch(createFolder(parsedResponse));
});

export const updateFolderAsync = createAsyncAction(async (dispatch, { body, id }) => {
  const response = await makeRequest({
    url: `${FOLDER_URL}/$id=${id}`,
    expectedStatus: 200,
    method: 'PATCH',
    body
  });
  const parsedResponse = await response.json();
  dispatch(updateFolder(parsedResponse));
});

export const deleteFolderAsync = createAsyncAction(async (dispatch, id) => {
  await makeRequest({
    url: `${FOLDER_URL}/$id=${id}`,
    expectedStatus: 200,
    method: 'DELETE'
  });
  dispatch(deleteFolder(id));
});

export const createRecordAsync = createAsyncAction(async (dispatch, payload) => {
  const response = await makeRequest({
    url: RECORD_URL,
    method: 'POST',
    body: payload,
    expectedStatus: 201
  });
  const parsedResponse = await response.json();
  dispatch(createRecord(parsedResponse));
});

export const updateRecordAsync = createAsyncAction(async (dispatch, { id, body }) => {
  const response = await makeRequest({
    url: `${RECORD_URL}/$id=${id}`,
    expectedStatus: 200,
    method: 'PATCH',
    body
  });
  const parsedResponse = await response.json();
  dispatch(updateRecord(parsedResponse));
});

export const deleteRecordAsync = createAsyncAction(async (dispatch, id) => {
  await makeRequest({
    url: `${RECORD_URL}/$id=${id}`,
    expectedStatus: 200,
    method: 'DELETE'
  });
  dispatch(deleteRecord(id));
});

export const readCollectionAsync = createAsyncAction(async (dispatch) => {
  const response = await makeRequest({
    url: COLLECTION_URL,
    method: 'GET',
    expectedStatus: 200
  });
  const parsedResponse = await response.json();
  dispatch(readCollection(parsedResponse));
});
