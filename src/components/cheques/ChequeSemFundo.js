import React, { Component } from "react";

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class ChequeSemFundo extends Component {
  render() {
    return (
          <div>
            <a name={"Cheques sem fundo"+this.props.index}></a>
            <Panel title="CHEQUES SEM FUNDO" qtdTotal={[{icon:"fa fa-university", qtd:this.props.cheques.total}]}>
              
              <div className="col-md-12">
                <Table
                    fields={
                        ["Último Cheque", "Origem", "Quantidade", "Motivo", "Agência", "Banco"]
                    }
                >
                  <tbody>
                    {this.props.cheques.cheques.map((cheque, index) => {
                      return (
                        <tr key={index}>
                          <td>{cheque.ultimocheque}</td>
                          <td>{cheque.origem}</td>
                          <td>{cheque.quantidade}</td>
                          <td>{cheque.motivo}</td>
                          <td>{cheque.agencia}</td>
                          <td>{cheque.banco}</td>
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