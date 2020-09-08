import './FileEditor.css';
import React from 'react';
import { FileForm, Modal } from 'Components';

export const FileEditor = ({ open = false, onClose = () => null, onSubmit = () => null, file }) => {
  const getFileType = () => file && file.objectType;

  return (
    <Modal open={open} onClose={onClose}>
      <FileForm
        onSubmit={onSubmit}
        file={file}
        defaults={file}
        fileType={getFileType()}
        resetTrigger={open}
        className='file-editor__file-form'
        id='file-editor__file-form'
      />
    </Modal>
  );
};
