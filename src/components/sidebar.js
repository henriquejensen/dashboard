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
            <li><Link to="/dashboard">HOME<span className="sub_icon glyphicon glyphicon-home"></span></Link></li>   
            
            <li>Meus Produtos</li>
            <li><Link to="/dashboard/localize">Localize<span className="sub_icon glyphicon glyphicon-screenshot"></span></Link></li>
            <li><Link to="/dashboard/sms">SMS<span className="sub_icon glyphicon glyphicon-envelope"></span></Link></li>
            <li><Link to="/dashboard/basecerta">Base Certa<span className="sub_icon glyphicon glyphicon-hdd"></span></Link></li>
            <li><Link to="/dashboard/credito">Crédito<span className="sub_icon glyphicon glyphicon-bed"></span></Link></li>
            
            <li>Outros Produtos</li>
            <li><Link to="/dashboard">Foco Fiscal<span className="sub_icon glyphicon glyphicon-tag"></span></Link></li>   
            <li><Link to="/dashboard">Venda+<span className="sub_icon glyphicon glyphicon-lock"></span></Link></li>
            <li><Link to="/dashboard">Veículos<span className="sub_icon glyphicon glyphicon-credit-card"></span></Link></li>
            <li><Link to="/dashboard">Consig+<span className="sub_icon glyphicon glyphicon-barcode"></span></Link></li>
            <li><Link to="/dashboard">CRM<span className="sub_icon glyphicon glyphicon-folder-open"></span></Link></li>
          </ul>
        </div>
    )
  }

  renderChat() {
    return (
        <div className={this.state.tabActive == "chat" ? "tab-pane active":"tab-pane"} id="chat">
          <ul className="sidebar-nav" id="sidebar">
            <li>Online</li>
            <li><Link to="/dashboard/chat" params={{teste: "testando"}}>Jessica<span className="sub_icon glyphicon glyphicon-user"></span></Link></li>
            <li><Link to="/dashboard/chat">Roberta<span className="sub_icon glyphicon glyphicon-user"></span></Link></li>
            <li><Link to="/dashboard/chat">Nayara<span className="sub_icon glyphicon glyphicon-user"></span></Link></li>
            
            <li>Offline</li>
            <li><Link to="/dashboard/chat">Bruna<span className="sub_icon glyphicon glyphicon-user"></span></Link></li>
          </ul>
        </div>
    )
  }

  renderStats() {
    return (
        <div className={this.state.tabActive == "stats" ? "tab-pane active":"tab-pane"} id="stats">
          <ul className="sidebar-nav" id="sidebar">
            <li>Outros Produtos</li>
            <li><Link to="/dashboard">HOME<span className="sub_icon glyphicon glyphicon-link"></span></Link></li>   
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
                  <a href="#menu" style={{backgroundColor: "rgb(91, 52, 148)"}}>
                    <i className="glyphicon glyphicon-picture" />
                  </a>
                </li>

                <li className={this.state.tabActive == "chat" ? "active" : ""} onClick={() => this._changeTab("chat")}>
                  <a href="#chat" style={{backgroundColor: "rgb(91, 52, 148)"}}>
                    <i className="glyphicon glyphicon-comment" />
                  </a>
                </li>

                <li className={this.state.tabActive == "stats" ? "active" : ""} onClick={() => this._changeTab("stats")}>
                  <a href="#stats" style={{backgroundColor: "rgb(91, 52, 148)"}}>
                    <i className="glyphicon glyphicon-equalizer" />
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
