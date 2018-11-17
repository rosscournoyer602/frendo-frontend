import React from 'react'
import { render } from 'react-dom'
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/app';
import Header from './components/header';
import style from './scss/main.scss';

// const store = createStore();

render((
	// <Provider store={store}>
		<Router>
			<App style={style}>
				<Header />
			</App>
		</Router>
	// </Provider>
), document.getElementById('root'));
