import React, { Component } from "react"
import moment from "moment"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Form, FormGroup, FormControl, InputGroup, ControlLabel, Checkbox, Col, Tabs, Tab} from "react-bootstrap"

import CreditoView from "./CreditoView"
import LocalizeView from "../localize/LocalizeView"
import MyForm from "../../components/forms/Form"
import Panel from "../../components/panel/Panel"
import TitleProduct from "../../components/utils/TitleProduct"
import Titletab from "../../components/utils/TitleTab"
import UltimasConsultas from "../../components/UltimasConsultas"
import ReverConsultaMessage from "../../components/utils/ReverConsulta"
import { DateField, MyFieldGroup } from "../../components/forms/CommonForms"
import { LocalizeDescription } from "../../components/ProductDescription"
import { PrintScreen, LoadingScreen } from "../../components/utils/ElementsAtScreen"

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
} from "../../actions/actionsCredito"
import { searchLocalize } from "../../actions/index"
import { changeProductType } from "../../actions/actionsCommon"

// Constants
import { ERR_CONNECTION_REFUSED, LOADING_GIF, REQUEST_ERROR, SUCCESS } from "../../constants/utils"
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
} from "../../constants/constantsCredito"
import {
	COMPANY_NAME_SHORT,
	COMPANY_PRODUCT_CREDITO,
	COMPANY_PRODUCT_CREDITO_LABEL,
	COMPANY_PRODUCT_CREDITO_COLOR,
	COMPANY_PRODUCT_LOCALIZE,
	ICON_CREDITO,
} from "../../constants/constantsCompany"

import estados from "../../components/utils/common/estados.json"
import produtos from "../../utils/produtos.js"

