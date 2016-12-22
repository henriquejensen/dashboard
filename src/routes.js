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
import CentroCusto from "./containers/sms/CentroCusto";
import BaseCerta from "./containers/basecerta/BaseCerta";
import Credito from "./containers/credito/Credito";
import Veiculos from "./containers/veiculos/Veiculos";
import FocoFiscal from "./containers/focofiscal/FocoFiscal";
import VendaMais from "./containers/vendamais/VendaMais";
import ConsigMais from "./containers/consigmais/ConsigMais";

export default (
  <Route>
  
    <Route path='/' component={Login} />
    <Route path='/signin' component={Signin} />

    <Route path="/dashboard" component={App} >
      <IndexRoute component={Dashboard} />

      <Route path="localize" component={Localize}	/>
      <Route path="basecerta" component={BaseCerta} />
      <Route path="sms" component={SMS} />
      <Route path="sms/centrocusto" component={CentroCusto} />
      <Route path="credito" component={Credito} />
      <Route path="veiculos" component={Veiculos} />
      <Route path="focofiscal" component={FocoFiscal} />
      <Route path="vendamais" component={VendaMais} />
      <Route path="consigmais" component={ConsigMais} />

      <Route path="editar" component={EditUser}	/>
      <Route path="chat" component={Chat}	/>
    </Route>
  </Route>
);
