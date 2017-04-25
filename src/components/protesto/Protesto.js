import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

import { formatCurrency } from "../utils/functions/patternDocuments";

const title = "PROTESTOS";

export default class Protestos extends Component {
  render() {
    return (
          <div>
              <a name={"Protestos"+this.props.index}></a>
              {this.props.protestos && this.props.protestos.protestosDetalhados && this.props.protestos.quantidadeRegistros > 0 ?
                <Panel title={title} qtdTotal={[{icon:"fa fa-ban", qtd:this.props.protestos.protestosDetalhados.length}]}>
                  <Col md={12}>
                    <Col md={4}><strong>Ocorrência mais Antiga:</strong> {this.props.protestos.ocorrenciaMaisAntiga}</Col>
                    <Col md={4}><strong>Ocorrência mais Recente:</strong> {this.props.protestos.ocorrenciaMaisRecente}</Col>
                    <Col md={4}><strong>Valor Total:</strong> {formatCurrency(this.props.protestos.valorTotal)}</Col>
                  </Col>

                  <Col md={12}>
                    <Table fields={["Data", "Natureza", "Valor", "Cartório", "Cidade", "UF"]}>
                      <tbody>
                        {this.props.protestos.protestosDetalhados.map((protesto, index) => {
                          return (
                            <tr key={index}>
                              <td>{protesto.dataProtesto}</td>
                              <td>{protesto.natureza}</td>
                              <td>{protesto.valor}</td>
                              <td>{protesto.cartorio}</td>
                              <td>{protesto.cidade}</td>
                              <td>{protesto.uf}</td>
                            </tr>
                          )
                        })}

                      </tbody>
                    </Table>
                  </Col>
                </Panel>
                :
                <Panel title={title}>
                    <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                </Panel>}
          </div>
      )
  }
}