import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";

import {
		changeTab,
		closeMessageErrorFocoFiscal,
		closeModel,
		closeTab,
		getLastQueries,
		loadingFocoFiscal,
		seeModel,
		searchByFocoFiscal,
		searchByReceitaPF,
		searchBySintegraUnificada
} from "../../actions/actionsFocoFiscal";
import {
		changeProductType,
		changeMenu
} from "../../actions/actionsCommon";

import FocoFiscalView from "./FocoFiscalView";
import MyForm from "../../components/forms/Form";
import Titletab from "../../components/utils/Titletab";

import { Form, FormGroup, FormControl, InputGroup, ControlLabel, Checkbox, Col} from "react-bootstrap";

import { LOGO_FOCOFISCAL, ICON_FOCOFISCAL, LOADING_GIF } from "../../constants/utils";
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_FOCOFISCAL } from "../../constants/constantsCompany";

import estados from "../../components/utils/common/estados.json";
import menu from "../../components/utils/common/menu.json";

class FocoFiscal extends Component {
	constructor() {
		super();

		this.state = {
			focofiscalInput: {
				documento: "",
				dataNascimento: "",
				estado: ""
			}
		}

	}

	componentWillMount() {
		this.props.getLastQueries();
	}

	componentDidMount() {
		document.title = COMPANY_PRODUCT_FOCOFISCAL + " > " + COMPANY_NAME_SHORT;
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
		let newState = this.state.focofiscalInput;
		newState[evt.target.name] = evt.target.value
		this.setState({
			focofiscalInput: newState
		})
	}

	onChangeType = (evt) => {
		this.props.changeProductType("focofiscal", evt.target.value)
	}

	onChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	onFormSubmit = (evt) => {
		evt.preventDefault();

		this.props.loadingFocoFiscal();

		if(this.props.type == "PF") {
			this.props.searchByReceitaPF(this.state.focofiscalInput.documento, this.state.focofiscalInput.dataNascimento);
		} else if(this.props.type == "UNIFICADA") {
			this.props.searchBySintegraUnificada(this.state.focofiscalInput.documento, this.state.focofiscalInput.estado);
		} else {
			this.props.searchByFocoFiscal(this.state.focofiscalInput.documento);
		}
		
		this.setState({
			focofiscalInput: {
				documento: "",
				dataNascimento: "",
				estado: ""
			}
		})
	}

	form = (tipo) => {
		return (
			<MyForm
				icon = {ICON_FOCOFISCAL}
				logo = {LOGO_FOCOFISCAL}
				showLogo = {this.props.datas.length == 0 ? true : false}
				onformSubmit = {this.onFormSubmit}
				closeMessageError = {this.props.closeMessageErrorFocoFiscal}
				options={menu.sidebar[6].subItems}
				onChange={this.onChangeType}
                type={this.props.type}
				seeModelo = {this.props.seeModel}
				status = {this.props.status}
				message = {this.props.message}
				lastQueries = {this.props.lastQueries[this.props.type]}
			>
				<Col md={tipo == "UNIFICADA" || tipo == "PF" ? 5 : 7}>
					<input
						className="form-control"
						type="text"
						placeholder={
							this.props.type == "PF" ?
								"CPF"
							: "CNPJ"
						}
						value={this.state.focofiscalInput.documento}
						name="documento"
						onChange={this.onChangeInput}
						style={{width:'100%'}}
						required/>
				</Col>

				{tipo == "UNIFICADA" ?
					<Col md={2}>
						<select
							className="form-control"
							name="estado"
							onChange={this.onChangeInput}
							value={this.state.focofiscalInput.estado}
							required>
							<option value="">Selecione UF</option>
							{estados.estados.map((estado,i) => {
								return <option value={estado.sigla} key={i}>{estado.sigla}</option>
							})}
						</select>
					</Col>
				: ""}

				{tipo == "PF" ?
					<Col md={2}>
						<input
							className="form-control"
							type="date"
							name="dataNascimento"
							value={this.state.focofiscalInput.dataNascimento}
							onChange={this.onChangeInput}
						/>
					</Col>
				: ""}
				
			</MyForm>
		)
	}

	render() {
		return (
			<div>
				{this.form(this.props.type)}

				{this.props.loading ? <div className="imgSearching"><img src={LOADING_GIF} /></div> : ""}

				{this.props.datas.length > 0 ? 
					(
						<Tabs
							defaultActiveKey={this.props.datas[0].label}
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
										{data.produto == "focofiscal" ?
											<FocoFiscalView
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
		datas: state.focofiscal.response,
		status: state.focofiscal.status,
		message: state.focofiscal.message,
		loading: state.focofiscal.loading,
		tabActive: state.focofiscal.tabActive,
		lastQueries: state.focofiscal.lastQueries,
		type: state.focofiscal.type
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeProductType,
		closeMessageErrorFocoFiscal,
		closeModel,
		changeTab,
		closeTab,
		getLastQueries,
		loadingFocoFiscal,
		seeModel,
		searchByFocoFiscal,
		searchByReceitaPF,
		searchBySintegraUnificada
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FocoFiscal);