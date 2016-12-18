import React, { Component } from "react";

import Header from "./header";
import Sidebar from "./sidebar";

export default class App extends Component {
  constructor(props) {
    super(props);

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

	          <Sidebar onMenuClicked={this.onMenuClicked}/>

	          <div id="page-content-wrapper">
	          	<div className="page-content inset">
	          		{this.props.children}
	          	</div>
	          </div>
	        </div>
        </div>
      )
  }
}
