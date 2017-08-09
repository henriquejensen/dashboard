// Node modules
import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Alert, Col, Tabs, Tab} from "react-bootstrap"

// Components
import Panel from "../../components/panel/Panel"
import MyForm from "../../components/forms/Form"
import CreditoMixView from "./CreditoMixView"
import ReverConsultaMessage from "../../components/utils/ReverConsulta"
import TitleProduct from "../../components/utils/TitleProduct"
import Titletab from "../../components/utils/TitleTab"
import UltimasConsultas from "../../components/UltimasConsultas"
import { MyFieldGroup, MyCheckboxGroup, SelectGroup } from "../../components/forms/CommonForms"
import { LocalizeDescription } from "../../components/ProductDescription"
import { PrintScreen, LoadingScreen } from "../../components/utils/ElementsAtScreen"

// Constants
import {
    COMPANY_NAME_SHORT,
    COMPANY_PRODUCT_CREDITOMIX_LABEL,
    COMPANY_PRODUCT_CREDITOMIX,
    COMPANY_PRODUCT_CREDITOMIX_COLOR,
    ICON_CREDITO,
    LOGO_CREDITOMIX
} from "../../constants/constantsCompany"
import { ERR_CONNECTION_REFUSED, REQUEST_ERROR, SUCCESS } from "../../constants/utils"

// Actions
import { changeProductType } from "../../actions/actionsCommon"
import {
    changeTab,
    closeTab,
    closeMessageErrorCreditoMix,
    loadingCreditoMix,
    searchCreditoMix,
    showCreditoMixModel,
    searchCreditoMixMaster,
    searchCreditoMixCompleta,
    searchCreditoMixGold,
    searchCreditoMixIntermediaria,
    searchCreditoMixIntermediariaPlus,
    searchCreditoMixMax,
    searchCreditoMixPremium,
    searchCreditoMixSintetica
} from "../../actions/creditomix/actionsCreditoMix"
import produtos from "../../utils/produtos.js"

const produtoInformacoes = produtos[COMPANY_PRODUCT_CREDITOMIX_LABEL];

