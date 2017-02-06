import React, { Component } from "react";
import { Col, FormGroup, Checkbox, Image, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";

import {
        searchCredito,
        searchLocalize,
        loadingLocalize
} from "../../actions/index";

import { ICON_LOCALIZE, ICON_CREDITO, ICON_FOCOFISCAL } from "../../constants/utils";

import Panel from "../panel/Panel";

const produtos = [
    {label: "Localize", icon: ICON_LOCALIZE, options: {
        cpf: ["CPF"],
        cnpj: ["CNPJ"],
        all: ["CPF", "CNPJ", "Telefone", "Nome", "Endereço", "Email"]
    }},
    {label: "Crédito", icon: ICON_CREDITO, options: {
        cpf: ["Consulta Completa", "Consulta Intermediária", "Intermediária Plus/Pessoal Plus", "Consulta Simples", "Consulta Express"],
        cnpj: ["Consulta Completa", "Consulta Intermediária", "Intermediária Plus/Pessoal Plus", "Consulta Express"],
        all: ["Consulta Completa", "Consulta Intermediária", "Intermediária Plus/Pessoal Plus", "Consulta Simples", "consulta Cheque", "Consulta Express"]
    }},
    {label: "Foco Fiscal", icon: ICON_FOCOFISCAL, options: {
        cpf: ["Receita PF"],
        cnpj: ["Receita PJ", "Receita PJ Sintegra", "Sintegra Unificada", "Simples Nacional"],
        all: ["Receita PF", "Receita PJ", "Receita PJ Sintegra", "Sintegra Unificada", "Simples Nacional"]
    }}
];

class GridProdutos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            optionsSelected: {}
        }

        this.onChecked = this.onChecked.bind(this);
        this.search = this.search.bind(this);
        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    }

    onChecked(produto, opt) {
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

    search() {
        if(Object.keys(this.state.optionsSelected).length > 0) {
            this.props.closeModal();
            browserHistory.push("/localize");

            this.props.loadingLocalize();

            let tipo;

            this.props.isCPF ?
                tipo = "pf"
            :
                tipo = "pj"

            this.state.optionsSelected['Localize'] ?
                this.props.searchLocalize(this.props.documento, tipo)
            : ""
            this.state.optionsSelected['Crédito'] ?
                this.props.searchCredito(this.props.documento, tipo)
            : ""
        } else {
            this.setState({
                showMessage: true
            })
        }
    }

    handleAlertDismiss() {
        this.setState({showMessage: false})
    }

    render() {
        return (
            <div>
                {this.state.showMessage ? 
                    <Alert bsStyle="warning" className="text-center" onDismiss={this.handleAlertDismiss}>
                        Selecione pelo menos 1 opção
                    </Alert>
                : ""}
                {produtos.map((produto, index) => {
                    return (
                        <Col md={4} key={index}>
                            <Panel>
                                <Col xs={12} md={12}>
                                    <Image src={produto.icon} rounded />
                                    {produto.label}
                                </Col>
                                <Col xs={12} md={12}>
                                    {this.props.isCPF ? 
                                        produto.options.cpf.map((opt,j) => {
                                            return (
                                                <Checkbox key={j} onClick={evt => this.onChecked(produto.label, opt)}>
                                                    {opt}
                                                </Checkbox>
                                            )
                                        })
                                    :
                                        produto.options.cnpj.map((opt,j) => {
                                            return (
                                                <Checkbox key={j} onClick={evt => this.onChecked(produto.label, opt)}>
                                                    {opt}
                                                </Checkbox>
                                            )
                                        })
                                    }
                                </Col>
                            </Panel>
                        </Col>
                    )
                })}

                <div>
                    <Col md={6}>
                        <Button bsStyle="default" onClick={this.props.closeModal} block>Cancelar</Button>
                    </Col>

                    <Col md={6}>
                        <Button bsStyle="primary" onClick={this.search} block>Consultar</Button>
                    </Col>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
            searchCredito,
			searchLocalize,
            loadingLocalize
		},
		dispatch);
}

export default connect(null, mapDispatchToProps)(GridProdutos);