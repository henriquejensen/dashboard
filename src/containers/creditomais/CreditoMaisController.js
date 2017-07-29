import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Col, Tabs, Tab } from "react-bootstrap"

//Components
import BuscaPorRelacionados from "../../components/relacionados/BuscaPorRelacionados"
import CreditoMaisView from "./CreditoMaisView"
import Protocolo from "../../components/protocolo/Protocolo"
import MyForm from "../../components/forms/Form"
import Panel from "../../components/panel/Panel"
import UltimasConsultas from "../../components/UltimasConsultas"
import ReverConsultaMessage from "../../components/utils/ReverConsulta"
import TitleProduct from "../../components/utils/TitleProduct"
import Titletab from "../../components/utils/TitleTab"
import { CreditoMaisDescription } from "../../components/ProductDescription"
import { PrintScreen, LoadingScreen } from "../../components/utils/ElementsAtScreen"
import { MyFieldGroup } from "../../components/forms/CommonForms"

// Constants
import {
    COMPANY_NAME_SHORT,
    COMPANY_PRODUCT_CREDITOMAIS_LABEL,
    COMPANY_PRODUCT_CREDITOMAIS_COLOR,
    ICON_CREDITOMAIS,
} from "../../constants/constantsCompany"
import { ERR_CONNECTION_REFUSED, REQUEST_ERROR, SUCCESS } from "../../constants/utils"

//Actions
import { changeProductType } from "../../actions/actionsCommon"
import {
    changeTab,
    closeMessageErrorCreditoMais,
    closeTab,
    loadingCreditoMais,
    searchCreditoMaisSimples,
    searchCreditoMaisAnalitica,
    searchCreditoMaisChequeAnalitica,
    searchCreditoMaisCorporate,
    searchCreditoMaisGold,
    searchCreditoMaisPlus,
    searchCreditoMaisSoCheque,
    showCreditoMaisModel
} from "../../actions/creditomais/actionsCreditoMais"

//Utils
import produtos from "../../utils/produtos.js"

