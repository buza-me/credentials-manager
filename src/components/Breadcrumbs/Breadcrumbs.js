import './Breadcrumbs.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { buildFilePathname } from 'Utils';

import { TextWithActions } from '../TextWithActions/TextWithActions';

const foldersMap = new Map();

const updateFoldersMap = (folders) => {
  foldersMap.clear();
  folders.forEach((folder) => foldersMap.set(folder._id, folder));
};

const getModels = (folder, collection = []) => {
  if (!folder) {
    return collection;
  }
  collection.push({ id: folder._id, pathname: buildFilePathname(folder._id), name: folder.name });
  if (folder.parentId !== folder.userId) {
    getModels(foldersMap.get(folder.parentId), collection);
  }
  return collection;
};

export const Breadcrumbs = ({ folders = [], openedFolder = {} }) => {
  const history = useHistory();
  const [models, setModelsState] = useState([]);

  const setModels = (arr = []) => setModelsState(arr.reverse());

  useEffect(() => {
    updateFoldersMap(folders);
    if (openedFolder && openedFolder._id) {
      setModels(getModels(openedFolder));
    }
  }, [folders]);

  useEffect(() => {
    if (openedFolder && openedFolder._id) {
      setModels(getModels(openedFolder));
    }
  }, [openedFolder]);

  const linkClickHandler = (event, url) => {
    event.preventDefault();
    history.push(url);
  };

  const renderTextContent = (text, attrs) => (
    <TextWithActions className='breadcrumbs__link-text' text={text} {...attrs} />
  );

  const renderLink = (model) =>
    model.id !== openedFolder._id ? (
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
    );

  return (
    <MuiBreadcrumbs>{models ? models.map((model) => renderLink(model)) : null}</MuiBreadcrumbs>
  );
};
