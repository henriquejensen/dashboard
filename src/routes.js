import React from 'react';
import { Route, IndexRoute } from "react-router";

import App from "./components/app";
import Localize from "./containers/localize/Localize";
import Dashboard from "./containers/dashboard/Dashboard";

export default (
  <Route path="/" component={App} >
  	<IndexRoute component={Dashboard} />
  	<Route path="localize" component={Localize}	/>
  </Route>
);
