import React,  { Component } from "react";
import { Button } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { formatCurrency } from "../utils/functions/patternDocuments";

import { NENHUM_REGISTRO } from "../../constants/utils";

export default class RendaEntidadeClasseLiberal extends Component {
    render() {
        return (
            this.props.renda ?
                <Panel title="RENDA ENTIDADE CLASSE LIBERAL">
                    <div className="col-md-12 col-sm-12">            
                        <Table
                            fields={
                                ["Associação", "Profissão", "Renda Média", "Renda Mínima", "Identidade Profisional"]
                            }
                        >
                            <tbody>
                                <tr>
                                    <td>
                                        <a data-tip data-for='tooltipConsultar'>
                                            <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(this.props.renda.cpf, "CPF")}>
                                                <i className='fa fa-search'/>
                                            </Button>
                                        </a>
                                        {this.props.renda.associacao}
                                    </td>
                                    <td>{this.props.renda.profissao}</td>
                                    <td>{formatCurrency(this.props.renda.rendaMedia)}</td>
                                    <td>{formatCurrency(this.props.renda.rendaMinima)}</td>
                                    <td>{this.props.renda.identidadeProfissional}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Panel>
            :
                <Panel title="RENDA ENTIDADE CLASSE LIBERAL">
                    <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                </Panel>
        )
    }
}