import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Button } from "react-bootstrap";

import Panel from "./Panel";
import Table from "./Table";

import { patternCPF, patternCNPJ } from "./utils/functions/patternDocuments";

export default class UltimasConsultas extends Component {

    render() {
        return (
            <Panel title="Últimas consultas">
                <Table fields={["Tipo", "Entrada", "Data/Hora", ""]} >
                    {this.props.consultas && this.props.type ?
                        <tbody>
                            {this.props.consultas[this.props.type].map((consulta,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{this.props.type}</td>
                                        <td>{consulta.entrada}</td>
                                        <td>{consulta.dataHora}</td>
                                        <td>
                                            <a data-tip data-for='tooltipConsultar'>
                                                <Button bsStyle="info" className="mapa-button" onClick={() => this.props.search(consulta.entrada)}>
                                                    <i className='fa fa-search'/>
                                                </Button>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    : ""}
                </Table>

                <Tooltip id="tooltipConsultar">
                    <span>Consultar</span>
                </Tooltip>
            </Panel>
        )
    }
}