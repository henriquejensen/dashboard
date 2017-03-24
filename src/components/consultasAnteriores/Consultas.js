import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Col, Button } from "react-bootstrap";

import Panel from "../../components/panel/Panel";
import Table from "../table/Table";

export default class Consultas extends Component {
    render() {
        return (
            <div>
                <a name={"Consultas"+this.props.index}></a>
                <Panel title="CONSULTAS" qtdTotal={[{icon:"fa fa-search", qtd:this.props.consultas.quantidadeTotal}]}>
                    <div className="col-md-12">
                        <Table
                            fields={
                                ["Nome do Associado", "Data da Consulta", "Cidade Origem", "Segmento", "Quantidade"]
                            }
                        >
                            <tbody>
                                {this.props.consultas.consultasAnteriores.map((consulta,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <a data-tip data-for='tooltipConsultar'>
                                                    <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(consulta.documento, "CPF")}>
                                                        <i className='fa fa-search'/>
                                                    </Button>
                                                </a>
                                                {consulta.consultante}
                                            </td>
                                            <td>{consulta.data}</td>
                                            <td>{consulta.cidade}</td>
                                            <td>{consulta.segmento}</td>  
                                            <td>{consulta.quantidade}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>

                    </div>
                    <Tooltip id="tooltipConsultar">
                        <span>Consultar</span>
                    </Tooltip>
                </Panel>
            </div>
        )
    }
}