import React, { Component } from "react";

import Form from "../../components/Form";
import { LOGO_CREDITO, ICON_CREDITO } from "../../constants/constantsCredito";

export default class Credito extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tipo: "Intermediária Plus/Pessoal Plus",
			datas: [
			],
			status: "OK",
			message: "OK",
			documento: ""
		}

		this.onCreditoSubmit = this.onCreditoSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this._seeModelo = this._seeModelo.bind(this);
		this._closeModelo = this._closeModelo.bind(this);
	}

	componentDidMount() {
		document.title = "Assertiva > Crédito";
	}

	onChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	onCreditoSubmit(evt) {
		evt.preventDefault();

		console.log("SUBMIT", this.state.tipo);
	}

	_seeModelo(evt) {
		evt.preventDefault();

		this.props.seeModel();
	}

	_closeModelo(evt) {
		evt.preventDefault();

		this.props.closeModelo();
	}

	renderForm() {
		return (
			<Form
				options = {["Consulta Completa", "Consulta Intermediária", "Intermediária Plus/Pessoal Plus", "Consulta Simples", "Consulta Cheque", "Consulta Express"]}
				optionSelected = {location.pathname.split("/")[2].toUpperCase()}
				tipo = {this.state.tipo}
				icon = {ICON_CREDITO}
				logo = {LOGO_CREDITO}
				datas = {this.state.datas}
				onChange = {this.onChange}
				onformSubmit = {this.onCreditoSubmit}
				seeModelo = {this._seeModelo}
				closeModelo = {this._closeModelo}
				status = {this.state.status}
				message = {this.state.message} >
				
				<input
					value={this.state.documento}
					type="text"
					className="form-control input-search "
					placeholder="Digite o documento"
					name="documento"
					required
					style={{width:320, display:"inline-block"}}
					onChange={this.onChange} />

			</Form>
		)
	}

	render() {
		return (
			<div className="container">
				{this.renderForm()}
			</div>
		)
	}
}