import "./header.css";

import React, { Component } from "react";
import { browserHistory, Link } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
		Col,
		Nav,
		NavItem,
		NavDropdown,
		MenuItem,
		Navbar,
		Badge
} from "react-bootstrap";

import {
		logOut,
		getUserData
} from "../actions/actionsCommon";

import Modal from "./Modal";
import BarraBuscaRapida from "../containers/utils/BarraBuscaRapida";

import { COMPANY_LOGO_INVERSE, COMPANY_MAIN_COLOR, COMPANY_NAME_SHORT, COMPANY_OLD_SITE } from "../constants/constantsCompany";
import { TITLE_HEADER } from "../constants/utils";

import menu from "./utils/common/menu.json";

class MenuSuperior extends Component {
	componentWillMount() {
		if(!this.props.user.mapProdutos)
			this.props.getUserData()
	}

	changeRoute = (route) => {
		browserHistory.push(route);
	}

	render() {
		let onMenuClicked = this.props.onMenuClicked;
		let user = this.props.user;
		return (
		<div>
			<Navbar className="my-navbar" collapseOnSelect inverse style={{backgroundColor: COMPANY_MAIN_COLOR}}>
				<i className="fa fa-bars menu-hamburguer" onClick={onMenuClicked} />
				<Navbar.Header>
					<Navbar.Brand>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>

				<Navbar.Collapse>
					<Nav pullRight>
						<NavDropdown title={TITLE_HEADER} id="basic-nav-dropdown">
							{menu.header.user.map((opt, index) => {
								return (
									<MenuItem key={index} onClick={() => this.changeRoute(opt.link)}>
										{opt.label}
									</MenuItem>
								)
							})}
							
							<MenuItem href={COMPANY_OLD_SITE}>
								Voltar ao antigo portal
							</MenuItem>

							<MenuItem divider />
							<MenuItem onClick={this.props.logOut}>
								Sair
							</MenuItem>
						</NavDropdown>
					</Nav>
					<Navbar.Form pullRight>
						<BarraBuscaRapida />
					</Navbar.Form>
				</Navbar.Collapse>
			</Navbar>
		</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		logado: state.auth.logado
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		logOut,
		getUserData
	}, dispatch)
}

const Notification = () => {
	return (
		<i className="fa fa-bell">
			<Badge style={{backgroundColor: "#ff5d31"}}>5</Badge>
		</i>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuSuperior);
