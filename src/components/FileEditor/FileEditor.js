import './FileEditor.css';
import React, { useCallback, useRef, useEffect } from 'react';
import { FileForm, Modal } from 'Components';

export const FileEditor = ({ open = false, onClose = () => null, onSubmit = () => null, file }) => {
  const formRef = useRef(null);
  const getFileType = useCallback(() => file?.objectType ?? '', [file]);
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    formRef?.current?.reset?.();
  }, [open]);
  return (
    <Modal open={open} onClose={onClose}>
      <FileForm
        onSubmit={onSubmit}
        file={file}
        defaults={file}
        fileType={getFileType()}
        ref={formRef}
        className='file-editor__file-form'
        id='file-editor__file-form'
      />
    </Modal>
  );
};
