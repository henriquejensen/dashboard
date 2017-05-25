import React, { Component } from "react";
import Tooltip from 'react-tooltip';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ControlLabel, Checkbox, Col, Tabs, Tab, Form, FormGroup, FormControl, InputGroup } from "react-bootstrap";

import { changeProductType } from "../../actions/actionsCommon";
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
} from "../../actions/index";

import BuscaPorRelacionados from "../../components/relacionados/BuscaPorRelacionados";
import Protocolo from "../../components/protocolo/Protocolo";
import LocalizeView from "./LocalizeView";
import CreditoView from "../credito/CreditoView";
import MyForm from "../../components/forms/Form";
import Titletab from "../../components/utils/Titletab";
import Panel from "../../components/panel/Panel";
import UltimasConsultas from "../../components/UltimasConsultas";
import { LocalizeDescription } from "../../components/ProductDescription";
import { PrintScreen, LoadingScreen } from "../../components/utils/ElementsAtScreen";

import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_LOCALIZE, COMPANY_PRODUCT_CREDITO } from "../../constants/constantsCompany";
import { LOGO_LOCALIZE, ICON_LOCALIZE, LOADING_GIF, SUCCESS, REQUEST_ERROR, ERR_CONNECTION_REFUSED } from "../../constants/utils";
import { CPF_CODE, CNPJ_CODE, EMAIL_CODE, TELEFONE_CODE, NOME_ENDERECO_CODE } from "../../constants/constantsLocalize";

import estados from "../../components/utils/common/estados.json";
import menu from "../../components/utils/common/menu.json";

class LocalizeController extends Component {
	state = {
		localizeInput: {
			nome: "",
			dataNascimento: "",
			sexo: "",
			uf: "",
			cidade: "",
			bairro: "",
			complemento: "",
			enderecoOuCep: "",
			numeroInicial: "",
			numeroFinal: "",
		},
		buscaAvancada: false
	}

	componentWillMount() {
		document.title = COMPANY_PRODUCT_LOCALIZE + " > " + COMPANY_NAME_SHORT;
		this.props.loadingLocalize();
		this.props.getLastQueries(CPF_CODE, "CPF");
		this.props.getLastQueries(CNPJ_CODE, "CNPJ");
		this.props.getLastQueries(TELEFONE_CODE, "TELEFONE");
		this.props.getLastQueries(EMAIL_CODE, "EMAIL");
		this.props.getLastQueries(NOME_ENDERECO_CODE, "NOMEOUENDERECO");
	}

