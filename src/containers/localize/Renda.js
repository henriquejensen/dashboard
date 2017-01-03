import React,  { Component } from "react";

import Panel from "../../components/Panel";
import Table from "../../components/Table";

export default class Renda extends Component {
    render() {
        return (
            <Panel title="RENDA PROFISSIONAL">
            
                <Table
                    fields={
                        ["EMPRESA", "DOCUMENTO", "CARGO", "FAIXA RENDA"]
                    }
                >
                    <tbody>
                        <tr>
                            <td>{this.props.renda.RAZAO_SOCIAL}</td>
                            <td>{this.props.renda.CNPJ}</td>
                            <td>{this.props.renda.CODIGO + " - " + this.props.renda.DESCRICAO}</td>
                            <td>{this.props.renda.SALARIO}</td>
                            <td>
                                <a data-tip data-for="tooltipConsultar">                                
                                    <div className="mapa-button" onClick={() => this.props.buscaCNPJ(this.props.renda.CNPJ, "pj")}>
                                        <i className="glyphicon glyphicon-search" />
                                    </div>
                                </a>
                            </td>
                        </tr>
                    </tbody>                    
                </Table>
            </Panel>
        )
    }
}