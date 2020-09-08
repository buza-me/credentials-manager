import './core';
import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider, LoginProvider, FolderNavigatorProvider } from 'Providers';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'Store';
import { App } from 'Containers';

const template = (
  <BrowserRouter>
    <Provider store={store}>
      <LoginProvider>
        <ThemeProvider>
          <FolderNavigatorProvider>
            <App />
          </FolderNavigatorProvider>
        </ThemeProvider>
      </LoginProvider>
    </Provider>
  </BrowserRouter>
);

const root = document.querySelector('#root');

render(template, root);
