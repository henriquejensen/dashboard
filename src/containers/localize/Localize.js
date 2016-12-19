import React, { Component } from "react";
import { searchLocalize } from "../../actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Dados from "./Dados";
import Telefones from "./Telefones";
import Enderecos from "./Enderecos";
import Ocupacoes from "./Ocupacoes";
import Sociedades from "./Sociedades";
import Veiculos from "./Veiculos";

class Localize extends Component {
	constructor(props) {
		super(props);

		this.state = {
			documento: "",
			tabActive: ""
		}

		this.onLocalizeSubmit = this.onLocalizeSubmit.bind(this);
		this.onChangeDocumento = this.onChangeDocumento.bind(this);
		this.renderSearch = this.renderSearch.bind(this);
	}

	onLocalizeSubmit(evt) {
		evt.preventDefault();

		this.props.searchLocalize(this.state.documento, "pf");
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

	renderTabs() {
		return this.props.data.map((data, index) => {
				return (
					<li className={data.PF.DADOS.CPF == this.state.tabActive ? "active": (index == 0 && this.state.tabActive == "" ? "active" : "")} key={index} onClick={() => this._changeTab(data.PF.DADOS.CPF)}>
						<a href={"#"+index}>
			    		{data.PF.DADOS.CPF}
						</a>
			 		</li>)}
				)		
	}

	renderSearch() {
		return this.props.data.map((data, index) => {
				console.log(data)
				return (
					<div className={data.PF.DADOS.CPF == this.state.tabActive ? "tab-pane active": (index == 0 && this.state.tabActive == "" ? "tab-pane active" : "tab-pane")} id={data.PF.DADOS.CPF} key={index}>
						<div className="panel-group"  >
							{data.PF ?
								(<div>
									<Dados dados={data.PF.DADOS} searchLocalize={this.props.searchLocalize} />
									<Telefones telefones = {data.PF.DADOS.TELEFONES_MOVEIS.TELEFONE} />

									{data.PF.DADOS.ENDERECOS ?
										<Enderecos enderecos = {data.PF.DADOS.ENDERECOS.ENDERECO}/> : ""}

									{data.PF.DADOS.OCUPACOES ?
										<Ocupacoes ocupacao = {data.PF.DADOS.OCUPACOES.OCUPACAO} buscaCNPJ = {this.props.searchLocalize} /> : ""}

									{data.PF.DADOS.SOCIEDADES ?
										<Sociedades sociedades = {data.PF.DADOS.SOCIEDADES} buscaCNPJ = {this.props.searchLocalize}/> : "" }

									{data.PF.DADOS.VEICULOS ?
										<Veiculos veiculos =  {data.PF.DADOS.VEICULOS}/>  : "" }
									
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
						<form className="form-inline" onSubmit={this.onLocalizeSubmit}>
							<select className="form-control">
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
								name="nome"
								onChange={this.onChangeDocumento}/>

							<button className="btn btn-info" type="submit">
								<i className="glyphicon glyphicon-search"></i>
							</button>
						</form>
					</div>

				</div>

				{this.props.data.length == 0 ? "" : 
					(<div>
						<div className="panel-heading text-center">
							<ul className="nav nav-tabs">
								{this.renderTabs()}
							</ul>
						</div>

						<div className="tab-content content-localize">
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