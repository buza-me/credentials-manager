// eslint-disable-next-line import/no-unresolved
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IndexPage, LoginPage, RegistrationPage, ErrorPage } from 'Pages';

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={IndexPage} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/registration' component={RegistrationPage} />
      <Route path='*' component={ErrorPage} />
    </Switch>
  </Router>
);

export default App;
