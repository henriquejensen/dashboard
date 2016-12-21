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

class Localize extends Component {
	constructor(props) {
		super(props);

		
		this.state = {
			documento: "",
			tabActive: "",
			tipo: "CPF",
			pessoasRelacionadas: false
		}

		this.onLocalizeSubmit = this.onLocalizeSubmit.bind(this);
		this._showPessoasRelacionadas = this._showPessoasRelacionadas.bind(this)
		this.onChangeDocumento = this.onChangeDocumento.bind(this);
		this.renderSearch = this.renderSearch.bind(this);
		this.onChangeTipo = this.onChangeTipo.bind(this);
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
		return this.props.data.map((data, index) => {
				let doc = "";
				if(data.PF) {
					doc = data.PF.DADOS.CPF;
				} else {
					doc = data.PJ.DADOS.CNPJ;
				}

				return (
					<li className={doc == this.state.tabActive ? "active": (index == 0 && this.state.tabActive == "" ? "active" : "")} key={index} onClick={() => this._changeTab(doc)}>
						<a href={"#"+index}>
			    		{doc}
						</a>
			 		</li>)}
				)		
	}

	renderSearch() {
		return this.props.data.map((data, index) => {
				console.log(data)
				let doc = "";
				if(data.PF) {
					doc = data.PF.DADOS.CPF;
				} else {
					doc = data.PJ.DADOS.CNPJ;
				}
				return (
					<div className={doc == this.state.tabActive ? "tab-pane active": (index == 0 && this.state.tabActive == "" ? "tab-pane active" : "tab-pane")} id={doc} key={index}>
						<div className="panel-group"  >
							{data.PF ?
								(<div>
									<Dados dados={data.PF.DADOS} searchLocalize={this.props.searchLocalize} showPessoasRelacionadas={this._showPessoasRelacionadas}/>

									{this.state.pessoasRelacionadas ? 
										<PessoasRelacionadas /> : ""}

									{data.PF.DADOS.TELEFONES_MOVEIS ? 
										<Telefones telefones = {data.PF.DADOS.TELEFONES_MOVEIS.TELEFONE} /> : ""}

									{data.PF.DADOS.ENDERECOS ?
										<Enderecos enderecos = {data.PF.DADOS.ENDERECOS.ENDERECO}/> : ""}

									{data.PF.DADOS.OCUPACOES ?
										<Ocupacoes ocupacao = {data.PF.DADOS.OCUPACOES.OCUPACAO} buscaCNPJ = {this.props.searchLocalize} /> : ""}

									{data.PF.DADOS.SOCIEDADES ?
										<Sociedades sociedades = {data.PF.DADOS.SOCIEDADES} buscaCNPJ = {this.props.searchLocalize}/> : "" }

									{data.PF.DADOS.VEICULOS ?
										<Veiculos veiculos =  {data.PF.DADOS.VEICULOS}/>  : "" }
									
								 </div>) : ""}

							{data.PJ ?
								(<div>
									<DadosPj dados={data.PJ.DADOS} searchLocalize={this.props.searchLocalize} />
									<Telefones telefones = {data.PJ.DADOS.TELEFONES_MOVEIS.TELEFONE} />

									{data.PJ.DADOS.ENDERECOS ?
										<Enderecos enderecos = {data.PJ.DADOS.ENDERECOS.ENDERECO}/> : ""}

									{data.PJ.DADOS.SOCIOS ?
										<Socios socios = {data.PJ.DADOS.SOCIOS.SOCIEDADES} buscaCPF={this.props.searchLocalize}/> : "" }
									
								 </div>) : ""}
					  	</div>
					</div>
					)}
				)		
	}

	render() {
		return(
			<div className="container">
				<div className="row text-center">
					<div className="col-md-12">
						{this.props.data.length == 0 ? <img src="http://portal.assertivasolucoes.com.br/app/onway/imagens/logo-localize.png" />: ""}
					</div>
					<div className="col-md-12">
						<form className="form-inline" onSubmit={this.onLocalizeSubmit} >
							<select className="form-control" onChange={this.onChangeTipo} defaultValue={this.state.tipo}>
								<option value="CPF">CPF</option>
								<option value="CNPJ">CNPJ</option>
								<option value="NOME">NOME</option>
								<option value="ENDERECO">ENDERECO</option>
							</select>

							<input
								value={this.state.documento}
								type="text"
								className="form-control input-localize"
								placeholder="Buscar"
								name="cpf"
								onChange={this.onChangeDocumento}/>

							<button className="btn btn-info" type="submit">
								<i className="glyphicon glyphicon-search"></i>
							</button>
						</form>
					</div>

				</div>

				{this.props.data.length == 0 ? "" : 
					(<div>
						<div className="panel-heading text-center" id="localize-tabs">
							<ul className="nav nav-tabs">
								{this.renderTabs()}
							</ul>
						</div>

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
		data: state.localize
	}
}

function mapDispatchToProps(dispacth) {
	return bindActionCreators({ searchLocalize }, dispacth);
}

export default connect(mapStateToProps, mapDispatchToProps)(Localize);