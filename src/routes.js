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
import Monitora from "./containers/monitora/MonitoraController"

import Contador from "./containers/utils/Contador"

import Consumo from "./containers/relatorios/Consumo"
import Relatorios from "./containers/relatorios/Relatorios"
import Cadastro from "./containers/cadastro/Cadastro"

import todosProdutos from "./components/utils/common/produtos"

export default (
  <Route>
    <Route path='/login' component={Login} />
    <Route path='/senha' component={ChangePassword} />
    <Route path='/novasenha' component={ResetPassword} />
    <Route path='/adeusmineiro' component={Contador} />

    <Route component={App}>
      <Route name="Localize" path="/" component={Localize}	/>

      <Route name="Localize" path={todosProdutos.LOCALIZE.link} component={Localize} />

      <Route name="Crédito" path={todosProdutos.CREDITO.link} component={Credito} />

      <Route name="CréditoMix" path={todosProdutos.CREDITOMIX.link} component={CreditoMix} />

      <Route name="Foco Fiscal" path={todosProdutos.FOCOFISCAL.link} component={FocoFiscal} />
      
      <Route path={todosProdutos.BASECERTA.link} component={BaseCertaController} >
        <IndexRoute component={BaseCerta} />
        <Route name="NovoEnriquecimento" path="novoenriquecimento" component={NovoEnriquecimento} />
      </Route>

      <Route path={todosProdutos.SMS.link} component={SMS} >
        <IndexRoute component={MonitorEnvios} />
        <Route name="EnvioRapido" path="enviorapido" component={EnvioSMS} />
        <Route name="Respostas" path="respostas" component={Respostas} />
      </Route>

      <Route name="Veiculos" path={todosProdutos.VEICULOS.link} component={Veiculos} />

      <Route name="Monitora" path={todosProdutos.MONITORA.link} component={Monitora} />

      <Route name="Relatórios" path="relatorios" component={Relatorios} />
      <Route name="Consumo" path="consumo" component={Consumo} />

      <Route name="Cadastro" path="cadastro" component={Cadastro}	/>
      <Route name="Editar" path="editar" component={EditUser}	/>
      <Route name="Contato" path="contato" component={Contato}	/>

    </Route>

    <Route name="Erro" path="*" component={Login} />

  </Route>
)