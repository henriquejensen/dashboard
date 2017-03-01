import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Button } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class Sociedades extends Component {
  render() {
    return (
          <div>
            <a name={"Participações em empresas"+this.props.index}></a>
              
              {this.props.participacoes && this.props.participacoes.length > 0 ?
                <Panel title="PARTICIPAÇÕES EM EMPRESAS" qtdTotal={[{icon:"fa fa-building-o", qtd:this.props.participacoes.length}]}>
                  
                  <div className="col-md-12">
                    <Table
                        fields={
                            ["Nome", "Cargo", "Participação", "Entrada", "Saída", "Relacionamento"]
                        }
                    >
                      <tbody>
                        {this.props.participacoes.map((participacao, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                  {participacao.nome}
                                  <a data-tip data-for='tooltipConsultar'>
                                      <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(participacao.documento, "pj")}>
                                          <i className='fa fa-search'/>
                                      </Button>
                                  </a>
                              </td>
                              <td>{participacao.qualificacaoSocio}</td>
                              <td>{participacao.participacao}</td>
                              <td>{participacao.dataEntrada}</td>
                              <td>{participacao.dataSaida ? participacao.dataSaida : "Atual"}</td>
                              <td>{participacao.relacao}</td>
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
              :
                <Panel title="PARTICIPAÇÕES EM EMPRESAS">
                    <div className="text-center"><strong>Nada consta</strong></div>
                </Panel>
              }
          </div>
      )
  }
}