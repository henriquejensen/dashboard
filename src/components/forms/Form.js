import React, { Component } from "react";
import Tooltip from 'react-tooltip';
import { Col, Row, Alert } from "react-bootstrap";

import { ERR_CONNECTION_REFUSED, REQUEST_ERROR } from "../../constants/utils";
import { LocalizeDescription, CreditoDescription, FocoFiscalDescription } from "../ProductDescription";
import UltimasConsultas from "../UltimasConsultas";

import {
    TOOLTIP_SEARCH_BY_ADDRESS,
    TOOLTIP_SEARCH_BY_DOCUMENT,
    TOOLTIP_SEARCH_BY_PHONE,
    TOOLTIP_SEE_PRODUCT_MODEL,
    TOOLTIP_SEE_PRODUCT_DETAILS,
} from "../../constants/utils";

export default class Form extends Component {
    render() {
		return (
            <div className="container-form noPrint">
                <Row>
                    <Col md={12} sm={12} className="text-center">
                        <img src={this.props.logo} className="logo-produto" />
                    </Col>
                    
                    <Col>
                        <form onSubmit={this.props.onformSubmit} className="my-form">
                            {this.props.options ? 
                                <Col md={2}>
                                    <select
                                        className="form-control"
                                        onChange={this.props.onChange}
                                        value={this.props.type}
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        {this.props.options.map((opt,i) => {
                                            return <option value={opt.id.toUpperCase()} key={i}>{opt.label}</option>
                                        })}
                                    </select>
                                </Col>
                            : ""}

                            {this.props.children}

                            <Col md={2} className="text-center" style={this.props.buscaAvancada == undefined ? {marginBottom:"10px"} : {}}>
                                <a data-tip data-for={TOOLTIP_SEARCH_BY_DOCUMENT}>
                                    <button className="btn btn-info my-btn-form input-search" type="submit">
                                        <i className="glyphicon glyphicon-search"></i>
                                    </button>
                                </a>
                                
                                {this.props.showLogo ?
                                    <a data-tip data-for={TOOLTIP_SEE_PRODUCT_MODEL}>
                                        <span className="btn btn-default my-btn-form input-search" onClick={this.props.seeModelo}>
                                            <i className="fa fa-list-ul" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                : ""}

                                <a data-tip data-for={TOOLTIP_SEE_PRODUCT_DETAILS} href="http://assertivasolucoes.com.br/servicos/localize" target="_blank">
                                    <span className="btn btn-warning my-btn-form">
                                        <i className="fa fa-question" aria-hidden="true"></i>
                                    </span>
                                </a>
                            </Col>

                            {this.props.buscaAvancada != undefined ?
                                !this.props.buscaAvancada ?
                                    <Col md={12} sm={12}>
                                        <span className="pull-right busca-avancada" onClick={this.props.hiddenBuscaAvancada}>Busca avançada</span>
                                    </Col>
                                :
                                    <Col md={12} sm={12}>
                                        <span className="pull-right busca-avancada" onClick={this.props.hiddenBuscaAvancada}>Fechar busca</span>
                                    </Col>
                            : ""}
                        </form>
                    </Col>

                    {this.props.status == REQUEST_ERROR || this.props.status == ERR_CONNECTION_REFUSED ?
                        <Col md={12} sm={12}> 
                            <Alert bsStyle="danger" className="text-center" onDismiss={this.props.closeMessageError}>
                                {this.props.message}
                            </Alert>
                        </Col>
                    : ""}
                    
                    {this.props.showLogo ? 
                        <Col md={12} sm={12}>
                            <LocalizeDescription />
                            <UltimasConsultas
                                consultas={this.props.lastQueries}
                                type={this.props.type}
                                search={this.props.searchUltimasConsultas}
                                searchEnderecosTelefonesUltimasConsultas={this.props.searchEnderecosTelefonesUltimasConsultas} />
                        </Col>
                    : "" }
                </Row>
            </div>)
    }
}