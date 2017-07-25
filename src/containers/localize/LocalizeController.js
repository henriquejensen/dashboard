import React, { Component } from "react"
import moment from "moment"
import Tooltip from 'react-tooltip'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { ControlLabel, Checkbox, Col, Tabs, Tab, Form, FormGroup, FormControl, InputGroup } from "react-bootstrap"

//Actions
import { changeProductType } from "../../actions/actionsCommon"
import {
		getLastQueries,
		loadingLocalize,
		searchLocalize,
		searchLocalizeByTelefone,
		searchLocalizeByEmail,
		searchLocalizeByNomeEndereco,
		searchPessoasRelacionadas,
		searchTelefonesPessoaRelacionada,
		searchEnderecosPessoaRelacionada,
		searchEnderecosTelefonesUltimasConsultas,
		searchEnderecosTelefonesResultadosBusca,
		seeModel,
		closeModel,
		closeTab,
		changeTab,
		closeMessageErrorLocalize
} from "../../actions/index"

//Components
import BuscaPorRelacionados from "../../components/relacionados/BuscaPorRelacionados"
import Protocolo from "../../components/protocolo/Protocolo"
import LocalizeView from "./LocalizeView"
import CreditoView from "../credito/CreditoView"
import MyForm from "../../components/forms/Form"
import Titletab from "../../components/utils/Titletab"
import Panel from "../../components/panel/Panel"
import UltimasConsultas from "../../components/UltimasConsultas"
import ReverConsultaMessage from "../../components/utils/ReverConsulta"
import { LocalizeDescription } from "../../components/ProductDescription"
import { PrintScreen, LoadingScreen } from "../../components/utils/ElementsAtScreen"
import { DateField } from "../../components/forms/CommonForms"

//Constants
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_LOCALIZE, COMPANY_PRODUCT_CREDITO, LOGO_LOCALIZE, COMPANY_PRODUCT_LOCALIZE_LABEL } from "../../constants/constantsCompany"
import { SUCCESS, REQUEST_ERROR, ERR_CONNECTION_REFUSED } from "../../constants/utils"
import { CPF_CODE, CNPJ_CODE, EMAIL_CODE, TELEFONE_CODE, NOME_ENDERECO_CODE } from "../../constants/constantsLocalize"

//Utils
import estados from "../../components/utils/common/estados.json"
import produtos from "../../utils/produtos.js"

class LocalizeController extends Component {
	constructor(props) {
		super(props)

		this.consultasAtivas = this.props.consultasAtivas ? this.props.consultasAtivas[COMPANY_PRODUCT_LOCALIZE_LABEL] : undefined
		this.consultas = produtos[COMPANY_PRODUCT_LOCALIZE_LABEL].consultas
		this.produtoInformacoes = []

		this.consultas.forEach(consulta => {
			if(this.consultasAtivas && this.consultasAtivas[consulta.modulo]) {
				this.produtoInformacoes.push(
					{id:consulta.modulo, label:this.consultasAtivas[consulta.modulo].labelFront}
				)
			}
		})

		this.state = {
			localizeInput: {
				nome: "",
				dataNascimento: moment(),
				sexo: "",
				uf: "",
				cidade: "",
				bairro: "",
				complemento: "",
				enderecoOuCep: "",
				numeroInicial: "",
				numeroFinal: "",
			},
			buscaAvancada: false,
			changeDataNascimento: false
		}
	}

	componentWillMount() {
		document.title = COMPANY_PRODUCT_LOCALIZE + " > " + COMPANY_NAME_SHORT
		if(this.consultasAtivas) {
			this.consultasAtivas.SEARCHPF ? this.props.getLastQueries(CPF_CODE, "SEARCHPF") : ""
			this.consultasAtivas.SEARCHPJ ? this.props.getLastQueries(CNPJ_CODE, "SEARCHPJ") : ""
			this.consultasAtivas.SEARCHPHONE ? this.props.getLastQueries(TELEFONE_CODE, "SEARCHPHONE") : ""
			this.consultasAtivas.SEARCHEMAIL ? this.props.getLastQueries(EMAIL_CODE, "SEARCHEMAIL") : ""
			this.consultasAtivas["SEARCH-ADDRESS-OR-NAME"] ? this.props.getLastQueries(NOME_ENDERECO_CODE, "SEARCH-ADDRESS-OR-NAME") : ""
		}
	}