function transformInCheckBoxObject (options) {
    let newOptionsObject = {}
    for(let key of ["CPF", "CNPJ"]) {
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
    constructor(props) {
        super(props)

		this.consultasAtivas = this.props.consultasAtivas && this.props.consultasAtivas[COMPANY_PRODUCT_CREDITOMIX_LABEL] ? this.props.consultasAtivas[COMPANY_PRODUCT_CREDITOMIX_LABEL] : {}
		this.consultas = produtos[COMPANY_PRODUCT_CREDITOMIX_LABEL].consultas
		this.produtoInformacoes = []

        if(this.props.consultasAtivas && this.props.consultasAtivas[COMPANY_PRODUCT_CREDITOMIX_LABEL]) {
            this.consultas.forEach(consulta => {
                const modulo = this.consultasAtivas[consulta.modulo] ? consulta.modulo : consulta.modulo2
                if(this.consultasAtivas && this.consultasAtivas[modulo]) {
                    this.produtoInformacoes.push(
                        {id:modulo, label:this.consultasAtivas[modulo].labelFront}
                    )
                }
            })
        }

        this.state = {
            options: optionsNormalized,
            isCpfOrCnpj: "CPF",
            cepConsumidor: "",
            documento: "",
            showCheckboxes: true,
            showCep: false
        }
    }

	componentDidMount() {
		document.title = COMPANY_PRODUCT_CREDITOMIX + " > " + COMPANY_NAME_SHORT;
    }

    onChangeCheckBox = (name, index) => {
        let newOptions = JSON.parse(JSON.stringify(this.state.options))
        let showCep = false
        const tipo = this.props.type === "SPCBRPF" ? "CPF" : "CNPJ"
        // filtra no array o elemento selecionado e troca o valor deste objeto no map
        newOptions[tipo]
                .filter(option => option.name === name)
                .map(opt => opt.checked = !opt.checked)

        for(let option of newOptions[tipo]) {
            if(option.name === "limiteCreditoSugerido" ||
                option.name === "rendaPresumidaSpc" ||
                option.name === "limiteCreditoPj"  ||
                option.name === "faturamentoPresumido"
            ) {
                showCep = option.checked ? option.checked : showCep
            }
        }

        this.setState({
            options: newOptions,
            showCep: showCep
        })
    }

	renderCheckboxes = () => {
		let options = this.state.options
		let showCheckboxes = this.state.showCheckboxes
		let type = this.props.type === "SPCBRPF" ? "CPF" : "CNPJ"

		if(showCheckboxes) {
			return (
                <span>
                    <span>
                        {this.state.showMessageErrorWhenNotSelectedAnyCheckBox ?
                            <Col md={12}>
                                <Alert bsStyle="danger" className="text-center" onDismiss={() => this.setState({
                                    showMessageErrorWhenNotSelectedAnyCheckBox:false
                                })}>
                                    Selecione ao menos uma opção abaixo
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

                        <Col md={12}  className="text-center">
                            <a href="#" onClick={() => this.setState({showCheckboxes: false})}>Esconder filtros da busca</a>
                        </Col>

                    </span>
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

	onClickDocument = (documento) => {
        documento = documento.replace(/[^0-9]/g,"")
        
        this.setState({
            documento,
            destaqueInputDocumento: true,
            isCpfOrCnpj: documento.length <= 11 ? "CPF" : "CNPJ"
        })
		
		this.scrollPage(0, 0)
	}

    scrollPage(posX, posY) {
        window.scrollTo(posX, posY)
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

        let type = this.props.type
        let {cepConsumidor, documento, isCpfOrCnpj, options, cep} = this.state
        documento = documento.replace(/[^0-9]/g,"")
        let request = {}

        this.props.loadingCreditoMix()

        if(type.match("MASTER"))
            this.props.searchCreditoMixMaster({documento, isCpfOrCnpj, cep:cepConsumidor})
        else if(type.match("PREMIUM"))
            this.props.searchCreditoMixPremium({documento, isCpfOrCnpj, cep:cepConsumidor})
        else if(type.match("GOLD"))
            this.props.searchCreditoMixGold({documento, isCpfOrCnpj, cep:cepConsumidor})
        else if(type.match("MAX"))
            this.props.searchCreditoMixMax({documento, isCpfOrCnpj, cep:cepConsumidor})
        else if(type.match("COMPLETA"))
            this.props.searchCreditoMixCompleta({documento, isCpfOrCnpj})
        else if(type.match("INTERMEDIARIAPLUS"))
            this.props.searchCreditoMixIntermediariaPlus({documento, isCpfOrCnpj})
        else if(type.match("INTERMEDIARIA"))
            this.props.searchCreditoMixIntermediaria({documento, isCpfOrCnpj})
        else if(type.match("SINTETICA"))
            this.props.searchCreditoMixSintetica({documento, isCpfOrCnpj})
        else {
            const tipo = this.props.type === "SPCBRPF" ? "CPF" : "CNPJ"
            //produtoInformacoes.options.cheque.map(cheque => request[cheque.id] = null) // seta todos os parametros de cheque
            options[tipo].map(option => request[option.name] = option.checked) // seta todos os parametros de de options
            request[tipo.toLowerCase()] = documento // seta o documento para o objeto
            cepConsumidor ? request["cepConsumidor"] = cepConsumidor.replace(/[^0-9]/g,"") : "" // seta o cep para o objeto

            this.props.searchCreditoMix(request, tipo)
        }

        this.setState({
            documento: "",
            cepConsumidor: "",
            showCheckboxes: false,
            destaqueInputDocumento: false
        })
    }

    renderCep = (mdLength) => {
        return (
            <Col md={mdLength}>
                <MyFieldGroup
                    id="cepConsumidor"
                    type="text"
                    name="cepConsumidor"
                    value={this.state.cepConsumidor}
                    onChange={this.onChange}
                    required
                    placeholder="CEP" />
            </Col>
        )
    }

    renderDocumentInput = (mdLength) => {
        return (
            <Col md={mdLength}>
                <MyFieldGroup
                    id="documento"
                    type="text"
                    name="documento"
                    value={this.state.documento}
                    onChange={this.onChange}
                    inputStyle={{borderColor:"orange"}}
                    error={this.state.destaqueInputDocumento}
                    required
                    placeholder="Digite o documento" />
            </Col>
        )
    }

    renderInput = () => {
        let showCep = this.state.showCep
        return (
            <div>
                {this.renderDocumentInput(showCep ? 5 : 8)}

                {showCep ?
                    this.renderCep(3)
                : ""}
            </div>
        )
    }

    renderInputCommon = () => {
        let {type} = this.props
        let {isCpfOrCnpj} = this.state
        let showCepByType = type.match("MASTER") ||
                      type.match("PREMIUM") ||
                      type.match("GOLD") ||
                      (type.match("MAX") && isCpfOrCnpj === "CPF")

        return (
            <div>
                <Col md={2}>
                    <SelectGroup
                        id="isCpfOrCnpj"
                        type="select"
                        name="isCpfOrCnpj"
                        value={this.state.isCpfOrCnpj}
                        options={[{value:"CPF", label:"CPF"},{value:"CNPJ", label:"CNPJ"}]}
                        onChange={this.onChange}
                    />
                </Col>
                
                {this.renderDocumentInput(showCepByType ? 3 : 6)}

                {!type.match("COMPLETA")
                 && !type.match("INTERMEDIARIA")
                 && !type.match("SINTETICA") && (showCepByType || this.state.showCep) ?
                    this.renderCep(3)
                : ""}
            </div>
        )
    }

	form = (tipo) => {
		return (
            <Panel>
				<TitleProduct
					icon={ICON_CREDITO}
					title={this.consultasAtivas.produtoDescricao}
					color={COMPANY_PRODUCT_CREDITOMIX_COLOR}
				/>
				<Col md={12}>
					<MyForm
						onformSubmit = {this.onformSubmit}
						closeMessageError = {this.props.closeMessageErrorCreditoMix}
						options={this.produtoInformacoes}
						onChange={this.onChangeType}
						type={this.props.type}
						seeModelo = {this.props.showCreditoMixModel}
						status = {this.props.status}
						message = {this.props.message}
                        moreInfoToShow={this.props.type === "SPCBRPF" || this.props.type === "SPCBRPJ" ? this.renderCheckboxes(this.state.options) : ""}
					>

                        {this.props.type === "SPCBRPF" || this.props.type === "SPCBRPJ" ?
						    this.renderInput()
                        :   this.renderInputCommon()}
						
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
                {this.form(type)}

				{loading ? <LoadingScreen /> : ""}

				<div style={{marginBottom:15}} />

                {values.length === 0 ?
					<span>
						<LocalizeDescription />
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
											label={data[dataKey].label.length > 20 ? data[dataKey].label.substring(0,20)+"..." : data[dataKey].label}
											close={() => this.props.closeTab(dataKey)}
										/>
									}
									key={dataKey}
                                >
                                    {data[dataKey].reverConsulta ?
                                        <ReverConsultaMessage />
                                    :""}

									{data[dataKey].produto == COMPANY_PRODUCT_CREDITOMIX_LABEL ?
										<CreditoMixView
                                            data={data[dataKey]}
                                            onClickDocument={this.onClickDocument}
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
        data: state.creditomix.response,
        type: state.creditomix.type,
		status: state.creditomix.status,
		message: state.creditomix.message,
        tabActive: state.creditomix.tabActive,
        lastQueries: state.creditomix.lastQueries,
        loading: state.creditomix.loading,
        consultasAtivas: state.user.consultasAtivas
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
        showCreditoMixModel,
        searchCreditoMixMaster,
        searchCreditoMixCompleta,
        searchCreditoMixGold,
        searchCreditoMixIntermediaria,
        searchCreditoMixIntermediariaPlus,
        searchCreditoMixMax,
        searchCreditoMixPremium,
        searchCreditoMixSintetica
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditoMix);