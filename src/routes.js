import React from 'react'
import { Route, IndexRoute } from "react-router"

import { URL_LOGIN } from "./constants/constantsCompany"
import { AUTHENTICATION } from "./constants/utils"

import App from "./components/app"
import Login from "./components/Login"
import ChangePassword from "./containers/utils/ChangePasswordController"
import ResetPassword from "./components/ResetPassword"

import EditUser from "./containers/user/EditUser"
import Contato from "./containers/contato"

import Localize from "./containers/localize/LocalizeController"
import Dashboard from "./containers/dashboard/Dashboard"
import Chat from "./containers/chat/Chat"

// SMS
import SMS from "./containers/sms/SMSController"
import MonitorEnvios from "./containers/sms/MonitorEnvios"
import EnvioSMS from "./containers/sms/EnvioSMS"
import CentroCusto from "./containers/sms/CentroCusto"
import Respostas from "./containers/sms/Respostas"

import BaseCertaController from "./containers/basecerta/BaseCertaController"
import BaseCerta from "./containers/basecerta/BaseCerta"
import NovoEnriquecimento from "./containers/basecerta/NovoEnriquecimento"
import Credito from "./containers/credito/CreditoController"
import CreditoMix from "./containers/creditomix/CreditoMixController"
import Veiculos from "./containers/veiculos/VeiculosController"
import FocoFiscal from "./containers/focofiscal/FocoFiscalController"

import Consumo from "./containers/relatorios/Consumo"
import Relatorios from "./containers/relatorios/Relatorios"
import Cadastro from "./containers/cadastro/Cadastro"

export default (
  <Route>
    <Route path='/login' component={Login} />
    <Route path='/senha' component={ChangePassword} />
    <Route path='/novasenha' component={ResetPassword} />

    <Route component={App}>
      <Route name="Localize" path="/" component={Localize}	/>

      <Route name="Localize" path="localize" component={Localize} />

      <Route name="Crédito" path="credito" component={Credito} />

      <Route name="CréditoMix" path="creditomix" component={CreditoMix} />

      <Route name="Foco Fiscal" path="focofiscal" component={FocoFiscal} />
      
      <Route path="basecerta" component={BaseCertaController} >
        <IndexRoute component={BaseCerta} />
        <Route name="NovoEnriquecimento" path="novoenriquecimento" component={NovoEnriquecimento} />
      </Route>

      <Route path="sms" component={SMS} >
        <IndexRoute component={MonitorEnvios} />
        <Route name="EnvioRapido" path="enviorapido" component={EnvioSMS} />
        <Route name="Respostas" path="respostas" component={Respostas} />
      </Route>

      <Route name="Veiculos" path="veiculos" component={Veiculos} />


      <Route name="Relatórios" path="relatorios" component={Relatorios} />
      <Route name="Consumo" path="consumo" component={Consumo} />

      <Route name="Editar" path="editar" component={EditUser}	/>
      <Route name="Contato" path="contato" component={Contato}	/>

      <Route name="Chat" path="chat" component={Chat}	/>
    </Route>

    <Route name="Erro" path="*" component={Login} />

  </Route>
)