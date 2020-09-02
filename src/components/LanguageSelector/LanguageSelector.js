import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import LanguageTwoToneIcon from '@material-ui/icons/LanguageTwoTone';
import { connect } from 'react-redux';
import { AVAILABLE_LANGUAGES } from 'Constants';
import { updateUserPreferencesAsync } from 'Store/actions';
import { LoginContext } from 'Contexts';

const LanguageSelectorBase = ({ preferences = {}, updatePreferences }) => {
  const { isLoggedIn } = useContext(LoginContext);
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (value) => {
    i18n.changeLanguage(value);
    if (isLoggedIn) {
      updatePreferences({ ...preferences, language: value });
    }
    handleClose();
  };

  const renderMenuItems = () =>
    AVAILABLE_LANGUAGES.map((lanuageObj) => (
      <MenuItem
        key={lanuageObj.value}
        onClick={() => changeLanguage(lanuageObj.value)}
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
      <Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={handleClose}>
        {anchorEl ? renderMenuItems() : null}
      </Menu>
    </div>
  );
};

const mapStateToProps = ({ preferencesReducer }) => ({
  preferences: preferencesReducer.preferences
});

const mapDispatchToProps = (dispatch) => ({
  updatePreferences: (body) => dispatch(updateUserPreferencesAsync(body))
});

export const LanguageSelector = connect(mapStateToProps, mapDispatchToProps)(LanguageSelectorBase);
