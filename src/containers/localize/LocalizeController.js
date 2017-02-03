import React, { Component } from "react";
import {
		loadingLocalize,
		searchLocalize,
		searchLocalizeByParams,
		searchPessoasRelacionadas,
		showRelacionados,
		seeModel,
		closeModel,
		closeTab,
		getEstados
} from "../../actions/index";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Tabs, Tab, Form, FormGroup, FormControl, InputGroup, ControlLabel, Checkbox, Col} from "react-bootstrap";

import LocalizeView from "./LocalizeView";

import MyForm from "../../components/forms/Form";
import Titletab from "../../components/utils/Titletab";

import { LOGO_LOCALIZE, ICON_LOCALIZE } from "../../constants/utils";

class LocalizeController extends Component {
	constructor(props) {
		super(props);

		this.state = {
			documento: "",
			telefone: "",
			email: "",
			nome: "",
			endereco: "",
			estado: "",
			cidade: "",
			bairro: "",
			tipo: "",
			nextTab: "",
			changeTab: false,
			buscaAvancada: false
		}

		this.onLocalizeSubmit = this.onLocalizeSubmit.bind(this);
		this.searchLocalize = this.searchLocalize.bind(this);
		this.searchPessoasRelacionadas = this.searchPessoasRelacionadas.bind(this);
		this._showRelacionados = this._showRelacionados.bind(this);
		this.onChange = this.onChange.bind(this);
		this.form = this.form.bind(this);
	}

	componentWillMount() {
		this.props.getEstados();
		
	}

	componentDidMount() {
		document.title = "Assertiva > Localize";
	}

	searchPessoasRelacionadas(doc, tipo) {
		this.props.loadingLocalize();
		this.props.searchPessoasRelacionadas(doc, tipo);
	}

	//recebe o documento da pessoa e da pessoa relacionada a esta.
	_showRelacionados(doc, docPessoaRelacionado, tipo) {
		this.props.loadingLocalize();
		this.props.showRelacionados(doc, docPessoaRelacionado, tipo);
	}

	searchLocalize(doc, tipo) {
		this.setState({
			changeTab: false
		})
		this.props.loadingLocalize();
		this.props.searchLocalize(doc, tipo);
	}

	onLocalizeSubmit(evt) {
		evt.preventDefault();

		this.props.loadingLocalize();

		let tipo = this.state.tipo ? this.state.tipo :  location.pathname.split("/")[2].toUpperCase();

		if(tipo == "CPF" || tipo == "CNPJ") {
			let searchBy = "pf";
			if(tipo == "CNPJ")
				searchBy = "pj";
			
			this.props.searchLocalize(this.state.documento, searchBy);
		} else {
			const params = {
				telefone: this.state.telefone,
				nome: this.state.nome,
				endereco: this.state.endereco,
				estado: this.state.estado,
				cidade: this.state.cidade,
				bairro: this.state.bairro,
				
			}
			this.props.searchLocalizeByParams(params, tipo);
		}

		this.setState({
			documento: "",
			telefone: "",
			email: "",
			nome: "",
			endereco: "",
			estado: "",
			cidade: "",
			bairro: "",
			tabActive: "",
			tipo: "",
			changeTab: false
		});
	}

	onChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	renderForm(formType, options, optionSelected) {
		return (
			<MyForm
				icon = {ICON_LOCALIZE}
				logo = {LOGO_LOCALIZE}
				showModel = {this.props.datas.length == 1 && this.props.datas[0].data.CPF == 11111111111 ? true : false}
				showLogo = {this.props.datas.length == 0 ? true : false}
				onChange = {this.onChange}
				onformSubmit = {this.onLocalizeSubmit}
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
					<Col md={10}>
						<input
							className="form-control"
							type={
								formType == "telefone" ?
									"number"
									: formType == "email" ?
										"email"
								: "text"
							}
							placeholder={
								formType == "telefone" ?
									"Digite o telefone"
									: formType == "email" ?
										"Digite o email"
								: "Digite o documento"
							}
							value={
								formType == "telefone" ?
									this.state.telefone
									: formType == "email" ?
										this.state.email
								: this.state.documento
							}
							name={
								formType == "telefone" ?
									"telefone"
									: formType == "email" ?
										"email"
								: "documento"
							}
							onChange={this.onChange}
							style={{width:'100%'}}/>
					</Col>
			</MyForm>
		)
	}

	renderFormEndereco(formType, options, optionSelected) {
		return (
			<MyForm
				icon = {ICON_LOCALIZE}
				logo = {LOGO_LOCALIZE}
				showModel = {this.props.datas.length == 1 && this.props.status=="model" ? true : false}
				showLogo = {this.props.datas.length == 0 ? true : false}
				onformSubmit = {this.onLocalizeSubmit}
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
					<Col md={4}>
						<input className="form-control" type="text" placeholder="Endereço ou CEP" style={{width:'100%'}}/>
					</Col>
					<Col md={2}>
						<input className="form-control" type="text" placeholder="Complemento" style={{width:'100%'}}/>
					</Col>
					<Col md={2}>
						<input className="form-control" type="number" placeholder="Nº inicial" style={{width:'100%'}}/>
					</Col>
					<Col md={2}>
						<input className="form-control" type="number" placeholder="Nº final" style={{width:'100%'}}/>
					</Col>

					<Col md={2}>
						<FormControl componentClass="select" style={{width:'100%'}}>
							{this.props.estados.map((estado,index) => {
								return (
									<option value={estado.sigla} key={index}>{estado.sigla}</option>
								)
							})}
						</FormControl>
					</Col>
					<Col md={6}>
						<input className="form-control"  type="text" placeholder="Digite o nome da cidade" style={{width:'100%'}}/>
					</Col>
					<Col md={4}>
						<input className="form-control"  type="text" placeholder="Digite o nome do bairro" style={{width:'100%'}}/>
					</Col>

					{/*Input da busca avançada*/}
					{this.state.buscaAvancada ?
						<Col md={8}>
							<input className="form-control"  type="text" placeholder="Digite o Nome" />
						</Col>
					: ""}

					{this.state.buscaAvancada ?
						<Col md={2}>
							<input className="form-control" type="date" placeholder="Data nascimento" style={{width:'100%'}}/>
						</Col>
					: ""}

					{this.state.buscaAvancada ?
						<Col md={2}>
							<FormControl componentClass="select" style={{width:'100%'}}>
								<option>Sexo</option>
								<option value="M">M</option>
								<option value="F">F</option>
							</FormControl>
						</Col>
					: ""}
					
					{!this.state.buscaAvancada ? <div href="#" className="busca-avancada" onClick={() => {this.setState({buscaAvancada: true})}}>Busca avancada</div> : ""}

			</MyForm>
		)
	}

