import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
		Col,
		Nav,
		NavItem,
		NavDropdown,
		MenuItem,
		Navbar,
		Header,
		Collapse,
		FormGroup,
		FormControl,
		Button,
		Badge,
		Row
} from "react-bootstrap";

import menu from "./utils/common/menu.json";
import { browserHistory } from 'react-router';

import {
		logOut,
		getUserData
} from "../actions/actionsCommon";

import Modal from "./Modal";
import BarraBuscaRapida from "./utils/BarraBuscaRapida";

class MenuSuperior extends Component {
	constructor(props) {
		super();

		this.state = {
			IsModalOpen: false,
			indexNotification: 0
		}

		this.changeRoute = this.changeRoute.bind(this);
		this.onOpenNotification = this.onOpenNotification.bind(this);
	}

	changeRoute(route){
		if(route == "/login") {
			this.props.logOut();
		}
		browserHistory.push(route);
	}

	componentWillMount() {
		this.props.getUserData()
	}

	onOpenNotification(evt, index) {
		evt.preventDefault();

		this.setState({
			IsModalOpen: true,
			indexNotification: index
		})
	}

    closeModal() {
        this.setState({
            IsModalOpen: false
        })
    }

	render() {
		return (
		<div>
			<Navbar style={{backgroundColor: this.props.color, borderRadius: 0}} collapseOnSelect>
				<i className="fa fa-bars menu-hamburguer" onClick={this.props.onMenuClicked} />
				<Navbar.Header style={{marginLeft:"45px"}}>
					<Navbar.Brand>
						<img src="../../public/assertiva/assertiva-top-index-inverse-2.png" alt="Logo da Assertiva" className="menu-image-logo" />
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>

				<Navbar.Collapse>
					<Navbar.Form pullLeft>
						<BarraBuscaRapida />
					</Navbar.Form>

					<Nav pullRight>
						<NavItem onClick={() => this.changeRoute(menu.header.cadastro.link)}>{menu.header.cadastro.label}</NavItem>

						<NavDropdown title={this.props.user.usuarioNome ? this.props.user.usuarioNome : "DESCONECTADO"} id="basic-nav-dropdown">
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

			{this.state.IsModalOpen ?
				<Modal
					IsModalOpen={this.state.IsModalOpen}
					closeModal={this.closeModal.bind(this)}
					title={this.props.notifications[this.state.indexNotification].assunto}
				>
					<Col md={12}>{this.props.notifications[this.state.indexNotification].mensagem}</Col>
				</Modal>
			: ""}
				
		</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		color: state.auth.colorMenu,
		user: state.user,
		notifications: state.user.notifications
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
