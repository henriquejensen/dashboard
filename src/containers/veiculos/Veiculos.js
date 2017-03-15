import React, { Component } from "react";
import { Col } from "react-bootstrap";

import MyForm from "../../components/forms/Form";

import { LOGO_VEICULOS, ICON_VEICULOS, LOADING_GIF } from "../../constants/utils";

import menu from "../../components/utils/common/menu.json";

export default class Veiculos extends Component {
	state = {

	}


	componentDidMount() {
		document.title = "Veículos > Assertiva";
	}

	onFormSubmit = (evt) => {
		evt.preventDefault();

		console.log("SUBMIT VEICULOS");
	}

	onChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	renderForm = () => {
		return (
			<span>
				<Col md={8}>
					<input
						className="form-control"
						type="text"
						placeholder="Não é necessário separador"
						value={this.state.chassi}
						name="chassi"
						onChange={this.onChange}
					/>
				</Col>
			</span>
		)
	}

	form = (tipo) => {
		return (
			<MyForm
				icon = {ICON_VEICULOS}
				logo = {LOGO_VEICULOS}
				showLogo = {true ? true : false}
				onformSubmit = {this.onFormSubmit}
				options={menu.sidebar[5].subItems}
				onChange={this.onChange}
                type={""}
				status = {""}
				message = {""}
				lastQueries = {[]}
			>

				{this.renderForm()}
				
			</MyForm>
		)
	}

	render() {
		return (
			<div className="container">
				{this.form(this.props.type)}
			</div>
		)
	}
}