import React, { Component } from "react";
import Tooltip from 'react-tooltip';
import { Col, Row, Alert } from "react-bootstrap";

import { LocalizeDescription, CreditoDescription, FocoFiscalDescription } from "../ProductDescription";
import UltimasConsultas from "../UltimasConsultas";

import {
    ERR_CONNECTION_REFUSED,
    REQUEST_ERROR,
    TOOLTIP_SEARCH_BY_ADDRESS,
    TOOLTIP_SEARCH_BY_DOCUMENT,
    TOOLTIP_SEARCH_BY_PHONE,
    TOOLTIP_SEE_PRODUCT_MODEL,
    TOOLTIP_SEE_PRODUCT_DETAILS,
    RECHECK_MESSAGE
} from "../../constants/utils";
import { COMPANY_PRODUCT_LOCALIZE_URL_SEE_DETAILS } from "../../constants/constantsCompany";

export default class Form extends Component {
    render() {
		return (
            <Row className="noPrint my-container-form-product">
                <Col md={12} sm={12} className="text-center">
                    <img src={this.props.logo} />
                </Col>
                
                <span id="input-fields">
                    <form onSubmit={this.props.onformSubmit}>
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

                        <Col md={1}>
                            <a data-tip data-for={TOOLTIP_SEARCH_BY_DOCUMENT}>
                                <button className="btn btn-info my-btn-form input-search" type="submit">
                                    <i className="glyphicon glyphicon-search"></i>
                                </button>
                            </a>
                        </Col>

                            
                        <Col md={1}>
                            <a data-tip data-for={TOOLTIP_SEE_PRODUCT_MODEL}>
                                <span className="btn btn-default my-btn-form input-search" onClick={this.props.seeModelo}>
                                    <i className="fa fa-list-ul" aria-hidden="true"></i>
                                </span>
                            </a>
                        </Col>

                        <Col md={1}>
                            <a data-tip data-for={TOOLTIP_SEE_PRODUCT_DETAILS} href={COMPANY_PRODUCT_LOCALIZE_URL_SEE_DETAILS} target="_blank">
                                <span className="btn btn-warning my-btn-form">
                                    <i className="fa fa-question" aria-hidden="true"></i>
                                </span>
                            </a>
                        </Col>

                        {this.props.buscaAvancada != undefined ?
                            <span className="busca-avancada" onClick={this.props.hiddenBuscaAvancada}>{!this.props.buscaAvancada ? 'Busca avançada' : 'Fechar busca'}</span>
                        : ""}
                    </form>
                </span>

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
                    </Col>
                : "" }

                {this.props.showLogo ?
                    <Col md={12} sm={12}>
                        <UltimasConsultas
                            consultas={this.props.lastQueries}
                            type={this.props.type}
                            search={this.props.searchUltimasConsultas}
                            searchEnderecosTelefonesUltimasConsultas={this.props.searchEnderecosTelefonesUltimasConsultas} />
                    </Col>
                : "" }

				{this.props.showLogo ?
                    <Col md={12} sm={12}>
                        <Alert bsStyle="warning" className="text-center">
                            {RECHECK_MESSAGE}
                        </Alert>
                    </Col>
				: ""}
            </Row>
        )
    }
}