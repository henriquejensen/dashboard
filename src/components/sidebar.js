import React, { Component } from "react";
import { Link } from "react-router";


export default class Sidebar extends Component {
  constructor(props) {
    super(props);

  }

  render() {
      return (      
          <div id="sidebar-wrapper">
            <ul id="sidebar_menu" className="sidebar-nav">
                <li className="sidebar-brand" onClick={this.props.onMenuClicked}>
                  <a id="menu-toggle" href="#">
                    Menu
                    <span id="main_icon" className="glyphicon glyphicon-align-justify">
                    </span>
                  </a>
                </li>
            </ul>
            <ul className="sidebar-nav" id="sidebar">     
              <li><a href="/localize">Localize<span className="sub_icon glyphicon glyphicon-link"></span></a></li>
              <li><a>SMS<span className="sub_icon glyphicon glyphicon-link"></span></a></li>
            </ul>
          </div>
      )

  }
}
