import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Tabs, Tab} from "react-bootstrap";

import {
		seeModel,
		closeModel,
		closeTab,
		changeTab
} from "../../actions/actionsCredito";

import CreditoView from "./CreditoView";
import MyForm from "../../components/forms/Form";
import Titletab from "../../components/utils/Titletab";

import { Form, FormGroup, FormControl, InputGroup, ControlLabel, Checkbox, Col} from "react-bootstrap";

import { LOGO_CREDITO, ICON_CREDITO } from "../../constants/utils";

import estados from "../../components/utils/common/estados.json";

const tiposCheque = [
	"Apenas Cadastro", "Digitando dados do Cheque", "Por Código de Barras (CMC-7)", 
]

class Credito extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tipo: "Intermediária Plus/Pessoal Plus",
			documento: "",
			estado: ""
		}

		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		document.title = "Assertiva > Crédito";
	}

	onChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	onFormSubmit(evt) {
		evt.preventDefault();

		console.log("SUBMIT", this.state.tipo);
	}

	renderForm(formType, options, optionSelected, showUF) {
		return (
			<MyForm
				icon = {ICON_CREDITO}
				logo = {LOGO_CREDITO}
				showModel = {this.props.datas.length >= 1 ? (this.props.datas[0].data.cadastroPf.cpf == 11111111111 ? true: false) : false}
				showLogo = {this.props.datas.length == 0 ? true : false}
				onChange = {this.onChange}
				onformSubmit = {this.onFormSubmit}
				seeModelo = {this.props.seeModel}
				closeModelo = {this.props.closeModel}
				status = {this.props.status}
				message = {this.props.message} >
					
					<Col md={2}>
						<select
							className="form-control"
							name="tipo"
							onChange={this.onChange}
							value={this.state.tipo ? this.state.tipo : optionSelected}
							required>
							<option value="">Selecione</option>
							{options.map((opt,i) => {
								return <option value={opt} key={i}>{opt}</option>
							})}
						</select>
					</Col>
					<Col md={showUF ? 6 : 8}>
						<input
							className="form-control"
							type="text"
							placeholder={
								formType == "consulta simples" ?
									"CPF"
								: "CPF ou CNPJ"
							}
							value={this.state.documento}
							name="documento"
							onChange={this.onChange}
							style={{width:'100%'}}/>
					</Col>

					{showUF ?
						<Col md={2}>
							<select
								className="form-control"
								name="estado"
								onChange={this.onChange}
								value={this.state.estado ? this.state.estado : optionSelected}
								required>
								<option value="">Selecione UF</option>
								{estados.estados.map((estado,i) => {
									return <option value={estado.sigla} key={i}>{estado.sigla}</option>
								})}
							</select>
						</Col>
					: ""}
			</MyForm>
		)
	}

	renderFormCheque(options, optionSelected) {
		return (
			<MyForm
				icon = {ICON_CREDITO}
				logo = {LOGO_CREDITO}
				showModel = {this.props.datas.length >= 1 ? (this.props.datas[0].data.cadastroPf.cpf == 11111111111 ? true: false) : false}
				showLogo = {this.props.datas.length == 0 ? true : false}
				onChange = {this.onChange}
				onformSubmit = {this.onFormSubmit}
				seeModelo = {this.props.seeModel}
				closeModelo = {this.props.closeModel}
				status = {this.props.status}
				message = {this.props.message} >
					
					<Col md={2}>
						<select
							className="form-control"
							name="tipo"
							onChange={this.onChange}
							value={this.state.tipo ? this.state.tipo : optionSelected}
							required>
							<option value="">Selecione</option>
							{options.map((opt,i) => {
								return <option value={opt} key={i}>{opt}</option>
							})}
						</select>
					</Col>
					<Col md={2}>
						<select
							className="form-control"
							name="tipoCheque"
							onChange={this.onChange}
							value={this.state.tipoCheque}
							required>
							{tiposCheque.map((tipo,i) => {
								return <option value={tipo} key={i}>{tipo}</option>
							})}
						</select>
					</Col>
					<Col md={6}>
						<input
							className="form-control"
							type="text"
							placeholder={ "CPF ou CNPJ" }
							value={this.state.documento}
							name="documento"
							onChange={this.onChange}/>
					</Col>
						
			</MyForm>
		)
	}

	renderFormExpress(options, optionSelected) {
		return (
			<MyForm
				icon = {ICON_CREDITO}
				logo = {LOGO_CREDITO}
				showModel = {this.props.datas.length >= 1 ? (this.props.datas[0].data.cadastroPf.cpf == 11111111111 ? true: false) : false}
				showLogo = {this.props.datas.length == 0 ? true : false}
				onChange = {this.onChange}
				onformSubmit = {this.onFormSubmit}
				seeModelo = {this.props.seeModel}
				closeModelo = {this.props.closeModel}
				status = {this.props.status}
				message = {this.props.message} >
					
					<Col md={2}>
						<select
							className="form-control"
							name="tipo"
							onChange={this.onChange}
							value={this.state.tipo ? this.state.tipo : optionSelected}
							required>
							<option value="">Selecione</option>
							{options.map((opt,i) => {
								return <option value={opt} key={i}>{opt}</option>
							})}
						</select>
					</Col>
					<Col md={2}>
						<select
							className="form-control"
							name="tipoCheque"
							onChange={this.onChange}
							value={this.state.expressTipo}
							required>
							<option value='CPF'>CPF</option>
							<option value='CNPJ'>CNPJ</option>
						</select>
					</Col>
					<Col md={8}>
						<input
							className="form-control"
							type="text"
							placeholder={ "CPF ou CNPJ" }
							value={this.state.documento}
							name="documento"
							onChange={this.onChange}/>
					</Col>

					<Col md={10} className="text-center">
						<FormGroup>
							<Checkbox inline checked readOnly>
								Cadastral
							</Checkbox>
							{' '}
							<Checkbox inline>
								Receita Federal
							</Checkbox>
							{' '}
							<Checkbox inline>
								Sintegra 
							</Checkbox>
							<Checkbox inline>
								CCF
							</Checkbox>
							<Checkbox inline>
								Protesto Público 
							</Checkbox>
						</FormGroup>
					</Col>
						
			</MyForm>
		)
	}

	form = () => {
		let pathTipo = location.pathname.split("/")[2] ? location.pathname.split("/")[2].toUpperCase() : "";
		let tipo = this.state.tipo.toLowerCase();
		let options = ["Consulta Completa", "Consulta Intermediária", "Intermediária Plus/Pessoal Plus", "Consulta Simples", "Consulta Cheque", "Consulta Express"];

		if(!tipo) {
			tipo = pathTipo;
		}

		return (
			pathTipo || tipo ?
				tipo == "consulta intermediária" || tipo == "intermediária plus/pessoal plus" ?
					this.renderForm(tipo,options,pathTipo, true)
				: 
					tipo == "consulta cheque" ?
						this.renderFormCheque(options,pathTipo)
					:
						tipo == "consulta express" ?
							this.renderFormExpress(options,pathTipo)
						: this.renderForm(tipo,options,pathTipo, false)
			: this.renderForm(tipo,options,pathTipo, false)
		)

	}

	render() {
		return (
			<div className="container">
				{this.form()}

				{this.props.loading ? <div className="imgSearching"><img src="../../../public/loading.gif" /></div> : ""}

				{this.props.datas.length > 0 ? 
					(
						<Tabs
							defaultActiveKey={this.props.datas[0].label}
							animation={false}
							id="tab-credito"
						>
							{this.props.datas.map((data, index) => {
								return (
									<Tab eventKey={data.label} title={<Titletab icon={data.icon} label={data.label} close={this.props.closeTab}/>} key={index}>
										{data.produto == "credito" ?
											<CreditoView
												data={data.data}
												tipo={data.tipo}
												index={index}/>
										: ""}
									</Tab>
								)
							})}
						</Tabs>
					)
				: ""}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		datas: state.credito.response,
		status: state.credito.status,
		message: state.credito.message,
		loading: state.credito.loading,
		tabActive: state.credito.tabActive
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		seeModel,
		closeModel,
		changeTab,
		closeTab
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Credito);