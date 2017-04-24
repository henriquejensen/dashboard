import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

const title = "CHEQUES SEM FUNDO";

export default class ChequeSemFundo extends Component {
  render() {
    return (
          <div>
              <a name={"Cheques Sem Fundos"+this.props.index}></a>
              <a name={"Cheques sem Fundos"+this.props.index}></a>
              {this.props.cheques && this.props.cheques.cheques && this.props.cheques.cheques.length > 0 ?

                <Panel title={title} qtdTotal={[{icon:"fa fa-university", qtd:this.props.cheques.total}]}>
                  
                  <Col md={12}>
                    <Table fields={["Último Cheque", "Origem", "Quantidade", "Motivo", "Agência", "Banco"]}>
                      <tbody>
                        {this.props.cheques.cheques.map((cheque, index) => {
                          return (
                            <tr key={index}>
                              <td>{cheque.ultimoEm}</td>
                              <td>{cheque.origem}</td>
                              <td>{cheque.quantidade}</td>
                              <td>{cheque.motivo}</td>
                              <td>{cheque.agencia}</td>
                              <td>{cheque.banco}</td>
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