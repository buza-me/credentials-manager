import './PasswordInput.css';
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Input from '@material-ui/core/Input';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';

export const PasswordInput = ({
  id,
  onChange,
  value,
  required = true,
  color = 'primary',
  autoComplete = 'off',
}) => {
  const { t } = useTranslation();
  const [inputType, setInputType] = useState('password');

  const endAdornment = useMemo(
    () => (
      <InputAdornment position='end'>
        <IconButton onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}>
          {inputType === 'password' ? (
            <Tooltip title={t('action.show')}>
              <VisibilityTwoToneIcon className='password-input__button-icon' />
            </Tooltip>
          ) : (
            <Tooltip title={t('action.hide')}>
              <VisibilityOffTwoToneIcon className='password-input__button-icon' />
            </Tooltip>
          )}
        </IconButton>
      </InputAdornment>
    ),
    [inputType, t]
  );

  return (
    <Input
      id={id}
      value={value}
      color={color}
      type={inputType}
      required={required}
      onChange={onChange}
      autoComplete={autoComplete}
      endAdornment={endAdornment}
    />
  );
};
