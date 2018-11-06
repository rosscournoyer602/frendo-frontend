import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/app';
import Header from './components/header';
import style from './scss/main.scss';

render((
  <Router>
    <App style={style}>
      <Header />
    </App>
  </Router>
), document.getElementById('root'));
