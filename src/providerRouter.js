import React from 'react';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, browserHistory} from "react-router";
import rootReducer from './reducers';
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

export const Root = props => {
  return (
    <Provider store={store}>
        <Router history={browserHistory} routes={props.routes}/>
    </Provider>
  )
}
