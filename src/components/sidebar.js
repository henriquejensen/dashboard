import React, { Component } from "react";
import { Link } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { changeColorMenu, changeProductType } from "../actions/actionsCommon";

import { todosProdutos } from "./utils/common/produtos.js";
import CardInfoMenuUser from "./utils/CardInfoMenuUser";

class Sidebar extends Component {
  state = {
    menuOpened: ""
  }

  componentDidMount() {
    this.activeMenuDropdown(location.pathname.split("/")[1]);
  }
  
  activeMenuDropdown = (menu) => {
    this.setState({
      menuOpened: this.state.menuOpened == menu ? "" : menu
    })
  }

  onClickMenu = (evt, color, product, type ) => {
    evt.preventDefault();

    this.props.changeColorMenu(color);
    this.props.changeProductType(product, type)
  }

  renderMenu() {
    let produtos = this.props.produtosCliente ? this.props.produtosCliente : [];
    let handleChangeColor = this.props.changeColorMenu;
    let menuOpened = this.state.menuOpened;
    let activedMenu = this.props.activedMenu; //se false o sidebar esta contraido(default para mobile)
    return (
        <div id="sidebar">
          <ul className="sidebar-nav">
            {produtos.map((produto, index) => {
              produto = produto.replace(/\+/g,"MAIS"); //ex: VENDA+ -> VENDAMAIS
              produto = produto.replace(/[^a-zA-Z]/g,""); //ex: BASE CERTA -> BASECERTA
              let opt = todosProdutos[produto];
              if(opt) {
                return (
                  <li key={index} onClick={() => {handleChangeColor(opt.color)}}>
                      <Link
                        to={opt.link}
                        onClick={() => this.activeMenuDropdown(opt.id)}
                        activeStyle={{backgroundColor: opt.color, color:"white"}}>
                        {activedMenu ?
                          <img src={menuOpened == opt.id ? opt.imageNegative : opt.image} className="sub-icon" alt={opt.alt}/>
                        : ""}

                        {opt.label}

                        {!activedMenu ?
                          <img
                            src={opt.image}
                            className="sub-icon sub-icon-open-menu"
                            alt={opt.alt}/>
                        : ""}
                      </Link>

                      <ul className={menuOpened == opt.id && activedMenu ? "sidebar-item-dropdown" : "display-none"}
                      style={{backgroundColor:opt.colorLight}}>
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
              }
            })}
                          
          </ul>
        </div>
    )
  }

  render() {
      return (      
          <aside>            
            {this.props.activedMenu ? (
                  <CardInfoMenuUser color="#673ab7" user={this.props.user}/>
              ) : ""}

              {this.renderMenu()}
          </aside>
      )

  }
}

function mapStateToProps(state) {
	return {
		color: state.auth.colorMenu,
    user: state.user,
    produtosCliente: state.user.mapProdutos
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