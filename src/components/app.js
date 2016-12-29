import React, { Component } from "react";
import Breadcrumbs from "react-breadcrumbs";

import Header from "./header";
import Sidebar from "./sidebar";

export default class App extends Component {
  constructor(props) {
    super(props);

    console.log(this.props)

    this.state = {
      active: true
    }

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
          <Header />

        	<div id="wrapper" className={this.state.active ?"active":""}>

	          <Sidebar onMenuClicked={this.onMenuClicked} activedMenu={this.state.active}/>

	          <div id="page-content-wrapper">
	          	<div className="page-content inset">
                <Breadcrumbs
                  routes={this.props.routes}
                  params={this.props.params}
                />
	          		{this.props.children}
	          	</div>
	          </div>
	        </div>
        </div>
      )
  }
}
