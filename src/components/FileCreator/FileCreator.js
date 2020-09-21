import './FileCreator.css';
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FileForm, Modal } from 'Components';

export const FileCreator = ({
  open = false,
  onClose = () => null,
  onSubmit = () => null,
  folderId,
}) => {
  const { t } = useTranslation();
  const formRef = useRef(null);

  const getFileType = useCallback((index) => (index === 0 ? 'folder' : 'record'), []);

  const [selectedTabValue, setSelectedTabValue] = useState(1);
  const [fileType, setFileType] = useState(getFileType(selectedTabValue));

  const handleTabChange = useCallback((event, value) => {
    setSelectedTabValue(value);
    setFileType(getFileType(value));
  }, []);

  const getFile = useCallback(() => ({ parentId: folderId }), [folderId]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    formRef?.current?.reset?.();
  }, [open]);

  const renderedTabs = useMemo(
    () => (
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
    ),
    [selectedTabValue]
  );

  const renderedFileForm = useMemo(
    () => (
      <FileForm
        onSubmit={onSubmit}
        file={getFile()}
        fileType={fileType}
        ref={formRef}
        className='file-creator__file-form'
        id='file-creator__file-form'
      />
    ),
    [fileType, folderId]
  );

  return (
    <Modal open={open} onClose={onClose}>
      {renderedTabs}
      {renderedFileForm}
    </Modal>
  );
};
