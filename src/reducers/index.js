import { combineReducers } from 'redux';

import User from "./reducer-user";
import LocalizeData from "./reducer-localize";
import CreditoData from "./reducer-credito";
import FocoFiscalData from "./reducer-focofiscal";
import campanhasSMS from "./reducer-sms";
import ChartData from "./reducer-chart-data";
import auth from "./reducer-application";
import cadastro from "./reducer-cadastro";
import veiculos from "./reducer-veiculos";
import vendamais from "./reducer-vendamais";
import basecerta from "./reducer-basecerta";
import consigmais from "./reducer-consigmais";

const rootReducer = combineReducers({
  localize: LocalizeData,
  credito: CreditoData,
  focofiscal: FocoFiscalData,
  user: User,
  chartData: ChartData,
  campanhasSMS: campanhasSMS,
  centroCustoSMS: campanhasSMS,
  respostasSMS: campanhasSMS,
  auth,
  cadastro,
  veiculos,
  vendamais,
  basecerta,
  consigmais
});

export default rootReducer;
