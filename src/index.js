import React from 'react'
import ReduxPromise from "redux-promise"
import thunk from "redux-thunk"
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from "react-router"
import { createStore, applyMiddleware, compose } from 'redux'
import { AppContainer } from 'react-hot-loader'

import rootReducer from './reducers'
import routes from "./routes"

//Constants
import { COMPANY_ICON_INVERSE, COMPANY_NAME_LONG } from "./constants/constantsCompany"

document.querySelector("#favicon").href = COMPANY_ICON_INVERSE
document.title = COMPANY_NAME_LONG

const store = createStore(rootReducer, applyMiddleware(thunk))

const renderApp = (Component) => {
  render(
    <Provider store={store}>
      <AppContainer>
          <Router history={browserHistory} routes={routes}/>
      </AppContainer>
    </Provider>,
    document.querySelector('.app'),
  )
}

renderApp(routes)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes', () => { renderApp(newRoutes) })
}
