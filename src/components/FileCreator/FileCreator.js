import './FileCreator.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FileForm, Modal } from 'Components';

export const FileCreator = ({
  open = false,
  onClose = () => null,
  onSubmit = () => null,
  folderId
}) => {
  const { t } = useTranslation();

  const getFileType = (index) => (index === 0 ? 'folder' : 'record');

  const [selectedTabValue, setSelectedTabValue] = useState(1);
  const [fileType, setFileType] = useState(getFileType(selectedTabValue));

  const handleTabChange = (event, value) => {
    setSelectedTabValue(value);
    setFileType(getFileType(value));
  };

  const getFile = () => ({ parentId: folderId });

  return (
    <Modal open={open} onClose={onClose}>
      <Tabs
        value={selectedTabValue}
        onChange={handleTabChange}
        variant='fullWidth'
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label={t('file.folder')} />
        <Tab label={t('file.record')} />
      </Tabs>
      <FileForm
        onSubmit={onSubmit}
        file={getFile()}
        fileType={fileType}
        resetTrigger={open}
        className='file-creator__file-form'
        id='file-creator__file-form'
      />
    </Modal>
  );
};