	renderFormNome(formType, options, optionSelected) {
		return (
			<MyForm
				icon = {ICON_LOCALIZE}
				logo = {LOGO_LOCALIZE}
				showModel = {this.props.datas.length == 1 && this.props.status=="model" ? true : false}
				showLogo = {this.props.datas.length == 0 ? true : false}
				onformSubmit = {this.onLocalizeSubmit}
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
					<Col md={6}>
						<input className="form-control" type="text" placeholder="Digite o Nome" style={{width:'100%'}}/>
					</Col>
					<Col md={2}>
						<input className="form-control" type="date" placeholder="Data nascimento" style={{width:'100%'}}/>
					</Col>
					<Col md={2}>
						<FormControl componentClass="select" style={{width:'100%'}}>
							<option>Sexo</option>
							<option value="M">M</option>
							<option value="F">F</option>
						</FormControl>
					</Col>

					<Col md={2}>
						<FormControl componentClass="select" style={{width:'100%'}}>
							{this.props.estados.map((estado,index) => {
								return (
									<option value={estado.sigla} key={index}>{estado.sigla}</option>
								)
							})}
						</FormControl>
					</Col>
					<Col md={6}>
						<input className="form-control"  type="text" placeholder="Digite o nome da cidade" style={{width:'100%'}}/>
					</Col>
					<Col md={4}>
						<input className="form-control"  type="text" placeholder="Digite o nome do bairro" style={{width:'100%'}}/>
					</Col>

					{/*Input da busca avançada*/}
					{this.state.buscaAvancada ?
						<Col md={2}>
							<input className="form-control"  type="text" placeholder="Complemento" />
						</Col>
					: ""}

					{this.state.buscaAvancada ?
						<Col md={6}>
							<input className="form-control"  type="text" placeholder="Endereço ou CEP" />
						</Col>
					: ""}

					{this.state.buscaAvancada ?
						<Col md={2}>
							<input className="form-control"  type="number" placeholder="Nº inicial" />
						</Col>
					: ""}
						
					{this.state.buscaAvancada ?
						<Col md={2}>
							<input className="form-control"  type="number" placeholder="Nº final" />
						</Col>
					: ""}
					
			</MyForm>
		)
	}

	form() {
		let pathTipo = location.pathname.split("/")[2] ? location.pathname.split("/")[2].toUpperCase() : "";
		let tipo = this.state.tipo;
		let options = ["CPF", "CNPJ", "TELEFONE", "NOME", "ENDERECO", "EMAIL"];

		if(!tipo) {
			tipo = pathTipo;
		}

		return (
			pathTipo || tipo ?
				tipo == "CPF" || tipo == "CNPJ" ? 
					this.renderForm(tipo.toLowerCase(), options, pathTipo)
				: tipo == "NOME" ? 
					this.renderFormNome(tipo.toLowerCase(), options, pathTipo)
					: tipo == "TELEFONE" ?
						this.renderForm(tipo.toLowerCase(), options, pathTipo)
					: tipo == "EMAIL" ?
						this.renderForm(tipo.toLowerCase(), options, pathTipo)
					: this.renderFormEndereco(tipo.toLowerCase(), options, pathTipo)
			: this.renderForm(tipo.toLowerCase(), options, pathTipo)
		)
	}

	render() {
		return(
			<div className="container">
				{this.form()}

				{this.props.loading ? <div className="imgSearching"><img src="../../../public/loading.gif" /></div> : ""}

				{this.props.datas.length > 0 ? 
					(
						<Tabs
							activeKey={this.state.changeTab ? this.state.nextTab : this.props.tabActive}
							onSelect={(key) => {this.setState({nextTab:key, changeTab: true})}}
							animation={false}
							id="uncontrolled-tab-example"
						>
							{this.props.datas.map((data, index) => {
								return (
									<Tab eventKey={data.label} title={<Titletab icon={data.icon} label={data.label} close={this.props.closeTab}/>} key={index}>
										{/*Verifica se o produto pesquisado é localize, pois pode ser gerado abas de outros produtos no Localize*/}
										{data.produto == "localize" ?
											<LocalizeView
												data={data}
												searchLocalize={this.searchLocalize}
												showPessoasRelacionadas={this._showPessoasRelacionadas}
												showRelacionados={this._showRelacionados}
												pessoasRelacionadas={this.searchPessoasRelacionadas}/>
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
		datas: state.localize.response,
		status: state.localize.status,
		message: state.localize.message,
		estados: state.estados,
		loading: state.localize.loading,
		tabActive: state.localize.tabActive
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
			loadingLocalize,
			searchLocalize,
			searchLocalizeByParams,
			searchPessoasRelacionadas,
			showRelacionados,
			seeModel,
			closeModel,
			closeTab,
			getEstados,
		},
		dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalizeController);