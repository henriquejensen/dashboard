import React from 'react';
import { Route, IndexRoute } from "react-router";

import App from "./components/app";
import Login from "./components/Login";
import Signin from "./components/Signin";

import EditUser from "./containers/user/EditUser";
import Localize from "./containers/localize/LocalizeController";
import Dashboard from "./containers/dashboard/Dashboard";
import Chat from "./containers/chat/Chat";
import SMS from "./containers/sms/SMS";
import CentroCusto from "./containers/sms/CentroCusto";
import Respostas from "./containers/sms/Respostas";
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

    <Route name="Dashboard" path="/dashboard" component={App} >
      <IndexRoute component={Dashboard} />

      <Route name="Localize" path="localize/:tipo" component={Localize}	/>
      <Route name="Base Certa" path="basecerta" component={BaseCerta} />
      <Route name="SMS" path="sms" component={SMS} />
      <Route name="SMS" path="sms/centrocusto" component={CentroCusto} />
      <Route name="SMS" path="sms/respostas" component={Respostas} />
      <Route name="Credito" path="credito" component={Credito} />
      <Route name="Veiculos" path="veiculos" component={Veiculos} />
      <Route name="Foco Fiscal" path="focofiscal" component={FocoFiscal} />
      <Route name="Venda+" path="vendamais" component={VendaMais} />
      <Route name="Consig+" path="consigmais" component={ConsigMais} />

      <Route name="Editar" path="editar" component={EditUser}	/>
      <Route name="Chat" path="chat" component={Chat}	/>
    </Route>

    <Route path='*' component={App} />
  </Route>
);
