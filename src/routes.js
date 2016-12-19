import React from 'react';
import { Route, IndexRoute } from "react-router";

import App from "./components/app";
import Login from "./components/Login";
import Signin from "./components/changePassword";

import EditUser from "./containers/user/EditUser";
import Localize from "./containers/localize/Localize";
import Dashboard from "./containers/dashboard/Dashboard";

export default (
  <Route>
  
    <Route path='/' component={Login} />
    <Route path='/signin' component={Signin} />

    <Route path="/dashboard" component={App} >
      <IndexRoute component={Dashboard} />
      <Route path="localize" component={Localize}	/>
      <Route path="editar" component={EditUser}	/>
    </Route>
  </Route>
);
