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
		searchByFocoFiscalSimplesNacional,
		searchByReceitaPF,
		searchByReceitaPJ,
		searchByReceitaPJSintegra
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
import { MyFieldGroup } from "../../components/forms/CommonForms"
import { FocoFiscalDescription } from "../../components/ProductDescription";
import { PrintScreen, LoadingScreen } from "../../components/utils/ElementsAtScreen";

//Constants
import { LOADING_GIF } from "../../constants/utils";
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_FOCOFISCAL, COMPANY_PRODUCT_FOCOFISCAL_LABEL, LOGO_FOCOFISCAL } from "../../constants/constantsCompany";

import estados from "../../components/utils/common/estados.json";
import todosProdutos from "../../components/utils/common/produtos.js";

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

		let documento = this.state.focofiscalInput.documento
		documento = documento.replace(/[^0-9]/g, "")

		switch(this.props.type) {
			case "RECEITAPF":
				this.props.searchByReceitaPF(documento,this.state.focofiscalInput.dataNascimento)
				break
			case "RECEITAPJ":
				this.props.searchByReceitaPJ(documento)
				break
			case "PJSINTEGRA":
				this.props.searchByReceitaPJSintegra(documento)
				break
			default:
				this.props.searchByFocoFiscalSimplesNacional(documento)
		}
		
		this.setState({
			focofiscalInput: {
				documento: [],
				dataNascimento: this.state.dataNascimento,
				estado: this.state.estado
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
						<Col md={tipo == "RECEITAPF" ? 6 : 8}>
							<MyFieldGroup
								type="text"
								placeholder={
									this.props.type == "RECEITAPF" ?
										"CPF"
									: "CNPJ"
								}
								value={this.state.focofiscalInput.documento}
								name="documento"
								onChange={this.onChangeInput}
								required/>
						</Col>

						{tipo == "RECEITAPF" ?
							<Col md={2}>
								<MyFieldGroup
									id="dataNascimento"
									type="date"
									name="dataNascimento"
									required
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
		searchByFocoFiscalSimplesNacional,
		searchByReceitaPF,
		searchByReceitaPJ,
		searchByReceitaPJSintegra
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FocoFiscal);