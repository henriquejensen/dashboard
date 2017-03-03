import React, { Component } from "react";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

export default class RendaEstimada extends Component {
  render() {
    const renda = this.props.rendaEstimada;
    return (
            this.props.rendaEstimada ?
                <Panel title="RENDA ESTIMADA">
                    <div className="col-md-12 col-sm-12">
                        <Table fields={ ["Renda Estimada", "Faixa de Renda", "Renda", "Participações", "Qtde Empresas", "Qtde Funcionários", "Qtde Veículos", "Último Veículo"]}>
                            <tbody>
                                <tr>
                                    <td>{renda.rendaEstimada}</td>
                                    <td>{renda.rendaBeneficio + renda.rendaEmpregador}</td>
                                    <td>{renda.rendaEstimadaFaixa}</td>
                                    <td>{renda.participacoesEmpresas}</td>
                                    <td>{renda.quantidadeEmpresas}</td>
                                    <td>{renda.quantidadeFuncionarios}</td>
                                    <td>{renda.quantidadeVeiculos}</td>
                                    <td>{renda.veiculoMaisNovo}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Panel>
            :
                <Panel title="RENDA ESTIMADA">
                    <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                </Panel>
        )
  }
}