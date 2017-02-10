import React,  { Component } from "react";
import { Col, Button} from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class RendaEmpregador extends Component {
    render() {
        return (
            this.props.renda ?
                <Panel title="RENDA EMPREGADOR">
                    <Col md={12} sm={12}>            
                        <Table
                            fields={
                                ["Renda Estimada", "Faixa de Renda", "Empregador", "Setor", "Data Referência", "CBO", "CBO Sinonimos"]
                            }
                        >
                            <tbody>
                                <tr>
                                    <td>{this.props.renda.rendaEstimada}</td>
                                    <td>{this.props.renda.faixaRenda}</td>
                                    <td>
                                        {this.props.renda.empregador}
                                        <a data-tip data-for='tooltipConsultar'>
                                            <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(this.props.renda.documentoEmpregador, "pf")}>
                                                <i className='fa fa-search'/>
                                            </Button>
                                        </a>
                                    </td>
                                    <td>{this.props.renda.setorEmpregador}</td>
                                    <td>{this.props.renda.rendaDataRef}</td>
                                    <td>{this.props.renda.cboDescricao + " - " + this.props.renda.cboCodigo}</td>
                                    <td>{this.props.renda.cboSinonimos}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Panel>
            :
                <Panel title="RENDA EMPREGADOR">
                    <div className="text-center"><strong>Nada consta</strong></div>
                </Panel>
        )
    }
}