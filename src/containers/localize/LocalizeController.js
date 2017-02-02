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
import { Tabs, Tab} from "react-bootstrap";

import LocalizeView from "./LocalizeView";

import Form from "../../components/forms/Form";
import Titletab from "../../components/utils/Titletab";

import { LOGO_LOCALIZE, ICON_LOCALIZE } from "../../constants/constantsLocalize";

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
			changeTab: false
		}

		this.onLocalizeSubmit = this.onLocalizeSubmit.bind(this);
		this.searchLocalize = this.searchLocalize.bind(this);
		this.searchPessoasRelacionadas = this.searchPessoasRelacionadas.bind(this);
		this._showRelacionados = this._showRelacionados.bind(this);
		this.onChange = this.onChange.bind(this);
		this.form = this.form.bind(this);
	}

	componentWillMount() {
		this.props.getEstados()
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
			<Form
				options = {options}
				optionSelected = {optionSelected}
				tipo = {this.state.tipo}
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
				
				{formType == "cpf" || formType == "cnpj" || formType == "" ?
					<input
						value={this.state.documento}
						type="text"
						className="form-control input-search input-form input-form-single "
						placeholder="Digite o documento"
						name="documento"
						required
						onChange={this.onChange} />
				: formType == "telefone" ?
					<input
						value={this.state.telefone}
						type="number"
						className="form-control input-search input-form input-form-single "
						placeholder="Digite o DD e o número"
						name="telefone"
						size="10"
						required
						onChange={this.onChange} />
				  : formType == "email" ?
					<input
						value={this.state.email}
						type="email"
						className="form-control input-search input-form input-form-single "
						placeholder="Digite o email"
						name="email"
						size="10"
						required
						onChange={this.onChange} />
				  : ""
				}

			</Form>
		)
	}

	renderFormNomeEndereco(formType, options, optionSelected) {
		console.log("STATUS", this.props)
		return (
			<Form
				options = {options}
				optionSelected = {optionSelected}
				tipo = {this.state.tipo}
				icon = {ICON_LOCALIZE}
				logo = {LOGO_LOCALIZE}
				showModel = {this.props.datas.length == 1 && this.props.status=="model" ? true : false}
				showLogo = {this.props.datas.length == 0 ? true : false}
				onChange = {this.onChange}
				onformSubmit = {this.onLocalizeSubmit}
				seeModelo = {this.props.seeModel}
				closeModelo = {this.props.closeModel}
				status = {this.props.status}
				message = {this.props.message} >
				
				<input
					value={formType == "nome" ? this.state.nome : this.state.endereco}
					type="text"
					className="form-control input-form input-form-many-large"
					placeholder={"Digite o " + formType}
					name={formType}
					size="10"
					required
					onChange={this.onChange} />

				<select
					className="form-control input-search select-form"
					name="estado"
					value={this.state.estado}
					onChange={this.onChange}>
					<option value="">Selecione</option>
					{this.props.estados.map((estado, index) => {
						return <option value={estado.sigla} key={index}>{estado.nome}</option>
					})}
				</select>

				<input
					value={this.state.cidade}
					type="text"
					className="form-control input-search input-form input-form-many-medium"
					placeholder="Cidade"
					name="cidade"
					onChange={this.onChange} />

				<input
					value={this.state.bairro}
					type="text"
					className="form-control input-form input-form-many-small"
					placeholder="Bairro"
					name="bairro"
					onChange={this.onChange} />

				<input
					value={formType == "nome" ? this.state.endereco : this.state.nome}
					type="text"
					className="form-control input-search input-form input-form-many-big"
					placeholder={formType == "nome" ? "Endereço": "Nome"}
					name={formType == "nome" ? "endereco": "nome"}
					onChange={this.onChange} />

			</Form>
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
					this.renderFormNomeEndereco(tipo.toLowerCase(), options, pathTipo)
					: tipo == "TELEFONE" ?
						this.renderForm(tipo.toLowerCase(), options, pathTipo)
					: tipo == "EMAIL" ?
						this.renderForm(tipo.toLowerCase(), options, pathTipo)
					: this.renderFormNomeEndereco(tipo.toLowerCase(), options, pathTipo)
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
			getEstados
		},
		dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalizeController);