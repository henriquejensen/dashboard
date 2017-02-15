import React, { Component } from "react";
import Tooltip from 'react-tooltip'

import Panel from "./Panel";
import Table from "./Table";

import { patternCPF, patternCNPJ } from "./utils/functions/patternDocuments";

export default class UltimasConsultas extends Component {
    render() {
        return (
            <Panel title="Últimas consultas" qtdTotal={[{
                qtd:this.props.consultas.length, icon:"fa fa-users"
            }]}>
                <Table fields={["Tipo", "Documento", "Pesquisa", "Data/Hora", ""]} >
                    <tbody>
                        {this.props.consultas.map((consulta,index) => {
                            return (
                                <tr key={index}>
                                    <td>{consulta.tipo}</td>
                                    {consulta.tipo == "CPF" ?
                                        <td>{patternCPF(consulta.documento)}</td>
                                    : consulta.tipo == "CNPJ" ?
                                        <td>{patternCNPJ(consulta.documento)}</td>
                                    : ""}
                                    <td>{consulta.pesquisa}</td>                                
                                    <td>{consulta.dataHora}</td>
                                    <td>
                                        <a data-tip data-for="tooltipConsultar">
                                            <div className="mapa-button">
                                                <i className='fa fa-search'/>
                                            </div>
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

                <Tooltip id="tooltipConsultar">
                    <span>Consultar</span>
                </Tooltip>
            </Panel>
        )
    }
}