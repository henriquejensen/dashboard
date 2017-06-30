import React, { Component } from "react";
import { Col, FormGroup, Checkbox, Image, Button, Alert, Radio } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";

//Actions
import {
        searchLocalize,
        loadingLocalize
} from "../../actions/index";
import { searchCreditoCompleta } from "../../actions/actionsCredito";

//Constants
import {
    ICON_LOCALIZE,
    COMPANY_PRODUCT_LOCALIZE_LABEL,
    ICON_CREDITO,
    COMPANY_PRODUCT_CREDITO_LABEL,
    ICON_FOCOFISCAL,
    COMPANY_PRODUCT_FOCOFISCAL_LABEL
} from "../../constants/constantsCompany";
import { SEARCH_BY_CREDITO_IN_LOCALIZE } from "../../constants/constantsLocalize";

//Components
import Panel from "../../components/panel/Panel"
import MyButton from "../../components/button/MyButton"

//Utils
import { todosProdutos } from "../../components/utils/common/produtos"

class GridProdutos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            optionsSelected: {}
        }
    }

    onChecked = (produto, opt) => {
        let newOptions = Object.assign({}, this.state.optionsSelected);
        if(newOptions[produto] == undefined) {
            newOptions[produto] = [opt];
        } else {
            newOptions[produto] = newOptions[produto].concat(opt);
        }
        
        this.setState({
            optionsSelected: newOptions,
            showMessage: false
        })
    }

    search = () => {
        if(Object.keys(this.state.optionsSelected).length > 0) {
            this.props.closeModal();
            browserHistory.push("/localize");

            this.props.loadingLocalize();

            let tipo;

            this.props.isCPF ?
                tipo = "CPF"
            :
                tipo = "CNPJ"

            this.state.optionsSelected['Localize'] ?
                this.props.searchLocalize(this.props.documento, tipo)
            : ""
            this.state.optionsSelected['Crédito'] ?
                this.props.searchCreditoCompleta(this.props.documento, tipo, SEARCH_BY_CREDITO_IN_LOCALIZE)
            : ""
        } else {
            this.setState({
                showMessage: true
            })
        }
    }

    handleAlertDismiss = () => {
        this.setState({showMessage: false})
    }

    renderPanelProduto = (produto) => {
        return (
            <Panel>
                <Col xs={12} md={12}>
                    <Image src={produto.imageNegative} className="icon-produto" rounded />{" "}
                    {produto.label}
                </Col>
                <Col xs={12} md={12}>
                    {produto.subItems.map((opt,j) => {
                        if(this.props.isCPF && opt.tipo === "pf" ||
                            !this.props.isCPF && opt.tipo === "pj" ||
                                opt.tipo === "pfpj")
                            return (
                                <Checkbox key={j} onClick={evt => this.onChecked(produto.label, opt.label)}>
                                    {opt.label}
                                </Checkbox>
                            )
                    })}
                </Col>
            </Panel>
        )
    }

    render() {
        return (
            <div>
                <form className="text-center" style={{paddingBottom:15}}>
                    <Radio onClick={this.props.isCPF ? "" : () => this.props.changeDocumentType()} inline checked={this.props.isCPF ? true : false}>
                        CPF
                    </Radio>
                    <Radio onClick={!this.props.isCPF ? "" : () => this.props.changeDocumentType()} inline checked={this.props.isCPF ? false : true}>
                        CNPJ
                    </Radio>
                </form>
                {this.state.showMessage ? 
                    <Alert bsStyle="warning" className="text-center" onDismiss={this.handleAlertDismiss}>
                        Selecione pelo menos 1 opção
                    </Alert>
                : ""}

                {this.props.produtosUsuario.map((produto, index) => {
                    if(produto === "FOCO FISCAL") produto = COMPANY_PRODUCT_FOCOFISCAL_LABEL
                    return (
                        <Col md={4} key={index}>
                            {this.renderPanelProduto(todosProdutos[produto])}
                        </Col>
                    )
                })}

                <div>
                    <Col md={6}>
                        <MyButton
                            onClickButton={this.props.closeModal}
                            myButtonStyle="default"
                            myButtonClass="btn-block"
                            myButtonText="Cancelar"
                        />
                    </Col>

                    <Col md={6}>
                        <MyButton
                            onClickButton={this.search}
                            myButtonClass="btn-block color-payement"
                            myButtonText="Consultar"
                        />
                    </Col>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        produtosUsuario: state.user.mapProdutos ? state.user.mapProdutos.filter(produto => {
            produto = produto.replace(/\+/g,"MAIS")
            produto = produto.replace(/[^a-zA-Z]/g,"")
            if(produto === COMPANY_PRODUCT_LOCALIZE_LABEL ||
            produto === COMPANY_PRODUCT_CREDITO_LABEL ||
            produto === COMPANY_PRODUCT_FOCOFISCAL_LABEL) {
                return produto
            }
        }) : []
    }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
            searchCreditoCompleta,
			searchLocalize,
            loadingLocalize,
		},
		dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GridProdutos);