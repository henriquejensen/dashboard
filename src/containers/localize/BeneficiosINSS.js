import React,  { Component } from "react";

import Panel from "../../components/Panel";
import Table from "../../components/Table";

export default class BeneficiosINSS extends Component {
    render() {
        return (
            <Panel title="BENEFÍCIOS ASSISTENCIAIS E INSS">
            
                <Table
                    fields={
                        ["BENEFÍCIOS", "DESCRIÇÃO BENEFÍCIO", "FAIXA"]
                    }
                >
                    <tbody>
                        <tr>
                            <td>Nada consta</td>
                            <td>Nada consta</td>
                            <td>{this.props.beneficio}</td>
                        </tr>
                    </tbody>
                    
                </Table>

            </Panel>
        )
    }
}