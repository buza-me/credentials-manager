// eslint-disable-next-line import/no-unresolved
import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { IndexPage, LoginPage, RegistrationPage, ErrorPage, ProfilePage } from 'Pages';
import { ROOT_ROUTE, LOG_IN_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE } from 'Constants';

const useStyles = makeStyles(({ palette, shape }) =>
  createStyles({
    variables: {
      '--border-radius': `${shape.borderRadius}px`,
      '--divider-color': palette.divider,
      '--primary-color-100': palette.primary[100],
      '--primary-color-200': palette.primary[200],
      '--primary-color-300': palette.primary[300],
      '--primary-color-400': palette.primary[400],
      '--primary-color-500': palette.primary[500],
      '--primary-color-600': palette.primary[600],
      '--primary-color-700': palette.primary[700],
      '--primary-color-800': palette.primary[800],
      '--primary-color-900': palette.primary[900],
      '--secondary-color-100': palette.secondary[100],
      '--secondary-color-200': palette.secondary[200],
      '--secondary-color-300': palette.secondary[300],
      '--secondary-color-400': palette.secondary[400],
      '--secondary-color-500': palette.secondary[500],
      '--secondary-color-600': palette.secondary[600],
      '--secondary-color-700': palette.secondary[700],
      '--secondary-color-800': palette.secondary[800],
      '--secondary-color-900': palette.secondary[900],
      '--primary-background-color': palette.background.default,
      '--secondary-background-color': palette.background.paper
    }
  })
);

export const App = () => (
  <div id='app-wrapper' className={useStyles().variables}>
    <Switch>
      <Route exact path={ROOT_ROUTE} component={IndexPage} />
      <Route exact path={LOG_IN_ROUTE} component={LoginPage} />
      <Route exact path={REGISTRATION_ROUTE} component={RegistrationPage} />
      <Route exact path={PROFILE_ROUTE} component={ProfilePage} />
      <Route path='*' component={ErrorPage} />
    </Switch>
  </div>
);
