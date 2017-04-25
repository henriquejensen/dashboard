import React, { Component } from "react";

import Panel from "../../components/panel/Panel";
import Table from "../../components/table/Table";

import { formatCurrency } from "../utils/functions/patternDocuments";

const title = "QUADRO DE RESUMO";

export default class PainelControle extends Component {
    render() {
        let ocorrencias = this.props.ocorrencias ? this.props.ocorrencias : [];
        let index = this.props.index;
        return (
            <Panel title={title} qtdTotal={[{icon:"fa fa-exclamation-triangle", qtd:ocorrencias.length}]}>
                <div className="col-md-12">
                    <Table fields={["Ocorrência", "Quantidade", "Primeira Ocorrência", "Última Ocorrência", "Valor"]}>
                        <tbody>
                            {ocorrencias.map((ocorrencia, index) => {
                                return (
                                    <tr key={index} style={ocorrencia.quantidade > 0 ? {backgroundColor:"#f1f1c2"} : {}}>
                                        <td>
                                            <a href={"#"+ocorrencia.descricao+index}>
                                                {ocorrencia.descricao}
                                            </a>
                                        </td>
                                        <td>{ocorrencia.quantidade}</td>
                                        <td>{ocorrencia.primeiraOcorrencia ? ocorrencia.primeiraOcorrencia : "-"}</td>
                                        <td>{ocorrencia.ultimaOcorrencia}</td>
                                        <td>{formatCurrency(ocorrencia.valor)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </Panel>
        )
    }
}