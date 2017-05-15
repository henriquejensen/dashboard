import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Col } from "react-bootstrap";

import {
		changeTab,
		closeMessageErrorVeiculos,
		closeModel,
		closeTab,
		getLastQueries,
		loadingVeiculos,
		searchByVeiculos,
		seeModel
} from "../../actions/actionsVeiculos";
import { changeProductType } from "../../actions/actionsCommon";

import { LOGO_VEICULOS, ICON_VEICULOS, LOADING_GIF } from "../../constants/utils";
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_VEICULOS } from "../../constants/constantsCompany";
import { AGREGADOS_CODE, BDV_CODE, DECODIFICADOR_CODE, LOCALIZACAO_CODE, PROPRIETARIOS_CODE, LEILAO_CODE, SINISTRO_CODE } from "../../constants/constantsVeiculos";

import MyForm from "../../components/forms/Form";

import menu from "../../components/utils/common/menu.json";
import estados from "../../components/utils/common/estados.json";

class VeiculosController extends Component {
	state = {

	}

	componentDidMount() {
		document.title = COMPANY_PRODUCT_VEICULOS + " > " + COMPANY_NAME_SHORT;
	}

	componentWillMount() {
		this.props.getLastQueries(AGREGADOS_CODE, "AGREGADOS");
	}

	onFormSubmit = (evt) => {
		evt.preventDefault();

		this.props.loadingVeiculos();

		this.props.searchByVeiculos(this.state);

	}

	onChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	onChangeType = (evt) => {
		this.props.changeProductType("veiculos", evt.target.value)
	}

	renderForm = () => {
		return (
			<span>
				{this.props.type == "AGREGADOS" || this.props.type == "PROPRIETARIOS" ? 
					<Col md={2}>
						<select
							className="form-control"
							name="chassiOuPlaca"
							onChange={this.onChange}
							value={this.state.chassiOuPlaca}
							required
						>
							<option value="Placa">Placa</option>
							<option value="Chassi">Chassi</option>
						</select>
					</Col>
				: ""}

				{this.props.type == "BDV" ? 
					<Col md={2}>
						<select
							className="form-control"
							name="uf"
							onChange={this.onChange}
							value={this.state.uf}
						>
							<option value="">Selecione UF</option>
							{estados.estados.map((estado,i) => {
								return <option value={estado.sigla} key={i}>{estado.sigla}</option>
							})}
						</select>
					</Col>
				: ""}

				{this.props.type == "LOCALIZACAO" ? 
					<Col md={2}>
						<select
							className="form-control"
							name="documento"
							onChange={this.onChange}
							value={this.state.documento}
						>
							<option value="CPF">CPF</option>
							<option value="CNPJ">CNPJ</option>
						</select>
					</Col>
				: ""}

				<Col md={this.props.type == "BDV" ? 6 : this.props.type == "LOCALIZACAO" || this.props.type == "AGREGADOS" || this.props.type == "PROPRIETARIOS" ? 6 : 8}>
					<input
						className="form-control"
						type="text"
						placeholder={this.props.type == "DECODIFICADOR" ? "Digite o número do chassi" : this.props.type == "SINISTRO" || this.props.type == "LEILAO" ? "Digite o número da placa" : "Digite o número do documento"}
						value={this.state.chassi}
						name="chassi"
						onChange={this.onChange}
						required
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
				showLogo = {this.props.datas.length == 0 ? true : false}
				onformSubmit = {this.onFormSubmit}
				closeMessageError = {this.props.closeMessageErrorVeiculos}
				options={menu.sidebar[5].subItems}
				onChange={this.onChangeType}
                type={this.props.type}
				seeModelo = {this.props.seeModel}
				status = {this.props.status}
				message = {this.props.message}
				lastQueries = {this.props.lastQueries[this.props.type]}
			>

				{this.renderForm()}
				
			</MyForm>
		)
	}

	render() {
		return (
			<div className="container my-container">
				{this.form(this.props.type)}

				{this.props.loading ? <div className="imgSearching"><img src={LOADING_GIF} /></div> : ""}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		datas: state.veiculos.response,
		status: state.veiculos.status,
		message: state.veiculos.message,
		loading: state.veiculos.loading,
		tabActive: state.veiculos.tabActive,
		lastQueries: state.veiculos.lastQueries,
		type: state.veiculos.type
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeProductType,
		changeTab,
		closeMessageErrorVeiculos,
		closeModel,
		closeTab,
		getLastQueries,
		loadingVeiculos,
		searchByVeiculos,
		seeModel
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VeiculosController);