import './Breadcrumbs.css';
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { buildFilePathname } from 'Utils';

import { TextWithActions } from '../TextWithActions/TextWithActions';

export const Breadcrumbs = ({ folders = [], openedFolder = {} }) => {
  const history = useHistory();
  const [models, setModelsState] = useState([]);

  const foldersMap = useRef(new Map()).current;

  const updateFoldersMap = useCallback((foldersCollection) => {
    foldersMap.clear();
    foldersCollection.forEach((folder) => foldersMap.set(folder._id, folder));
  }, []);

  const getModels = useCallback((folder, collection = []) => {
    if (!folder) {
      return collection;
    }
    collection.push({ id: folder._id, pathname: buildFilePathname(folder._id), name: folder.name });
    if (folder.parentId !== folder.userId) {
      getModels(foldersMap.get(folder.parentId), collection);
    }
    return collection;
  }, []);

  const setModels = useCallback((arr = []) => setModelsState(arr.reverse()), []);

  useEffect(() => {
    updateFoldersMap(folders);
    if (openedFolder?._id) {
      setModels(getModels(openedFolder));
    } else {
      setModelsState([]);
    }
  }, [folders]);

  useEffect(() => {
    if (openedFolder?._id) {
      setModels(getModels(openedFolder));
    } else {
      setModelsState([]);
    }
  }, [openedFolder]);

  const linkClickHandler = useCallback((event, url) => {
    event.preventDefault();
    history.push(url);
  }, []);

  const renderTextContent = useCallback(
    (text, attrs) => <TextWithActions className='breadcrumbs__link-text' text={text} {...attrs} />,
    []
  );

  const renderLink = useCallback(
    (model) =>
      model.id !== openedFolder?._id ? (
        <Link
          href={model.pathname}
          key={model.id}
          className='breadcrumbs__link'
          onClick={(e) => linkClickHandler(e, model.pathname)}
        >
          {renderTextContent(model.name)}
        </Link>
      ) : (
        renderTextContent(model.name, { key: model.id })
      ),
    [openedFolder]
  );

  const renderedLinks = useMemo(() => (models ? models.map((model) => renderLink(model)) : null), [
    models,
    openedFolder,
  ]);

  return <MuiBreadcrumbs>{renderedLinks}</MuiBreadcrumbs>;
};
