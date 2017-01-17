import React, { Component } from "react";
import { Link } from "react-router";

import menu from "./menu/menu.json";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabActive: "menu",
      menuOpened: []
    }
  }

  componentDidMount() {
    this.activeMenuDropdown(location.pathname.split("/")[1])
  }

  _changeTab(tab) {
    this.setState({
      tabActive: tab
    })

  }
  
  activeMenuDropdown(menu) {
    let newMenuOpened = this.state.menuOpened.concat();

    if(newMenuOpened.includes(menu)) {
      newMenuOpened.splice(newMenuOpened.indexOf(menu), 1);
    } else {
      newMenuOpened.push(menu);
    }
    
    this.setState({
      menuOpened: newMenuOpened
    })
    
  }

  renderMenu() {
    return (
        <div className={this.state.tabActive == "menu" ? "tab-pane active":"tab-pane"} id="sidebar">
          <ul className="sidebar-nav">
            <li className="sidebar-items">Meus Produtos</li>

            {menu.options.map((opt, index) => {
              return (
                <li key={index}>
                  <Link to={opt.link} onClick={() => this.activeMenuDropdown(opt.label.toLowerCase())}>
                    {opt.label}
                    <img src={opt.image} className="sub_icon" alt={opt.alt}/>
                  </Link>
                  <ul className={this.state.menuOpened.includes(opt.label.toLowerCase()) ? "sidebar-item-dropdown" : "display-none"}>
                    {opt.subItems.map((subOpt, j) => {
                      return (
                        <Link to={subOpt.link} key={j} activeStyle={{ color: 'black', backgroundColor: "#edecec", fontWeight: "bold" }}>
                          <li>{subOpt.label}</li>
                        </Link>
                      )
                    })}                    
                  </ul>
                </li> 
              )
            })}
                          
          </ul>
        </div>
    )
  }

  renderChat() {
    return (
        <div className={this.state.tabActive == "chat" ? "tab-pane active":"tab-pane"} id="sidebar">
          <ul className="sidebar-nav">
            <li className="sidebar-items">Online</li>
            <li><Link to="/dashboard/chat" >Jessica<img src="http://media.cargocollective.com/1/0/789/headerimg/profile.png" className="sub_icon" alt="Icone Localize"/></Link></li>
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
