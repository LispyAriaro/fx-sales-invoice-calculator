import React from 'react';

import Home from './containers/Home'
import Invoice from './containers/Invoice'

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'


const AppRoutes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/invoice" component={Invoice} />

      {/* <Redirect to="/" /> */}
    </div>
  </Router>
);

export default AppRoutes
