import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Form, FormGroup, FormControl, InputGroup, ControlLabel, Checkbox, Col, Tabs, Tab} from "react-bootstrap";

//Actions
import {
		changeTab,
		closeMessageErrorFocoFiscal,
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

//Components

import FocoFiscalView from "./FocoFiscalView";
import MyForm from "../../components/forms/Form";
import Panel from "../../components/panel/Panel";
import Titletab from "../../components/utils/Titletab";
import UltimasConsultas from "../../components/UltimasConsultas";
import { FocoFiscalDescription } from "../../components/ProductDescription";
import { PrintScreen, LoadingScreen } from "../../components/utils/ElementsAtScreen";

//Constants
import { LOADING_GIF } from "../../constants/utils";
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_FOCOFISCAL, COMPANY_PRODUCT_FOCOFISCAL_LABEL, LOGO_FOCOFISCAL } from "../../constants/constantsCompany";

import estados from "../../components/utils/common/estados.json";
import { todosProdutos } from "../../components/utils/common/produtos.js";

class FocoFiscal extends Component {
	constructor(props) {
		super(props);

		this.produtoInformacoes = todosProdutos[COMPANY_PRODUCT_FOCOFISCAL_LABEL]

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

	onChangeInput = (evt) => {
		let newState = this.state.focofiscalInput;
		newState[evt.target.name] = evt.target.value
		this.setState({
			focofiscalInput: newState
		})
	}

	onChangeType = (evt) => {
		this.props.changeProductType(COMPANY_PRODUCT_FOCOFISCAL_LABEL, evt.target.value)
	}

	onChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	onFormSubmit = (evt) => {
		evt.preventDefault();

		this.props.loadingFocoFiscal();

		switch(this.props.type) {
			case "PF":
				this.props.searchByReceitaPF(this.state.focofiscalInput.documento,this.state.focofiscalInput.dataNascimento)
				break
			case "UNIFICADA":
				this.props.searchBySintegraUnificada(this.state.focofiscalInput.documento, this.state.focofiscalInput.estado)
				break
			default:
				this.props.searchByFocoFiscal(this.state.focofiscalInput.documento)
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
			<Panel>
				<Col md={12}>
					<MyForm
						logo = {LOGO_FOCOFISCAL}
						onformSubmit = {this.onFormSubmit}
						closeMessageError = {this.props.closeMessageErrorFocoFiscal}
						options={this.produtoInformacoes.subItems}
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
				</Col>
			</Panel>
		)
	}

	render() {
        let type = this.props.type
        let data = this.props.datas
        let tabActive = this.props.tabActive
        let changeTab = this.props.changeTab
        let loading = this.props.loading
        let values = Object.keys(data)
		return (
			<div>
				{this.form(type)}

				{loading ? <LoadingScreen /> : ""}

				<div style={{marginBottom:15}} />

				{values.length === 0 ?
					<span>
						<FocoFiscalDescription />
						<div style={{marginBottom:15}} />
                        <UltimasConsultas
                            consultas={this.props.lastQueries[type]}
                            type={type}
                            search={this.researchUltimasConsultas}
						/>
					</span>
				:				
					<Tabs
						id="tab-focofiscal"
						activeKey={tabActive}
						onSelect={(key) => {changeTab(key)}}
						animation={false}
					>

						<PrintScreen />

						{values.map((dataKey) => {
							console.log("RENDER", tabActive, dataKey)
							return (
								<Tab
                                    eventKey={data[dataKey].label} 
									title={
										<Titletab
											icon={data[dataKey].icon}
											label={data[dataKey].label}
											close={() => this.props.closeTab(dataKey)}
										/>
									}
									key={dataKey}
								>
									{data[dataKey].produto == COMPANY_PRODUCT_FOCOFISCAL_LABEL ?
										<FocoFiscalView
											data={data[dataKey]}
										/>
									: ""}
								</Tab>
							)
						})}
					</Tabs>
				}
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