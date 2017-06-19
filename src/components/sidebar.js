import "./sidebar.css";

import React, { Component } from "react";
import { Link } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { changeColorMenu, changeProductType } from "../actions/actionsCommon";

import { todosProdutos } from "./utils/common/produtos.js";
import CardInfoMenuUser from "./utils/CardInfoMenuUser";

import { COMPANY_LOGO_INVERSE, COMPANY_MAIN_COLOR, COMPANY_NAME_SHORT, COMPANY_ICON } from "../constants/constantsCompany";

class Sidebar extends Component {
  state = {
    menuOpened: "",
    subItemActived: ""
  }

  patternProdutosName = (produtos) => {
    return produtos.map((produto) => {
      let prod = produto.replace(/\+/g,"MAIS") // VENDA+ -> VENDAMAIS
      prod = prod.replace(/[^a-zA-Z]/g,"") // BASE CERTA -> BASECERTA
      
      return prod
    })
  }

  componentDidMount() {
    /**Verifica qual a url (portal/produto) e deixa o produto aberto */
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
    this.props.changeProductType(product, type);

    this.setState({
      subItemActived: product + type
    })
  }

  renderMenu() {
    let produtosCliente = this.props.produtosCliente ? this.patternProdutosName(this.props.produtosCliente) : [];
    let keysProdutos = Object.keys(todosProdutos); // retira os nomes dos produtos do objeto, ex: [Localize, Credito]
    let handleChangeColor = this.props.changeColorMenu;
    let menuOpened = this.state.menuOpened;
    let activedMenu = this.props.activedMenu; // se false o sidebar esta contraido(default para mobile)
    return (
        <div id="sidebar">
          <ul className="sidebar-nav">

            { keysProdutos.map((produto, index) => {
              if(produtosCliente.indexOf(produto) >= 0) {
                let opt = todosProdutos[produto];
                return (
                  <li key={index} onClick={() => {handleChangeColor(opt.color)}}>
                      <Link
                        to={opt.link}
                        onClick={() => this.activeMenuDropdown(opt.id)}
                        activeStyle={{backgroundColor: opt.color}}
                      >
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
                                style={this.state.subItemActived === (opt.id + subOpt.id) ? {backgroundColor: "rgba(255,255,255,0.3)"} : {}}
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
          <div>
            <div style={{backgroundColor: COMPANY_MAIN_COLOR}} id={this.props.activedMenu ? "menu-image-logo" : "menu-image-icon"} >
						  <img src={ this.props.activedMenu ? COMPANY_LOGO_INVERSE : COMPANY_ICON } alt={"Logo da "+COMPANY_NAME_SHORT} />
            </div>

            {this.props.activedMenu ? (
                  <CardInfoMenuUser color="#673ab7" user={this.props.user}/>
              ) : ""}

              {this.renderMenu()}
          </div>
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