import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

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
		<div className="navbar navbar-default navbar-fixed-top" role="navigation" id="header" style={{backgroundColor:"#5B3494"}}>
			<div className="navbar-header">
				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span> 
				</button>
				<img src="../../public/assertiva/assertiva-top-index-inverse.png" alt="Assertiva" height="45"/>
			</div>
			<div className="collapse navbar-collapse">
				<ul className="nav navbar-nav navbar-right">
					<li className={this.state.menuOpened ? "dropdown open" : "dropdown"} onClick={this.openMenu}>
						<a href="#" className="dropdown-toggle" data-toggle="dropdown" style={{color:"white"}}>
							<img src={this.props.user.avatar_url} width="20" /> 
							<strong>{this.props.user.nome}</strong>
							<span className="glyphicon glyphicon-chevron-down" ></span>
						</a>
						<ul className="dropdown-menu">
							<li>
								<div className="navbar-login">
									<div className="row">
										<div className="col-lg-4">
											<img src={this.props.user.firm_url} width="100%" /> 
										</div>
										<div className="col-lg-8">
											<p className="text-left"><strong>{this.props.user.empresa}</strong></p>
											<p className="text-left small">PERFIL: {this.props.user.perfil}</p>
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
      )
  }
}

function mapStateToProps(state) {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(Header);
