import React, { Component } from "react";

import { CreditoDescription } from "../../components/ProductDescription";

export default class Credito extends Component {

	componentDidMount() {
		document.title = "Assertiva > Crédito";
	}

	render() {
		return (
			<div className="container">
				<div className="row text-center">
					<div className="col-md-12">
						<img src="../../../public/assertiva/logo-credito.png" className="logo-produto" />
					</div>
					<div className="col-md-12">
						<form className="form-inline" >
							<select className="form-control">
								<option value="Completa">Consulta Completa</option>
								<option value="Intermediaria">Consulta Intermediária</option>
								<option value="Plus">Intermediária Plus/Pessoal Plus</option>
								<option value="Simples">Consulta Simples</option>
								<option value="Cheque">Consulta Cheque</option>
								<option value="Express">Consulta Express</option>
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

					<CreditoDescription />

				</div>
			</div>
		)
	}
}