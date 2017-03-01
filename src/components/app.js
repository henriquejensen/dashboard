import React, { Component } from "react";
import { browserHistory } from "react-router";
import Breadcrumbs from "react-breadcrumbs";
import { Col, Jumbotron } from "react-bootstrap";

import Header from "./header";
import Sidebar from "./sidebar";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true
    }

    this.larguraMenu = {
      marginLeft:"200px"
    };

    this.larguraMenuFechado = {
      marginLeft:"-150px"
    };

    this.onMenuClicked = this.onMenuClicked.bind(this);
  }

	onMenuClicked() {
    this.setState({
      active: !this.state.active
    })
  }

  render() {
      if(!localStorage.getItem("token")) {
        return (
          <Jumbotron className="text-center">
            <h1>Você não está logado! :/</h1>
            <p>Faça o login para ter acesso aos produtos</p>
            <p><a href="/">Login</a></p>
          </Jumbotron>
        )
      }
      return (
        <div>
            <Header onMenuClicked={this.onMenuClicked} className="noPrint" />
            <div className="sidebar noPrint" style={this.state.active ? {} : this.larguraMenuFechado}>
              <Sidebar onMenuClicked={this.onMenuClicked} activedMenu={this.state.active}/>
            </div>

            <div className="container-fluid main" style={this.state.active ? this.larguraMenu : {}}>
                <Breadcrumbs
                  className="noPrint"
                  routes={this.props.routes}
                  params={this.props.params}
                />
                {this.props.children}
            </div>
        </div>


      )
  }
}
