import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Tabs, Tab} from "react-bootstrap";

import {
		seeModel,
		closeModel,
		closeTab,
		changeTab
} from "../../actions/actionsCredito";

import CreditoView from "./CreditoView";
import Form from "../../components/forms/Form";
import Titletab from "../../components/utils/Titletab";

import { LOGO_CREDITO, ICON_CREDITO } from "../../constants/constantsCredito";

class Credito extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tipo: "Intermediária Plus/Pessoal Plus",
			documento: ""
		}

		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		document.title = "Assertiva > Crédito";
	}

	onChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	onFormSubmit(evt) {
		evt.preventDefault();

		console.log("SUBMIT", this.state.tipo);
	}

	renderForm(options) {
		return (
			<Form
				options = {options}
				optionSelected = {location.pathname.split("/")[1].toUpperCase()}
				tipo = {this.state.tipo}
				icon = {ICON_CREDITO}
				logo = {LOGO_CREDITO}
				showModel = {this.props.datas.length >= 1 ? (this.props.datas[0].data.cadastroPf.cpf == 11111111111 ? true: false) : false}
				showLogo = {this.props.datas.length == 0 ? true : false}
				onChange = {this.onChange}
				onformSubmit = {this.onFormSubmit}
				seeModelo = {this.props.seeModel}
				closeModelo = {this.props.closeModel}
				status = {this.props.status}
				message = {this.props.message} >
				
				<input
					value={this.state.documento}
					type="text"
					className="form-control input-search input-form input-form-single"
					placeholder="Digite o documento"
					name="documento"
					required
					onChange={this.onChange} />

			</Form>
		)
	}

	render() {
		let options = ["Consulta Completa", "Consulta Intermediária", "Intermediária Plus/Pessoal Plus", "Consulta Simples", "Consulta Cheque", "Consulta Express"];
		return (
			<div className="container">
				{this.renderForm(options)}

				{this.props.loading ? <div className="imgSearching"><img src="../../../public/loading.gif" /></div> : ""}

				{this.props.datas.length > 0 ? 
					(
						<Tabs
							defaultActiveKey={this.props.datas[0].label}
							animation={false}
							id="uncontrolled-tab-example"
						>
							{this.props.datas.map((data, index) => {
								return (
									<Tab eventKey={data.label} title={<Titletab icon={data.icon} label={data.label} close={this.props.closeTab}/>} key={index}>
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
		tabActive: state.credito.tabActive
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		seeModel,
		closeModel,
		changeTab,
		closeTab
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Credito);