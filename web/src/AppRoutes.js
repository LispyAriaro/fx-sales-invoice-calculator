import React from 'react';

import Home from './containers/Home';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


const AppRoutes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
    </div>
  </Router>
);

export default AppRoutes
