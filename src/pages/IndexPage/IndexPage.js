import './IndexPage.css';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { LOG_IN_ROUTE, REGISTRATION_ROUTE, LOGO_TEXT } from 'Constants';
import { Header } from 'Components';
import { Page } from 'Containers';

export const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <section className='index-page__container'>
        <Header isBasic />
        <main className='index-page__content'>
          <h1 className='index-page__logo'>{LOGO_TEXT}</h1>
          <Typography variant='h4' component='h2' className='index-page__header'>
            {t('index.welcome')}
          </Typography>
          <section className='index-page__links'>
            <Button
              component={Link}
              className='index-page__link'
              to={LOG_IN_ROUTE}
              color='secondary'
              variant='contained'
              disableElevation
            >
              {t('link.login')}
            </Button>
            <Button
              component={Link}
              className='index-page__link'
              to={REGISTRATION_ROUTE}
              color='secondary'
              variant='contained'
              disableElevation
            >
              {t('link.registration')}
            </Button>
          </section>
        </main>
      </section>
    </Page>
  );
};
