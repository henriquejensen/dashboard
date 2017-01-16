import React, { Component } from "react";
import Tooltip from 'react-tooltip'

import Panel from "../../components/Panel";
import Table from "../../components/Table";

export default class Sociedades extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
            <Panel title="PARTICIPAÇÕES EM EMPRESAS">
              <div className="col-md-12">
                <Table
                    fields={
                        ["CNPJ", "Razão social", "Área de atuação", "Participação", "Entrada", "Ação"]
                    }
                >
                  <tbody>
                    {this.props.sociedades.SOCIEDADE.length > 1 ?
                      this.props.sociedades.SOCIEDADE.map((soc,i) => {
                          return <tr key={i}>
                            <td>{soc.CNPJ}</td>
                            <td>{soc.RAZAO_SOCIAL}</td>
                            <td>{soc.DESCRICAO_CNAE}</td>
                            <td className="text-center">{soc.PARTICIPACAO}%</td>
                            <td>{soc.DATA_ENTRADA}</td>
                            <td>
                                <div className="mapa-button" onClick={() => this.props.buscaCNPJ(soc.CNPJ, "pj")}><i className="glyphicon glyphicon-search" /></div>
                            </td>
                          </tr>
                      }) : (
                        <tr>
                          <td>{this.props.sociedades.SOCIEDADE.CNPJ}</td>
                          <td>{this.props.sociedades.SOCIEDADE.RAZAO_SOCIAL}</td>
                          <td>{this.props.sociedades.SOCIEDADE.DESCRICAO_CNAE}</td>
                          <td className="text-center">{this.props.sociedades.SOCIEDADE.PARTICIPACAO}%</td>
                          <td>{this.props.sociedades.SOCIEDADE.DATA_ENTRADA}</td>
                          <td>
                              <a data-tip data-for="tooltipConsultar"> 
                                <div className="mapa-button" onClick={() => this.props.buscaCNPJ(this.props.sociedades.SOCIEDADE.CNPJ, "pj")}><i className="glyphicon glyphicon-search" /></div>
                              </a>
                          </td>
                        </tr>
                      )}

                    </tbody>
                  </Table>
                </div>

                <Tooltip id="tooltipConsultar">
                    <span>Consultar</span>
                </Tooltip>
            </Panel>)
  }
}