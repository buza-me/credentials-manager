import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import InvertColorsTwoToneIcon from '@material-ui/icons/InvertColorsTwoTone';
import { AVAILABLE_THEMES } from 'Constants';
import { ThemeContext, LoginContext } from 'Contexts';
import { updateUserPreferencesAsync } from 'Store/actions';

const ThemeSelectorBase = ({ preferences = {}, updatePreferences }) => {
  const { isLoggedIn } = useContext(LoginContext);
  const { themeName, setThemeName } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value) => {
    setThemeName(value);
    if (isLoggedIn) {
      updatePreferences({ ...preferences, theme: value });
    }
    handleClose();
  };

  const renderMenuItems = () =>
    AVAILABLE_THEMES.map((themeObj) => (
      <MenuItem
        key={themeObj.value}
        onClick={() => handleMenuItemClick(themeObj.value)}
        selected={themeObj.value === themeName}
      >
        {t(themeObj.title)}
      </MenuItem>
    ));

  const button = (
    <IconButton onClick={handleClick} color='primary'>
      <InvertColorsTwoToneIcon />
    </IconButton>
  );

  const title = t('change.theme');

  return (
    <div>
      <Tooltip title={title} aria-label={title}>
        {button}
      </Tooltip>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
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

export const ThemeSelector = connect(mapStateToProps, mapDispatchToProps)(ThemeSelectorBase);
