// Node modules
import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Alert, Col, Tabs, Tab} from "react-bootstrap"

// Components
import Panel from "../../components/panel/Panel"
import MyForm from "../../components/forms/Form"
import CreditoMixView from "./CreditoMixView"
import Titletab from "../../components/utils/Titletab"
import UltimasConsultas from "../../components/UltimasConsultas"
import { MyFieldGroup, MyCheckboxGroup } from "../../components/forms/CommonForms"
import { LocalizeDescription } from "../../components/ProductDescription"
import { PrintScreen, LoadingScreen } from "../../components/utils/ElementsAtScreen"

// Constants
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_CREDITOMIX_LABEL, COMPANY_PRODUCT_CREDITOMIX, LOGO_CREDITOMIX } from "../../constants/constantsCompany";
//import { LOGO_CREDITOMIX } from "../../constants/utils";

// Actions
import { changeProductType } from "../../actions/actionsCommon";
import { changeTab, closeTab, closeMessageErrorCreditoMix, loadingCreditoMix, searchCreditoMix, showCreditoMixModel } from "../../actions/creditomix/actionsCreditoMix"
import { todosProdutos } from "../../components/utils/common/produtos"

const produtoInformacoes = todosProdutos[COMPANY_PRODUCT_CREDITOMIX_LABEL];

function transformInCheckBoxObject (options) {
    let newOptionsObject = {}
    for(let key of ["cpf", "cnpj"]) {
        newOptionsObject[key] = options[key].map((opt) => {
            return {
                inline: false,
                checked: false,
                name: opt.id,
                text: opt.label
            }
        })
    }

    return newOptionsObject
}
const optionsNormalized = transformInCheckBoxObject(produtoInformacoes.options)

class CreditoMix extends Component {

    state = {
        options: optionsNormalized,
        documento: "",
        cepConsumidor: "",
        showCheckboxes: true,
        showCep: false
    }

	componentDidMount() {
		document.title = COMPANY_PRODUCT_CREDITOMIX + " > " + COMPANY_NAME_SHORT;
    }

    onChangeCheckBox = (name, index) => {
        let newOptions = JSON.parse(JSON.stringify(this.state.options))
        // filtra no array o elemento selecionado e troca o valor deste objeto no map
        newOptions[this.props.type.toLowerCase()]
                .filter(option => option.name === name)
                .map(opt => opt.checked = !opt.checked)

        this.setState({
            options: newOptions,
            showCep: name === "limiteCreditoSugerido" ? !this.state.showCep : this.state.showCep
        })
    }

