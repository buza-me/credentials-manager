import './FileCard.css';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import RadioButtonCheckedTwoToneIcon from '@material-ui/icons/RadioButtonCheckedTwoTone';
import { TextWithActions } from 'Components';

export const FileCard = ({ selected, children, HeaderIcon, title }) => (
  <Paper className={`file-card__container${selected ? ' selected' : ''}`}>
    <div className='file-card__header'>
      <div className='file-card__header_left-side'>
        {HeaderIcon ? <HeaderIcon className='file-card__header-icon' /> : null}
        {title ? <TextWithActions text={title} className='file-card__header-title' /> : null}
      </div>
      <RadioButtonCheckedTwoToneIcon className={`file-card__icon${selected ? ' visible' : ''}`} />
    </div>
    <div className='file-card__content'>{children}</div>
  </Paper>
);
