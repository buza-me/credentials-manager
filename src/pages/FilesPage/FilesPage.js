import './FilesPage.css';
import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeTwoToneIcon from '@material-ui/icons/NavigateBeforeTwoTone';
import { Page } from 'Containers';
import { Header, FileCreator, FileEditor, FileList, Breadcrumbs } from 'Components';
import { LoginContext, FolderNavigatorContext } from 'Contexts';
import { FILES_ROUTE } from 'Constants';
import {
  createFolderAsync,
  updateFolderAsync,
  deleteFolderAsync,
  createRecordAsync,
  updateRecordAsync,
  deleteRecordAsync,
} from 'Store/actions';

export const FilesPageBase = ({
  // isLoading,
  createFolder,
  updateFolder,
  deleteFolder,
  createRecord,
  updateRecord,
  deleteRecord,
  globalFolders,
}) => {
  const { t } = useTranslation();
  const { logOut } = useContext(LoginContext);
  const { openedFolder, setOpenedFolderId } = useContext(FolderNavigatorContext);
  const [activeFileForm, setActiveFileForm] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setSelectedFiles([]);
    setFolders(openedFolder?.children?.folders || []);
    setRecords(openedFolder?.children?.records || []);
  }, [openedFolder]);

  const selectedFilesRefresher = useCallback(
    (childCollectionName, refreshedFilesObjectType) => {
      if (openedFolder?.children) {
        const activeFolderChildrenMap = new Map();

        openedFolder.children[childCollectionName].forEach((child) =>
          activeFolderChildrenMap.set(child._id, child)
        );

        const filteredSelectedFiles = selectedFiles.filter(
          (file) =>
            file.objectType !== refreshedFilesObjectType || activeFolderChildrenMap.has(file._id)
        );

        setSelectedFiles(
          filteredSelectedFiles.map((file) => activeFolderChildrenMap.get(file._id) || file)
        );
      }
    },
    [openedFolder, selectedFiles]
  );

  useEffect(() => {
    selectedFilesRefresher('folders', 'folder');
  }, [folders]);

  useEffect(() => {
    selectedFilesRefresher('records', 'record');
  }, [records]);

  const navigateUp = useCallback(() => setOpenedFolderId(openedFolder.parentId), [openedFolder]);

  const fileFormCloseHandler = useCallback(() => {
    setActiveFileForm(null);
  }, []);

  const fileEditorSubmitHandler = useCallback(
    ({ type, file }) => {
      if (type === 'folder') {
        updateFolder(file);
      } else {
        updateRecord(file);
      }
      fileFormCloseHandler();
    },
    [updateFolder, updateRecord]
  );

  const fileCreatorSubmitHandler = useCallback(
    ({ type, file }) => {
      if (type === 'folder') {
        createFolder(file);
      } else {
        createRecord(file);
      }
      fileFormCloseHandler();
    },
    [createFolder, createRecord]
  );

  const editButtonClickHandler = useCallback(() => setActiveFileForm('editor'), []);

  const createButtonClickHandler = useCallback(() => setActiveFileForm('creator'), []);

  const deleteButtonClickHandler = useCallback(() => {
    const selectedFile = selectedFiles?.[0];
    if (!selectedFile) {
      return;
    }
    if (selectedFile.objectType === 'folder') {
      deleteFolder(selectedFile);
    }
    if (selectedFile.objectType === 'record') {
      deleteRecord(selectedFile);
    }
  }, [selectedFiles, deleteFolder, deleteRecord]);

  const toggleSelect = useCallback(
    (file, isSelected) => {
      if (isSelected) {
        setSelectedFiles(selectedFiles.filter((item) => item._id !== file._id));
      } else {
        setSelectedFiles([...selectedFiles, file]);
      }
    },
    [selectedFiles]
  );

  const isNavigateUpButtonDisabled = useCallback(
    () => !openedFolder?._id || openedFolder.parentId === openedFolder.userId,
    [openedFolder]
  );

  const header = useMemo(
    () => (
      <Header route={FILES_ROUTE}>
        <Button color='secondary' variant='contained' disableElevation onClick={logOut}>
          {t('link.logout')}
        </Button>
      </Header>
    ),
    [logOut, t]
  );

  const fileCreator = useMemo(
    () => (
      <FileCreator
        open={activeFileForm === 'creator' && !!openedFolder?._id}
        onClose={fileFormCloseHandler}
        onSubmit={fileCreatorSubmitHandler}
        folderId={openedFolder?._id}
      />
    ),
    [activeFileForm, openedFolder, fileCreatorSubmitHandler]
  );

  const fileEditor = useMemo(
    () => (
      <FileEditor
        open={activeFileForm === 'editor' && selectedFiles?.length === 1}
        onClose={fileFormCloseHandler}
        onSubmit={fileEditorSubmitHandler}
        file={selectedFiles?.[0]}
      />
    ),
    [activeFileForm, selectedFiles, fileEditorSubmitHandler]
  );

  const navigateBackButton = useMemo(
    () => (
      <IconButton
        color='primary'
        disabled={isNavigateUpButtonDisabled()}
        onClick={navigateUp}
        className='files-page__nav-back-button'
      >
        <NavigateBeforeTwoToneIcon />
      </IconButton>
    ),
    [openedFolder]
  );

  const createButton = useMemo(
    () => (
      <Button
        disabled={!openedFolder?._id}
        className='files-page__control-button'
        color='secondary'
        variant='contained'
        disableElevation
        onClick={createButtonClickHandler}
      >
        {t('action.createFile')}
      </Button>
    ),
    [t, openedFolder]
  );

  const editButton = useMemo(
    () => (
      <Button
        disabled={selectedFiles?.length !== 1}
        className='files-page__control-button'
        color='secondary'
        variant='contained'
        disableElevation
        onClick={editButtonClickHandler}
      >
        {t('action.editFile')}
      </Button>
    ),
    [selectedFiles, t]
  );

  const deleteButton = useMemo(
    () => (
      <Button
        disabled={selectedFiles?.length !== 1}
        className='files-page__control-button'
        color='secondary'
        variant='contained'
        disableElevation
        onClick={deleteButtonClickHandler}
      >
        {t('action.deleteFile')}
      </Button>
    ),
    [t, selectedFiles, deleteButtonClickHandler]
  );

  const controls = useMemo(
    () => (
      <div className='files-page__controls'>
        <div className='files-page__controls_left'>
          {navigateBackButton}
          {createButton}
          {editButton}
        </div>
        <div className='files-page__controls_right'>{deleteButton}</div>
      </div>
    ),
    [navigateBackButton, createButton, editButton, deleteButton]
  );

  const breadcrumbs = useMemo(
    () => <Breadcrumbs folders={globalFolders} openedFolder={openedFolder} />,
    [globalFolders, openedFolder]
  );

  const content = useMemo(
    () => (
      <div className='files-page__content-container'>
        {controls}
        {breadcrumbs}
        <FileList
          className='files-page__file-list'
          folders={folders}
          records={records}
          selectedFiles={selectedFiles}
          toggleSelect={toggleSelect}
          openFolder={setOpenedFolderId}
        />
      </div>
    ),
    [controls, breadcrumbs]
  );

  return (
    <Page>
      <>
        {fileCreator}
        {fileEditor}
        {header}
        {content}
      </>
    </Page>
  );
};

const mapStateToProps = ({ commonReducer, dataReducer }) => ({
  isLoading: commonReducer.isLoading,
  globalFolders: dataReducer.folders,
});

const mapDispatchToProps = (dispatch) => ({
  createFolder: (payload) => dispatch(createFolderAsync(payload)),
  updateFolder: (payload) => dispatch(updateFolderAsync(payload)),
  deleteFolder: (payload) => dispatch(deleteFolderAsync(payload)),
  createRecord: (payload) => dispatch(createRecordAsync(payload)),
  updateRecord: (payload) => dispatch(updateRecordAsync(payload)),
  deleteRecord: (payload) => dispatch(deleteRecordAsync(payload)),
});

export const FilesPage = connect(mapStateToProps, mapDispatchToProps)(FilesPageBase);