	renderCheckboxes = () => {
		let options = this.state.options
		let showCheckboxes = this.state.showCheckboxes
		let type = this.props.type.toLowerCase()

		if(showCheckboxes) {
			return (
				<span>
					{this.state.showMessageErrorWhenNotSelectedAnyCheckBox ?
						<Col md={12}>
							<Alert bsStyle="danger" className="text-center" onDismiss={() => this.setState({
								showMessageErrorWhenNotSelectedAnyCheckBox:false
							})}>
								Selecione ao menos uma opção no checkbox
							</Alert>
						</Col>
					: ""}

                    {type ?
                        options[type].map((opt, index) => {
                            let step = index * 5
                            /**Percorre o array de options e gera 5 elementos por coluna */
                            if(step < options[type].length )
                                return (
                                    <Col md={4} key={index}>
                                        <MyCheckboxGroup
                                            options={options[type].slice(step,step+5)}
                                            onChange={this.onChangeCheckBox}
                                        />
                                    </Col>
                                )
                        })
                    : ""}

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

	onChangeType = (evt) => {
		this.props.changeProductType(COMPANY_PRODUCT_CREDITOMIX_LABEL, evt.target.value)
	}

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    onformSubmit = (evt) => {
        evt.preventDefault()

        let type = this.props.type.toLowerCase()
        let request = {}
        
        //produtoInformacoes.options.cheque.map(cheque => request[cheque.id] = null) // seta todos os parametros de cheque
        this.state.options[type].map(option => request[option.name] = option.checked) // seta todos os parametros de de options
        request[type] = this.state.documento.replace(/[^0-9]/g,"") // seta o documento para o objeto
        this.state.cepConsumidor ? request["cepConsumidor"] = this.state.cepConsumidor.replace(/[^0-9]/g,"") : "" // seta o cep para o objeto

        this.props.loadingCreditoMix();
        this.props.searchCreditoMix(request, this.props.type);

        this.setState({
            documento: [],
            cepConsumidor: "",
            showCheckboxes: false
        })
    }

    renderInput = () => {
        let type = this.props.type
        let showCep = this.state.showCep
        return (
            <div>
                <Col md={showCep ? 5 : 8}>
                    <MyFieldGroup
                        id="documento"
                        type="text"
                        name="documento"
                        value={this.state.documento}
                        onChange={this.onChange}
                        required
                        placeholder="Digite o documento" />
                </Col>

                {showCep ?
                    <Col md={3}>
                        <MyFieldGroup
                            id="cepConsumidor"
                            type="text"
                            name="cepConsumidor"
                            value={this.state.cepConsumidor}
                            onChange={this.onChange}
                            required
                            placeholder="CEP" />
                    </Col>
                : ""}
            </div>
        )
    }

    renderInputCheque = () => {
        return (
            <div>
                <Col md={2}>
                    <MyFieldGroup
                        id="cmc71ChequeInicial"
                        type="text"
                        name="cmc71ChequeInicial"
                        value={this.state.cmc71ChequeInicial}
                        onChange={this.onChange}
                        required
                        placeholder="1ª Parte do CMC7" />
                </Col>

                <Col md={2}>
                    <MyFieldGroup
                        id="cmc72ChequeInicial"
                        type="text"
                        name="cmc72ChequeInicial"
                        value={this.state.cmc72ChequeInicial}
                        onChange={this.onChange}
                        required
                        placeholder="2ª Parte do CMC7" />
                </Col>

                <Col md={3}>
                    <MyFieldGroup
                        id="cmc73ChequeInicial"
                        type="text"
                        name="cmc73ChequeInicial"
                        value={this.state.cmc73ChequeInicial}
                        onChange={this.onChange}
                        required
                        placeholder="3ª Parte do CMC7" />
                </Col>
            </div>
        )
    }

	form = (tipo) => {
		return (
			<Panel>
				<Col md={12}>
					<MyForm
						logo = {LOGO_CREDITOMIX}
						onformSubmit = {this.onformSubmit}
						closeMessageError = {this.props.closeMessageErrorCreditoMix}
						options={produtoInformacoes.subItems}
						onChange={this.onChangeType}
						type={this.props.type}
						seeModelo = {this.props.showCreditoMixModel}
						status = {this.props.status}
						message = {this.props.message}
                        moreInfoToShow={this.props.type === "CHEQUE" ? "" : this.renderCheckboxes(this.state.options)}
					>

                        {this.props.type !== "CHEQUE" ?
						    this.renderInput()
                        :   this.renderInputCheque()}
						
					</MyForm>
				</Col>
			</Panel>
		)
	}

    render() {
        let type = this.props.type
        let data = this.props.data
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
						<LocalizeDescription />
						<div style={{marginBottom:15}} />
                        <UltimasConsultas
                            consultas={this.props.lastQueries[type]}
                            type={type}
                            search={this.researchUltimasConsultas}
                        />
					</span>
                :
					<Tabs
                        id="tab-credito"
						activeKey={tabActive}
						onSelect={(key) => {changeTab(key)}}
						animation={false}
                    >

                        <PrintScreen />

						{values.map((dataKey) =>{
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
									{data[dataKey].produto == COMPANY_PRODUCT_CREDITOMIX_LABEL ?
										<CreditoMixView
                                            data={data[dataKey]}
                                        />
									: ""}
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
    console.log("STATE", state)
    return {
        data: state.creditomix.response,
        type: state.creditomix.type,
		status: state.creditomix.status,
		message: state.creditomix.message,
        tabActive: state.creditomix.tabActive,
        lastQueries: state.creditomix.lastQueries,
        loading: state.creditomix.loading
    }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
        changeProductType,
        changeTab,
        closeTab,
        closeMessageErrorCreditoMix,
        loadingCreditoMix,
        searchCreditoMix,
        showCreditoMixModel
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditoMix);