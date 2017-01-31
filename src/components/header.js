import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
		Nav,
		NavItem,
		NavDropdown,
		MenuItem,
		Navbar,
		Header,
		Collapse,
		FormGroup,
		FormControl,
		Button
} from "react-bootstrap";

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
			<img src={this.props.user.avatar_url} alt="Imagem do usuário" className="menu-image-user" />
			<Navbar style={{backgroundColor:"#5E147F", borderRadius: 0}} inverse collapseOnSelect>
				<i className="fa fa-bars menu-hamburguer" onClick={this.props.onMenuClicked} />
				<Navbar.Header style={{marginLeft:"45px"}}>
					<Navbar.Brand>
						<img src="../../public/assertiva/assertiva-top-index-inverse.png" alt="Logo da Assertiva" className="menu-image-logo" />
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>

				<Navbar.Collapse>
					<Navbar.Form pullLeft>
						<form>
							<div className="input-group stylish-input-group">
								<input type="number" className="form-control" placeholder="Digite o CPF ou CNPJ" />
								<span className="input-group-addon">
									<button type="submit">
										<span className="fa fa-search"></span>
									</button>  
								</span>
							</div>
						</form>
					</Navbar.Form>

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
