import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

export default class Socios extends Component {
  render() {
    return (
        this.props.socios ?
            <Panel title="QUADRO SOCIETÁRIO" qtdTotal={[{icon:"fa fa-building-o", qtd:this.props.socios.length}]}>
                <Col md={12}>
                    <Table fields={["Nome", "Qualificação", "Participação", "Entrada", "Saída"]} >
                        <tbody>
                            {this.props.socios.map((soc,i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            {soc.nome}
                                            <a data-tip data-for='tooltipConsultar'>
                                                <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(soc.documento, "pf")}>
                                                    <i className='fa fa-search'/>
                                                </Button>
                                            </a>
                                        </td>
                                        <td>{soc.qualificacaoSocio}</td>
                                        <td className="text-center">{soc.participacao}%</td>
                                        <td>{soc.dataEntrada}</td>
                                        <td>{soc.dataSaida ? soc.dataSaida : "Atual"}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Panel>
        :
            <Panel title="QUADRO SOCIETÁRIO">
                <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
            </Panel>
    )
  }
}