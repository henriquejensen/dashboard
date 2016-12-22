import React, { Component } from "react";

export default class FocoFiscal extends Component {

	componentDidMount() {
		document.title = "Assertiva > Foco Fiscal";
	}

	render() {
		return (
			<div className="container">
				<div className="row text-center">
					<div className="col-md-12">
						<img src="../../../public/assertiva/logo-focofiscal.png" className="logo-produto" />
					</div>
					<div className="col-md-12">
						<form className="form-inline" >
							<select className="form-control">
								<option value="ReceitaPF">Receita PF</option>
								<option value="ReceitaPJ">Receita PJ</option>
								<option value="ReceitaSintegra">Receita PJ Sintegra</option>
								<option value="SintegraUnificada">Sintegra Unificada</option>
								<option value="SimplesNacional">Simples Nacional</option>
							</select>

							<input
								type="text"
								className="form-control input-localize input-search"
								placeholder="Buscar"
								name="cpf"/>

							<button className="btn btn-info" type="submit">
								<i className="glyphicon glyphicon-search"></i>
							</button>
						</form>
					</div>

				</div>
			</div>
		)
	}
}