class CreditoMaisController extends Component {
    constructor(props) {
        super(props)

		this.consultasAtivas = this.props.consultasAtivas ? this.props.consultasAtivas[COMPANY_PRODUCT_CREDITOMAIS_LABEL] : undefined
		this.consultas = produtos[COMPANY_PRODUCT_CREDITOMAIS_LABEL].consultas
		this.produtoInformacoes = []

        if(this.consultasAtivas) {
            this.consultas.forEach(consulta => {
                const modulo = this.consultasAtivas[consulta.modulo] ? consulta.modulo : consulta.modulo2
                if(this.consultasAtivas && this.consultasAtivas[modulo]) {
                    this.produtoInformacoes.push(
                        {id:modulo, label:this.consultasAtivas[modulo].labelFront}
                    )
                }
            })
        }

        this.state = {}
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

	onChangeType = (evt) => {
		this.props.changeProductType(COMPANY_PRODUCT_CREDITOMAIS_LABEL, evt.target.value)
    }
    
    onformSubmit = (evt) => {
        evt.preventDefault()

        let type = this.props.type
        let {cep, documento} = this.state
        documento = documento.replace(/[^0-9]/g,"")
        let request = {}

        this.props.loadingCreditoMais()

        if(type.match("SIMPLES"))
            this.props.searchCreditoMaisSimples({documento})
        else if(type.match("CHEQUE-ANALITICA"))
            this.props.searchCreditoMaisChequeAnalitica({documento})
        else if(type.match("ANALITICA"))
            this.props.searchCreditoMaisAnalitica({documento, cep})
        else if(type.match("CORPORATE"))
            this.props.searchCreditoMaisCorporate({documento})
        else if(type.match("GOLD"))
            this.props.searchCreditoMaisGold({documento, cep})
        else if(type.match("PLUS"))
            this.props.searchCreditoMaisPlus({documento, cep})
        else {
            this.props.searchCreditoMaisSoCheque({documento})
        }

        this.setState({
            documento: "",
            cep: "",
        })
    }

    scrollPage(posX, posY) {
        window.scrollTo(posX, posY)
    }

    renderInput = ({name, type, mdLength, placeholder}) => {
        return (
            <Col md={mdLength}>
                <MyFieldGroup
                    id={name}
                    type={type}
                    name={name}
                    value={this.state[name]}
                    onChange={this.onChange}
                    required
                    placeholder={placeholder} />
            </Col>
        )
    }

	form = () => {
        const { type, status, message } = this.props
        const showCep = type.match("ANALITICA") || type.match("PLUS") || type.match("GOLD")
        const showOnlyCNPJ = type.match("CORPORATE")

		return (
			<Panel>
                <Col md={12}>
                    <TitleProduct
                        icon={ICON_CREDITOMAIS}
                        title={this.consultasAtivas.produtoDescricao}
                        color={COMPANY_PRODUCT_CREDITOMAIS_COLOR}
                    />
					<MyForm
                        options={this.produtoInformacoes}
                        onformSubmit = {this.onformSubmit}
						type={type}
						status = {status}
                        message = {message}
                        onChange={this.onChangeType}
                        closeMessageError = {this.props.closeMessageErrorCreditoMais}
					>

                        {this.renderInput({
                            name:"documento",
                            type:"text",
                            mdLength:showCep ? 6 : 8,
                            placeholder:showOnlyCNPJ ? "CNPJ" : "CPF ou CNPJ"
                        })}

                        {showCep ?
                            this.renderInput({
                                name:"cep",
                                type:"text",
                                mdLength:2,
                                placeholder:"CEP"
                            })
                        : ""}
					</MyForm>
				</Col>
			</Panel>
		)
	}

    render() {
        const { type, data, tabActive, changeTab, status, loading } = this.props
        const values = Object.keys(data)

		if(status == SUCCESS || status == ERR_CONNECTION_REFUSED || status == REQUEST_ERROR) {
			this.scrollPage(0, 0)
        }

        return (
            <div>
                {this.form()}

				{loading ? <LoadingScreen /> : ""}

				<div style={{marginBottom:15}} />

                {values.length === 0 ?
                    <span>
                        <CreditoMaisDescription />
                        <div style={{marginBottom:15}} />
                        <UltimasConsultas
                            consultas={this.props.lastQueries[type]}
                            produtoInformacoes={this.produtoInformacoes}
                            type={type}
                        />
                    </span>
                :
					<Tabs
                        id="tab-creditomais"
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
											label={data[dataKey].label.length > 20 ? data[dataKey].label.substring(0,20)+"..." : data[dataKey].label}
											close={() => this.props.closeTab(dataKey)}
										/>
									}
									key={dataKey}
                                >
                                    {data[dataKey].reverConsulta ?
                                        <ReverConsultaMessage />
                                    :""}

									{data[dataKey].produto == COMPANY_PRODUCT_CREDITOMAIS_LABEL ?
										<CreditoMaisView
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
    return {
        data: state.creditomais.response,
        type: state.creditomais.type,
		status: state.creditomais.status,
		message: state.creditomais.message,
        tabActive: state.creditomais.tabActive,
        lastQueries: state.creditomais.lastQueries,
        loading: state.creditomais.loading,
        consultasAtivas: state.user.consultasAtivas
    }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
            changeProductType,
            changeTab,
            closeMessageErrorCreditoMais,
            closeTab,
            loadingCreditoMais,
            showCreditoMaisModel,
            searchCreditoMaisSimples,
            searchCreditoMaisAnalitica,
            searchCreditoMaisChequeAnalitica,
            searchCreditoMaisCorporate,
            searchCreditoMaisGold,
            searchCreditoMaisPlus,
            searchCreditoMaisSoCheque,
		},
		dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditoMaisController)