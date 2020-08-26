import './ErrorPage.css';
import React from 'react';
import { Trans } from 'react-i18next';
import { Link as BrowserLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const renderLink = () => (
  <Link component={BrowserLink} className='error-page__home-link' to='/' color='primary' />
);

export const ErrorPage = () => (
  <section className='error-page__container'>
    <Typography variant='h4' component='h1' className='error-page__header'>
      <Trans i18nKey='error.pageNotFound' components={{ 1: renderLink() }} />
    </Typography>
  </section>
);
