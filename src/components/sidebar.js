import "./sidebar.css";

import React, { Component } from "react";
import { Link } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { changeColorMenu, changeProductType } from "../actions/actionsCommon";

import produtos from "../utils/produtos.js";
import CardInfoMenuUser from "./utils/CardInfoMenuUser";

import { COMPANY_LOGO_INVERSE, COMPANY_MAIN_COLOR, COMPANY_NAME_SHORT, COMPANY_ICON_INVERSE, COMPANY_LOGO_STYLE } from "../constants/constantsCompany";

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
    evt.preventDefault()
    this.props.changeColorMenu(color)
    this.props.changeProductType(product, type)

    this.setState({
      subItemActived: product + type
    })
  }

  renderMenu() {
    let produtosCliente = this.props.produtosCliente ? this.patternProdutosName(this.props.produtosCliente) : []
    let keysProdutos = Object.keys(produtos) // retira os nomes dos produtos do objeto, ex: [Localize, Credito]
    let handleChangeColor = this.props.changeColorMenu
    let menuOpened = this.state.menuOpened
    let activedMenu = this.props.activedMenu // se false o sidebar esta contraido(default para mobile)
    const {consultasAtivas} = this.props.user
    return (
        <div id="sidebar">
          <ul className="sidebar-nav">
            {consultasAtivas ? keysProdutos.map((key, index) => {
              if(consultasAtivas[key]) {
                const produto = produtos[key]
                const consultaAtiva = consultasAtivas[key]
                                  
                return (
                  <li key={index} onClick={() => {handleChangeColor(produto.color)}}>
                      <Link
                        to={produto.link}
                        onClick={() => this.activeMenuDropdown(produto.id)}
                        activeStyle={{backgroundColor: produto.color}}
                      >
                        {activedMenu ?
                          <img src={menuOpened == produto.id ? produto.imageNegative : produto.image} className="sub-icon" alt={produto.alt}/>
                        : ""}

                        {produto.label}

                        {!activedMenu ?
                          <img
                            src={produto.image}
                            className="sub-icon sub-icon-open-menu"
                            alt={produto.alt}/>
                        : ""}
                      </Link>

                      {menuOpened == produto.id && activedMenu && consultaAtiva ?
                        <ul className="sidebar-item-dropdown" style={{backgroundColor:produto.colorLight}}>
                          {produto.consultas.map((consulta, j) => {
                            const modulo = consultaAtiva[consulta.modulo] ? consulta.modulo : consulta.modulo2
                            if(consultaAtiva[modulo])
                              return (
                                  <li
                                    onClick={(evt) => this.onClickMenu(evt, produto.color, produto.id, modulo)}
                                    style={this.state.subItemActived === (produto.id + modulo) ? {backgroundColor: "rgba(255,255,255,0.3)"} : {}}
                                    key={j}
                                  >
                                    <Link to={consulta.link}>
                                      {consultaAtiva[modulo].labelFront}
                                    </Link>
                                  </li>
                              )
                          })}                    
                        </ul>
                      : ""}
                  </li>
                )
              }
            }) : ""}
          </ul>
        </div>
    )
  }

  render() {
      const { activedMenu, user } = this.props
      return (      
          <div>
            <div style={{backgroundColor: COMPANY_MAIN_COLOR}} id={this.props.activedMenu ? "menu-image-logo" : "menu-image-icon"} >
						  <img
                src={ activedMenu ? COMPANY_LOGO_INVERSE : COMPANY_ICON_INVERSE }
                alt={"Logo da "+COMPANY_NAME_SHORT}
                style={activedMenu ? COMPANY_LOGO_STYLE : {}}
              />
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