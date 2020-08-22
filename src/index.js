import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider, LoginProvider } from 'Core';
import App from 'Containers/App/App';

const template = (
  <LoginProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </LoginProvider>
);

const root = document.querySelector('#root');

render(template, root);
