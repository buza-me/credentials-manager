import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { FILES_ROUTE } from 'Constants';
import { FolderNavigatorContext } from 'Contexts';
import { readFilesAsync } from 'Store/actions';
import { buildFilePathname } from 'Utils';

const FolderNavigatorProviderBase = ({
  children,
  rootFolder,
  folders,
  records,
  getFiles,
  isLoading,
}) => {
  const history = useHistory();
  const location = useLocation();
  const [openedFolder, setOpenedFolder] = useState(null);
  const [openedFolderId, setOpenedFolderId] = useState(null);
  const filesRouteMatch = useRouteMatch({ path: FILES_ROUTE });

  const updateOpenedFolderId = useCallback(() => {
    const folderId = location?.pathname?.split?.('/')?.[2];

    if (openedFolderId && openedFolderId === folderId) {
      return;
    }
    if (folderId) {
      setOpenedFolderId(folderId);
    } else if (rootFolder?._id) {
      history.push(buildFilePathname(rootFolder._id));
    }
  }, [openedFolderId, history, location, rootFolder]);

  useEffect(() => {
    if (!filesRouteMatch || !rootFolder?._id) {
      return;
    }
    updateOpenedFolderId();
  }, [filesRouteMatch, rootFolder, openedFolderId, history, location]);

  useEffect(() => {
    if (filesRouteMatch && !rootFolder?._id && !isLoading) {
      getFiles();
    }
  }, [filesRouteMatch, isLoading, rootFolder, getFiles]);

  useEffect(() => {
    if (!rootFolder?._id) {
      setOpenedFolderId(null);
      setOpenedFolder(null);
    }
  }, [rootFolder]);

  useEffect(() => {
    if (!filesRouteMatch || !folders?.length || !openedFolderId) {
      return;
    }
    if (!openedFolder || openedFolder?.id !== openedFolderId) {
      setOpenedFolder(folders.find((folder) => folder._id === openedFolderId));
      return;
    }
    if (openedFolder?._id) {
      setOpenedFolder(folders.find((folder) => folder._id === openedFolder._id));
    }
  }, [openedFolderId, openedFolder, rootFolder, folders, records]);

  const providedState = useMemo(
    () => ({
      openedFolder,
      setOpenedFolderId: (id) => history.push(buildFilePathname(id)),
    }),
    [openedFolder, history]
  );

  const content = useMemo(
    () => (
      <FolderNavigatorContext.Provider value={providedState}>
        {children}
      </FolderNavigatorContext.Provider>
    ),
    [openedFolder, history, children]
  );

  return content;
};

const mapStateToProps = ({ dataReducer, commonReducer }) => ({
  rootFolder: dataReducer.rootFolder,
  folders: dataReducer.folders,
  records: dataReducer.records,
  isLoading: commonReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getFiles: () => dispatch(readFilesAsync()),
});

export const FolderNavigatorProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderNavigatorProviderBase);
