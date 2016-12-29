import React, { Component } from "react";
import { searchLocalize, searchTelefonesRelacionados, searchEnderecosRelacionados, searchEmailsRelacionados } from "../../actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import LocalizeView from "./LocalizeView";

import Tabs from "../../components/Tabs";
import TabContent from "../../components/TabContent";
import TabPane from "../../components/TabPane";

import { LOGO_LOCALIZE, ICON_LOCALIZE } from "../../constants/constantsLocalize";

class LocalizeController extends Component {
	constructor(props) {
		super(props);

		this.state = {
			documento: "",
			tabActive: "",
			tipo: this.props.params.tipo.toUpperCase(),
			pessoasRelacionadas: false
		}

		console.log("LOCAL",this.props.datas)

		this.onLocalizeSubmit = this.onLocalizeSubmit.bind(this);
		this._showPessoasRelacionadas = this._showPessoasRelacionadas.bind(this);
		this._showTelefonesRelacionados = this._showTelefonesRelacionados.bind(this);
		this._showEnderecosRelacionados = this._showEnderecosRelacionados.bind(this);
		this._showEmailsRelacionados = this._showEmailsRelacionados.bind(this);
		this.onChangeDocumento = this.onChangeDocumento.bind(this);
		this.onChangeTipo = this.onChangeTipo.bind(this);
		this._changeTab = this._changeTab.bind(this);
	}

	componentDidMount() {
		document.title = "Assertiva > Localize";
	}

	onLocalizeSubmit(evt) {
		evt.preventDefault();

		let tipo = "pf";
		if(this.state.tipo == "CNPJ")
			tipo = "pj";

		this.props.searchLocalize(this.state.documento, tipo);

		this.setState({
			documento: ""
		})
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
		this.setState({
			pessoasRelacionadas: !this.state.pessoasRelacionadas
		})
	}

	_showTelefonesRelacionados(doc) {
		this.props.searchTelefonesRelacionados(doc);
	}
	
	_showEnderecosRelacionados(doc) {
		this.props.searchEnderecosRelacionados(doc);
	}

	_showEmailsRelacionados(doc) {
		this.props.searchEmailsRelacionados(doc);
	}

	onChangeTipo(evt) {
		this.setState({
			tipo: evt.target.value
		})
	}

	formSearch() {
		return  <div className="col-md-12">
				<form className="form-inline" onSubmit={this.onLocalizeSubmit} >

					{this.props.datas.length > 0 ? <img src={ICON_LOCALIZE} className="icon-produto-consulta" />: ""}

					<select className="form-control" onChange={this.onChangeTipo} defaultValue={this.props.params.tipo.toUpperCase()}>
						<option value="CPF">CPF</option>
						<option value="CNPJ">CNPJ</option>
						<option value="NOME">NOME</option>
						<option value="ENDERECO">ENDERECO</option>
					</select>

					<input
						value={this.state.documento}
						type="text"
						className="form-control input-localize input-search "
						placeholder="Buscar"
						name="cpf"
						onChange={this.onChangeDocumento}/>

					<button className="btn btn-info" type="submit">
						<i className="glyphicon glyphicon-search"></i>
					</button>
				</form>
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
												searchLocalize={this.props.searchLocalize}
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
	return {
		datas: state.localize
	}
}

function mapDispatchToProps(dispacth) {
	return bindActionCreators({ searchLocalize, searchTelefonesRelacionados, searchEnderecosRelacionados, searchEmailsRelacionados }, dispacth);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalizeController);