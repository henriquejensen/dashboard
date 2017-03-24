import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Tabs, Tab} from "react-bootstrap";

import {
		getLastQueries,
		seeModel,
		closeModel,
		closeTab,
		changeTab
} from "../../actions/actionsCredito";
import { changeProductType } from "../../actions/actionsCommon";

import CreditoView from "./CreditoView";
import MyForm from "../../components/forms/Form";
import Titletab from "../../components/utils/Titletab";

import { Form, FormGroup, FormControl, InputGroup, ControlLabel, Checkbox, Col} from "react-bootstrap";

import { LOGO_CREDITO, ICON_CREDITO, LOADING_GIF } from "../../constants/utils";
import { COMPLETA_CODE, INTERMEDIARIA_CODE, INTERMEDIARIA_PLUS_CODE, SIMPLES_CODE, CHEQUE_CODE, EXPRESS_CODE } from "../../constants/constantsCredito";
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_CREDITO } from "../../constants/constantsCompany";

import estados from "../../components/utils/common/estados.json";
import menu from "../../components/utils/common/menu.json";

const tiposCheque = [
	"Apenas Cadastro", "Digitando dados do Cheque", "Por Código de Barras (CMC-7)", 
]

class Credito extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tipo: "",
			expressTipo: "CPF",
			tipoCheque: "Apenas Cadastro",
			creditoInput: {
				documento: "",
				uf: "",
				banco: "",
				agência: "",
				conta: "",
				digitoConta: "",
				chequeInicial: "",
				digitoChequeInicial: "",
				CMC7: "",
				folhas: "",
				servico: []
			}
		}
	}

	componentWillMount() {
		this.props.getLastQueries(COMPLETA_CODE, "COMPLETA");
		this.props.getLastQueries(INTERMEDIARIA_CODE, "INTERMEDIARIA");
		this.props.getLastQueries(INTERMEDIARIA_PLUS_CODE, "INTERMEDIARIAPLUS");
		this.props.getLastQueries(SIMPLES_CODE, "SIMPLES");
		this.props.getLastQueries(CHEQUE_CODE, "CHEQUE");
		this.props.getLastQueries(EXPRESS_CODE, "EXPRESS");
	}

	componentDidMount() {
		document.title = COMPANY_PRODUCT_CREDITO + " > " + COMPANY_NAME_SHORT;
	}

	closeTab = (index) => {
		{/*Fecha as abas, quando sobrar um chama a funcao para fechar tudo (closeModel)*/}
		if(this.props.datas.length > 1) {
			this.props.closeTab(index);
		} else {
			this.props.closeModel();
		}
	}

	onChangeInput = (evt) => {
		let newStateCredito = this.state.creditoInput;
		newStateCredito[evt.target.name] = evt.target.value
		this.setState({
			creditoInput: newStateCredito
		})
	}

	onChangeType = (evt) => {
		this.props.changeProductType("credito", evt.target.value)
	}

	onChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	onFormSubmit = (evt) => {
		evt.preventDefault();

		console.log("SUBMIT", this.props.type, this.state.creditoInput);
	}

	renderForm(showUF) {
		return (
			<span>
				<Col md={showUF ? 6 : 8}>
					<input
						className="form-control"
						type="text"
						placeholder={
							this.props.type == "SIMPLES" ?
								"CPF"
							: "CPF ou CNPJ"
						}
						value={this.state.creditoInput.documento}
						name="documento"
						onChange={this.onChangeInput}
						style={{width:'100%'}}/>
				</Col>

				{showUF ?
					<Col md={2}>
						<select
							className="form-control"
							name="estado"
							onChange={this.onChangeInput}
							value={this.state.creditoInput.estado}
							required>
							<option value="">Selecione UF</option>
							{estados.estados.map((estado,i) => {
								return <option value={estado.sigla} key={i}>{estado.sigla}</option>
							})}
						</select>
					</Col>
				: ""}
			</span>
		)
	}

	renderFormCheque() {
		return (
			<span>
				<Col md={2}>
					<select
						className="form-control"
						name="tipoCheque"
						onChange={this.onChange}
						value={this.state.tipoCheque}
						required>
						{tiposCheque.map((tipo,i) => {
							return <option value={tipo} key={i}>{tipo}</option>
						})}
					</select>
				</Col>
				<Col md={this.state.tipoCheque != "Apenas Cadastro" ? 8 : 6}>
					<input
						className="form-control"
						type="text"
						placeholder="CPF ou CNPJ"
						value={this.state.creditoInput.documento}
						name="documento"
						onChange={this.onChangeInput}/>
				</Col>

				{this.state.tipoCheque != "Apenas Cadastro" ?
					<span>
						{this.state.tipoCheque != "Por Código de Barras (CMC-7)" ?
							<span>
								<Col md={2}>
									<input
										className="form-control"
										type="text"
										placeholder="Banco"
										value={this.state.creditoInput.banco}
										name="banco"
										onChange={this.onChangeInput}/>
								</Col>

								<Col md={2}>
									<input
										className="form-control"
										type="text"
										placeholder="Agência"
										value={this.state.creditoInput.agencia}
										name="agencia"
										onChange={this.onChangeInput}/>
								</Col>

								<Col md={2}>
									<input
										className="form-control"
										type="text"
										placeholder="conta"
										value={this.state.creditoInput.conta}
										name="conta"
										onChange={this.onChangeInput}/>
								</Col>

								<Col md={2}>
									<input
										className="form-control"
										type="text"
										placeholder="Conta"
										value={this.state.creditoInput.digitoConta}
										name="digitoConta"
										onChange={this.onChangeInput}/>
								</Col>

								<Col md={2}>
									<input
										className="form-control"
										type="text"
										placeholder="Cheque Inicial"
										value={this.state.creditoInput.chequeInicial}
										name="chequeInicial"
										onChange={this.onChangeInput}/>
								</Col>

								<Col md={2}>
									<input
										className="form-control"
										type="text"
										placeholder="Dígito Cheque Inicial"
										value={this.state.creditoInput.digitoChequeInicial}
										name="digitoChequeInicial"
										onChange={this.onChangeInput}/>
								</Col>
							</span>
						: ""}

						<Col md={6}>
							<input
								className="form-control"
								type="text"
								placeholder="CMC7"
								value={this.state.creditoInput.CMC7}
								name="CMC7"
								onChange={this.onChangeInput}/>
						</Col>

						<Col md={4}>
							<input
								className="form-control"
								type="text"
								placeholder="Folhas"
								value={this.state.creditoInput.folhas}
								name="folhas"
								onChange={this.onChangeInput}/>
						</Col>
					</span>
				: ""}
						
			</span>
		)
	}

	renderFormExpress() {
		return (
			<span>
				<Col md={2}>
					<select
						className="form-control"
						name="expressTipo"
						onChange={this.onChange}
						value={this.state.expressTipo}
						required>
						<option value='CPF'>CPF</option>
						<option value='CNPJ'>CNPJ</option>
					</select>
				</Col>
				<Col md={8}>
					<input
						className="form-control"
						type="text"
						placeholder="CPF ou CNPJ"
						value={this.state.creditoInput.documento}
						name="documento"
						onChange={this.onChangeInput}/>
				</Col>

				<Col md={10} className="text-center">
					<FormGroup>
						<Checkbox inline checked readOnly>
							Cadastral
						</Checkbox>
						{' '}
						<Checkbox inline>
							Receita Federal
						</Checkbox>
						{' '}
						<Checkbox inline>
							Sintegra
						</Checkbox>
						<Checkbox inline>
							CCF
						</Checkbox>
						{this.state.expressTipo == "CNPJ" ?
							<Checkbox inline>
								Protesto Público 
							</Checkbox>
						: ""}
					</FormGroup>
				</Col>
			</span>
		)
	}

	form = (tipo) => {
		return (
			<MyForm
				icon = {ICON_CREDITO}
				logo = {LOGO_CREDITO}
				showLogo = {this.props.datas.length == 0 ? true : false}
				onformSubmit = {this.onFormSubmit}
				closeMessageErrorLocalize = {this.props.closeMessageErrorLocalize}
				options={menu.sidebar[4].subItems}
				onChange={this.onChangeType}
                type={this.props.type}
				seeModelo = {this.props.seeModel}
				status = {this.props.status}
				message = {this.props.message}
				lastQueries = {this.props.lastQueries[this.props.type]}
			>
				{tipo ?
					tipo == "INTERMEDIARIA" || tipo == "INTERMEDIARIAPLUS" ?
						this.renderForm(false)
					: 
						tipo == "CHEQUE" ?
							this.renderFormCheque()
						:
							tipo == "EXPRESS" ?
								this.renderFormExpress()
							: this.renderForm(false)
					: this.renderForm(false)
				}
				
			</MyForm>
		)
	}

	render() {
		return (
			<div className="container">
				{this.form(this.props.type)}

				{this.props.loading ? <div className="imgSearching"><img src={LOADING_GIF} /></div> : ""}

				{this.props.datas.length > 0 ? 
					(
						<Tabs
							activeKey={this.props.tabActive}
							onSelect={(key) => {this.props.changeTab(key)}}
							animation={false}
							id="tab-credito"
						>
							{this.props.datas.map((data, index) => {
								return (
									<Tab eventKey={data.label} 
										title={
											<Titletab
												icon={data.icon}
												label={data.label}
												close={() => this.closeTab(index)}
											/>
										}
										key={index}
									>
										{data.produto == "credito" ?
											<CreditoView
												data={data.data}
												tipo={data.tipo}
												index={index}/>
										: ""}
									</Tab>
								)
							})}
						</Tabs>
					)
				: ""}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		datas: state.credito.response,
		status: state.credito.status,
		message: state.credito.message,
		loading: state.credito.loading,
		tabActive: state.credito.tabActive,
		lastQueries: state.credito.lastQueries,
		type: state.credito.type
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeProductType,
		getLastQueries,
		seeModel,
		closeModel,
		changeTab,
		closeTab
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Credito);