import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Tabs, Tab} from "react-bootstrap";

import CreditoView from "./CreditoView";
import LocalizeView from "../localize/LocalizeView";
import MyForm from "../../components/forms/Form";
import Titletab from "../../components/utils/Titletab";

import { Form, FormGroup, FormControl, InputGroup, ControlLabel, Checkbox, Col} from "react-bootstrap";

import {
		changeTab,
		closeModel,
		closeMessageErrorCredito,
		closeTab,
		getLastQueries,
		loadingCredito,
		seeModel,
		searchCreditoCheque,
		searchCreditoCompleta
} from "../../actions/actionsCredito";
import { searchLocalize } from "../../actions/index";
import { changeProductType } from "../../actions/actionsCommon";
import { ERR_CONNECTION_REFUSED, LOGO_CREDITO, ICON_CREDITO, LOADING_GIF, REQUEST_ERROR, SUCCESS } from "../../constants/utils";
import {
	COMPLETA_CODE,
	INTERMEDIARIA_CODE,
	INTERMEDIARIA_PLUS_CODE,
	SEARCH_BY_LOCALIZE_CPF_IN_CREDITO,
	SEARCH_BY_LOCALIZE_CNPJ_IN_CREDITO,
	SIMPLES_CODE,
	CHEQUE_CODE,
	EXPRESS_CODE,
	GET_CREDITO_COMPLETA
} from "../../constants/constantsCredito";
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_CREDITO, COMPANY_PRODUCT_LOCALIZE } from "../../constants/constantsCompany";

import estados from "../../components/utils/common/estados.json";
import menu from "../../components/utils/common/menu.json";

const tiposCheque = [
	"Apenas Cadastro", "Digitando dados do Cheque", "Por Código de Barras (CMC-7)", 
]

class Credito extends Component {

