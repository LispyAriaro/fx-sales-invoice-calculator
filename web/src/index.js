import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppRoutes from './AppRoutes';
import store, { history } from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
// import './css/app.css';
// import './css/dataLoader.css'

var mountNode = document.getElementById("app");

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>, mountNode);
