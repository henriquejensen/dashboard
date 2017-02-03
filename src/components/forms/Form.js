import React, { Component } from "react";
import Tooltip from 'react-tooltip';

import { LocalizeDescription, CreditoDescription, FocoFiscalDescription } from "../ProductDescription";
import UltimasConsultas from "../UltimasConsultas";

export default class Form extends Component {
    render() {
		return (
            <div className="text-center">
                <div className="col-md-12 col-sm-12">
                    {this.props.showLogo ? <img src={this.props.logo} className="logo-produto" />: <img src={this.props.icon} />}
                </div>
                <div className="col-md-12 col-sm-12">
                    <form onSubmit={this.props.onformSubmit} className="my-form">

                            {this.props.children}

                            <a data-tip data-for='tooltipConsultar'>
                                <button className="btn btn-info my-btn-form input-search" type="submit">
                                    <i className="glyphicon glyphicon-search"></i>
                                </button>
                            </a>
                            
                            {this.props.showLogo ?
                                <a data-tip data-for='tooltipVejaModelo'>
                                    <span className="btn btn-default my-btn-form input-search" onClick={this.props.seeModelo}>
                                        <i className="fa fa-list-ul" aria-hidden="true"></i>
                                    </span>
                                </a>
                            : ""}

                            <a data-tip data-for='tooltipVejaDetalhesProduto' href="http://assertivasolucoes.com.br/servicos/localize" target="_blank">
                                <span className="btn btn-warning my-btn-form">
                                    <i className="fa fa-question" aria-hidden="true"></i>
                                </span>
                            </a>

                    </form>


                    <Tooltip id='tooltipConsultar'>
                        <span>Consultar</span>
                    </Tooltip>
                    
                    <Tooltip id='tooltipVejaModelo'>
                        <span>Veja Modelo</span>
                    </Tooltip>

                    <Tooltip id='tooltipVejaDetalhesProduto'>
                        <span>Veja Detalhes do Produto</span>
                    </Tooltip>

                    {this.props.status == "error request" || this.props.status == "error connection" ?
                        <div className="col-md-offset-3 col-md-6">
                            <div className="alert alert-danger">
                                {this.props.message}
                                {/*<i className="glyphicon glyphicon-remove error-message" width="100%"/>*/}
                            </div>
                        </div>
                    : ""}
                </div>

                {this.props.showModel ? <a href="#" onClick={this.props.closeModelo}>Fechar Modelo</a> : ""}

				{this.props.showLogo ? 
                    <div className="container-form">
                        <LocalizeDescription />
                        <UltimasConsultas consultas={[
                            {tipo:"CPF", pesquisa:34168058875, data:"12/12/2017"},
                            {tipo:"CNPJ", pesquisa:15724796000100, data:"12/12/2017"},
                            {tipo:"CPF", pesquisa:5348371823, data:"12/12/2017"},
                            {tipo:"CPF", pesquisa:22430907836, data:"12/12/2017"},
                            {tipo:"CPF", pesquisa:22430907836, data:"12/12/2017"}
                        ]} />
                    </div>
                : "" }

            </div>)
    }
}