	researchUltimasConsultas = (entrada) => {
		this.props.loadingLocalize();

		if(this.props.type == "CPF" || this.props.type == "CNPJ")
			this.props.searchLocalize(entrada, this.props.type);
		else if(this.props.type == "TELEFONE")
			this.props.searchLocalizeByTelefone(entrada);
		else if(this.props.type == "EMAIL")
			this.props.searchLocalizeByEmail(entrada);
		else {
			let nomeEndereco = Object.assign({}, this.state.localizeInput);

			if(this.props.type == "NOME")
				nomeEndereco.nome = entrada;
			else
				nomeEndereco.enderecoOuCep = entrada;
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
		this.props.loadingLocalize();
		this.props.searchLocalize(doc, tipo);
	}

	searchLocalizeByNomeEndereco = (data, tipo, label) => {
		this.props.loadingLocalize();
		this.props.searchLocalizeByNomeEndereco(data, tipo, label);
	}

	onFormSubmit = (evt) => {
		evt.preventDefault();

		this.props.loadingLocalize();
		let type = this.props.type;

		if(type == "CPF" || type == "CNPJ") {
			let documento = this.state.documento ? this.state.documento : "DOCUMENTO";
			
			this.props.searchLocalize(documento, type);
			this.setState({
				documento: ""
			})
		} else if(type == "EMAIL") {
			this.props.searchLocalizeByEmail(this.state.email);
			this.setState({
				email: ""
			})
		} else if(type == "TELEFONE") {
			let telefone = this.state.telefone;
			telefone = telefone.replace(/[^0-9]/g,"");
			this.props.searchLocalizeByTelefone(telefone);
			this.setState({
				telefone: ""
			})
		} else {
			let labelToTab = type == "NOME" ? this.state.localizeInput.nome : this.state.localizeInput.enderecoOuCep
			this.props.searchLocalizeByNomeEndereco(this.state.localizeInput, type, labelToTab);

			this.setState({
				localizeInput: {
					nome: "",
					dataNascimento: "",
					sexo: "",
					uf: "",
					cidade: "",
					bairro: "",
					complemento: "",
					enderecoOuCep: "",
					numeroInicial: "",
					numeroFinal: "",
				}
			})
		}
	}

	onChangeType = (evt) => {
		this.props.changeProductType("localize", evt.target.value)
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
				<Col md={7}>
					<input
						className="form-control"
						type={
							this.props.type == "TELEFONE" ?
								"number"
								: this.props.type == "EMAIL" ?
									"email"
							: "text"
						}
						placeholder={
							this.props.type == "TELEFONE" ?
								"Digite o DDD + telefone "
								: this.props.type == "EMAIL" ?
									"Digite o email"
							: "Digite o documento"
						}
						value={
							this.props.type == "TELEFONE" ?
								this.state.telefone
								: this.props.type == "EMAIL" ?
									this.state.email
							: this.state.documento
						}
						name={
							this.props.type == "TELEFONE" ?
								"telefone"
								: this.props.type == "EMAIL" ?
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

	renderFormEndereco = () => {
		return (
			<span>
				<Col md={10}>
					<input
						className="form-control"
						type="text"
						name="enderecoOuCep"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.enderecoOuCep}
						placeholder="Endereço ou CEP"
						required
					/>
				</Col>

				<Col md={7}>
					<input
						className="form-control"
						type="text"
						name="complemento"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.complemento}
						placeholder="Complemento"
					/>
				</Col>
				<Col md={3}>
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
				<Col md={5}>
					<input
						className="form-control"
						type="text"
						name="cidade"
						value={this.state.localizeInput.cidade}
						onChange={this.onChangeInput}
						placeholder="Digite o nome da cidade (sem abreviação)"
					/>
				</Col>
				<Col md={this.state.buscaAvancada ? 5 : 2}>
					<input
						className="form-control"
						type="text"
						name="bairro"
						value={this.state.localizeInput.bairro}
						onChange={this.onChangeInput}
						placeholder="Digite o nome do bairro"
					/>
				</Col>

				{/*Input da busca avançada*/}
				{this.state.buscaAvancada ?
					<Col md={6}>
						<input
							className="form-control"
							name="nome"
							value={this.state.localizeInput.nome}
							onChange={this.onChangeInput}
							type="text"
							placeholder="Digite o Nome" />
					</Col>
				: ""}

				{this.state.buscaAvancada ?
					<Col md={2}>
						<input
							className="form-control"
							type="date"
							name="dataNascimento"
							value={this.state.localizeInput.dataNascimento}
							onChange={this.onChangeInput}
						/>
					</Col>
				: ""}

				{this.state.buscaAvancada ?
					<Col md={1}>
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
				: ""}
			
			</span>
		)
	}

	renderFormNome = () => {
		return (
			<span>
				<Col md={6}>
					<input
						className="form-control"
						name="nome"
						value={this.state.localizeInput.nome}
						onChange={this.onChangeInput}
						type="text"
						placeholder="Digite o Nome (sem abreviação)"
						required
					/>
				</Col>
				
				<Col md={2}>
					<a data-tip data-for="tooltipDataNascimento">
						<input
							className="form-control"
							type="date"
							name="dataNascimento"
							value={this.state.localizeInput.dataNascimento}
							onChange={this.onChangeInput}
						/>
					</a>
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
				<Col md={4}>
					<input 
						className="form-control"
						type="text"
						name="cidade"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.cidade}
						placeholder="Digite o nome da cidade (sem abreviação)"
					
					/>
				</Col>
				<Col md={this.state.buscaAvancada ? 4 : 3}>
					<input
						className="form-control"
						type="text"
						name="bairro"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.bairro}
						placeholder="Digite o nome do bairro"
					/>
				</Col>

				{/*Input da busca avançada*/}
				{this.state.buscaAvancada ?
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
				: ""}

				{this.state.buscaAvancada ?
					<Col md={5}>
						<input
							className="form-control"
							name="enderecoOuCep"
							onChange={this.onChangeInput}
							value={this.state.localizeInput.enderecoOuCep}
							type="text"
							placeholder="Endereço ou CEP" />
					</Col>
				: ""}

				{this.state.buscaAvancada ?
					<Col md={2}>
						<input
							className="form-control"
							type="number"
							name="numeroInicial"
							onChange={this.onChangeInput}
							value={this.state.localizeInput.numeroInicial}
							placeholder="Nº inicial" />
					</Col>
				: ""}
					
				{this.state.buscaAvancada ?
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
						buscaAvancada={tipo == "NOME" || tipo == "ENDERECO" ? this.state.buscaAvancada : undefined}
						hiddenBuscaAvancada={tipo == "NOME" || tipo == "ENDERECO" ? this.hiddenBuscaAvancada : undefined}
						options={menu.sidebar[0].subItems}
						onChange={this.onChangeType}
						type={this.props.type}
						seeModelo = {this.props.seeModel}
						status = {this.props.status}
						message = {this.props.message}
					>
						{tipo ?
							tipo == "CPF" || tipo == "CNPJ" ? 
								this.renderForm()
							: tipo == "NOME" ? 
								this.renderFormNome()
								: tipo == "TELEFONE" ?
									this.renderForm()
								: tipo == "EMAIL" ?
									this.renderForm()
								: this.renderFormEndereco()
							: this.renderForm()
						}
					</MyForm>
				</Col>
			</Panel>
		)
	}

	render() {
		let loading = this.props.loading;
		if(this.props.status == SUCCESS || this.props.status == ERR_CONNECTION_REFUSED || this.props.status == REQUEST_ERROR) {
			window.scrollTo(0, 0);
		}
		return(
			<div className="container my-container">
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
                            type={this.props.type}
                            search={this.researchUltimasConsultas}
                            searchEnderecosTelefonesUltimasConsultas={this.props.type == "CPF" || this.props.type == "CNPJ" ? this.searchEnderecosTelefonesUltimasConsultas : ""} />
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
		type: state.localize.type
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