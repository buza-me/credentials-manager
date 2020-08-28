import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { Page } from 'Containers';
import { Header } from 'Components';
import { LoginContext } from 'Contexts';

export const ProfilePage = () => {
  const { t } = useTranslation();
  const { logOut } = useContext(LoginContext);
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
