import './core';
import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider, LoginProvider } from 'Providers';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'Containers';

const template = (
  <BrowserRouter>
    <LoginProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LoginProvider>
  </BrowserRouter>
);

const root = document.querySelector('#root');

render(template, root);
