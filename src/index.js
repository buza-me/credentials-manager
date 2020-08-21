import React from 'react';
import { render } from 'react-dom';
import App from './Containers/App/App';
import { ThemeProvider } from './core';

const root = document.querySelector('#root');

const template = (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

render(template, root);
