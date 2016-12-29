import React, { Component } from "react";

import Panel from "../../components/Panel";
import Table from "../../components/Table";

export default class Veiculos extends Component {
  render() {
    return (
            <Panel title="VEÍCULOS">
              <Table
                  fields={
                      ["PLACA", "MARCA/MODELO", "ANO MODELO", "ANO FABRICAÇÃO", "AÇÃO"]
                  }
              >
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
                </Table>
            </Panel>)
  }
}