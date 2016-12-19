import React, { Component } from "react";

export default class Veiculos extends Component {
  render() {
    return (
        <div className="row row-localize">
          <div className="col-md-12">
            <div className="panel panel-default">
                <div className="panel-heading text-center">
                    VEÍCULOS
                </div>

                <div className="panel-body">
                      <div className="col-md-12">
                        <table className="table table-striped table-hover">
                          <thead>
                            <tr>
                              <th>Placa</th>
                              <th>Marca/Modelo</th>
                              <th>Ano modelo</th>
                              <th>Ano fabricação</th>
                              <th className="text-center">Ação</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.veiculos.VEICULO.length ?
                              this.props.veiculos.VEICULO.map((vec,i) => {
                                  return <tr key={i}>
                                    <td>{vec.PLACA}</td>
                                    <td>{vec.MARCA_MODELO}</td>
                                    <td>{vec.ANO_MODELO}</td>
                                    <td>{vec.ANO_FABRICACAO}</td>
                                    <td>
                                      <div className="mapa-button"><i className="glyphicon glyphicon-search" /></div>
                                    </td>
                                  </tr>
                              }) : (
                                <tr>
                                  <td>{this.props.veiculos.VEICULO.PLACA}</td>
                                  <td>{this.props.veiculos.VEICULO.MARCA_MODELO}</td>
                                  <td>{this.props.veiculos.VEICULO.ANO_MODELO}</td>
                                  <td>{this.props.veiculos.VEICULO.ANO_FABRICACAO}</td>
                                  <td>
                                    <div className="mapa-button"><i className="glyphicon glyphicon-search" /></div>
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