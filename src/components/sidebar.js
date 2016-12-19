import React, { Component } from "react";
import { Link } from "react-router";


export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabActive: "menu"
    }

  }

  _changeTab(tab) {
    this.setState({
      tabActive: tab
    })

  }

  renderMenu() {
    return (
        <div className={this.state.tabActive == "menu" ? "tab-pane active":"tab-pane"} id="menu">
          <ul className="sidebar-nav" id="sidebar">
            <li><Link to="/">HOME<span className="sub_icon glyphicon glyphicon-link"></span></Link></li>   
            
            <li>Meus Produtos</li>
            <li><Link to="/localize">Localize<span className="sub_icon glyphicon glyphicon-link"></span></Link></li>
            <li><Link to="/">SMS<span className="sub_icon glyphicon glyphicon-link"></span></Link></li>
            
            <li>Outros Produtos</li>
            <li><Link to="/">HOME<span className="sub_icon glyphicon glyphicon-link"></span></Link></li>   
            <li><Link to="/localize">Localize<span className="sub_icon glyphicon glyphicon-link"></span></Link></li>
            <li><Link to="/">SMS<span className="sub_icon glyphicon glyphicon-link"></span></Link></li>
          </ul>
        </div>
    )
  }

  renderChat() {
    return (
        <div className={this.state.tabActive == "chat" ? "tab-pane active":"tab-pane"} id="chat">
          <ul className="sidebar-nav" id="sidebar">
            <li><Link to="/">HOME<span className="sub_icon glyphicon glyphicon-link"></span></Link></li>   
            
            <li>Meus Produtos</li>
          </ul>
        </div>
    )
  }

  renderStats() {
    return (
        <div className={this.state.tabActive == "stats" ? "tab-pane active":"tab-pane"} id="stats">
          <ul className="sidebar-nav" id="sidebar">
            <li>Outros Produtos</li>
            <li><Link to="/">HOME<span className="sub_icon glyphicon glyphicon-link"></span></Link></li>   
          </ul>
        </div>
    )
  }

  render() {
      return (      
          <div id="sidebar-wrapper">
            <ul id="sidebar_menu" className="sidebar-nav">
                <li className="sidebar-brand" onClick={this.props.onMenuClicked}>
                  <div id="menu-toggle">
                    Menu
                    <span id="main_icon" className="glyphicon glyphicon-align-justify">
                    </span>
                  </div>
                </li>
            </ul>

            {this.props.activedMenu ? (
              <div className="nav nav-tabs">
                <li className={this.state.tabActive == "menu" ? "active" : ""} onClick={() => this._changeTab("menu")}>
                  <a href="#menu">
                    H
                  </a>
                </li>

                <li className={this.state.tabActive == "chat" ? "active" : ""} onClick={() => this._changeTab("chat")}>
                  <a href="#chat">
                    B
                  </a>
                </li>

                <li className={this.state.tabActive == "stats" ? "active" : ""} onClick={() => this._changeTab("stats")}>
                  <a href="#stats">
                    C
                  </a>
                </li>
              </div>) : ""}

            <div className="tab-content">
              {this.renderMenu()}
              {this.renderChat()}
              {this.renderStats()}
            </div>
          </div>
      )

  }
}
