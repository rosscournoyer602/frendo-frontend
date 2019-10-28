import React from 'react';
import Header from './Header';
import MobileHeader from './MobileHeader';
import Main from './Main';
import WebSocketHOC from './WebSocketHOC';

const App = () => (
  <WebSocketHOC>
    <Header />
    <MobileHeader />
    <Main />
  </WebSocketHOC>
);

export default App;
