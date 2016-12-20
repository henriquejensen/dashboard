import { combineReducers } from 'redux';

import User from "./reducer-user";
import LocalizeData from "./reducer-localize";
import ChartData from "./reducer-chart-data";

const rootReducer = combineReducers({
  localize: LocalizeData,
  user: User,
  chartData: ChartData
});

export default rootReducer;
