import React, { Component } from "react";

export default class Sociedades extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="row row-localize">
          <div className="col-md-12">
            <div className="panel panel-default">
                <div className="panel-heading text-center">
                    SOCIEDADES
                </div>
                <div className="panel-body">
                      <div className="col-md-12">
                        <table className="table table-striped table-hover">
                          <thead>
                            <tr>
                              <th>CNPJ</th>
                              <th>Razão social</th>
                              <th>Área de atuação</th>
                              <th>Participação</th>
                              <th>Entrada</th>
                              <th className="text-center">Ação</th>
                            </tr>
                          </thead>
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
                                      <div className="mapa-button" onClick={() => this.props.buscaCNPJ(soc.CNPJ)}><i className="glyphicon glyphicon-search" /></div>
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
                                    <div className="mapa-button" onClick={() => this.props.buscaCNPJ(this.props.sociedades.SOCIEDADE.CNPJ)}><i className="glyphicon glyphicon-search" /></div>
                                </td>
                              </tr>
                            )}

                          </tbody>
                        </table>
                      </div>
                </div>
            </div>
          </div>
        </div>)
  }
}