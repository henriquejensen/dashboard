import React, { Component } from "react";
import { browserHistory } from "react-router";
import Breadcrumbs from "react-breadcrumbs";
import { Col, Jumbotron } from "react-bootstrap";

import Header from "./header";
import Sidebar from "./sidebar";

import { IMAGE_ANY_TOKEN } from "../constants/utils";

export default class App extends Component {
  state = {
    active: screen.width > 768 ? true : false
  }

	onMenuClicked = () => {
    this.setState({
      active: !this.state.active
    })
  }

  render() {
      if(!localStorage.getItem("token")) {
        return (
          <Jumbotron className="text-center">
            <img src={IMAGE_ANY_TOKEN} style={{width:"200px"}} />
            <h1>Você não está logado! :/</h1>
            <p>Faça o login para ter acesso aos produtos</p>
            <p><a href="/">Login</a></p>
          </Jumbotron>
        )
      }
      return (
        <div>
            <Header onMenuClicked={this.onMenuClicked} className="noPrint" />
            <div className="sidebar noPrint" id={this.state.active ? {} : "menu-closed"}>
              <Sidebar onMenuClicked={this.onMenuClicked} activedMenu={this.state.active}/>
            </div>

            <div className="container-fluid main" id={this.state.active ? "menu-opened" : {}}>
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
