import React from 'react';
import { render } from 'react-dom';
import App from './Containers/App/App';

const root = document.querySelector('#root');

const template = <App />;

render(template, root);
