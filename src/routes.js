import React from 'react';
import { Route, IndexRoute } from "react-router";

import App from "./components/app";
import Localize from "./containers/localize/Localize";
import Dashboard from "./containers/dashboard/Dashboard";

import Login from "./components/Login";
import Signin from "./components/changePassword";

export default (
  <Route>
    <Route path='/' component={Login} />
    <Route path='/signin' component={Signin} />
    <Route path="/dashboard" component={App} >
      <IndexRoute component={Dashboard} />
      <Route path="localize" component={Localize}	/>
    </Route>
  </Route>
);
