import React from 'react';
import GlobalStyle from 'components/styles/global'
import Home from 'pages/home/Home'
import store from 'store/store';
import { Provider } from 'react-redux';

function App() {
  return (
  <Provider store={store}>
    <GlobalStyle />
    <Home />
  </Provider>
  );
}

export default App;
