import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Button } from "react-bootstrap";

import Panel from "./panel/Panel";
import Table from "./table/Table";

import { patternCPF, patternCNPJ } from "./utils/functions/patternDocuments";

const fields = ["Tipo", "Entrada", "Data/Hora", ""];

export default class UltimasConsultas extends Component {
    state = {
        consultas: this.props.consultas,
        orderByGreater: true
    }

    orderTableBy = (key) => {
        let newConsultas = Object.assign({}, this.state.consultas);

        let posFieldClicked = key == "Entrada" ? "entrada" : "dataHora";
        let order = this.state.orderByGreater;

        newConsultas[this.props.type].sort(
            function(x,z){
                return order ?
                    (x[posFieldClicked] > z[posFieldClicked])
                : (x[posFieldClicked] < z[posFieldClicked])
            }
        )

        this.setState({
            consultas: newConsultas,
            orderByGreater: !this.state.orderByGreater
        })
    }

    render() {
        return (
            <Panel title="Últimas consultas">
                <Table fields={fields} orderTableBy={this.orderTableBy} >
                    {this.state.consultas && this.props.type ?
                        <tbody>
                            {this.state.consultas[this.props.type].map((consulta,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{this.props.type}</td>
                                        <td>{consulta.entrada}</td>
                                        <td>{new Date(consulta.dataHora).toLocaleString()}</td>
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