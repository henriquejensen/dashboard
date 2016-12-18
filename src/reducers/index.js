import { combineReducers } from 'redux';

import LocalizeData from "./reducer-localize";

const rootReducer = combineReducers({
  localize: LocalizeData
});

export default rootReducer;
