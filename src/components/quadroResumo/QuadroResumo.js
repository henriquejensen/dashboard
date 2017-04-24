import React, { Component } from "react";

import Panel from "../../components/panel/Panel";
import Table from "../../components/table/Table";

const title = "QUADRO DE RESUMO";

export default class PainelControle extends Component {
    render() {
        return (
            <Panel title={title} qtdTotal={[{icon:"fa fa-exclamation-triangle", qtd:this.props.ocorrencias.length}]}>
                <div className="col-md-12">
                    <Table fields={["Ocorrência", "Quantidade", "Primeira Ocorrência", "Última Ocorrência", "Valor"]}>
                        <tbody>
                            {this.props.ocorrencias.map((ocorrencia, index) => {
                                return (
                                    <tr key={index} style={ocorrencia.quantidade > 0 ? {backgroundColor:"#f1f1c2"} : {}}>
                                        <td>
                                            <a href={"#"+ocorrencia.descricao+this.props.index}>
                                                {ocorrencia.descricao}
                                            </a>
                                        </td>
                                        <td>{ocorrencia.quantidade}</td>
                                        <td>{ocorrencia.primeiraOcorrencia ? ocorrencia.primeiraOcorrencia : "-"}</td>
                                        <td>{ocorrencia.ultimaOcorrencia}</td>
                                        <td>R$ {ocorrencia.valor}</td>
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