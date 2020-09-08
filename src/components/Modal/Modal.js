import './Modal.css';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';

export const Modal = ({ open = false, onClose = () => null, children }) => {
  const { t } = useTranslation();

  return (
    <Backdrop open={open} onClick={onClose} className='modal__backdrop'>
      <Paper className='modal__container' onClick={(evt) => evt.stopPropagation()}>
        <section className='modal__close-button-container'>
          <IconButton color='primary' onClick={onClose}>
            <Tooltip title={t('action.cancel')}>
              <CancelTwoToneIcon />
            </Tooltip>
          </IconButton>
        </section>
        {children}
      </Paper>
    </Backdrop>
  );
};
