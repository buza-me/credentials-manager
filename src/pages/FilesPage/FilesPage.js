import './FilesPage.css';
import React, { useContext, useEffect, useState } from 'react';
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

  const selectedFilesRefresher = (childCollectionName, refreshedFilesObjectType) => {
    if (openedFolder) {
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
  };

  useEffect(() => {
    selectedFilesRefresher('folders', 'folder');
  }, [folders]);

  useEffect(() => {
    selectedFilesRefresher('records', 'record');
  }, [records]);

  const navigateUp = () => setOpenedFolderId(openedFolder.parentId);

  const fileFormCloseHandler = () => {
    setActiveFileForm(null);
  };

  const fileEditorSubmitHandler = ({ type, file }) => {
    if (type === 'folder') {
      updateFolder(file);
    } else {
      updateRecord(file);
    }
    fileFormCloseHandler();
  };

  const fileCreatorSubmitHandler = ({ type, file }) => {
    if (type === 'folder') {
      createFolder(file);
    } else {
      createRecord(file);
    }
    fileFormCloseHandler();
  };

  const editButtonClickHandler = () => setActiveFileForm('editor');

  const createButtonClickHandler = () => setActiveFileForm('creator');

  const deleteButtonClickHandler = () => {
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
  };

  const toggleSelect = (file, isSelected) => {
    if (isSelected) {
      // setSelectedFiles(selectedFiles.filter((item) => item._id !== file._id));
      setSelectedFiles([]);
    } else {
      // setSelectedFiles([...selectedFiles, file]);
      setSelectedFiles([file]);
    }
  };

  const isNavigateUpButtonDisabled = () =>
    !openedFolder?._id || openedFolder.parentId === openedFolder.userId;

  const renderFileCreator = () => (
    <FileCreator
      open={activeFileForm === 'creator' && !!openedFolder?._id}
      onClose={fileFormCloseHandler}
      onSubmit={fileCreatorSubmitHandler}
      folderId={openedFolder?._id}
    />
  );

  const renderFileEditor = () => (
    <FileEditor
      open={activeFileForm === 'editor' && !!selectedFiles?.length === 1}
      onClose={fileFormCloseHandler}
      onSubmit={fileEditorSubmitHandler}
      file={selectedFiles?.[0]}
    />
  );

  const renderControls = () => (
    <div className='files-page__controls'>
      <div className='files-page__controls_left'>
        <IconButton color='primary' disabled={isNavigateUpButtonDisabled()} onClick={navigateUp}>
          <NavigateBeforeTwoToneIcon />
        </IconButton>
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
        <Button
          disabled={!selectedFiles?.length}
          className='files-page__control-button'
          color='secondary'
          variant='contained'
          disableElevation
          onClick={editButtonClickHandler}
        >
          {t('action.editFile')}
        </Button>
      </div>
      <div className='files-page__controls_right'>
        <Button
          disabled={!selectedFiles?.length}
          className='files-page__control-button'
          color='secondary'
          variant='contained'
          disableElevation
          onClick={deleteButtonClickHandler}
        >
          {t('action.deleteFile')}
        </Button>
      </div>
    </div>
  );

  return (
    <Page>
      <>
        {renderFileCreator()}
        {renderFileEditor()}
        <Header route={FILES_ROUTE}>
          <Button color='secondary' variant='contained' disableElevation onClick={logOut}>
            {t('link.logout')}
          </Button>
        </Header>
        <div className='files-page__content-container'>
          {renderControls()}
          <Breadcrumbs folders={globalFolders} openedFolder={openedFolder} />
          <FileList
            className='files-page__file-list'
            folders={folders}
            records={records}
            selectedFiles={selectedFiles}
            toggleSelect={toggleSelect}
            openFolder={setOpenedFolderId}
          />
        </div>
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
