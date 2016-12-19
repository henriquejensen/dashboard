import { combineReducers } from 'redux';

import User from "./reducer-user";
import LocalizeData from "./reducer-localize";

const rootReducer = combineReducers({
  localize: LocalizeData,
  user: User
});

export default rootReducer;
