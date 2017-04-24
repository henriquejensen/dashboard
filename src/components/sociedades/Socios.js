import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

const title = "QUADRO SOCIETÁRIO";

export default class Socios extends Component {
  render() {
    return (
            this.props.socios ?
                <div>
                    <a name={"Sócios"+this.props.index}></a>
                    <Panel title={title} qtdTotal={[{icon:"fa fa-building-o", qtd:this.props.socios.length}]}>
                        <Col md={12}>
                            <Table fields={["Nome", "Qualificação", "Participação", "Entrada", "Saída"]} >
                                <tbody>
                                    {this.props.socios.map((soc,i) => {
                                        let tipo = soc.documento.length > 11 ? "CNPJ" : "CPF";
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <a data-tip data-for='tooltipConsultar'>
                                                        <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(soc.documento, tipo)}>
                                                            <i className='fa fa-search'/>
                                                        </Button>
                                                    </a>
                                                    {soc.nome}
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
                </div>
            :
            <Panel title={title}>
                <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
            </Panel>        
    )
  }
}