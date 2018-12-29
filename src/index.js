/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom';
import rootSaga from './sagas/sagas';
import reducers from './reducers';
import App from './components/App';
import style from './scss/main.scss';
import { AUTH_USER } from './actions/actionTypes';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}
render(
  <Provider store={store}>
    <Router>
      <App style={style} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
