import React, { Component } from "react";
import { Link } from "react-router";


export default class Sidebar extends Component {
  constructor(props) {
    console.log("construindo Sidebar");
    super(props);

    this.state = {
      tabActive: "menu",

      localizeDropdown: false,
      smsDropdown: false,
      veiculosDropdown: false,
      focoFiscalDropdown: false,
    }
  }

  _changeTab(tab) {
    this.setState({
      tabActive: tab
    })

  }
  
  activeMenuDropdown(menu) {
    console.log("Ativando menu ", menu)
    if(menu == "localize") {
      this.setState({
        localizeDropdown: !this.state.localizeDropdown
      })
    } else if(menu == "sms") {
      this.setState({
        smsDropdown: !this.state.smsDropdown
      })
    } else if(menu == "veiculos") {
      this.setState({
        veiculosDropdown: !this.state.veiculosDropdown
      })
    } else if(menu == "focoFiscal") {
      this.setState({
        focoFiscalDropdown: !this.state.focoFiscalDropdown
      })
    }
    
  }

  renderMenu() {
    return (
        <div className={this.state.tabActive == "menu" ? "tab-pane active":"tab-pane"} id="sidebar">
          <ul className="sidebar-nav">
            <li><Link to="/dashboard">Dashboard<img src="../public/assertiva/icon-localize.png" className="sub_icon" alt="Página inicial"/></Link></li>   
            
            <li className="sidebar-items">Meus Produtos</li>

            <li onClick={() => this.activeMenuDropdown("localize")}>
              <Link >Localize<img src="../public/assertiva/icon-localize.png" className="sub_icon" alt="Icone Localize"/></Link>
              <ul className={this.state.localizeDropdown ? "sidebar-item-dropdown" : "display-none"}>
                <Link to="/dashboard/localize"><li>CPF</li></Link>
                <Link to="/dashboard/localize"><li>CNPJ</li></Link>
                <Link to="/dashboard/localize"><li>Telefone</li></Link>
                <Link to="/dashboard/localize"><li>Nome</li></Link>
                <Link to="/dashboard/localize"><li>Endereço</li></Link>
              </ul>
            </li>

            <li onClick={() => this.activeMenuDropdown("sms")}>
              <Link >SMS<img src="../public/assertiva/icon-sms.png" className="sub_icon" alt="Icone SMS"/></Link>
              <ul className={this.state.smsDropdown ? "sidebar-item-dropdown" : "display-none"}>
                <Link to="/dashboard/sms"><li>Envio de SMS</li></Link>
                <Link to="/dashboard/sms"><li>Centro de Custo</li></Link>
                <Link to="/dashboard/sms"><li>Respostas</li></Link>
                <Link to="/dashboard/sms"><li>Relatório</li></Link>
              </ul>
            </li>

            <li ><Link to="/dashboard/basecerta">Base Certa<img src="../public/assertiva/icon-basecerta.png" className="sub_icon" alt="Icone Base Certas"/></Link></li>

            <li ><Link to="/dashboard/credito">Crédito<img src="../public/assertiva/icon-credito.png" className="sub_icon" alt="Icone Crédito"/></Link></li>

            <li ><Link to="/dashboard/vendamais">Venda+<img src="../public/assertiva/icon-vendamais.png" className="sub_icon" alt="Icone Venda+"/></Link></li>

            <li onClick={() => this.activeMenuDropdown("veiculos")}>
              <Link>Veículos<img src="../public/assertiva/icon-veiculos.png" className="sub_icon" alt="Icone Veiculos"/></Link>
              <ul className={this.state.veiculosDropdown ? "sidebar-item-dropdown" : "display-none"}>
                <Link to="/dashboard/veiculos"><li>Agregados</li></Link>
                <Link to="/dashboard/veiculos"><li>BDV Estadual</li></Link>
                <Link to="/dashboard/veiculos"><li>Decodificador</li></Link>
                <Link to="/dashboard/veiculos"><li>Localização</li></Link>
                <Link to="/dashboard/veiculos"><li>Proprietários</li></Link>
                <Link to="/dashboard/veiculos"><li>Leilão</li></Link>
                <Link to="/dashboard/veiculos"><li>Sinistro</li></Link>
              </ul>
            </li>  
            
            <li className="sidebar-items">Outros Produtos</li>
            <li onClick={() => this.activeMenuDropdown("focoFiscal")}>
              <Link >Foco Fiscal<img src="../public/assertiva/icon-focofiscal.png" className="sub_icon" alt="Icone Foco Fiscal"/></Link>
              <ul className={this.state.focoFiscalDropdown ? "sidebar-item-dropdown" : "display-none"}>
                <Link to="/dashboard/focofiscal"><li>Receita PF</li></Link>
                <Link to="/dashboard/focofiscal"><li>Receita PJ</li></Link>
                <Link to="/dashboard/focofiscal"><li>Receita PJ Sintegra</li></Link>
                <Link to="/dashboard/focofiscal"><li>Sintegra Unificada</li></Link>
                <Link to="/dashboard/focofiscal"><li>Simples Nacional</li></Link>
              </ul>
            </li>   
            <li ><Link to="/dashboard/consigmais">Consig+<img src="../public/assertiva/icon-consigmais.png" className="sub_icon" alt="Icone Consig+"/></Link></li>
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
