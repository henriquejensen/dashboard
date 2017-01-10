import React, { Component } from "react";
import { searchLocalize,
		 searchTelefonesRelacionados,
		 searchPessoasRelacionadas,
		 searchEnderecosRelacionados,
		 searchEmailsRelacionados,
		 seeModel,
		 closeModelo,
		 getEstados } from "../../actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import LocalizeView from "./LocalizeView";

import Form from "../../components/Form";
import Tabs from "../../components/Tabs";
import TabContent from "../../components/TabContent";
import TabPane from "../../components/TabPane";

import { LOGO_LOCALIZE, ICON_LOCALIZE } from "../../constants/constantsLocalize";

var pesquisa = false;

class LocalizeController extends Component {
	constructor(props) {
		super(props);

		this.state = {
			documento: "",
			telefone: "",
			nome: "",
			endereco: "",
			estado: "",
			cidade: "",
			bairro: "",
			tabActive: "",
			tipo: ""
		}

		this.onLocalizeSubmit = this.onLocalizeSubmit.bind(this);
		this.searchLocalize = this.searchLocalize.bind(this);
		this._showTelefonesRelacionados = this._showTelefonesRelacionados.bind(this);
		this._showEnderecosRelacionados = this._showEnderecosRelacionados.bind(this);
		this._showEmailsRelacionados = this._showEmailsRelacionados.bind(this);
		this.onChange = this.onChange.bind(this);
		this._changeTab = this._changeTab.bind(this);
		this._seeModelo = this._seeModelo.bind(this);
		this._closeModelo = this._closeModelo.bind(this);
		this.form = this.form.bind(this);
	}

	componentWillMount() {
		this.props.getEstados()
	}

	componentDidMount() {
		document.title = "Assertiva > Localize";
	}

	searchLocalize(doc, tipo) {
		pesquisa = true;
		this.props.searchLocalize(doc, tipo);
	}

	onLocalizeSubmit(evt) {
		evt.preventDefault();

		let tipo = this.state.tipo ? this.state.tipo :  location.pathname.split("/")[3].toUpperCase();

		if(tipo == "CPF" || tipo == "CNPJ") {
			let searchBy = "pf";
			if(tipo == "CNPJ")
				searchBy = "pj";
			
			this.props.searchLocalize(this.state.documento, searchBy);
		} else if(tipo == "TELEFONE") {
			console.log("TELEFONE", this.state.telefone)
		} else if(tipo == "NOME") {
			console.log("NOME", this.state.nome, "ESTADO", this.state.estado, "CIDADE", this.state.cidade, "BAIRRO", this.state.bairro, "ENDERECO", this.state.endereco)
		} else if(tipo == "ENDERECO") {
			console.log("ENDEREÇO", this.state.nome, "ESTADO", this.state.estado, "CIDADE", this.state.cidade, "BAIRRO", this.state.bairro, "ENDERECO", this.state.endereco)
		}

		pesquisa = true;

		this.setState({
			documento: "",
		});

	}

	_changeTab(tab) {
		this.setState({
			tabActive: tab
		})
	}

	_showTelefonesRelacionados(doc, docTelefone) {
		this.props.searchTelefonesRelacionados(doc, docTelefone);
	}
	
	_showEnderecosRelacionados(doc) {
		this.props.searchEnderecosRelacionados(doc);
	}

	_showEmailsRelacionados(doc) {
		this.props.searchEmailsRelacionados(doc);
	}

	onChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		})
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
				options = {["CPF", "CNPJ", "TELEFONE", "NOME", "ENDERECO"]}
				optionSelected = {location.pathname.split("/")[3].toUpperCase()}
				tipo = {this.state.tipo}
				icon = {ICON_LOCALIZE}
				logo = {LOGO_LOCALIZE}
				datas = {this.props.datas}
				onChange = {this.onChange}
				onformSubmit = {this.onLocalizeSubmit}
				seeModelo = {this._seeModelo}
				closeModelo = {this._closeModelo}
				status = {this.props.status}
				message = {this.props.message} >
				
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

	renderFormTelefone() {
		return (
			<Form
				options = {["CPF", "CNPJ", "TELEFONE", "NOME", "ENDERECO"]}
				optionSelected = {location.pathname.split("/")[3].toUpperCase()}
				tipo = {this.state.tipo}
				icon = {ICON_LOCALIZE}
				logo = {LOGO_LOCALIZE}
				datas = {this.props.datas}
				onChange = {this.onChange}
				onformSubmit = {this.onLocalizeSubmit}
				seeModelo = {this._seeModelo}
				closeModelo = {this._closeModelo}
				status = {this.props.status}
				message = {this.props.message} >
				
				<input
					value={this.state.telefone}
					type="number"
					className="form-control input-search "
					placeholder="Digite o DD e o número"
					name="telefone"
					size="10"
					required
					style={{width:320, display:"inline-block"}}
					onChange={this.onChange} />

			</Form>
		)
	}

	renderFormNomeEndereco(formType) {
		return (
			<Form
				options = {["CPF", "CNPJ", "TELEFONE", "NOME", "ENDERECO"]}
				optionSelected = {location.pathname.split("/")[3].toUpperCase()}
				tipo = {this.state.tipo}
				icon = {ICON_LOCALIZE}
				logo = {LOGO_LOCALIZE}
				datas = {this.props.datas}
				onChange = {this.onChange}
				onformSubmit = {this.onLocalizeSubmit}
				seeModelo = {this._seeModelo}
				closeModelo = {this._closeModelo}
				status = {this.props.status}
				message = {this.props.message} >
				
				<input
					value={formType == "nome" ? this.state.nome : this.state.endereco}
					type="text"
					className="form-control"
					placeholder={"Digite o " + formType}
					name={formType}
					size="10"
					required
					style={{width:445, display:"inline-block"}}
					onChange={this.onChange} />

				<select
					className="form-control  input-search"
					name="estado"
					value={this.state.estado}
					onChange={this.onChange}
					style={{width:120}}>
					{this.props.estados.map((estado, index) => {
						return <option value={estado.sigla} key={index}>{estado.nome}</option>
					})}
				</select>

				<input
					value={this.state.cidade}
					type="text"
					className="form-control input-search"
					placeholder="Cidade"
					name="cidade"
					style={{width:220, display:"inline-block"}}
					onChange={this.onChange} />

				<input
					value={this.state.bairro}
					type="text"
					className="form-control"
					placeholder="Bairro"
					name="bairro"
					style={{width:215, display:"inline-block"}}
					onChange={this.onChange} />

				<input
					value={formType == "nome" ? this.state.endereco : this.state.nome}
					type="text"
					className="form-control input-search"
					placeholder={formType == "nome" ? "Endereço": "Nome"}
					name={formType == "nome" ? "endereco": "nome"}
					style={{width:425, display:"inline-block"}}
					onChange={this.onChange} />

			</Form>
		)
	}

	form() {
		let pathTipo = location.pathname.split("/")[3].toUpperCase();
		let tipo = this.state.tipo;

		if(!tipo) {
			tipo = pathTipo;
		}

		return (
			pathTipo || tipo ?
				tipo == "CPF" || tipo == "CNPJ" ? 
					this.renderForm()
				: tipo == "NOME" ? 
					this.renderFormNomeEndereco("nome")
					: tipo == "TELEFONE" ?
					this.renderFormTelefone()
					: this.renderFormNomeEndereco("endereco")
			: this.renderForm()
		)
	}

	render() {
		return(
			<div className="container">
				{this.form()}

				{pesquisa ? <div className="imgSearching"><img src="https://apps.nea.gov/grantsearch/images/ajaxSpinner.gif" /></div> : ""}

				{this.props.datas.length == 0 ? "" : 
					(<div>
						
						<Tabs tabs={this.props.datas}
							  onChangeTab={this._changeTab}
							  tabActive={this.state.tabActive} />
							
						<TabContent>
							{this.props.datas.map((data, index) => {
								console.log("LOCALIZE", data);
								return (
									<TabPane 
										tabActive={this.state.tabActive}
										label={data.label}
										index={index}
										key={index} >

										{data.produto == "localize" ?
											<LocalizeView
												data={data}
												searchLocalize={this.searchLocalize}
												showPessoasRelacionadas={this._showPessoasRelacionadas}
												showTelefonesRelacionados={this._showTelefonesRelacionados}
												pessoasRelacionadas={this.props.searchPessoasRelacionadas}
												showEnderecosRelacionados={this._showEnderecosRelacionados}/>
										
										: ""}

									</TabPane>
								)
							})}
						</TabContent>
						
					</div>)}

			</div>
		)
	}
}

function mapStateToProps(state) {
	pesquisa = false;
	return {
		datas: state.localize.response,
		status: state.localize.status,
		message: state.localize.message,
		estados: state.estados,
	}
}

function mapDispatchToProps(dispacth) {
	return bindActionCreators({ 
			searchLocalize,
			searchPessoasRelacionadas,
			searchTelefonesRelacionados,
			searchEnderecosRelacionados,
			searchEmailsRelacionados,
			seeModel,
			closeModelo,
			getEstados
		},
		dispacth);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalizeController);