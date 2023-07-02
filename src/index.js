import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux'
import store from './store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import "./i18n";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Provider>
  
, document.getElementById('root'));

serviceWorker.unregister();