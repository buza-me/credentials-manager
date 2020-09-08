import './Folder.css';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileCard } from 'Components';
import Button from '@material-ui/core/Button';
import FolderOpenTwoToneIcon from '@material-ui/icons/FolderOpenTwoTone';

export const Folder = ({ file, selected, onClick, openFolder }) => {
  const { t } = useTranslation();
  return (
    <div className='folder__wrapper' onClick={onClick}>
      <FileCard
        className='folder__container'
        selected={selected}
        HeaderIcon={FolderOpenTwoToneIcon}
        title={file.name}
      >
        <div className='folder__content'>
          <Button
            color='secondary'
            variant='contained'
            disableElevation
            onClick={() => openFolder(file._id)}
          >
            {t('action.openFolder')}
          </Button>
        </div>
      </FileCard>
    </div>
  );
};
