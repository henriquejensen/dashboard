import React, { Component } from "react";

export default class ConsigMais extends Component {

	componentDidMount() {
		document.title = "Assertiva > Consig+";
	}

	render() {
		return (
			<div className="container">
				<div className="row text-center">
					<div className="col-md-12">
						<img src="../../../public/assertiva/logo-consig.png" className="logo-produto" />
					</div>
					<div className="col-md-12">
						<form className="form-inline" >
							<input
								type="text"
								className="form-control input-search"
								placeholder="CPF"
								name="cpf"/>

							<input
								type="text"
								className="form-control input-search"
								placeholder="Benefício"
								name="cpf"/>

							<input
								type="text"
								className="form-control input-search"
								placeholder="Nascimento(DD/MM/AAAA)"
								name="cpf"/>

							<input
								type="text"
								className="form-control input-search"
								placeholder="Nome Completo"
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