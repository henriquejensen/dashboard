import React, { Component } from "react";

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class Acoes extends Component {
  render() {
    return (
        <div>
            <a name={"Ações"+this.props.index}></a>
            <Panel title="AÇÕES" qtdTotal={[{icon:"fa fa-line-chart", qtd:this.props.acoes.quantidadeAcoes}]}>
              <div className="col-md-12">
                <div className="col-md-4"><strong>Ocorrência mais Antiga:</strong> {this.props.acoes.ocorrenciaMaisAntiga}</div>
                <div className="col-md-4"><strong>Ocorrência mais Recente:</strong> {this.props.acoes.ocorrenciaMaisRecente}</div>
                <div className="col-md-4"><strong>Valor Total:</strong> R$ {this.props.acoes.valorTotal}</div>
                <Table
                    fields={
                        ["Data", "Valor", "Cód. Vara", "Local (vara)", "Cidade", "Tipo"]
                    }
                >
                  <tbody>
                    {this.props.acoes.acoes.map((acao, index) => {
                      return (
                        <tr key={index}>
                          <td>{acao.dataAcao}</td>
                          <td>{acao.valor}</td>
                          <td>{acao.vara}</td>
                          <td>{acao.forum}</td>
                          <td>{acao.cidade + " " + acao.uf}</td>
                          <td>{acao.tipoAcao}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            </Panel>
          </div>
      )
  }
}