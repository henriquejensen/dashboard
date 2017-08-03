import { combineReducers } from 'redux'

import user from "./reducer-user"
import localize from "./reducer-localize"
import credito from "./reducer-credito"
import focofiscal from "./reducer-focofiscal"
import sms from "./reducer-sms"
//import chartData from "./reducer-chart-data"
import auth from "./reducer-application"
import cadastro from "./reducer-cadastro"
import relatorios from "./reducer-relatorios"
import veiculos from "./reducer-veiculos"
import vendamais from "./reducer-vendamais"
import basecerta from "./reducer-basecerta"
import monitora from "./reducer-monitora"
import creditomix from "./creditomix/reducer-creditomix"
import creditomais from "./creditomais/reducer-creditomais"

const rootReducer = combineReducers({
  localize,
  credito,
  creditomix,
  creditomais,
  focofiscal,
  user,
  monitora,
  sms,
  auth,
  cadastro,
  relatorios,
  veiculos,
  vendamais,
  basecerta
})

export default rootReducer
