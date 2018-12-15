import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagas';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom'
import reducers from './reducers';
import App from './components/App.jsx';
import style from './scss/main.scss';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers, 
  composeWithDevTools(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSaga);

render((
	<Provider store={store}>
		<Router>
			<App style={style} />
		</Router>
	</Provider>
), document.getElementById('root'));
