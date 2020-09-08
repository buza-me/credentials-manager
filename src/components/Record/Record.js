import './Record.css';
import React from 'react';
import { FileCard, TextWithActions } from 'Components';
import EventNoteTwoToneIcon from '@material-ui/icons/EventNoteTwoTone';

export const Record = ({ file, selected, onClick }) => (
  <div className='record__container' onClick={onClick}>
    <FileCard selected={selected} HeaderIcon={EventNoteTwoToneIcon} title={file.name}>
      <div className='record__content'>
        <TextWithActions className='record__container__text-field' text={file.login} hide copy />
        <TextWithActions className='record__container__text-field' text={file.password} hide copy />
      </div>
    </FileCard>
  </div>
);
