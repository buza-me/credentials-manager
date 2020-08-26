import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import LanguageTwoToneIcon from '@material-ui/icons/LanguageTwoTone';
import { AVAILABLE_LANGUAGES } from 'Constants';

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value) => {
    i18n.changeLanguage(value);
    handleClose();
  };

  const renderMenuItems = () =>
    AVAILABLE_LANGUAGES.map((lanuageObj) => (
      <MenuItem
        key={lanuageObj.value}
        onClick={() => handleMenuItemClick(lanuageObj.value)}
        selected={lanuageObj.value === i18n.language}
      >
        {lanuageObj.title}
      </MenuItem>
    ));

  const button = (
    <IconButton onClick={handleClick} color='primary'>
      <LanguageTwoToneIcon />
    </IconButton>
  );

  const title = t('change.language');

  return (
    <div>
      <Tooltip title={title} aria-label={title}>
        {button}
      </Tooltip>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {renderMenuItems()}
      </Menu>
    </div>
  );
};
