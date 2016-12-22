import { combineReducers } from 'redux';

import User from "./reducer-user";
import LocalizeData from "./reducer-localize";
import campanhasSMS from "./reducer-sms";
import ChartData from "./reducer-chart-data";

const rootReducer = combineReducers({
  localize: LocalizeData,
  user: User,
  chartData: ChartData,
  campanhasSMS: campanhasSMS
});

export default rootReducer;
