import './Header.css';
import React from 'react';
import { Link as BrowserLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { LOGO_TEXT } from 'Constants';
import { LanguageSelector, ThemeSelector } from 'Components';

export const Header = ({ children, isBasic = false, route = '/' }) => (
  <section className='header__container'>
    <div>
      {!isBasic ? (
        <Link
          component={BrowserLink}
          className='header__home-link'
          to={route}
          color='primary'
          underline='none'
        >
          {LOGO_TEXT}
        </Link>
      ) : null}
    </div>
    <main className='header__button-container'>
      {children}
      {children ? (
        <Divider orientation='vertical' className='header__button-container_divider' flexItem />
      ) : null}
      <LanguageSelector />
      <ThemeSelector />
    </main>
  </section>
);
