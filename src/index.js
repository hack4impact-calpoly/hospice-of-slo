import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';

import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode style={{ backgroundColor: '#DCDCDC' }}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
