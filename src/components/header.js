import React, { Component } from "react";
import { Link, connect } from "react-router";

import { logoTopo } from "../constants/imagensAssertiva";


class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menuOpened: false
		}

		this.openMenu = this.openMenu.bind(this);
	}

	openMenu() {
		this.setState({
			menuOpened: !this.state.menuOpened
		})
	}

  render() {
      return (
				<div className="navbar navbar-default navbar-fixed-top" role="navigation">
					<div className="menu">	
		        <div className="navbar-header">
		            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
		                <span className="icon-bar"></span>
		                <span className="icon-bar"></span>
		                <span className="icon-bar"></span> 
		            </button>
		            <img src="../public/assertiva/assertiva-top-index.png" alt="Assertiva" height="50"/>
		        </div>
		        <div className="collapse navbar-collapse">
		            <ul className="nav navbar-nav navbar-right">
		                <li className={this.state.menuOpened ? "dropdown open" : "dropdown"} onClick={this.openMenu}>
		                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
		                        <span className="glyphicon glyphicon-user"></span> 
		                        <strong>HENRIQUE.TEIXEIRA</strong>
		                        <span className="glyphicon glyphicon-chevron-down"></span>
		                    </a>
		                    <ul className="dropdown-menu">
		                        <li>
		                            <div className="navbar-login">
		                                <div className="row">
		                                    <div className="col-lg-4">
		                                        <p className="text-center">
		                                            <span className="glyphicon glyphicon-user icon-size"></span>
		                                        </p>
		                                    </div>
		                                    <div className="col-lg-8">
		                                        <p className="text-left"><strong></strong></p>
		                                        <p className="text-left small">correoElectronico@email.com</p>
		                                        <p className="text-left">
		                                            <Link to="/dashboard/editar" className="btn btn-primary btn-block btn-sm">Atualizar dados</Link>
		                                        </p>
		                                    </div>
		                                </div>
		                            </div>
		                        </li>
		                        <li className="divider"></li>
		                        <li>
		                            <div className="navbar-login navbar-login-session">
		                                <div className="row">
		                                    <div className="col-lg-12">
		                                        <p>
		                                            <Link to="/" className="btn btn-danger btn-block">Sair</Link>
		                                        </p>
		                                    </div>
		                                </div>
		                            </div>
		                        </li>
		                    </ul>
		                </li>
		            </ul>
		        </div>
		      </div>
				</div>
      )
  }
}

export default Header;
