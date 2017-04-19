import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import ReduxPromise from "redux-promise";
import {Router, browserHistory} from "react-router";
import rootReducer from './reducers';
import routes from "./routes";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory} routes={routes}/>
</Provider>, document.querySelector('.app'));
