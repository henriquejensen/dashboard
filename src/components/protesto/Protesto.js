import React, { Component } from "react";

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class Protestos extends Component {
  render() {
    return (
          <Panel title="PROTESTOS" qtdTotal={[{icon:"fa fa-ban", qtd:this.props.protestos.quantidadeRegistros}]}>
            <a name="Protestos"></a>
            <div className="col-md-12">
              <div className="col-md-4"><strong>Ocorrência mais Antiga:</strong> {this.props.protestos.ocorrenciaMaisAntiga}</div>
              <div className="col-md-4"><strong>Ocorrência mais Recente:</strong> {this.props.protestos.ocorrenciaMaisRecente}</div>
              <div className="col-md-4"><strong>Valor Total:</strong> R$ {this.props.protestos.valorTotal}</div>
              <Table
                  fields={
                      ["Data", "Valor", "Cartório", "Cidade", "UF"]
                  }
              >
                <tbody>
                  {this.props.protestos.protestosDetalhados.map((protesto, index) => {
                    return (
                      <tr key={index}>
                        <td>{protesto.data}</td>
                        <td>{protesto.valor}</td>
                        <td>{protesto.cartorio}</td>
                        <td>{protesto.cidade}</td>
                        <td>{protesto.uf}</td>
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