import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { FILES_ROUTE } from 'Constants';
import { FolderNavigatorContext } from 'Contexts';
import { readFilesAsync } from 'Store/actions';
import { buildFilePathname } from 'Utils';

const FolderNavigatorProviderBase = ({ children, rootFolder, folders, records, getFiles }) => {
  const history = useHistory();
  const location = useLocation();
  const [openedFolder, setOpenedFolder] = useState(null);
  const [openedFolderId, setOpenedFolderId] = useState(null);
  const filesRouteMatch = useRouteMatch({ path: FILES_ROUTE });

  const updateOpenedFolderId = () => {
    const splittedPath = location.pathname.split('/');
    if (splittedPath && splittedPath.length > 2) {
      setOpenedFolderId(splittedPath[2]);
    }
  };

  useEffect(() => {
    if (!filesRouteMatch || !rootFolder || !rootFolder._id) {
      return;
    }
    updateOpenedFolderId();
  });

  useEffect(() => {
    if (filesRouteMatch && (!rootFolder || !rootFolder._id)) {
      getFiles();
    }
  }, [filesRouteMatch]);

  // useEffect(() => {
  //   if (!filesRouteMatch) {
  //     return;
  //   }
  //   updateOpenedFolderId();
  // }, [location]);

  useEffect(() => {
    if (!filesRouteMatch || !rootFolder || !rootFolder._id) {
      return;
    }
    if (!openedFolderId) {
      history.push(buildFilePathname(rootFolder._id));
      return;
    }
    setOpenedFolder(folders.find((folder) => folder._id === openedFolderId));
  }, [openedFolderId]);

  useEffect(() => {
    if (!filesRouteMatch || !rootFolder || !rootFolder._id) {
      return;
    }
    if (!openedFolder) {
      history.push(buildFilePathname(rootFolder._id));
      return;
    }
    if (openedFolder && openedFolder._id) {
      setOpenedFolder(folders.find((folder) => folder._id === openedFolder._id));
    }
  }, [rootFolder, folders, records]);

  const providedState = {
    openedFolder,
    setOpenedFolderId: (id) => history.push(buildFilePathname(id))
  };

  return (
    <FolderNavigatorContext.Provider value={providedState}>
      {children}
    </FolderNavigatorContext.Provider>
  );
};

const mapStateToProps = ({ dataReducer }) => ({
  rootFolder: dataReducer.rootFolder,
  folders: dataReducer.folders,
  records: dataReducer.records
});

const mapDispatchToProps = (dispatch) => ({
  getFiles: () => dispatch(readFilesAsync())
});

export const FolderNavigatorProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderNavigatorProviderBase);
