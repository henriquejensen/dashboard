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
        <div className={this.state.tabActive == "menu" ? "tab-pane active":"tab-pane"} id="sidebar">
          <ul className="sidebar-nav">
            <li><Link to="/dashboard">Dashboard<img src="http://noriskinvestor.com/images/stories/Icon-House-150x150.png" className="sub_icon" alt="Icone Localize"/></Link></li>   
            
            <li className="sidebar-items">Meus Produtos</li>
            <li ><Link to="/dashboard/localize">Localize<img src="../public/assertiva/icon-localize.png" className="sub_icon" alt="Icone Localize"/></Link></li>
            <li ><Link to="/dashboard/sms">SMS<img src="../public/assertiva/icon-sms.png" className="sub_icon" alt="Icone SMS"/></Link></li>
            <li ><Link to="/dashboard/basecerta">Base Certa<img src="../public/assertiva/icon-basecerta.png" className="sub_icon" alt="Icone Base Certas"/></Link></li>
            <li ><Link to="/dashboard/credito">Crédito<img src="../public/assertiva/icon-credito.png" className="sub_icon" alt="Icone Crédito"/></Link></li>
            
            <li className="sidebar-items">Outros Produtos</li>
            <li ><Link to="/dashboard">Foco Fiscal<img src="../public/assertiva/icon-localize.png" className="sub_icon" alt="Icone Localize"/></Link></li>   
            <li ><Link to="/dashboard">Venda+<img src="../public/assertiva/icon-localize.png" className="sub_icon" alt="Icone Localize"/></Link></li>
            <li ><Link to="/dashboard">Veículos<img src="../public/assertiva/icon-localize.png" className="sub_icon" alt="Icone Localize"/></Link></li>
            <li ><Link to="/dashboard">Consig+<img src="../public/assertiva/icon-localize.png" className="sub_icon" alt="Icone Localize"/></Link></li>
          </ul>
        </div>
    )
  }

  renderChat() {
    return (
        <div className={this.state.tabActive == "chat" ? "tab-pane active":"tab-pane"} id="sidebar">
          <ul className="sidebar-nav">
            <li className="sidebar-items">Online</li>
            <li><Link to="/dashboard/chat" params={{teste: "testando"}}>Jessica<img src="http://media.cargocollective.com/1/0/789/headerimg/profile.png" className="sub_icon" alt="Icone Localize"/></Link></li>
            <li><Link to="/dashboard/chat">Roberta<img src="http://media.cargocollective.com/1/0/789/headerimg/profile.png" className="sub_icon" alt="Icone Localize"/></Link></li>
            <li><Link to="/dashboard/chat">Nayara<img src="http://media.cargocollective.com/1/0/789/headerimg/profile.png" className="sub_icon" alt="Icone Localize"/></Link></li>
            
            <li className="sidebar-items">Offline</li>
            <li><Link to="/dashboard/chat">Bruna<img src="http://media.cargocollective.com/1/0/789/headerimg/profile.png" className="sub_icon" alt="Icone Localize"/></Link></li>
          </ul>
        </div>
    )
  }

  renderStats() {
    return (
        <div className={this.state.tabActive == "stats" ? "tab-pane active":"tab-pane"} id="sidebar">
          <ul className="sidebar-nav">
            <li className="sidebar-items">Gráficos</li>
            <li><Link to="/dashboard">Dashboard<span className="sub_icon glyphicon glyphicon-link"></span></Link></li>   
          </ul>
        </div>
    )
  }

  render() {
      return (      
          <div id="sidebar-wrapper">
            <ul id="sidebar_menu" className="sidebar-nav">
                <li className="sidebar-brand" onClick={this.props.onMenuClicked}>
                  <div>
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
                    <i className="glyphicon glyphicon-picture" />
                  </a>
                </li>

                <li className={this.state.tabActive == "chat" ? "active" : ""} onClick={() => this._changeTab("chat")}>
                  <a href="#chat">
                    <i className="glyphicon glyphicon-comment" />
                  </a>
                </li>

                <li className={this.state.tabActive == "stats" ? "active" : ""} onClick={() => this._changeTab("stats")}>
                  <a href="#stats">
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
