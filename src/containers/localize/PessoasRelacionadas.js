import React, { Component } from "react";

export default class PessoasRelacionadas extends Component {
    render() {
        return (
        <div className="row row-localize">
          <div className="col-md-12">
            <div className="panel panel-default">
                <div className="panel-heading text-center">
                    PESSOAS RELACIONADAS
                </div>
                <div className="panel-body">
                      <div className="col-md-12">
                        <table className="table table-striped table-hover">
                          <thead>
                            <tr>
                              <th>Relacionamento</th>
                              <th>Nome</th>
                              <th>Telefone 1</th>
                              <th>Telefone 2</th>
                              <th>Telefone 3</th>
                              <th>Telefone 4</th>
                              <th>Ação</th>
                            </tr>
                          </thead>
                          <tbody>
                              <tr>
                                <td>Mãe</td>
                                <td>Maria da Silva</td>
                                <td>11 23456789</td>
                                <td>11 23456789</td>
                                <td>11 23456789</td>
                                <td>11 23456789</td>
                                <td>
                                    <div className="mapa-button" ><i className="glyphicon glyphicon-search" /></div>
                                </td>
                              </tr>
                              <tr>
                                <td>Irmão</td>
                                <td>José da Silva</td>
                                <td>11 23456789</td>
                                <td>11 23456789</td>
                                <td>11 23456789</td>
                                <td>11 23456789</td>
                                <td>
                                    <div className="mapa-button" ><i className="glyphicon glyphicon-search" /></div>
                                </td>
                              </tr>
                              <tr>
                                <td>Parente</td>
                                <td>Rosa da Silva</td>
                                <td>11 23456789</td>
                                <td>11 23456789</td>
                                <td>11 23456789</td>
                                <td>11 23456789</td>
                                <td>
                                    <div className="mapa-button" ><i className="glyphicon glyphicon-search" /></div>
                                </td>
                              </tr>
                              <tr>
                                <td>Parente</td>
                                <td>Tania da Silva</td>
                                <td>11 23456789</td>
                                <td>11 23456789</td>
                                <td>11 23456789</td>
                                <td>11 23456789</td>
                                <td>
                                    <div className="mapa-button" ><i className="glyphicon glyphicon-search" /></div>
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