	state = {
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
			servico: [],
			receitaFederal: false,
			ccf: false,
			protestoPublico: false,
			sintegra: false
		}
	}

	componentDidMount() {
		document.title = COMPANY_PRODUCT_CREDITO + " > " + COMPANY_NAME_SHORT;
		this.props.loadingCredito();
		this.props.getLastQueries(COMPLETA_CODE, "COMPLETA");
		this.props.getLastQueries(INTERMEDIARIA_CODE, "INTERMEDIARIA");
		this.props.getLastQueries(INTERMEDIARIA_PLUS_CODE, "INTERMEDIARIAPLUS");
		this.props.getLastQueries(SIMPLES_CODE, "SIMPLES");
		this.props.getLastQueries(CHEQUE_CODE, "CHEQUE");
		this.props.getLastQueries(EXPRESS_CODE, "EXPRESS");
	}

	closeTab = (index) => {
		{/*Fecha as abas, quando sobrar um chama a funcao para fechar tudo (closeModel)*/}
		if(this.props.datas.length > 1) {
			this.props.closeTab(index);
		} else {
			this.props.closeModel();
		}
	}

	onChangeInput = (evt) => {
		let newStateCredito = this.state.creditoInput;
		newStateCredito[evt.target.name] = evt.target.value
		this.setState({
			creditoInput: newStateCredito
		})
	}

	onChangeInputCheckBox = (evt) => {
		let newStateCredito = this.state.creditoInput;
		newStateCredito[evt.target.name] = !newStateCredito[evt.target.name]
		this.setState({
			creditoInput: newStateCredito
		})
	}

	onChangeType = (evt) => {
		this.props.changeProductType("credito", evt.target.value)
	}

	onChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	onFormSubmit = (evt) => {
		evt.preventDefault();

		this.props.loadingCredito();

		if(this.props.type == "CHEQUE") {
			this.props.searchCreditoCheque(this.state.creditoInput);
		} else {
			this.searchCreditoCompleta(this.state.creditoInput.documento);
		}

		this.setState({
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
				servico: [],
				receitaFederal: false,
				ccf: false,
				protestoPublico: false,
				sintegra: false
			}
		})

	}

	renderForm(showUF) {
		return (
			<span>
				<Col md={showUF ? 6 : 8}>
					<input
						className="form-control"
						type="text"
						placeholder={
							this.props.type == "SIMPLES" ?
								"CPF"
							: "CPF ou CNPJ"
						}
						value={this.state.creditoInput.documento}
						name="documento"
						required
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
			</span>
		)
	}

	renderFormCheque() {
		return (
			<span>
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
						required
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
						
			</span>
		)
	}

	renderFormExpress() {
		return (
			<span>
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
						<Checkbox
							inline
							name="receitaFederal"
							onChange={this.onChangeInputCheckBox}
							checked={this.state.creditoInput.receitaFederal}>
							Receita Federal
						</Checkbox>
						{' '}
						<Checkbox
							inline
							name="sintegra"
							onChange={this.onChangeInputCheckBox}
							checked={this.state.creditoInput.sintegra}>
							Sintegra
						</Checkbox>
						<Checkbox
							inline
							name="ccf"
							onChange={this.onChangeInputCheckBox}
							checked={this.state.creditoInput.ccf}>
							CCF
						</Checkbox>
						{this.state.expressTipo == "CNPJ" ?
							<Checkbox
								inline
								name="protestoPublico"
								onChange={this.onChangeInputCheckBox}
								checked={this.state.creditoInput.protestoPublico}>
								Protesto Público 
							</Checkbox>
						: ""}
					</FormGroup>
				</Col>
			</span>
		)
	}

	researchUltimasConsultas = (entrada) => {
		this.props.loadingCredito();

		if(this.props.type == "CHEQUE") {
			this.props.searchCreditoCheque(entrada);
		} else {
			this.searchCreditoCompleta(entrada);
		}
	}

	searchInLocalize = (documento, tipo) => {
		let search = tipo === "CPF" ? SEARCH_BY_LOCALIZE_CPF_IN_CREDITO : SEARCH_BY_LOCALIZE_CNPJ_IN_CREDITO;
		this.props.loadingCredito();
		this.props.searchLocalize(documento, tipo, search);
	}

	searchCreditoCompleta = (documento, tipo) => {
		tipo = tipo ? tipo : documento.length <= 11 ? "CPF" : "CNPJ";
		this.props.loadingCredito();
		this.props.searchCreditoCompleta(documento, tipo, GET_CREDITO_COMPLETA);
	}

	form = (tipo) => {
		return (
			<MyForm
				icon = {ICON_CREDITO}
				logo = {LOGO_CREDITO}
				showLogo = {this.props.datas.length == 0 ? true : false}
				onformSubmit = {this.onFormSubmit}
				closeMessageError = {this.props.closeMessageErrorCredito}
				options={menu.sidebar[4].subItems}
				onChange={this.onChangeType}
                type={this.props.type}
				seeModelo = {this.props.seeModel}
				status = {this.props.status}
				message = {this.props.message}
				searchUltimasConsultas={this.researchUltimasConsultas}
				lastQueries = {this.props.lastQueries[this.props.type]}
			>
				{tipo ?
					tipo == "INTERMEDIARIA" || tipo == "INTERMEDIARIAPLUS" ?
						this.renderForm(false)
					: 
						tipo == "CHEQUE" ?
							this.renderFormCheque()
						:
							tipo == "EXPRESS" ?
								this.renderFormExpress()
							: this.renderForm(false)
					: this.renderForm(false)
				}
				
			</MyForm>
		)
	}

	render() {
		let status = this.props.status;
		let type = this.props.type;
		let loading = this.props.loading;
		let datas = this.props.datas;
		let tabActive = this.props.tabActive;
		let changeTab = this.props.changeTab;
		if(status == SUCCESS || status == ERR_CONNECTION_REFUSED || status == REQUEST_ERROR) {
			window.scrollTo(0, 0);
		}
		return (
			<div className="container">
				{this.form(type)}

				{loading ? <div className="imgSearching"><img src={LOADING_GIF} /></div> : ""}

				{datas.length > 0 ? 
					(
						<Tabs
							activeKey={tabActive}
							onSelect={(key) => {changeTab(key)}}
							animation={false}
							id="tab-credito"
						>
							{datas.map((data, index) => {
								return (
									<Tab eventKey={data.label} 
										title={
											<Titletab
												icon={data.icon}
												label={data.label}
												tipo={data.tipo}
												close={() => this.closeTab(index)}
											/>
										}
										key={index}
									>
										{data.produto == COMPANY_PRODUCT_CREDITO ?
											<CreditoView
												data={data.data}
												tipo={data.tipo}
												index={index}
												searchPerson={this.searchCreditoCompleta}/>
										: 
											data.produto == COMPANY_PRODUCT_LOCALIZE ?
												<LocalizeView
													data={data.data}
													tipo={data.tipo}
													index={index}
													label={data.label}
													searchLocalize={this.searchInLocalize}
													pessoasRelacionadas={data.pessoasRelacionadas}/>
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
		lastQueries: state.credito.lastQueries,
		type: state.credito.type
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeProductType,
		changeTab,
		closeModel,
		closeMessageErrorCredito,
		closeTab,
		getLastQueries,
		loadingCredito,
		seeModel,
		searchCreditoCheque,
		searchCreditoCompleta,
		searchLocalize
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Credito);