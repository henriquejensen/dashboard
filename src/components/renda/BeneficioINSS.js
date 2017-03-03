import React,  { Component } from "react";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { formatDate, formatCurrency } from "../utils/functions/patternDocuments";

import { NENHUM_REGISTRO } from "../../constants/utils";

export default class BeneficiosINSS extends Component {
    render() {
        return (
            this.props.beneficios ?
                <Panel title="BENEFÍCIO ASSISTENCIAL E INSS" qtdTotal={[{icon:"fa fa-money", qtd:this.props.beneficios.length}]}>
                    <div className="col-md-12 col-sm-12">            
                        <Table
                            fields={
                                ["Tipo do Benefício", "Valor do Benefício", "Faixa do Benefício", "Descrição do Benefício", "Data Benefício", "Número do Benefício", "Código do Benefício", "Status do Benefício"]
                            }
                        >
                            <tbody>
                                {this.props.beneficios.map((beneficio, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{beneficio.tipoBeneficio}</td>
                                            <td>{formatCurrency(beneficio.valorBeneficio)}</td>
                                            <td>{beneficio.faixaBeneficio}</td>
                                            <td>{beneficio.descricaoBeneficio}</td>
                                            <td>{formatDate(beneficio.beneficioDataRef)}</td>
                                            <td>{beneficio.numeroBeneficio}</td>
                                            <td>{beneficio.codigoBeneficio}</td>
                                            <td>{beneficio.statusBeneficio}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </Panel>
            :
                <Panel title="BENEFÍCIO ASSISTENCIAL E INSS">
                    <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                </Panel>
        )
    }
}