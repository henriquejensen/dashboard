import React, { Component } from "react";

export default class Ocupacoes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
            <div className="row row-localize">
              <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading text-center">
                        PROFISSÃO
                    </div>
                    <div className="panel-body">
                          <div className="col-md-12">
                            <table className="table table-striped table-hover">
                              <thead>
                                <tr>
                                  <th>Provável Profissão</th>
                                  <th>Empresa Relacionada</th>
                                  <th>Renda</th>
                                  <th>Porte</th>
                                  <th>Ação</th>
                                </tr>
                              </thead>
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
                            </table>
                          </div>
                    </div>
                </div>
              </div>
            </div>)
  }
}