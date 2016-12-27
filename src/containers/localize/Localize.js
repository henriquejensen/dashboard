import React, { Component } from "react";
import { searchLocalize } from "../../actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Dados from "./Dados";
import PessoasRelacionadas from "./PessoasRelacionadas";
import Telefones from "./Telefones";
import Enderecos from "./Enderecos";
import Ocupacoes from "./Ocupacoes";
import Sociedades from "./Sociedades";
import Veiculos from "./Veiculos";
import DadosPj from "./DadosPj";
import Socios from "./Socios";

import Tabs from "../../components/Tabs";

import { ICON_LOCALIZE } from "../../constants/constantsLocalize";

class Localize extends Component {
	constructor(props) {
		super(props);

		this.state = {
			documento: "",
			tabActive: "",
			tipo: this.props.params.tipo.toUpperCase(),
			pessoasRelacionadas: false
		}

		this.onLocalizeSubmit = this.onLocalizeSubmit.bind(this);
		this._showPessoasRelacionadas = this._showPessoasRelacionadas.bind(this)
		this.onChangeDocumento = this.onChangeDocumento.bind(this);
		this.renderSearch = this.renderSearch.bind(this);
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

	onChangeTipo(evt) {
		this.setState({
			tipo: evt.target.value
		})
	}

	renderTabs() {
		return this.props.datas.map((data, index) => {
				let doc = data.label;

				return (
					<li className={doc == this.state.tabActive ? "active": (index == 0 && this.state.tabActive == "" ? "active" : "")} key={index} onClick={() => this._changeTab(doc)}>
						<a href={"#"+index}>
			    		{data.tipo + ": " + doc}
						</a>
			 		</li>)}
				)		
	}

	renderSearch() {
		return this.props.datas.map((data, index) => {
				console.log("LOCALIZE", data)
				let doc = data.label;

				return (
					<div className={doc == this.state.tabActive ? "tab-pane active": (index == 0 && this.state.tabActive == "" ? "tab-pane active" : "tab-pane")} id={doc} key={index}>
						<div className="panel-group"  >
							{data.tipo == "CPF" ?
								(<div>
									<Dados dados={data.data} searchLocalize={this.props.searchLocalize} showPessoasRelacionadas={this._showPessoasRelacionadas}/>

									{this.state.pessoasRelacionadas ? 
										<PessoasRelacionadas /> : ""}

									{data.data.TELEFONES_MOVEIS ? 
										<Telefones telefones = {data.data.TELEFONES_MOVEIS.TELEFONE} /> : ""}

									{data.data.ENDERECOS ?
										<Enderecos enderecos = {data.data.ENDERECOS.ENDERECO}/> : ""}

									{data.data.OCUPACOES ?
										<Ocupacoes ocupacao = {data.data.OCUPACOES.OCUPACAO} buscaCNPJ = {this.props.searchLocalize} /> : ""}

									{data.data.SOCIEDADES ?
										<Sociedades sociedades = {data.data.SOCIEDADES} buscaCNPJ = {this.props.searchLocalize}/> : "" }

									{data.data.VEICULOS ?
										<Veiculos veiculos =  {data.data.VEICULOS}/>  : "" }
									
								 </div>) : ""}

							{data.tipo == "CNPJ" ?
								(<div>
									<DadosPj dados={data.data} searchLocalize={this.props.searchLocalize} />
									<Telefones telefones = {data.data.TELEFONES_MOVEIS.TELEFONE} />

									{data.data.ENDERECOS ?
										<Enderecos enderecos = {data.data.ENDERECOS.ENDERECO}/> : ""}

									{data.data.SOCIOS ?
										<Socios socios = {data.data.SOCIOS.SOCIEDADES} buscaCPF={this.props.searchLocalize}/> : "" }
									
								 </div>) : ""}
					  	</div>
					</div>
					)}
				)		
	}

	formSearch() {
		return  <div className="col-md-12">
				<form className="form-inline" onSubmit={this.onLocalizeSubmit} >

					{this.props.datas.length > 0 ? <img src={"../../../public/assertiva/" + ICON_LOCALIZE} className="icon-produto-consulta" />: ""}

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
						{this.props.datas.length == 0 ? <img src="../../../public/assertiva/logo-localize.png" className="logo-produto" />: ""}
					</div>

					{this.formSearch()}

				</div>				

				{this.props.datas.length == 0 ? "" : 
					(<div>
						
						<Tabs tabs={this.props.datas}
							  onChangeTab={this._changeTab}
							  tabActive={this.state.tabActive}/>

						<div className="tab-content" id="localize-content">
							{this.renderSearch()}
						</div>
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
	return bindActionCreators({ searchLocalize }, dispacth);
}

export default connect(mapStateToProps, mapDispatchToProps)(Localize);