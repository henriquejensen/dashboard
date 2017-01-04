import React, { Component } from "react";
import { searchLocalize, searchTelefonesRelacionados, searchEnderecosRelacionados, searchEmailsRelacionados, seeModel, closeModelo } from "../../actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Tooltip from 'react-tooltip';

import LocalizeView from "./LocalizeView";

import Tabs from "../../components/Tabs";
import TabContent from "../../components/TabContent";
import TabPane from "../../components/TabPane";
import { LocalizeDescription } from "../../components/ProductDescription";

import { LOGO_LOCALIZE, ICON_LOCALIZE } from "../../constants/constantsLocalize";

var pesquisa = false;

class LocalizeController extends Component {
	constructor(props) {
		super(props);

		this.state = {
			documento: "",
			tabActive: "",
			tipo: this.props.params.tipo.toUpperCase(),
			pessoasRelacionadas: false,
		}

		this.onLocalizeSubmit = this.onLocalizeSubmit.bind(this);
		this.searchLocalize = this.searchLocalize.bind(this);
		this._showPessoasRelacionadas = this._showPessoasRelacionadas.bind(this);
		this._showTelefonesRelacionados = this._showTelefonesRelacionados.bind(this);
		this._showEnderecosRelacionados = this._showEnderecosRelacionados.bind(this);
		this._showEmailsRelacionados = this._showEmailsRelacionados.bind(this);
		this.onChangeDocumento = this.onChangeDocumento.bind(this);
		this.onChangeTipo = this.onChangeTipo.bind(this);
		this._changeTab = this._changeTab.bind(this);
		this._seeModelo = this._seeModelo.bind(this);
		this._closeModelo = this._closeModelo.bind(this);
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

		let tipo = "pf";
		if(this.state.tipo == "CNPJ")
			tipo = "pj";

		this.props.searchLocalize(this.state.documento, tipo);

		pesquisa = true;

		this.setState({
			documento: "",
		});

	}

	onChangeDocumento(evt) {
		this.setState({
			documento: evt.target.value,
		})
	}

	_changeTab(tab) {
		console.log(tab)
		this.setState({
			tabActive: tab
		})
	}

	_showPessoasRelacionadas() {
		pesquisa = true;
		this.setState({
			pessoasRelacionadas: !this.state.pessoasRelacionadas
		})
	}

	_showTelefonesRelacionados(doc) {
		pesquisa = true;
		this.props.searchTelefonesRelacionados(doc);
	}
	
	_showEnderecosRelacionados(doc) {
		pesquisa = true;
		this.props.searchEnderecosRelacionados(doc);
	}

	_showEmailsRelacionados(doc) {
		pesquisa = true;
		this.props.searchEmailsRelacionados(doc);
	}

	onChangeTipo(evt) {
		this.setState({
			tipo: evt.target.value
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

	formSearch() {
		return  <div className="col-md-12">
				<form className="form-inline" onSubmit={this.onLocalizeSubmit} >

					{this.props.datas.length > 0 ? <img src={ICON_LOCALIZE} className="icon-produto-consulta" />: ""}

					<select className="form-control" onChange={this.onChangeTipo} required>
						<option value="">Selecione</option>
						<option value="CPF">CPF</option>
						<option value="CNPJ">CNPJ</option>
						<option value="TELEFONE">TELEFONE</option>
						<option value="NOME">NOME</option>
						<option value="ENDERECO">ENDERECO</option>
					</select>

					<input
						value={this.state.documento}
						type="text"
						className="form-control input-localize input-search "
						placeholder="Buscar"
						name="cpf"
						required
						onChange={this.onChangeDocumento}/>
					
					<a data-tip data-for='tooltipConsultar'>
						<button className="btn btn-info" type="submit">
							<i className="glyphicon glyphicon-search"></i>
						</button>
					</a>

					<Tooltip id='tooltipConsultar'>
						<span>Consultar</span>
					</Tooltip>
					
				</form>

				{this.props.status == "error" ?
					<div className="col-md-offset-3 col-md-6">
						<div className="alert alert-danger">
							{this.props.message}
							{/*<i className="glyphicon glyphicon-remove error-message" width="100%"/>*/}
						</div>
					</div>
				: ""}
			</div>
	}

	render() {
		return(
			<div className="container">
				<div className="row text-center">
					<div className="col-md-12">
						{this.props.datas.length == 0 ? <img src={LOGO_LOCALIZE} className="logo-produto" />: ""}
					</div>

					{this.formSearch()}

					{pesquisa ? <div className="imgSearching"><img src="https://apps.nea.gov/grantsearch/images/ajaxSpinner.gif" /></div> : ""}

					{this.props.datas.length > 0 ? (this.props.status == "model" ? <a href="#" onClick={this._closeModelo}>Fechar Modelo</a> : "") : <a href="#" onClick={this._seeModelo}>Veja Modelo</a>}
					{this.props.datas.length > 0 ? "" : <LocalizeDescription />}
					

				</div>				

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
												data={data.data}
												tipo={data.tipo}
												pessoasRelacionadas={this.state.pessoasRelacionadas}
												searchLocalize={this.searchLocalize}
												showPessoasRelacionadas={this._showPessoasRelacionadas}
												showTelefonesRelacionados={this._showTelefonesRelacionados}
												telefonesRelacionados={data.telefonesRelacionados}
												showEnderecosRelacionados={this._showEnderecosRelacionados}
												enderecosRelacionados={data.enderecosRelacionados}
												showEmailsRelacionados={this._showEmailsRelacionados}
												emailsRelacionados={data.emailsRelacionados}/>
										
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
	}
}

function mapDispatchToProps(dispacth) {
	return bindActionCreators({ 
			searchLocalize,
			searchTelefonesRelacionados,
			searchEnderecosRelacionados,
			searchEmailsRelacionados,
			seeModel,
			closeModelo
		},
		dispacth);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalizeController);