import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Alert, Col, Form, FormGroup, Tabs, Tab, } from "react-bootstrap";

//Components
import VeiculosView from "./VeiculosView";
import MyForm from "../../components/forms/Form";
import UltimasConsultas from "../../components/UltimasConsultas";
import Titletab from "../../components/utils/Titletab";
import Panel from "../../components/panel/Panel";
import { VeiculoslDescription } from "../../components/ProductDescription";
import { MyFieldGroup, MyCheckboxGroup } from "../../components/forms/CommonForms";
import { PrintScreen, LoadingScreen } from "../../components/utils/ElementsAtScreen";

//Actions
import {
		changeTab,
		closeMessageErrorVeiculos,
		closeTab,
		getLastQueries,
		loadingVeiculos,
		searchByVeiculos,
		seeModel
} from "../../actions/actionsVeiculos";
import { changeProductType } from "../../actions/actionsCommon";

//Constants
import { LOADING_GIF, TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE, TOOLTIP_SEE_PRODUCT_MODEL_MESSAGE, TOOLTIP_SEE_PRODUCT_DETAILS_MESSAGE } from "../../constants/utils";
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_VEICULOS, COMPANY_PRODUCT_VEICULOS_LABEL, LOGO_VEICULOS } from "../../constants/constantsCompany";
import { AGREGADOS_CODE, BDV_CODE, DECODIFICADOR_CODE, LOCALIZACAO_CODE, PROPRIETARIOS_CODE, LEILAO_CODE, SINISTRO_CODE } from "../../constants/constantsVeiculos";


import estados from "../../components/utils/common/estados.json";
import { todosProdutos } from "../../components/utils/common/produtos.js";

class VeiculosController extends Component {
	constructor(props) {
		super(props)

		this.produtoInformacoes = todosProdutos[COMPANY_PRODUCT_VEICULOS_LABEL]
		this.quantidadeCheckboxPorCol = 5; //Quantidade de checkbox que terao em cada col do bootstrap

		this.state = {
			input: {
				cpf: undefined,
				cnpj: undefined,
				numeroMotor: undefined,
				numeroCrlv: undefined,
				uf: undefined,
				placa: undefined,
				chassi: undefined,
				motor: false,
				localizaVeiculo: false,
				crlv: false,
				binFederal: false,
				binEstadual: false,
				gravame: false,
				decodificadorChassi: false,
				precificador: false,
				binRF: false,
				binRenajud: false,
				proprietariosAnteriores: false,
				agregados: false,
				localizaPlaca: false,
				leilao: false,
				indicioSinistro: false,
				leilao2: false,
				pt: false,
				renavam: false,
				decodificador2: false,
				decodificadorUnion: false
			},
			showMessageErrorWhenNotSelectedAnyCheckBox: false,
			showCheckboxes: true,
			optionsSelected: [],
			options:[
				{
					inline: false,
					checked: false,
					name: "binEstadual",
					text: "BIN ESTADUAL"
				},
				{
					inline: false,
					checked: false,
					name: "binFederal",
					text: "BIN FEDERAL"
				},
				{
					inline: false,
					checked: false,
					name: "binRF",
					text: "BIN FEDERAL + ROUBO E FURTO"
				},
				{
					inline: false,
					checked: false,
					name: "binRenajud",
					text: "BIN JUDICIAL RENAJUD"
				},
				{
					inline: false,
					checked: false,
					name: "decodificadorUnion",
					text: "DECODIFICADOR UNION"
				},
				{
					inline: false,
					checked: false,
					name: "leilao2",
					text: "LEILÃO 2"
				},
				{
					inline: false,
					checked: false,
					name: "leilao",
					text: "VEICULOS OFERTADOS A LEILÃO"
				},
				{
					inline: false,
					checked: false,
					name: "pt",
					text: "SINISTRO IRRECUPERÁVEL PT"
				},
				{
					inline: false,
					checked: false,
					name: "gravame",
					text: "GRAVAME - DETALHES DO FINANCIAMENTO"
				},
				{
					inline: false,
					checked: false,
					name: "decodificadorChassi",
					text: "DECODIFICADOR DE CHASSI"
				},
				{
					inline: false,
					checked: false,
					name: "agregados",
					text: "AGREGADO VEICULAR"
				},
				{
					inline: false,
					checked: false,
					name: "proprietariosAnteriores",
					text: "HISTÓRICO DE PROPRIETÁRIOS ANTERIORES"
				},
				{
					inline: false,
					checked: false,
					name: "localizaVeiculo",
					text: "LOCALIZADOR DE CHASSI E MOTOR"
				},
				{
					inline: false,
					checked: false,
					name: "crlv",
					text: "CONSULTA CRLV - DOCUMENTO"
				},
				{
					inline: false,
					checked: false,
					name: "localizaPlaca",
					text: "LOCALIZADOR DE PLACA"
				},
				{
					inline: false,
					checked: false,
					name: "precificador",
					text: "PRECIFICADOR"
				},
				{
					inline: false,
					checked: false,
					name: "indicioSinistro",
					text: "INDICIO DE SINISTRO"
				},
				{
					inline: false,
					checked: false,
					name: "motor",
					text: "LOCALIZADOR DE MOTOR"
				},
				{
					inline: false,
					checked: false,
					name: "decodificador2",
					text: "DECODIFICADOR DE CHASSI - FIPE E MOLICAR"
				}
			]
		}
	}

	componentDidMount() {
		document.title = COMPANY_PRODUCT_VEICULOS + " > " + COMPANY_NAME_SHORT;
	}

	onChangeCheckBox = (name,index) => {
		let options = this.state.options.concat();
		let optionsSelected = this.state.optionsSelected.concat();
		let input = Object.assign({}, this.state.input);
		let pos = 0;

		for(let i=index; i<options.length; i+=this.quantidadeCheckboxPorCol) {
			if(options[i].name == name) {
				pos = i;
				i = options.length;
			}
		}

		options[pos].checked = !options[pos].checked;

		let posArrayOptionsSelected = optionsSelected.indexOf(options[pos].name);
		if(posArrayOptionsSelected === -1) {
			input[options[pos].name] = true;
			optionsSelected.push(options[pos].name);
		}
		else {
			input[options[pos].name] = false;
			optionsSelected.splice(posArrayOptionsSelected, 1);
		}

		this.setState({options, optionsSelected, input});
	}
	
	onChangeType = (evt) => {
		this.props.changeProductType(COMPANY_PRODUCT_VEICULOS_LABEL, evt.target.value);
	}

	onChangeInput = (value, nameInput) => {
		let input = Object.assign({}, this.state.input);
		input[nameInput] = value;

		this.setState({ input })

	}

	onCloseTab = (index) => {
		if(this.props.datas.length === 1)
			this.setState({
				showCheckboxes: true
			});
		
		this.props.closeTab(index);
	}

	onFormSubmit = (evt) => {
		evt.preventDefault();
		let optionsSelected = this.state.optionsSelected;

		if(optionsSelected.length === 0) {
			this.setState({
				showMessageErrorWhenNotSelectedAnyCheckBox: true,
				showCheckboxes: true
			})
		} else {
			this.setState({
				showCheckboxes: false
			})

			/**type === tipo da consulta, ex: PLACA, CNPJ
			 * input === entrada do dado
			 * dataToSend === objeto com as flags e o input de entrada para ser enviado
			 * flagsSelected === flags selecionadas pelo usuario
			 */

			//se o usuario quiser enviar somente o CRLV, verifica se o input esta vazio e seta o type para CRLV
			let input = this.state.input[this.props.type.toLowerCase()] ? this.state.input[this.props.type.toLowerCase()] : this.state.input.numeroCrlv;
			let tipoInput = this.state.input.numeroCrlv ? "CRLV" : this.props.type;

			let dataToSend = this.state.input;
			let flagsSelected = this.state.optionsSelected

			this.props.loadingVeiculos();
			this.props.searchByVeiculos(tipoInput, input, dataToSend, flagsSelected);
		}
	}

	renderCheckboxes = () => {
		let options = this.state.options;
		let showCheckboxes = this.state.showCheckboxes;
		
		if(showCheckboxes) {
			return (
				<span style={{float:"left"}}>
					{this.state.showMessageErrorWhenNotSelectedAnyCheckBox ?
						<Col md={12}>
							<Alert bsStyle="danger" className="text-center" onDismiss={() => this.setState({
								showMessageErrorWhenNotSelectedAnyCheckBox:false
							})}>
								Selecione ao menos uma opção no checkbox
							</Alert>
						</Col>
					: ""}

					<Col md={3} sm={6}>
						<MyCheckboxGroup
							options={options.slice(0,5)}
							onChange={this.onChangeCheckBox}
						/>
					</Col>
					<Col md={3} sm={6}>
						<MyCheckboxGroup
							options={options.slice(5,10)}
							onChange={this.onChangeCheckBox}
						/>
					</Col>
					<Col md={3} sm={6}>
						<MyCheckboxGroup
							options={options.slice(10,15)}
							onChange={this.onChangeCheckBox}
						/>
					</Col>
					<Col md={3} sm={6}>
						<MyCheckboxGroup
							options={options.slice(15,20)}
							onChange={this.onChangeCheckBox}
						/>
					</Col>
				</span>
			)
		} else {
			return (
				<Col md={12}  className="text-center">
					<a href="#" onClick={() => this.setState({showCheckboxes: true})}>Exibir filtros da busca</a>
				</Col>
			)
		}
	}

	form = (tipo) => {
		return (
			<Panel>
				<Col md={12}>
					<MyForm
						logo = {LOGO_VEICULOS}
						onformSubmit = {this.onFormSubmit}
						closeMessageError = {this.props.closeMessageErrorVeiculos}
						options={this.produtoInformacoes.subItems}
						onChange={this.onChangeType}
						type={this.props.type}
						seeModelo = {this.seeModelSearch}
						status = {this.props.status}
						message = {this.props.message}
						lastQueries = {this.props.lastQueries[this.props.type]}
						moreInfoToShow={this.renderCheckboxes(this.state.options)}
					>

						{this.renderForm()}
						
					</MyForm>
				</Col>
			</Panel>
		)
	}

	renderForm = () => {
		let type = this.props.type;
		let isCRLVHidden = this.state.optionsSelected.indexOf("crlv") === -1 ? true : false;
		let isUFHidden = this.state.optionsSelected.indexOf("agregados") !== -1 || this.state.optionsSelected.indexOf("binFederal") !== -1 || this.state.optionsSelected.indexOf("binEstadual") !== -1 ? false : true;
		return (
			<div>
				<Col md={isCRLVHidden && isUFHidden ? 8 : isCRLVHidden && !isUFHidden ? 6 : 4}>
					<MyFieldGroup
						id={type}
						type="text"
						name={type}
						value={this.state.input[type]}
						onChange={(evt) => this.onChangeInput(evt.target.value, type.toLowerCase())}
						required={!isCRLVHidden && this.state.optionsSelected.length === 1 ? false : true}
						placeholder={"DIGITE: " + type} />
				</Col>

				{!isUFHidden ?
					<Col md={2}>
						<select
							className="form-control"
							name="uf"
							onChange={(evt) => this.onChangeInput(evt.target.value, "uf")}
							value={this.state.input.uf}
						>
							<option value="">UF</option>
							{estados.estados.map((estado,i) => {
								return <option value={estado.sigla} key={i}>{estado.sigla}</option>
							})}
						</select>
					</Col>
				: ""}

				{!isCRLVHidden ?
					<Col md={isUFHidden ? 4 : 2}>
						<MyFieldGroup
							id={type}
							type="text"
							name="numeroCrlv"
							value={this.state.input.numeroCrlv}
							onChange={(evt) => this.onChangeInput(evt.target.value, "numeroCrlv")}
							required
							placeholder={"DIGITE: Nº CRLV"} />
					</Col>
				: ""}
			</div>
		)
	}

	seeModelSearch = () => {
		this.setState({
			showCheckboxes: false
		})

		this.props.seeModel();
	}

	render() {
		let datas = this.props.datas;
		let loading = this.props.loading;
		let flags = this.state.options;
		return (
			<div>
				{this.form(this.props.type)}

				{loading ? <LoadingScreen /> : ""}

				<div style={{marginBottom:15}} />

				{this.props.datas.length > 0 ? <PrintScreen /> : ""}

                {datas.length === 0 ?
					<span>
						<VeiculoslDescription />
						<div style={{marginBottom:15}} />
                        <UltimasConsultas
                            consultas={this.props.lastQueries}
                            type={this.props.type} />
					</span>
                :
						<Tabs
							id="uncontrolled-tab-example"
							activeKey={this.props.tabActive}
							onSelect={(key) => {this.props.changeTab(key)}}
						>
							{this.props.datas.map((data, index) => {
								data.data.flags = data.data.flags ? data.data.flags : flags.concat();
								return (
									<Tab
										animation={true}
										eventKey={data.label}
										title={
											<Titletab
												icon={data.icon}
												label={data.label.length > 20 ? data.label.substring(0,20)+"..." : data.label}
												close={() => this.onCloseTab(index)}
											/>
										}
										key={index}
									>
										<VeiculosView
											data={data.data}
											tipo={data.tipo}
											index={index}
											flags={data.data.flags}
											searchPerson={this.searchLocalize}/>

									</Tab>
								)
							})}
						</Tabs>
				}
				
			</div>
		);
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
		closeTab,
		getLastQueries,
		loadingVeiculos,
		searchByVeiculos,
		seeModel
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VeiculosController);