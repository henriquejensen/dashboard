import React from 'react';
import { Route, IndexRoute } from "react-router";

import App from "./components/app";
import Welcome from "./components/welcome";
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
import Credito from "./containers/credito/CreditoController";
import Veiculos from "./containers/veiculos/Veiculos";
import FocoFiscal from "./containers/focofiscal/FocoFiscalController";
import VendaMais from "./containers/vendamais/VendaMais";
import ConsigMais from "./containers/consigmais/ConsigMais";

export default (
  <Route>

    <Route path="/" name="Assertiva" component={App} >
      <Route path='/login' component={Login} />
      <Route path='/signin' component={Signin} />

      <Route onEnter={requireAuth} component={Welcome}>
        <Route path='/dashboard' name="Dashboard" component={Dashboard} />

        <Route name="Localize" path="localize" component={Localize}	>
          <Route name="Localize" path=":tipo" component={Localize}	/>
        </Route>

        <Route name="Credito" path="credito" component={Credito}	>
          <Route name="Credito" path=":tipo" component={Credito}	/>
        </Route>

        <Route name="FocoFiscal" path="focofiscal" component={FocoFiscal}	>
          <Route name="FocoFiscal" path=":tipo" component={FocoFiscal}	/>
        </Route>
        
        <Route name="Base Certa" path="basecerta" component={BaseCerta} />
        <Route name="SMS" path="sms" component={SMS} />
        <Route name="centro de custo" path="sms/centrocusto" component={CentroCusto} />
        <Route name="respostas" path="sms/respostas" component={Respostas} />
        <Route name="Veiculos" path="veiculos" component={Veiculos} />
        <Route name="Venda+" path="vendamais" component={VendaMais} />
        <Route name="Consig+" path="consigmais" component={ConsigMais} />

        <Route name="Editar" path="editar" component={EditUser}	/>
        <Route name="Chat" path="chat" component={Chat}	/>
      </Route>
    </Route>

  </Route>
);

function requireAuth(nextState, replace) {  
  if (!localStorage.token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}