import React, { Component } from "react"
import moment from "moment"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Form, FormGroup, FormControl, InputGroup, ControlLabel, Checkbox, Col, Tabs, Tab} from "react-bootstrap"

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
} from "../../actions/actionsFocoFiscal"
import {
		changeProductType,
		changeMenu
} from "../../actions/actionsCommon"

//Components
import FocoFiscalView from "./FocoFiscalView"
import MyForm from "../../components/forms/Form"
import Panel from "../../components/panel/Panel"
import ReverConsultaMessage from "../../components/utils/ReverConsulta"
import TitleProduct from "../../components/utils/TitleProduct"
import Titletab from "../../components/utils/TitleTab"
import UltimasConsultas from "../../components/UltimasConsultas"
import { DateField, MyFieldGroup } from "../../components/forms/CommonForms"
import { FocoFiscalDescription } from "../../components/ProductDescription"
import { PrintScreen, LoadingScreen } from "../../components/utils/ElementsAtScreen"

//Constants
import { LOADING_GIF } from "../../constants/utils"
import {
	COMPANY_NAME_SHORT,
	COMPANY_PRODUCT_FOCOFISCAL,
	COMPANY_PRODUCT_FOCOFISCAL_LABEL,
	COMPANY_PRODUCT_FOCOFISCAL_COLOR,
	ICON_FOCOFISCAL,
	LOGO_FOCOFISCAL
} from "../../constants/constantsCompany"

import produtos from "../../utils/produtos.js"

class FocoFiscal extends Component {
	constructor(props) {
		super(props);

		this.consultasAtivas = this.props.consultasAtivas ? this.props.consultasAtivas[COMPANY_PRODUCT_FOCOFISCAL_LABEL] : undefined
		this.consultas = produtos[COMPANY_PRODUCT_FOCOFISCAL_LABEL].consultas
		this.produtoInformacoes = []

		if(this.consultasAtivas) {
			this.consultas.forEach(consulta => {
				if(this.consultasAtivas[consulta.modulo]) {
					this.produtoInformacoes.push(
						{id:consulta.modulo, label:this.consultasAtivas[consulta.modulo].labelFront}
					)
				}
			})
		}

		this.state = {
			documento: "",
			dataNascimento: moment()
		}
	}

	componentWillMount() {
		this.props.getLastQueries();
	}

	componentDidMount() {
		document.title = COMPANY_PRODUCT_FOCOFISCAL + " > " + COMPANY_NAME_SHORT;
	}

	onChangeInput = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
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
		evt.preventDefault()
		this.props.loadingFocoFiscal()

		let documento = this.state.documento
		const type = this.props.type
		documento = documento.replace(/[^0-9]/g, "")

		if(type.match("RECEITAPF")) {
			let dataNascimento = moment(this.state.dataNascimento).format("YYYY-MM-DD")
			this.props.searchByReceitaPF(documento,dataNascimento)
		}
		else if(type.match("PJSINTEGRA"))
			this.props.searchByReceitaPJSintegra(documento)
		else if(type.match("RECEITAPJ"))
			this.props.searchByReceitaPJ(documento)
		else
			this.props.searchByFocoFiscalSimplesNacional(documento)

		this.setState({
			documento: ""
		})
	}

	form = (tipo) => {
		return (
			<Panel>
				<TitleProduct
					icon={ICON_FOCOFISCAL}
					title={this.consultasAtivas.produtoDescricao}
					color={COMPANY_PRODUCT_FOCOFISCAL_COLOR}
				/>
				<Col md={12}>
					<MyForm
						onformSubmit = {this.onFormSubmit}
						closeMessageError = {this.props.closeMessageErrorFocoFiscal}
						options={this.produtoInformacoes}
						onChange={this.onChangeType}
						type={this.props.type}
						seeModelo = {this.props.seeModel}
						status = {this.props.status}
						message = {this.props.message}
						lastQueries = {this.props.lastQueries[this.props.type]}
					>
						<Col md={tipo.match("RECEITAPF") ? 6 : 8}>
							<MyFieldGroup
								type="text"
								placeholder={
									this.props.type.match("RECEITAPF") ?
										"CPF"
									: "CNPJ"
								}
								value={this.state.documento}
								name="documento"
								onChange={this.onChangeInput}
								required/>
						</Col>

						{tipo.match("RECEITAPF") ?
							<Col md={2}>
								<DateField
									required
									placeholder="Data nascimento"
									startDate={this.state.dataNascimento}
									onChange={(date) => this.setState({dataNascimento: date})}
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
							produtoInformacoes={this.produtoInformacoes}
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
											label={data[dataKey].label.length > 20 ? data[dataKey].label.substring(0,20)+"..." : data[dataKey].label}
											close={() => this.props.closeTab(dataKey)}
										/>
									}
									key={dataKey}
								>

									{data[dataKey].reverConsulta ?
										<ReverConsultaMessage />
									:""}

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
		type: state.focofiscal.type,
		consultasAtivas: state.user.consultasAtivas
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