import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';

import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App style={{ backgroundColor: '#DCDCDC' }} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
