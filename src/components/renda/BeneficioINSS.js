import React,  { Component } from "react";

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class BeneficiosINSS extends Component {
    render() {
        return (
            this.props.beneficio ?
                <Panel title="BENEFÍCIO ASSISTENCIAL E INSS">
                    <div className="col-md-12 col-sm-12">            
                        <Table
                            fields={
                                ["Tipo do Benefício", "Valor do Benefício", "Faixa do Benefício", "Descrição do Benefício", "Data Benefício", "Número do Benefício", "Código do Benefício", "Status do Benefício"]
                            }
                        >
                            <tbody>
                                <tr>
                                    <td>{this.props.beneficio.tipoBeneficio}</td>
                                    <td>{this.props.beneficio.valorBeneficio}</td>
                                    <td>{this.props.beneficio.faixaBeneficio}</td>
                                    <td>{this.props.beneficio.descricaoBeneficio}</td>
                                    <td>{this.props.beneficio.beneficioDataRef}</td>
                                    <td>{this.props.beneficio.numeroBeneficio}</td>
                                    <td>{this.props.beneficio.codigoBeneficio}</td>
                                    <td>{this.props.beneficio.statusBeneficio}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Panel>
            :
                <Panel title="BENEFÍCIO ASSISTENCIAL E INSS">
                    <div className="text-center"><strong>Nada consta</strong></div>
                </Panel>
        )
    }
}