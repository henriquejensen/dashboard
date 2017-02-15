import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Tabs, Tab} from "react-bootstrap";

import {
		getLastQueries,
		seeModel,
		closeModel,
		closeTab,
		changeTab
} from "../../actions/actionsCredito";
import {
		changeMenu
} from "../../actions/actionsCommon";

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
			tipo: "",
			expressTipo: "CPF",
			tipoCheque: "Apenas Cadastro",
			creditoInput: {
				documento: "",
				uf: "",
				banco: "",
				agência: "",
				conta: "",
				digitoConta: "",
				chequeInicial: "",
				digitoChequeInicial: "",
				CMC7: "",
				folhas: "",
				servico: []
			}
		}

		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onChangeInput = this.onChangeInput.bind(this);
		this.closeTab = this.closeTab.bind(this);
	}

	componentWillMount() {
		this.props.getLastQueries();
	}

	componentDidMount() {
		document.title = "Assertiva > Crédito";
	}

	closeTab(index) {
		{/*Fecha as abas, quando sobrar um chama a funcao para fechar tudo (closeModel)*/}
		if(this.props.datas.length > 1) {
			this.props.closeTab(index);
		} else {
			this.props.closeModel();
		}
	}

	onChangeInput(evt) {
		let newStateCredito = this.state.creditoInput;
		newStateCredito[evt.target.name] = evt.target.value
		this.setState({
			creditoInput: newStateCredito
		})
	}

	onChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	onFormSubmit(evt) {
		evt.preventDefault();

		console.log("SUBMIT", this.state.tipo, this.state.creditoInput);
	}

	renderForm(options, optionSelected, showUF) {
		return (
			<MyForm
				icon = {ICON_CREDITO}
				logo = {LOGO_CREDITO}
				showLogo = {this.props.datas.length == 0 ? true : false}
				onformSubmit = {this.onFormSubmit}
				seeModelo = {this.props.seeModel}
				status = {this.props.status}
				message = {this.props.message}
				lastQueries = {this.props.lastQueries} >
					
					<Col md={2}>
						<select
							className="form-control"
							name="tipo"
							onChange={this.onChange}
							value={this.state.tipo ? this.state.tipo : optionSelected}
							required>
							<option value="">Selecione</option>
							{options.map((opt,i) => {
								return <option value={opt.name} key={i}>{opt.label}</option>
							})}
						</select>
					</Col>
					<Col md={showUF ? 6 : 8}>
						<input
							className="form-control"
							type="text"
							placeholder={
								optionSelected == "simples" ?
									"CPF"
								: "CPF ou CNPJ"
							}
							value={this.state.creditoInput.documento}
							name="documento"
							onChange={this.onChangeInput}
							style={{width:'100%'}}/>
					</Col>

					{showUF ?
						<Col md={2}>
							<select
								className="form-control"
								name="estado"
								onChange={this.onChangeInput}
								value={this.state.creditoInput.estado}
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
				showLogo = {this.props.datas.length == 0 ? true : false}
				onformSubmit = {this.onFormSubmit}
				seeModelo = {this.props.seeModel}
				status = {this.props.status}
				message = {this.props.message}
				lastQueries = {this.props.lastQueries} >
					
					<Col md={2}>
						<select
							className="form-control"
							name="tipo"
							onChange={this.onChange}
							value={this.state.tipo ? this.state.tipo : optionSelected}
							required>
							<option value="">Selecione</option>
							{options.map((opt,i) => {
								return <option value={opt.name} key={i}>{opt.label}</option>
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
					<Col md={this.state.tipoCheque != "Apenas Cadastro" ? 8 : 6}>
						<input
							className="form-control"
							type="text"
							placeholder="CPF ou CNPJ"
							value={this.state.creditoInput.documento}
							name="documento"
							onChange={this.onChangeInput}/>
					</Col>

					{this.state.tipoCheque != "Apenas Cadastro" ?
						<span>
							{this.state.tipoCheque != "Por Código de Barras (CMC-7)" ?
								<span>
									<Col md={2}>
										<input
											className="form-control"
											type="text"
											placeholder="Banco"
											value={this.state.creditoInput.banco}
											name="banco"
											onChange={this.onChangeInput}/>
									</Col>

									<Col md={2}>
										<input
											className="form-control"
											type="text"
											placeholder="Agência"
											value={this.state.creditoInput.agencia}
											name="agencia"
											onChange={this.onChangeInput}/>
									</Col>

									<Col md={2}>
										<input
											className="form-control"
											type="text"
											placeholder="conta"
											value={this.state.creditoInput.conta}
											name="conta"
											onChange={this.onChangeInput}/>
									</Col>

									<Col md={2}>
										<input
											className="form-control"
											type="text"
											placeholder="Conta"
											value={this.state.creditoInput.digitoConta}
											name="digitoConta"
											onChange={this.onChangeInput}/>
									</Col>

									<Col md={2}>
										<input
											className="form-control"
											type="text"
											placeholder="Cheque Inicial"
											value={this.state.creditoInput.chequeInicial}
											name="chequeInicial"
											onChange={this.onChangeInput}/>
									</Col>

									<Col md={2}>
										<input
											className="form-control"
											type="text"
											placeholder="Dígito Cheque Inicial"
											value={this.state.creditoInput.digitoChequeInicial}
											name="digitoChequeInicial"
											onChange={this.onChangeInput}/>
									</Col>
								</span>
							: ""}

							<Col md={6}>
								<input
									className="form-control"
									type="text"
									placeholder="CMC7"
									value={this.state.creditoInput.CMC7}
									name="CMC7"
									onChange={this.onChangeInput}/>
							</Col>

							<Col md={4}>
								<input
									className="form-control"
									type="text"
									placeholder="Folhas"
									value={this.state.creditoInput.folhas}
									name="folhas"
									onChange={this.onChangeInput}/>
							</Col>
						</span>
					: ""}
						
			</MyForm>
		)
	}

	renderFormExpress(options, optionSelected) {
		return (
			<MyForm
				icon = {ICON_CREDITO}
				logo = {LOGO_CREDITO}
				showLogo = {this.props.datas.length == 0 ? true : false}
				onformSubmit = {this.onFormSubmit}
				seeModelo = {this.props.seeModel}
				status = {this.props.status}
				message = {this.props.message}
				lastQueries = {this.props.lastQueries} >
					
					<Col md={2}>
						<select
							className="form-control"
							name="tipo"
							onChange={this.onChange}
							value={this.state.tipo ? this.state.tipo : optionSelected}
							required>
							<option value="">Selecione</option>
							{options.map((opt,i) => {
								return <option value={opt.name} key={i}>{opt.label}</option>
							})}
						</select>
					</Col>
					<Col md={2}>
						<select
							className="form-control"
							name="expressTipo"
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
							placeholder="CPF ou CNPJ"
							value={this.state.creditoInput.documento}
							name="documento"
							onChange={this.onChangeInput}/>
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
							{this.state.expressTipo == "CNPJ" ?
								<Checkbox inline>
									Protesto Público 
								</Checkbox>
							: ""}
						</FormGroup>
					</Col>
						
			</MyForm>
		)
	}

	form = () => {
		let pathTipo = location.pathname.split("/")[2] ? location.pathname.split("/")[2] : "";
		let tipo = this.state.tipo;
		let options = [
			{label:"Consulta Completa", name:"completa"},
			{label:"Consulta Intermediária", name:"intermediaria"},
			{label:"Intermediária Plus/Pessoal Plus", name:"intermediariaPlus"},
			{label:"Consulta Simples", name:"simples"},
			{label:"Consulta Cheque", name:"cheque"},
			{label:"Consulta Express", name:"express"}
		]

		if(!tipo) {
			tipo = pathTipo;
		}

		return (
			pathTipo || tipo ?
				tipo == "intermediaria" || tipo == "intermediariaPlus" ?
					this.renderForm(options,tipo, false)
				: 
					tipo == "cheque" ?
						this.renderFormCheque(options,tipo)
					:
						tipo == "express" ?
							this.renderFormExpress(options,tipo)
						: this.renderForm(options,tipo, false)
			: this.renderForm(options,tipo, false)
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
									<Tab eventKey={data.label} title={<Titletab icon={data.icon} label={data.label} close={this.closeTab}/>} key={index}>
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
		tabActive: state.credito.tabActive,
		lastQueries: state.credito.lastQueries
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getLastQueries,
		seeModel,
		closeModel,
		changeTab,
		closeTab
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Credito);