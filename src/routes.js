import React from 'react';
import { Route, IndexRoute } from "react-router";

import App from "./components/app";
import Login from "./components/Login";
import Signin from "./components/Signin";

import EditUser from "./containers/user/EditUser";
import Localize from "./containers/localize/Localize";
import Dashboard from "./containers/dashboard/Dashboard";
import Chat from "./containers/chat/Chat";
import SMS from "./containers/sms/SMS";
import BaseCerta from "./containers/basecerta/BaseCerta";
import Credito from "./containers/credito/Credito";

export default (
  <Route>
  
    <Route path='/' component={Login} />
    <Route path='/signin' component={Signin} />

    <Route path="/dashboard" component={App} >
      <IndexRoute component={Dashboard} />
      <Route path="localize" component={Localize}	/>
      <Route path="basecerta" component={BaseCerta} />
      <Route path="sms" component={SMS} />
      <Route path="credito" component={Credito} />
      <Route path="editar" component={EditUser}	/>
      <Route path="chat" component={Chat}	/>
    </Route>
  </Route>
);