	researchUltimasConsultas = (entrada) => {
		this.props.loadingLocalize()

		if(this.props.type == "SEARCHPF" || this.props.type == "SEARCHPJ") {
			const isCpfOrCnpj = this.props.type === "SEARCHPF" ? "CPF" : "CNPJ"
			this.props.searchLocalize(entrada, isCpfOrCnpj)
		}
		else if(this.props.type == "SEARCHPHONE")
			this.props.searchLocalizeByTelefone(entrada);
		else if(this.props.type.match("EMAIL"))
			this.props.searchLocalizeByEmail(entrada);
		else {
			let nomeEndereco = {
				...this.state.localizeInput,
				dataNascimento: "",
				...entrada
			}

			this.props.searchLocalizeByNomeEndereco(nomeEndereco, this.props.type, this.props.type);
		}
	}

	searchEnderecosTelefonesResultadosBusca = (isCpfOrCnpj, indexLabel, indexArrayElements, isEnderecoOrTelefone, documento) => {
		this.props.loadingLocalize();
		this.props.searchEnderecosTelefonesResultadosBusca(isCpfOrCnpj, indexLabel, indexArrayElements, isEnderecoOrTelefone, documento);
	}

	//busca as pessoas relacionadas a este doc, tipo é CPF ou CNPJ
	searchPessoasRelacionadas = (doc, label) => {
		this.props.loadingLocalize();
		this.props.searchPessoasRelacionadas(doc, label);
	}
	
	//recebe o documento da pessoa e da pessoa relacionada a esta e
	//irá buscar pelo telefone ou endereço da pessoa
	searchTelefonesPessoaRelacionada = (documento, docPessoaRelacionado, isCpfOrCnpj) => {
		this.props.loadingLocalize();
		this.props.searchTelefonesPessoaRelacionada(documento, docPessoaRelacionado, isCpfOrCnpj);
	}

	//recebe o documento da pessoa e da pessoa relacionada a esta e
	//irá buscar pelo telefone ou endereço da pessoa
	searchEnderecosPessoaRelacionada = (documento, docPessoaRelacionado, isCpfOrCnpj) => {
		this.props.loadingLocalize();
		this.props.searchEnderecosPessoaRelacionada(documento, docPessoaRelacionado, isCpfOrCnpj);
	}

	searchLocalize = (doc, tipo) => {
		this.props.loadingLocalize()
		this.props.searchLocalize(doc, tipo)
	}

	searchLocalizeByNomeEndereco = (data, tipo, label) => {
		this.props.loadingLocalize();
		this.props.searchLocalizeByNomeEndereco(data, tipo, label);
	}

	onFormSubmit = (evt) => {
		evt.preventDefault()

		this.props.loadingLocalize()
		let type = this.props.type

		if(type === "SEARCHPF" || type === "SEARCHPJ") {
			let documento = this.state.documento ? this.state.documento : "DOCUMENTO";
			const isCpfOrCnpj = type === "SEARCHPF" ? "CPF" : "CNPJ"
			this.props.searchLocalize(documento, isCpfOrCnpj)
			this.setState({
				documento: ""
			})
		} else if(type === "SEARCHEMAIL") {
			this.props.searchLocalizeByEmail(this.state.email)
			this.setState({
				email: ""
			})
		} else if(type === "SEARCHPHONE") {
			let telefone = this.state.telefone
			telefone = telefone.replace(/[^0-9]/g,"")
			this.props.searchLocalizeByTelefone(telefone)
			this.setState({
				telefone: ""
			})
		} else {
			let { nome } = this.state
			let labelToTab = nome ? "NOME" : "ENDERECO"

			//Forma de driblar o moment() setado no state inicial no constructor, senao sempre sera enviado a
			//datanascimento como a data atual
			let localizeInput = {
				...this.state.localizeInput,
				dataNascimento: null
			}

			if(this.state.changeDataNascimento)
				localizeInput.dataNascimento = moment(this.state.localizeInput.dataNascimento).format("YYYY-MM-DD")

			this.props.searchLocalizeByNomeEndereco(localizeInput, type, labelToTab)

			this.setState({
				localizeInput: {
					nome: "",
					dataNascimento: moment(),
					sexo: "",
					uf: "",
					cidade: "",
					bairro: "",
					complemento: "",
					enderecoOuCep: "",
					numeroInicial: "",
					numeroFinal: "",
				},
				changeDataNascimento: false
			})
		}
	}

	onChangeType = (evt) => {
		this.props.changeProductType(COMPANY_PRODUCT_LOCALIZE, evt.target.value)
	}

	onChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	onChangeInput = (evt) => {
		let newStateLocalize = this.state.localizeInput;
		newStateLocalize[evt.target.name] = evt.target.value
		this.setState({
			localize: newStateLocalize
		})
	}

