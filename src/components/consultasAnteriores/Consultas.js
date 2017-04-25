import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Col, Button } from "react-bootstrap";

import Panel from "../../components/panel/Panel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

const title = "CONSULTAS";

export default class Consultas extends Component {
    render() {
        let consultas = this.props.consultas;
        let index = this.props.index;
        return (
            <div>
                <a name={"Consultas por Segmento"+index}></a>
                <a name={"Consultas"+index}></a>
                {consultas && consultas.consultasAnteriores && consultas.consultasAnteriores.length > 0 ?
                    <Panel title={title} qtdTotal={[{icon:"fa fa-search", qtd:consultas.consultasAnteriores.length}]}>
                        <Col md={12}>
                            <Table
                                fields={
                                    ["Nome do Associado", "Data da Consulta", "Cidade Origem", "Segmento", "Quantidade"]
                                }
                            >
                                <tbody>
                                    {consultas.consultasAnteriores.map((consulta,index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {consulta.documento ? 
                                                        <a data-tip data-for='tooltipConsultar'>
                                                            <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(consulta.documento, "CPF")}>
                                                                <i className='fa fa-search'/>
                                                            </Button>
                                                        </a>
                                                    : ""}
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

                        </Col>
                        <Tooltip id="tooltipConsultar">
                            <span>Consultar</span>
                        </Tooltip>
                    </Panel>
                :
                <Panel title={title}>
                    <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                </Panel>}
            </div>
        )
    }
}