import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";

import TelefoneLayout from "../telefone/layoutTelefone";
import EnderecoLayout from "../endereco/layoutEndereco";
import Panel from "../Panel";
import Table from "../Table";

export default class Relacionados extends Component {
    render() {
        return (
            <Panel
                title="PESSOAS RELACIONADAS"
                qtdTotal={[{qtd:this.props.relacionados.length,icon:"fa fa-users"}]}>
                <div className="col-md-12">
                    <Table fields= {["Relação", "Nome", "Consultar"]} >
                        {this.props.relacionados.map((pessoa, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>
                                            {pessoa.relacao}
                                        </td>
                                        <td>
                                            {pessoa.nome}
                                            {pessoa.documento ? 
                                                <a data-tip data-for='tooltipConsultar'>
                                                    <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(pessoa.documento, "pf")}>
                                                        <i className='fa fa-search'/>
                                                    </Button>
                                                </a>
                                            : ""}
                                        </td>
                                        <td>
                                            <a data-tip data-for='tooltipConsultar'>
                                                <Button bsSize="small" bsStyle="info" className="mapa-button" onClick={pessoa.relacao == "MAE" ? "" : () => this.props.searchTelefonesPessoaRelacionada(this.props.documento, pessoa.documento)}>
                                                    <i className='fa fa-phone'/>
                                                </Button>
                                            </a>
                                            {' '}
                                            <a data-tip data-for='tooltipConsultar'>
                                                <Button bsSize="small" bsStyle="info" className="mapa-button" onClick={pessoa.relacao == "MAE" ? "" : () => this.props.searchEnderecosPessoaRelacionada(this.props.documento, pessoa.documento)}>
                                                    <i className='fa fa-map'/>
                                                </Button>
                                            </a>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        {pessoa.enderecos ? 
                                            <td colSpan={3}>
                                                <EnderecoLayout enderecos={pessoa.enderecos} />
                                            </td>
                                        : ""}
                                    </tr>
                                    <tr>
                                        {pessoa.telefones ? 
                                            <td colSpan={3}>
                                                <TelefoneLayout fixos={pessoa.telefones.fixos} moveis={pessoa.telefones.moveis} />
                                            </td>
                                        : ""}
                                    </tr>
                                </tbody>
                            )
                        })}
                    </Table>

                    <Col md={12}>
                        <a onClick={() => this.props.searchPessoasRelacionadas(this.props.documento)} className="moreInfo pull-right">
                            Ver mais pessoas relacionadas
                        </a>
                    </Col>
                    
                </div>
            </Panel>
        )
    }
}