	hiddenBuscaAvancada = () => {
		this.setState({
			buscaAvancada: !this.state.buscaAvancada
		})
	}

	closeTab = (index) => {
		{/*Fecha as abas, quando sobrar um chama a funcao para fechar tudo (closeModel)*/}
		if(this.props.datas.length > 1) {
			this.props.closeTab(index);
		} else {
			this.props.closeModel();
		}
	}

	renderForm = () => {
		return (
			<span>
				<Col md={8}>
					<input
						className="form-control"
						type={
							this.props.type == "SEARCHPHONE" ?
								"number"
								: this.props.type == "SEARCHEMAIL" ?
									"email"
							: "text"
						}
						placeholder={
							this.props.type == "SEARCHPHONE" ?
								"Digite o DDD + telefone "
								: this.props.type == "SEARCHEMAIL" ?
									"Digite o email"
							: "Digite o documento"
						}
						value={
							this.props.type == "SEARCHPHONE" ?
								this.state.telefone
								: this.props.type == "SEARCHEMAIL" ?
									this.state.email
							: this.state.documento
						}
						name={
							this.props.type == "SEARCHPHONE" ?
								"telefone"
								: this.props.type == "SEARCHEMAIL" ?
									"email"
							: "documento"
						}
						required
						onChange={this.onChange}
					/>
				</Col>
			</span>
		)
	}

	renderFormNomeEndereco = () => {
		return (
			<span>
				<Col md={4}>
					<input
						className="form-control"
						type="text"
						name="enderecoOuCep"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.enderecoOuCep}
						placeholder="Endereço ou CEP"
						required={this.state.localizeInput.nome ? false : true}
					/>
				</Col>

				<Col md={4}>
					<input
						className="form-control"
						type="text"
						name="cidade"
						required={(this.state.localizeInput.uf || this.state.localizeInput.bairro)}
						value={this.state.localizeInput.cidade}
						onChange={this.onChangeInput}
						placeholder="Digite o nome da cidade (sem abreviação)"
					/>
				</Col>

				<Col md={2}>
					<select
						className="form-control"
						name="uf"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.uf}
					>
						<option value="">Selecione UF</option>
						{estados.estados.map((estado,i) => {
							return <option value={estado.sigla} key={i}>{estado.sigla}</option>
						})}
					</select>
				</Col>

				<Col md={this.state.buscaAvancada ? 8 : 6}>
					<input
						className="form-control"
						name="nome"
						value={this.state.localizeInput.nome}
						onChange={this.onChangeInput}
						type="text"
						placeholder="Digite o Nome"
					/>
				</Col>

				<Col md={2} style={{marginBottom:0}}>
					<DateField
						placeholder="Data nascimento"
						startDate={this.state.localizeInput.dataNascimento}
						onChange={(date) => this.setState({
							localizeInput:{...this.state.localizeInput, dataNascimento:date},
							changeDataNascimento:true
						})}
					/>
				</Col>

