import React, { Component } from "react";

import Panel from "../../components/Panel";
import Table from "../../components/Table";

export default class Ocupacoes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
          <Panel title="PROFISSÃO">
            <div className="col-md-12">
              <Table
                  fields={
                      ["Provável Profissão", "Empresa Relacionada", "Renda", "Porte", "Ação"]
                  }
              >
                <tbody>
                  <tr>
                    <td>{this.props.ocupacao.DESCRICAO}</td>
                    <td>{this.props.ocupacao.RAZAO_SOCIAL}</td>
                    <td>{this.props.ocupacao.SALARIO}</td>
                    <td>{this.props.ocupacao.PORTE}</td>
                    <td>
                        <div className="mapa-button" onClick={() => this.props.buscaCNPJ(this.props.ocupacao.CNPJ, "pj")}>
                          <i className="glyphicon glyphicon-search" />
                        </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Panel>)
  }
}