class Credito extends Component {
	constructor(props) {
		super(props)

		this.consultasAtivas = this.props.consultasAtivas ? this.props.consultasAtivas[COMPANY_PRODUCT_CREDITO_LABEL] : undefined
		this.consultas = produtos[COMPANY_PRODUCT_CREDITO_LABEL].consultas
		this.produtoInformacoes = []

		if(this.consultasAtivas) {
			this.consultas.forEach(consulta => {
				const modulo = this.consultasAtivas[consulta.modulo] ? consulta.modulo : consulta.modulo2
				if(this.consultasAtivas[modulo]) {
					this.produtoInformacoes.push(
						{id:modulo, label:this.consultasAtivas[modulo].labelFront}
					)
				}
			})
		}

		this.tiposCheque = ["Apenas Cadastro", "Digitando dados do Cheque", "Por Código de Barras (CMC-7)"]

		this.state = {
			tipoCheque: "Apenas Cadastro",
			changeDataNascimento: false,
			creditoInput: {
				documento: null,
				dataNascimento: moment(),
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
				servico: null,
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
		
		if(this.consultasAtivas) {
			this.consultasAtivas.SEGAM || this.consultasAtivas.PACC ? this.props.getLastQueries(COMPLETA_CODE_PF, "COMPLETA") : ""
			this.consultasAtivas.SEARCHCREDITOINTERMEDIARIAPF || this.consultasAtivas.SEARCHCREDITOINTERMEDIARIAPJ ? this.props.getLastQueries(INTERMEDIARIA_CODE_PF, "INTERMEDIARIA") : ""
			this.consultasAtivas.SEARCHINTERMEDIARIAPLUSPF || this.consultasAtivas.SEARCHINTERMEDIARIAPLUSPJ ? this.props.getLastQueries(INTERMEDIARIA_PLUS_CODE_PF, "INTERMEDIARIAPLUS") : ""
			this.consultasAtivas.SEARCHCDLSIMPLES ? this.props.getLastQueries(SIMPLES_CODE, "SIMPLES") : ""
			this.consultasAtivas["Cheque PF"] || this.consultasAtivas["Cheque PJ"] ? this.props.getLastQueries(CHEQUE_CODE_PF, "CHEQUE") : ""
			this.consultasAtivas.SEARCHCREDITOEXPRESSPF || this.consultasAtivas.SEARCHCREDITOEXPRESSPJ ? this.props.getLastQueries(EXPRESS_CODE_PF, "EXPRESS") : ""
		}
	}

	renderChequeObject = () => {
		return {
			documento : null,
			tipo : null, 
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

	switchCaseCreditoOptions = (type, creditoInput) => {
		let documento = creditoInput.documento.replace(/[^0-9]/g,"")
		if(type.match("INTERMEDIARIAPLUS"))
			this.props.searchCreditoIntermediariaPlus(documento, creditoInput.estado)
		else if(type.match("INTERMEDIARIA"))
			this.props.searchCreditoIntermediaria(documento, creditoInput.estado)
		else if(type.match("SIMPLES"))
			this.props.searchCreditoSimples(documento)
		else if(type.match("EXPRESS")) {
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
				requestExpress["uf"] = creditoInput.estado
				requestExpress["sintegra"] = creditoInput.sintegra
			}
			this.props.searchCreditoExpress(requestExpress, documento, creditoInput.expressTipo)
		}
		else if(type.match("EXPRESS")) {
			let cheque = this.renderChequeObject()
			cheque.documento = documento
			cheque.tipo = creditoInput.documento.length > 11 ? "pj" : "pf"

			this.props.searchCreditoCheque(cheque, cheque.tipo === "pf" ? "CPF" : "CNPJ")
		}
		else
			this.searchCreditoCompleta(documento)
	}

	onFormSubmit = (evt) => {
		evt.preventDefault()

		this.props.loadingCredito()

		let { creditoInput } = this.state

		if(this.state.changeDataNascimento)
			creditoInput.dataNascimento = moment(this.state.creditoInput.dataNascimento).format("YYYY-MM-DD")

		this.switchCaseCreditoOptions(this.props.type, creditoInput)

		this.setState({
			creditoInput: {
				...this.state.creditoInput,
				documento: "",
				dataNascimento: null,
				expressTipo: "CPF",
				banco: null,
				agência: null,
				conta: null,
				digitoConta: null,
				chequeInicial: null,
				digitoChequeInicial: null,
				CMC7: null,
				folhas: null,
				servico: null,
				cadastral: true,
				receitaFederal: false,
				ccf: false,
				protestoPublico: false,
				sintegra: false
			}
		})
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
							this.props.type == "SEARCHCDLSIMPLES" ?
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
						<DateField
							required
							placeholder="Data nascimento"
							startDate={this.state.creditoInput.dataNascimento}
							onChange={(date) => this.setState({
								creditoInput:{...this.state.creditoInput, dataNascimento:date},
								changeDataNascimento:true
							})}
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

	researchUltimasConsultas = (entrada, tipo) => {
		this.props.loadingCredito()

		let { creditoInput } = this.state

		if(this.props.type === "EXPRESS") {
			entrada = JSON.parse(entrada)

			creditoInput = { ...creditoInput, ...entrada, documento: entrada.cpf || entrada.cnpj }
		} else {
			creditoInput.documento = entrada
		}

		this.switchCaseCreditoOptions(this.props.type, creditoInput)
	}

	searchInLocalize = (documento, tipo) => {
		let search = tipo === "CPF" ? SEARCH_BY_LOCALIZE_CPF_IN_CREDITO : SEARCH_BY_LOCALIZE_CNPJ_IN_CREDITO;
		this.props.loadingCredito();
		this.props.searchLocalize(documento, tipo, search);
	}

	searchCreditoCompleta = (documento, tipo) => {
		tipo = tipo ? tipo : documento.length <= 11 ? "CPF" : "CNPJ"
		this.props.loadingCredito()
		this.props.searchCreditoCompleta(documento, tipo, GET_CREDITO_COMPLETA)
	}

	form = (tipo) => {
		return (
			<Panel>
				<TitleProduct
					icon={ICON_CREDITO}
					title={this.consultasAtivas.produtoDescricao}
					color={COMPANY_PRODUCT_CREDITO_COLOR}
				/>
				<Col md={12}>
					<MyForm
						onformSubmit = {this.onFormSubmit}
						closeMessageError = {this.props.closeMessageErrorCredito}
						options={this.produtoInformacoes}
						onChange={this.onChangeType}
						type={this.props.type}
						seeModelo = {this.props.seeModel}
						status = {this.props.status}
						message = {this.props.message}
					>
						{tipo ?
							tipo.startsWith("SEARCHCREDITOINTERMEDIARIA")
							|| tipo.startsWith("SEARCHINTERMEDIARIAPLUS") ?
								this.renderForm(true)
							:
								tipo.startsWith("SEARCHCREDITOEXPRESS") ?
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
		let status = this.props.status
		let type = this.props.type
		let loading = this.props.loading
		let datas = this.props.datas
		let tabActive = this.props.tabActive
		let changeTab = this.props.changeTab

		if(status == SUCCESS || status == ERR_CONNECTION_REFUSED || status == REQUEST_ERROR) {
			window.scrollTo(0, 0)
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
							produtoInformacoes={this.produtoInformacoes}
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
									{data.data.reverConsulta ?
										<ReverConsultaMessage />
									:""}

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
		type: state.credito.type,
		consultasAtivas: state.user.consultasAtivas
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