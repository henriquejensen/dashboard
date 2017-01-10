import { combineReducers } from 'redux';

import User from "./reducer-user";
import LocalizeData from "./reducer-localize";
import campanhasSMS from "./reducer-sms";
import ChartData from "./reducer-chart-data";
import auth from "./reducer-application";
import estados from "./reducer-states";

const rootReducer = combineReducers({
  localize: LocalizeData,
  user: User,
  chartData: ChartData,
  campanhasSMS: campanhasSMS,
  centroCustoSMS: campanhasSMS,
  respostasSMS: campanhasSMS,
  auth,
  estados
});

export default rootReducer;