				<Col md={2}>
					<select
						className="form-control"
						name="sexo"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.sexo}
					>
						<option value="">Sexo</option>
						<option value="M">M</option>
						<option value="F">F</option>
					</select>
				</Col>

				{this.state.buscaAvancada ?
					<div>
						<Col md={4}>
							<input
								className="form-control"
								type="text"
								name="bairro"
								value={this.state.localizeInput.bairro}
								onChange={this.onChangeInput}
								placeholder="Digite o nome do bairro"
							/>
						</Col>

						<Col md={2}>
							<input
								className="form-control"
								type="text"
								name="complemento"
								onChange={this.onChangeInput}
								value={this.state.localizeInput.complemento}
								placeholder="Complemento"
							/>
						</Col>
						<Col md={2}>
							<input
								className="form-control"
								type="number"
								name="numeroInicial"
								onChange={this.onChangeInput}
								value={this.state.localizeInput.numeroInicial}
								placeholder="Nº inicial"
							/>
						</Col>
						<Col md={2}>
							<input
								className="form-control"
								type="number"
								name="numeroFinal"
								onChange={this.onChangeInput}
								value={this.state.localizeInput.numeroFinal}
								placeholder="Nº final"
							/>
						</Col>
					</div>
				: ""}
			</span>
		)
	}

	searchEnderecosTelefonesUltimasConsultas = (tipo, consulta, index, documento) => {
		this.props.loadingLocalize();
		this.props.searchEnderecosTelefonesUltimasConsultas(tipo, consulta, index, documento);
	}

	form = (tipo) => {
		return (
			<Panel>
				<Col md={12}>
					<MyForm
						logo = {LOGO_LOCALIZE}
						onformSubmit = {this.onFormSubmit}
						closeMessageError = {this.props.closeMessageErrorLocalize}
						buscaAvancada={tipo == "SEARCH-ADDRESS-OR-NAME" ? this.state.buscaAvancada : undefined}
						hiddenBuscaAvancada={tipo == "SEARCH-ADDRESS-OR-NAME" ? this.hiddenBuscaAvancada : undefined}
						options={this.produtoInformacoes}
						onChange={this.onChangeType}
						type={this.props.type}
						seeModelo = {this.props.seeModel}
						status = {this.props.status}
						message = {this.props.message}
					>
						{tipo ?
							tipo == "SEARCHPF" || tipo == "SEARCHPJ" ? 
								this.renderForm()
								: tipo == "SEARCHPHONE" ?
									this.renderForm()
								: tipo == "SEARCHEMAIL" ?
									this.renderForm()
								: this.renderFormNomeEndereco()
							: this.renderForm()
						}
					</MyForm>
				</Col>
			</Panel>
		)
	}

	render() {
		let loading = this.props.loading
		if(this.props.status == SUCCESS || this.props.status == ERR_CONNECTION_REFUSED || this.props.status == REQUEST_ERROR) {
			window.scrollTo(0, 0);
		}
		return(
			<div>
				{this.form(this.props.type)}

				{loading ? <LoadingScreen /> : ""}

				<div style={{marginBottom:15}} />

				{this.props.datas.length > 0 ? <PrintScreen /> : ""}

				{this.props.datas.length === 0 ? 
					<span>
						<LocalizeDescription />
						<div style={{marginBottom:15}} />
                        <UltimasConsultas
							consultas={this.props.lastQueries[this.props.type]}
							produtoInformacoes={this.produtoInformacoes}
                            type={this.props.type}
                            search={this.researchUltimasConsultas}
                            searchEnderecosTelefonesUltimasConsultas={this.props.type == "SEARCHPF" || this.props.type == "SEARCHPJ" ? this.searchEnderecosTelefonesUltimasConsultas : ""} />
					</span>
				:
					<Tabs id="uncontrolled-tab-example"
						activeKey={this.props.tabActive}
						onSelect={(key) => {this.props.changeTab(key)}}
					>
						{this.props.datas.map((data, index) => {
							return (
								<Tab
									animation={true}
									eventKey={data.label}
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

									{/*Verifica se o produto pesquisado é localize, pois pode ser gerado abas de outros produtos no Localize*/}
									{data.produto == COMPANY_PRODUCT_LOCALIZE ?
										<LocalizeView
											data={data.data}
											tipo={data.tipo}
											index={index}
											label={data.label}
											searchLocalize={this.searchLocalize}
											searchPessoasRelacionadas={this.searchPessoasRelacionadas}
											pessoasRelacionadas={data.pessoasRelacionadas}
											searchTelefonesPessoaRelacionada={this.searchTelefonesPessoaRelacionada}
											searchEnderecosPessoaRelacionada={this.searchEnderecosPessoaRelacionada}
											searchLocalizeByNomeEndereco={this.searchLocalizeByNomeEndereco}/>
									:
									data.produto == COMPANY_PRODUCT_CREDITO ?
										<CreditoView
											data={data.data}
											tipo={data.tipo}
											index={index}
											searchPerson={this.searchLocalize}/>
									: 	<span>
											<BuscaPorRelacionados
												relacionados={data.data.response ? data.data.response : data.data}
												searchPerson={this.searchLocalize}
												headerBody={data.label}
												searchEnderecosTelefonesResultadosBusca={this.searchEnderecosTelefonesResultadosBusca}
												indexLabel={index}
											/>
											<Protocolo info={data.data.cabecalho} />
										</span>
									}
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
		datas: state.localize.response,
		status: state.localize.status,
		message: state.localize.message,
		loading: state.localize.loading,
		tabActive: state.localize.tabActive,
		lastQueries: state.localize.lastQueries,
		type: state.localize.type,
		consultasAtivas: state.user.consultasAtivas
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
			changeProductType,
			getLastQueries,
			loadingLocalize,
			searchLocalize,
			searchLocalizeByTelefone,
			searchLocalizeByEmail,
			searchLocalizeByNomeEndereco,
			searchPessoasRelacionadas,
			searchTelefonesPessoaRelacionada,
			searchEnderecosPessoaRelacionada,
			searchEnderecosTelefonesUltimasConsultas,
			searchEnderecosTelefonesResultadosBusca,
			seeModel,
			closeModel,
			closeTab,
			changeTab,
			closeMessageErrorLocalize
		},
		dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalizeController);