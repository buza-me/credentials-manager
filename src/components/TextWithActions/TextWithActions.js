import './TextWithActions.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FileCopyTwoToneIcon from '@material-ui/icons/FileCopyTwoTone';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';

export const TextWithActions = ({ copy = false, hide = false, deflt = false, text, className }) => {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isRevealContent, setIsRevealContent] = hide ? useState(deflt) : useState(true);

  const handleEllipsis = ({ currentTarget, type }) => {
    const shouldShow =
      type === 'pointerover' &&
      !showTooltip &&
      currentTarget.clientWidth < currentTarget.scrollWidth;

    const shouldHide = showTooltip && type === 'pointerout';

    if (shouldShow) {
      setShowTooltip(true);
    } else if (shouldHide) {
      setShowTooltip(false);
    }
  };

  const copyText = (event) => {
    event.stopPropagation();
    const span = document.createElement('span');
    span.textContent = text;
    span.style.width = '0px';
    span.style.height = '0px';
    document.body.appendChild(span);
    const range = document.createRange();
    range.selectNodeContents(span);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    document.body.removeChild(span);
  };

  const toggleHide = (event) => {
    event.stopPropagation();
    setIsRevealContent(!isRevealContent);
  };

  const renderRevealer = () => (
    <IconButton onClick={toggleHide} className='text-with-actions__action-button' size='small'>
      {isRevealContent ? (
        <Tooltip title={t('action.hide')}>
          <VisibilityOffTwoToneIcon className='text-with-actions__action-button_icon' />
        </Tooltip>
      ) : (
        <Tooltip title={t('action.show')}>
          <VisibilityTwoToneIcon className='text-with-actions__action-button_icon' />
        </Tooltip>
      )}
    </IconButton>
  );

  const renderActions = () => {
    if (hide || copy) {
      return (
        <div className='text-with-actions__action-container'>
          {hide ? renderRevealer() : null}
          {copy ? (
            <IconButton
              size='small'
              onClick={copyText}
              className='text-with-actions__action-button text-with-actions__copy-action-button'
            >
              <Tooltip title={t('action.copy')}>
                <FileCopyTwoToneIcon className='text-with-actions__action-button_icon' />
              </Tooltip>
            </IconButton>
          ) : null}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`text-with-actions__container${!hide && !copy ? 'no-actions' : ''} ${className}`}
    >
      <div className='text-with-actions__text'>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          open={showTooltip}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={text}
        >
          <Typography
            variant='subtitle1'
            noWrap
            onPointerOver={handleEllipsis}
            onPointerOut={handleEllipsis}
          >
            {isRevealContent ? text : text.replaceAll(/./gs, '•')}
          </Typography>
        </Tooltip>
      </div>
      {renderActions()}
    </div>
  );
};
