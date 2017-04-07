import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Col, Button } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

export default class Sociedades extends Component {
  render() {
    return (
          <div>
            <a name={"Participações em empresas"+this.props.index}></a>
              
              {this.props.participacoes && this.props.participacoes.length > 0 ?
                <Panel title="PARTICIPAÇÕES EM EMPRESAS" qtdTotal={[{icon:"fa fa-building-o", qtd:this.props.participacoes.length}]}>
                  
                  <Col md={12}>
                    <Table fields={["Nome", "Cargo", "Participação"]}>
                      <tbody>
                        {this.props.participacoes.map((participacao, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                  <a data-tip data-for='tooltipConsultar'>
                                      <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(participacao.documento, "CNPJ")}>
                                          <i className='fa fa-search'/>
                                      </Button>
                                  </a>
                                  {participacao.nome}
                              </td>
                              <td>{participacao.qualificacaoSocio}</td>
                              <td>{participacao.participacao}%</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </Col>

                  <Tooltip id="tooltipConsultar">
                      <span>Consultar</span>
                  </Tooltip>
                </Panel>
              :
                <Panel title="PARTICIPAÇÕES EM EMPRESAS">
                    <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                </Panel>
              }
          </div>
      )
  }
}