import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/app';
import Header from './components/header';
import style from './scss/main.scss';

render((
  <BrowserRouter>
    <App style={style}>
      <Header />
    </App>
  </BrowserRouter>
), document.getElementById('root'));
