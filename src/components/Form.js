import React, { Component } from "react";
import Tooltip from 'react-tooltip';

import { LocalizeDescription } from "./ProductDescription";
import UltimasConsultas from "./UltimasConsultas";

export default class Form extends Component {
    render() {
		return (
            <div className="row text-center">
                <div className="col-md-12">
                    {this.props.datas.length == 0 ? <img src={this.props.logo} className="logo-produto" />: ""}
                </div>
                <div className="col-md-12">
                    <form onSubmit={this.props.onformSubmit} className="my-form">

                        {this.props.datas.length > 0 ? <img src={this.props.icon} className="icon-produto-consulta" />: ""}

                            <select
                                className="form-control input-search"
                                name="tipo"
                                onChange={this.props.onChange}
                                value={this.props.tipo ? this.props.tipo : this.props.optionSelected}
                                style={{width:120}}
                                required>
                                <option value="">Selecione</option>
                                {this.props.options.map((opt,i) => {
                                    return <option value={opt} key={i}>{opt}</option>
                                })}
                            </select>

                            {this.props.children}
                            
                            <a data-tip data-for='tooltipConsultar'>
                                <button className="btn btn-info my-btn-form input-search" type="submit">
                                    <i className="glyphicon glyphicon-search"></i>
                                </button>
                            </a>
                            
                            {this.props.datas.length == 0 ?
                                <a data-tip data-for='tooltipVejaModelo'>
                                    <div className="btn btn-default my-btn-form input-search" onClick={this.props.seeModelo}>
                                        <i className="fa fa-list-ul" aria-hidden="true"></i>
                                    </div>
                                </a>
                            : ""}

                            <a data-tip data-for='tooltipVejaDetalhesProduto' href="http://assertivasolucoes.com.br/servicos/localize" target="_blank">
                                <div className="btn btn-warning my-btn-form">
                                    <i className="fa fa-question" aria-hidden="true"></i>
                                </div>
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

                {this.props.datas.length > 0 ? (this.props.status == "model" ? <a href="#" onClick={this.props.closeModelo}>Fechar Modelo</a> : "") : ""}

                
				{this.props.datas.length == 0 ? 
                    <div style={{margin:"0 auto", width:"50%", textAlign:"left"}}>
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