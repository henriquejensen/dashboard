import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Nav, NavItem, NavDropdown, MenuItem, Navbar, Header, Collapse} from "react-bootstrap";

import menu from "./menu/menu.json";
import { browserHistory } from 'react-router';

import { logoTopo } from "../constants/imagensAssertiva";
import { logOut } from "../actions/index";


class MenuSuperior extends Component {
	constructor(props) {
		super();

		this.changeRoute = this.changeRoute.bind(this);
	}

	changeRoute(route){
		if(route == "/login") {
			this.props.logOut();
		}
		browserHistory.push(route);
	}

	render() {
		return (
		<div>
		<img src={this.props.user.avatar_url} alt="Imagem do usuário" style={{width:30, position:"absolute", right:10, top:8, zIndex: 1}} />
		<Navbar style={{backgroundColor:"#5B3494", borderRadius: 0}} inverse collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand>
					<img src="../../public/assertiva/assertiva-top-index-inverse.png" alt="Logo da Assertiva" style={{padding: 2}} />
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav pullRight>

					<NavDropdown title="Produtos" id="menu-header-produtos">
						{menu.sidebar.map((opt, index) => {
							return (
								<MenuItem key={index} onClick={() => this.changeRoute(opt.link)}>
									{opt.label}
								</MenuItem>
							)
						})}
					</NavDropdown>

					<NavDropdown title="Relatórios" id="basic-nav-dropdown">
						{menu.header.relatorios.map((opt, index) => {
							return (
								<MenuItem key={index} onClick={() => this.changeRoute(opt.link)}>
									{opt.label}
								</MenuItem>
							)
						})}
					</NavDropdown>

					<NavDropdown title={this.props.user.nome} id="basic-nav-dropdown">
						{menu.header.user.map((opt, index) => {
							if(opt.label != "Sair") {
								return (
									<MenuItem key={index} onClick={() => this.changeRoute(opt.link)}>
										{opt.label}
									</MenuItem>
								)
							}
						})}
						<MenuItem divider />
						<MenuItem onClick={() => this.changeRoute("/login")}>
							Sair
						</MenuItem>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
		</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		logOut
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuSuperior);
