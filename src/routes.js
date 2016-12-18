import React from 'react';
import { Route, IndexRoute } from "react-router";

import App from "./components/app";
import Localize from "./containers/localize/Localize";

export default (
  <Route path="/" component={App} >
  	<Route path="localize" component={Localize}	/>
  </Route>
);
