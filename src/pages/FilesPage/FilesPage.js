import './FilesPage.css';
import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { Page } from 'Containers';
import { Header } from 'Components';
import { LoginContext } from 'Contexts';
import { readFilesAsync } from 'Store/actions';

export const FilesPageBase = ({ rootFolder, getFiles }) => {
  const { t } = useTranslation();
  const { logOut } = useContext(LoginContext);
  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (!rootFolder._id) {
        getFiles();
      }
    });
  });
  return (
    <Page>
      <Header>
        <Button color='secondary' variant='contained' disableElevation onClick={logOut}>
          {t('link.logout')}
        </Button>
      </Header>
    </Page>
  );
};

const mapStateToProps = ({ dataReducer }) => ({
  rootFolder: dataReducer.rootFolder
});

const mapDispatchToProps = (dispatch) => ({
  getFiles: () => dispatch(readFilesAsync())
});

export const FilesPage = connect(mapStateToProps, mapDispatchToProps)(FilesPageBase);
