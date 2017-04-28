import React, { Component } from "react";
import { browserHistory } from "react-router";
import Breadcrumbs from "react-breadcrumbs";
import { Col } from "react-bootstrap";

import Header from "./header";
import Sidebar from "./sidebar";
import Login from "./Login";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { LOG_OUT } from "../constants/utils";

class App extends Component {
  state = {
    active: screen.width > 768 ? true : false
  }

	onMenuClicked = () => {
    this.setState({
      active: !this.state.active
    })
  }

  render() {
      let logado = this.props.logado;
      let active = this.state.active;
      let message = this.props.message;
      if(!logado) {
        if(message == LOG_OUT)
          location.reload();
        else
          return (
            <Login />
          )
      }
      return (        
        <div>
            <Header onMenuClicked={this.onMenuClicked} className="noPrint" />
            <div className="sidebar noPrint" id={active ? {} : "menu-closed"}>
              <Sidebar onMenuClicked={this.onMenuClicked} activedMenu={active}/>
            </div>

            <div className="container-fluid main" id={active ? "menu-opened" : {}}>
                <Breadcrumbs
                  routes={this.props.routes}
                  params={this.props.params}
                />
                {this.props.children}
            </div>
        </div>
      )
  }
}

function mapStateToProps(state) {
	return {
		logado: state.auth.logado,
    message: state.auth.msgn
	}
}

export default connect(mapStateToProps)(App);
