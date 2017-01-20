import React, { Component } from "react";
import Tooltip from 'react-tooltip'

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class Sociedades extends Component {
  render() {
    return (
          <div>
            <a name={"Participações em empresas"+this.props.index}></a>
            <Panel title="PARTICIPAÇÕES EM EMPRESAS" qtdTotal={[{icon:"fa fa-building-o", qtd:this.props.participacoes.length}]}>
              
              <div className="col-md-12">
                <Table
                    fields={
                        ["Documento", "Nome", "Cargo", "Participação", "Entrada", "Relacionamento", ""]
                    }
                >
                  <tbody>
                    {this.props.participacoes.map((participacao, index) => {
                      return (
                        <tr key={index}>
                          <td>{participacao.documento}</td>
                          <td>{participacao.nome}</td>
                          <td>{participacao.qualificacaoSocio}</td>
                          <td>{participacao.participacao}</td>
                          <td>{participacao.dataEntrada}</td>
                          <td>{participacao.relacao}</td>
                          <td>
                            <a data-tip data-for='tooltipConsultar'>
                              <div className="mapa-button">
                                  <i className='fa fa-search'/>
                              </div>
                            </a>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>

              <Tooltip id="tooltipConsultar">
                  <span>Consultar</span>
              </Tooltip>
            </Panel>
          </div>
      )
  }
}