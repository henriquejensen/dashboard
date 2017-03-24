import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Col } from "react-bootstrap";

import MyForm from "../../components/forms/Form";

import { getLastQueries, searchConsigMais } from "../../actions/actionsConsigMais";

import { LOGO_CONSIGMAIS, ICON_CONSIGMAIS, LOADING_GIF } from "../../constants/utils";
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_CONSIGMAIS } from "../../constants/constantsCompany";

import menu from "../../components/utils/common/menu.json";

class ConsigMais extends Component {
	state = {

	}

	componentWillMount() {
		this.props.getLastQueries();
	}

	componentDidMount() {
		document.title = COMPANY_PRODUCT_CONSIGMAIS + " > " + COMPANY_NAME_SHORT;
	}

	onFormSubmit = (evt) => {
		evt.preventDefault();

		this.props.searchConsigMais();
	}

	onChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	renderForm = () => {
		return (
			<span>
				<Col md={2}>
					<input
						className="form-control"
						type="text"
						placeholder="CPF"
						value={this.state.cpf}
						name="cpf"
						onChange={this.onChange}
					/>
				</Col>
				<Col md={2}>
					<input
						className="form-control"
						type="text"
						placeholder="Benefício"
						value={this.state.beneficio}
						name="beneficio"
						onChange={this.onChange}
					/>
				</Col>
				<Col md={2}>
					<input
						className="form-control"
						type="date"
						placeholder="Não é necessário separador"
						value={this.state.dataNascimento}
						name="dataNascimento"
						onChange={this.onChange}
					/>
				</Col>
				<Col md={4}>
					<input
						className="form-control"
						type="text"
						placeholder="Nome completo"
						value={this.state.nome}
						name="nome"
						onChange={this.onChange}
					/>
				</Col>
			</span>
		)
	}

	form = (tipo) => {
		return (
			<MyForm
				icon = {ICON_CONSIGMAIS}
				logo = {LOGO_CONSIGMAIS}
				showLogo = {true ? true : false}
				onformSubmit = {this.onFormSubmit}
				status = {this.props.status}
				message = {this.props.message}
				type = {COMPANY_PRODUCT_CONSIGMAIS}
				lastQueries = {this.props.lastQueries}
			>

				{this.renderForm()}
				
			</MyForm>
		)
	}

	render() {
		return (
			<div className="container">
				{this.form(this.props.type)}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		datas: state.consigmais.response,
		status: state.consigmais.status,
		message: state.consigmais.message,
		loading: state.consigmais.loading,
		tabActive: state.consigmais.tabActive,
		lastQueries: state.consigmais.lastQueries,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getLastQueries,
		searchConsigMais
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsigMais);