import React, { useState, useContext, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import LanguageTwoToneIcon from '@material-ui/icons/LanguageTwoTone';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { connect } from 'react-redux';
import { AVAILABLE_LANGUAGES } from 'Constants';
import { updateUserPreferencesAsync } from 'Store/actions';
import { LoginContext } from 'Contexts';

const LanguageSelectorBase = ({ preferences = {}, updatePreferences }) => {
  const { isLoggedIn } = useContext(LoginContext);
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const isSuperSmall = useMediaQuery('(max-width: 350px)');

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const changeLanguage = useCallback(
    (value) => {
      i18n.changeLanguage(value);
      if (isLoggedIn) {
        updatePreferences({ ...preferences, language: value });
      }
      handleClose();
    },
    [preferences, updatePreferences, isLoggedIn, i18n]
  );

  const button = useMemo(
    () => (
      <IconButton onClick={handleClick} color='primary' size={isSuperSmall ? 'small' : 'medium'}>
        <LanguageTwoToneIcon />
      </IconButton>
    ),
    [isSuperSmall]
  );

  const tooltipAndButtonNodes = useMemo(() => {
    const title = t('change.language');
    return (
      <Tooltip title={title} aria-label={title}>
        {button}
      </Tooltip>
    );
  }, [t]);

  const renderMenuItems = useRef(() =>
    AVAILABLE_LANGUAGES.map((lanuageObj) => (
      <MenuItem
        key={lanuageObj.value}
        onClick={() => changeLanguage(lanuageObj.value)}
        selected={lanuageObj.value === i18n.language}
      >
        {lanuageObj.title}
      </MenuItem>
    ))
  ).current;

  return (
    <div>
      {tooltipAndButtonNodes}
      <Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={handleClose}>
        {anchorEl ? renderMenuItems() : null}
      </Menu>
    </div>
  );
};

const mapStateToProps = ({ preferencesReducer }) => ({
  preferences: preferencesReducer.preferences,
});

const mapDispatchToProps = (dispatch) => ({
  updatePreferences: (body) => dispatch(updateUserPreferencesAsync(body)),
});

export const LanguageSelector = connect(mapStateToProps, mapDispatchToProps)(LanguageSelectorBase);
