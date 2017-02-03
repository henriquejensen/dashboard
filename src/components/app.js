import React, { Component } from "react";
import Breadcrumbs from "react-breadcrumbs";

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
      return (
        <div>
            <Header onMenuClicked={this.onMenuClicked} />
            <div className="sidebar" style={this.state.active ? {} : this.larguraMenuFechado}>
              <Sidebar onMenuClicked={this.onMenuClicked} activedMenu={this.state.active}/>
            </div>

            <div className="container-fluid main" style={this.state.active ? this.larguraMenu : {}}>
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
