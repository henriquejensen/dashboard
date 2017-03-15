import React, { Component } from "react";
import { Col } from "react-bootstrap";

import MyForm from "../../components/forms/Form";

import { LOGO_CONSIGMAIS, ICON_CONSIGMAIS, LOADING_GIF } from "../../constants/utils";

import menu from "../../components/utils/common/menu.json";

export default class ConsigMais extends Component {
	state = {

	}

	componentDidMount() {
		document.title = "Consig+ > Assertiva";
	}

	onFormSubmit = (evt) => {
		evt.preventDefault();

		console.log("SUBMIT Consig+", this.state);
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
				onChange={this.onChange}
                type={""}
				status = {""}
				message = {""}
				lastQueries = {[]}
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