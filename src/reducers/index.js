import { combineReducers } from 'redux';

import user from "./reducer-user";
import localize from "./reducer-localize";
import credito from "./reducer-credito";
import focofiscal from "./reducer-focofiscal";
import campanhasSMS from "./reducer-sms";
//import chartData from "./reducer-chart-data";
import auth from "./reducer-application";
import cadastro from "./reducer-cadastro";
import veiculos from "./reducer-veiculos";
import vendamais from "./reducer-vendamais";
import basecerta from "./reducer-basecerta";
import creditomix from "./creditomix/reducer-creditomix";

const rootReducer = combineReducers({
  localize,
  credito,
  creditomix,
  focofiscal,
  user,
  campanhasSMS: campanhasSMS,
  centroCustoSMS: campanhasSMS,
  respostasSMS: campanhasSMS,
  auth,
  cadastro,
  veiculos,
  vendamais,
  basecerta
});

export default rootReducer;
