import './FileList.css';
import React from 'react';
import { Folder, Record } from 'Components';

export const FileList = ({
  folders,
  records,
  selectedFiles,
  toggleSelect,
  openFolder,
  className
}) => {
  const getAttributes = (file) => {
    const selected = selectedFiles.some((selectedFile) => selectedFile._id === file._id);
    return {
      onClick: () => toggleSelect(file, selected),
      className: `file-list__${file.objectType}`,
      selected,
      file
    };
  };

  const renderFolders = () =>
    folders.map((folder) => (
      <Folder openFolder={openFolder} {...getAttributes(folder)} key={folder._id} />
    ));

  const renderRecords = () =>
    records.map((record) => <Record {...getAttributes(record)} key={record._id} />);

  return (
    <div className={`file-list__container ${className}`}>
      {renderFolders()}
      {renderRecords()}
    </div>
  );
};
