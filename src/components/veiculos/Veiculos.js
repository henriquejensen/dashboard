import React, { Component } from "react";

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class Veiculos extends Component {
  render() {
    return (
            this.props.veiculos && this.props.veiculos.length > 0 ?
                <Panel title="VEÍCULOS" qtdTotal={[{icon:"fa fa-car", qtd:this.props.veiculos.length}]}>
                    <div className="col-md-12 col-sm-12">
                        <Table fields={ ["Placa", "Marca/Modelo", "Ano modelo", "Ano fabricação", "Ação"]}>
                            <tbody>
                                {this.props.veiculos.map((vec,i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{vec.placa}</td>
                                            <td>{vec.marcaModelo}</td>
                                            <td>{vec.anoModelo}</td>
                                            <td>{vec.anoFabricacao}</td>
                                            <td>
                                                <a data-tip data-for='tooltipConsultar'>
                                                    <div className="mapa-button">
                                                        <i className="glyphicon glyphicon-search" />
                                                    </div>
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </Panel>
            :
                <Panel title="VEÍCULOS">
                    <div className="text-center"><strong>Nada consta</strong></div>
                </Panel>
        )
  }
}