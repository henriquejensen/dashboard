import React, { Component } from "react";
import { Link } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { changeColorMenu, changeProductType } from "../actions/actionsCommon";

import menu from "./utils/common/menu.json";
import CardInfoMenuUser from "./utils/CardInfoMenuUser";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabActive: "menu",
      menuOpened: ""
    }

    this.onClickMenu = this.onClickMenu.bind(this);
  }

  componentDidMount() {
    this.activeMenuDropdown(location.pathname.split("/")[1]);
  }

  _changeTab(tab) {
    this.setState({
      tabActive: tab
    })

  }
  
  activeMenuDropdown(menu) {
    this.setState({
      menuOpened: menu
    })
  }

  onClickMenu(evt, color, product, type ) {
    evt.preventDefault();

    this.props.changeColorMenu(color);
    this.props.changeProductType(product, type)
  }

  renderMenu() {
    return (
        <div className={this.state.tabActive == "menu" ? "tab-pane active":"tab-pane"} id="sidebar">
          <ul className="sidebar-nav">
            {menu.sidebar.map((opt, index) => {
              return (
                <li key={index} onClick={(evt) => {evt.preventDefault();this.props.changeColorMenu(opt.color)}}>
                  <Link to={opt.link} onClick={() => this.activeMenuDropdown(opt.id)} activeStyle={{backgroundColor: "#E7E7E7"}}>
                    {this.props.activedMenu ?
                      <img src={opt.image} className="sub-icon" alt={opt.alt}/>
                    : ""}
                    {opt.label}
                    {!this.props.activedMenu ?
                      <img src={opt.image} className="sub-icon sub-icon-open-menu" alt={opt.alt}/>
                    : ""}
                  </Link>
                  <ul className={this.state.menuOpened == opt.id && this.props.activedMenu ? "sidebar-item-dropdown" : "display-none"}>
                    {opt.subItems.map((subOpt, j) => {
                      return (
                          <li
                            onClick={(evt) => this.onClickMenu(evt, opt.color, opt.id, subOpt.id)}
                            key={j}
                          >
                            <Link to={subOpt.link}>
                              {subOpt.label}
                            </Link>
                          </li>
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
            <li><Link to="/chat" >Jessica<img src="http://media.cargocollective.com/1/0/789/headerimg/profile.png" className="sub-icon sub-icon-open-menu" alt="Icone Localize"/></Link></li>
            <li><Link to="/chat">Roberta<img src="http://media.cargocollective.com/1/0/789/headerimg/profile.png" className="sub-icon sub-icon-open-menu" alt="Icone Localize"/></Link></li>
            <li><Link to="/chat">Nayara<img src="http://media.cargocollective.com/1/0/789/headerimg/profile.png" className="sub-icon sub-icon-open-menu" alt="Icone Localize"/></Link></li>
            
            <li className="sidebar-items">Offline</li>
            <li><Link to="/chat">Bruna<img src="http://media.cargocollective.com/1/0/789/headerimg/profile.png" className="sub-icon sub-icon-open-menu" alt="Icone Localize"/></Link></li>
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
          <aside>            
            {this.props.activedMenu ? (
                  <CardInfoMenuUser color={this.props.color} user={this.props.user}/>
              ) : ""}

              {this.renderMenu()}
          </aside>
      )

  }
}

function mapStateToProps(state) {
	return {
		color: state.auth.colorMenu,
    user: state.user
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
			changeColorMenu,
      changeProductType
		},
		dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);