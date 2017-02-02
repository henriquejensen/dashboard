import React, { Component } from "react";
import { Col, FormGroup, Checkbox, Image, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";

import { searchLocalize, loadingLocalize } from "../../actions/index";

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
    search = () => {
        this.props.closeModal();
        browserHistory.push("/localize");

        this.props.loadingLocalize();
        this.props.searchLocalize(this.props.documento, "pf");
    }

    render() {
        return (
            <div>
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
                                                <Checkbox key={j} inputRef={ref => { this.input = ref; }}>
                                                    {opt}
                                                </Checkbox>
                                            )
                                        })
                                    :
                                        produto.options.cnpj.map((opt,j) => {
                                            return (
                                                <Checkbox key={j}>
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
                        <Button bsStyle="default" block>Cancelar</Button>
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
			searchLocalize,
            loadingLocalize
		},
		dispatch);
}

export default connect(null, mapDispatchToProps)(GridProdutos);