import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Form, FormGroup, FormControl, InputGroup, ControlLabel, Checkbox, Col, Tabs, Tab} from "react-bootstrap";

import CreditoView from "./CreditoView";
import LocalizeView from "../localize/LocalizeView";
import MyForm from "../../components/forms/Form";
import Titletab from "../../components/utils/Titletab";
import Panel from "../../components/panel/Panel";
import UltimasConsultas from "../../components/UltimasConsultas";
import { MyFieldGroup } from "../../components/forms/CommonForms"
import { LocalizeDescription } from "../../components/ProductDescription";
import { PrintScreen, LoadingScreen } from "../../components/utils/ElementsAtScreen";

// Actions
import {
		changeTab,
		closeModel,
		closeMessageErrorCredito,
		closeTab,
		getLastQueries,
		loadingCredito,
		seeModel,
		searchCreditoCheque,
		searchCreditoCompleta,
		searchCreditoExpress,
		searchCreditoIntermediaria,
		searchCreditoIntermediariaPlus,
		searchCreditoSimples
} from "../../actions/actionsCredito";
import { searchLocalize } from "../../actions/index";
import { changeProductType } from "../../actions/actionsCommon";

// Constants
import { ERR_CONNECTION_REFUSED, LOADING_GIF, REQUEST_ERROR, SUCCESS } from "../../constants/utils";
import {
	COMPLETA_CODE_PF,
	INTERMEDIARIA_CODE_PF,
	INTERMEDIARIA_PLUS_CODE_PF,
	CHEQUE_CODE_PF,
	EXPRESS_CODE_PF,
	SIMPLES_CODE,
	SEARCH_BY_LOCALIZE_CPF_IN_CREDITO,
	SEARCH_BY_LOCALIZE_CNPJ_IN_CREDITO,

	GET_CREDITO_COMPLETA
} from "../../constants/constantsCredito";
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_CREDITO, COMPANY_PRODUCT_CREDITO_LABEL, COMPANY_PRODUCT_LOCALIZE, LOGO_CREDITO } from "../../constants/constantsCompany";

import estados from "../../components/utils/common/estados.json";
import menu from "../../components/utils/common/menu.json";

class Credito extends Component {
	constructor(props) {
		super(props)

		this.tiposCheque = ["Apenas Cadastro", "Digitando dados do Cheque", "Por Código de Barras (CMC-7)"]

		this.state = {
			tipo: "",
			tipoCheque: "Apenas Cadastro",
			creditoInput: {
				documento: null,
				dataNascimento: null,
				expressTipo: "CPF",
				uf: null,
				banco: null,
				agência: null,
				conta: null,
				digitoConta: null,
				chequeInicial: null,
				digitoChequeInicial: null,
				CMC7: null,
				folhas: null,
				servico: [],
				cadastral: true,
				receitaFederal: false,
				ccf: false,
				protestoPublico: false,
				sintegra: false
			}
		}
	}

	componentDidMount() {
		document.title = COMPANY_PRODUCT_CREDITO + " > " + COMPANY_NAME_SHORT;
		this.props.loadingCredito();
		
		this.props.getLastQueries(COMPLETA_CODE_PF, "COMPLETA");
		this.props.getLastQueries(INTERMEDIARIA_CODE_PF, "INTERMEDIARIA");
		this.props.getLastQueries(INTERMEDIARIA_PLUS_CODE_PF, "INTERMEDIARIAPLUS");
		this.props.getLastQueries(SIMPLES_CODE, "SIMPLES");
		this.props.getLastQueries(CHEQUE_CODE_PF, "CHEQUE");
		this.props.getLastQueries(EXPRESS_CODE_PF, "EXPRESS");
		
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
		this.props.changeProductType(COMPANY_PRODUCT_CREDITO_LABEL, evt.target.value)
	}

	onChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	onFormSubmit = (evt) => {
		evt.preventDefault()

		this.props.loadingCredito()

		let { creditoInput } = this.state

		switch (this.props.type) {
			case "CHEQUE":
				let cheque =  {
					documento : this.state.creditoInput.documento.replace(/[^0-9]/g,""),
					tipo : this.state.creditoInput.documento.length > 11 ? "pj" : "pf", 
					cep : null,
					"telefone": {
						"ddd": null,
						"numero": null
					},
					"utilizaCMC7": false,
					"cmc71Inicial": null,
					"cmc72Inicial": null,
					"cmc73Inicial": null,
					"quantidadeCheque": null,
					"chequeDetalhado": [{
						"numero": null,
						"digito": null,
						"dataDeposito": null,
						"valor": null
					}
					],
					"cepOrigem": null
				}

				this.props.searchCreditoCheque(cheque);
				break;
		
			case "INTERMEDIARIA":
				this.props.searchCreditoIntermediaria(creditoInput.documento, creditoInput.estado);
				break;

			case "INTERMEDIARIAPLUS":
				this.props.searchCreditoIntermediariaPlus(creditoInput.documento, creditoInput.estado);
				break;

			case "EXPRESS":
				let documento = creditoInput.documento.toString().replace(/[^0-9]/g,"")
				let requestExpress = {}
				requestExpress["receitaFederal"] = creditoInput.receitaFederal
				requestExpress["ccf"] = creditoInput.ccf
				requestExpress["protestoPublico"] = creditoInput.protestoPublico
				requestExpress["cadastral"] = creditoInput.cadastral

				if(creditoInput.expressTipo === "CPF") {
					requestExpress["cpf"] = documento
					requestExpress["dataNascimento"] = creditoInput.dataNascimento
				} else {
					requestExpress["cnpj"] = documento
					requestExpress["uf"] = creditoInput.uf
					requestExpress["sintegra"] = creditoInput.sintegra
				}
				this.props.searchCreditoExpress(requestExpress, documento, creditoInput.expressTipo)
				break

			case "SIMPLES":
				this.props.searchCreditoSimples(creditoInput.documento);
				break;

			case "COMPLETA":
				this.searchCreditoCompleta(creditoInput.documento);
				break;

			default:
				break;
		}
	}

	renderUF = () => {
		return (
			<Col md={2}>
				<select
					className="form-control"
					name="estado"
					onChange={this.onChangeInput}
					value={this.state.creditoInput.estado}
					required
				>
					<option value="">Selecione UF</option>
					{estados.estados.map((estado,i) => {
						return <option value={estado.sigla} key={i}>{estado.sigla}</option>
					})}
				</select>
			</Col>
		)
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
					this.renderUF()
				: ""}
			</span>
		)
	}

	renderFormExpress() {
		let showDataNascimento = this.state.creditoInput.receitaFederal && this.state.creditoInput.expressTipo === "CPF"
		let showUF = this.state.creditoInput.sintegra && this.state.creditoInput.expressTipo === "CNPJ"
		return (
			<div>
				<Col md={2}>
					<select
						className="form-control"
						name="expressTipo"
						onChange={this.onChangeInput}
						value={this.state.creditoInput.expressTipo}
						required>
						<option value='CPF'>CPF</option>
						<option value='CNPJ'>CNPJ</option>
					</select>
				</Col>
				
				<Col md={showDataNascimento || showUF ? 6 : 8}>
					<MyFieldGroup
						id="documento"
						type="text"
						name="documento"
						value={this.state.creditoInput.documento}
						onChange={this.onChangeInput}
						placeholder="CPF ou CNPJ"
						required
					/>
				</Col>

				{showDataNascimento ? 
					<Col md={2}>
						<MyFieldGroup
							id="dataNascimento"
							type="date"
							name="dataNascimento"
							value={this.state.creditoInput.dataNascimento}
							onChange={this.onChangeInput}
							placeholder="Data nascimento"
							required
						/>
					</Col>
				: ""}

				{showUF ? 
					this.renderUF()
				: ""}

				<Col md={10} className="text-center">
					<FormGroup>
						<Checkbox
							inline
							checked
							name="cadastral"
							onChange={this.onChangeInputCheckBox}
							checked={this.state.creditoInput.cadastral}
						>
							Cadastral
						</Checkbox>
						
						<Checkbox
							inline
							name="protestoPublico"
							onChange={this.onChangeInputCheckBox}
							checked={this.state.creditoInput.protestoPublico}>
							Protesto Público 
						</Checkbox>
						
						<Checkbox
							inline
							name="receitaFederal"
							onChange={this.onChangeInputCheckBox}
							checked={this.state.creditoInput.receitaFederal}>
							Receita Federal
						</Checkbox>

						<Checkbox
							inline
							name="ccf"
							onChange={this.onChangeInputCheckBox}
							checked={this.state.creditoInput.ccf}>
							CCF
						</Checkbox>

						{this.state.creditoInput.expressTipo == "CNPJ" ?
							<Checkbox
								inline
								name="sintegra"
								onChange={this.onChangeInputCheckBox}
								checked={this.state.creditoInput.sintegra}>
								Sintegra
							</Checkbox>
						: ""}
					</FormGroup>
				</Col>
			</div>
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
			<Panel>
				<Col md={12}>
					<MyForm
						logo = {LOGO_CREDITO}
						onformSubmit = {this.onFormSubmit}
						closeMessageError = {this.props.closeMessageErrorCredito}
						options={menu.sidebar[4].subItems}
						onChange={this.onChangeType}
						type={this.props.type}
						seeModelo = {this.props.seeModel}
						status = {this.props.status}
						message = {this.props.message}
					>
						{tipo ?
							tipo == "INTERMEDIARIA" || tipo == "INTERMEDIARIAPLUS" ?
								this.renderForm(true)
							:
								tipo == "EXPRESS" ?
									this.renderFormExpress()
								: this.renderForm(false)
							: this.renderForm(false)
						}
						
					</MyForm>
				</Col>
			</Panel>
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
			<div>
				{this.form(type)}

				{loading ? <LoadingScreen /> : ""}

				<div style={{marginBottom:15}} />

				{datas.length === 0 ? 
					<span>
						<LocalizeDescription />
						<div style={{marginBottom:15}} />
                        <UltimasConsultas
                            consultas={this.props.lastQueries[this.props.type]}
                            type={this.props.type}
                            search={this.researchUltimasConsultas} />
					</span>
				:
					<Tabs id="tab-credito"
						activeKey={tabActive}
						onSelect={(key) => {changeTab(key)}}
						animation={false}
						
					>

						<PrintScreen />

						{datas.map((data, index) => {
							return (
								<Tab eventKey={data.label} 
									title={
										<Titletab
											icon={data.icon}
											label={data.label.length > 20 ? data.label.substring(0,20)+"..." : data.label}
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
				}
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
		searchCreditoExpress,
		searchCreditoIntermediaria,
		searchCreditoIntermediariaPlus,
		searchCreditoSimples,
		searchLocalize
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Credito);