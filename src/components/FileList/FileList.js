import './FileList.css';
import React, { useCallback, useMemo } from 'react';
import { Folder, Record } from 'Components';

export const FileList = ({
  folders,
  records,
  selectedFiles,
  toggleSelect,
  openFolder,
  className,
}) => {
  const getAttributes = useCallback(
    (file) => {
      const isSelected =
        selectedFiles?.some?.((selectedFile) => selectedFile._id === file._id) ?? false;
      return {
        onClick: () => toggleSelect(file, isSelected),
        className: `file-list__${file.objectType}`,
        selected: isSelected,
        file,
      };
    },
    [selectedFiles, toggleSelect]
  );

  const renderedFolders = useMemo(
    () =>
      folders.map((folder) => (
        <Folder openFolder={openFolder} {...getAttributes(folder)} key={folder._id} />
      )),
    [folders, openFolder, selectedFiles, toggleSelect]
  );

  const renderedRecords = useMemo(
    () => records.map((record) => <Record {...getAttributes(record)} key={record._id} />),
    [records, selectedFiles, toggleSelect]
  );

  return (
    <div className={`file-list__container ${className}`}>
      {renderedFolders}
      {renderedRecords}
    </div>
  );
};
