import React, { Component } from 'react';
import Header from './Header';
import MobileHeader from './MobileHeader';
import Main from './Main';

export default class App extends Component {
	render() {
		return (
      <>
        <Header />
        <MobileHeader />
        <Main />
      </>
		)
}
}