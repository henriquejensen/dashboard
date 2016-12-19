import React, { Component } from "react";

export default class Socios extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="row row-localize">
          <div className="col-md-12">
            <div className="panel panel-default">
                <div className="panel-heading text-center">
                    SÓCIOS
                </div>

                <div className="panel-body">
                      <div className="col-md-12">
                        <table className="table table-striped table-hover">
                          <thead>
                            <tr>
                              <th>Documento</th>
                              <th>Nome</th>
                              <th>Cargo</th>
                              <th>Participação</th>
                              <th>Entrada</th>
                              <th>Açao</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.socios.length ?
                              this.props.socios.map((soc,i) => {
                                  return <tr key={i}>
                                    <td>{soc.DOCUMENTO}</td>
                                    <td>{soc.NOME}</td>
                                    <td>{soc.CARGO}</td>
                                    <td className="text-center">{soc.PARTICIPACAO}%</td>
                                    <td>{soc.DATA_ENTRADA}</td>
                                    <td>
                                      <div className="mapa-button" onClick={() => this.props.buscaCPF(soc.DOCUMENTO, "pf")}><i className="glyphicon glyphicon-search" /></div>
                                    </td>
                                  </tr>
                              }) : (
                                <tr>
                                  <td>{this.props.socios.DOCUMENTO}</td>
                                  <td>{this.props.socios.NOME}</td>
                                  <td>{this.props.socios.CARGO}</td>
                                  <td className="text-center">{this.props.socios.PARTICIPACAO}%</td>
                                  <td>{this.props.socios.DATA_ENTRADA}</td>
                                  <td>
                                    <div className="mapa-button" onClick={() => this.props.buscaCPF(this.props.socios.DOCUMENTO, "pf")}><i className="glyphicon glyphicon-search" /></div>
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