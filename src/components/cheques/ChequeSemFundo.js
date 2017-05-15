import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

const title = "CHEQUES SEM FUNDO";

export default class ChequeSemFundo extends Component {
  render() {
    let cheques = this.props.cheques;
    let rows = this.props.cheques ? this.props.cheques.cheques ? this.props.cheques.cheques : [] : [];
    let indexOfProps = this.props.index;
    let fields = ["Último Cheque", "Quantidade", "Motivo", "Agência", "Banco"];
    return (
        <Panel title={title} qtdTotal={[{icon:"fa fa-university", qtd:rows.length}]}>

          <a name={"Cheques Sem Fundos"+indexOfProps}></a>
          <a name={"Cheques sem Fundos"+indexOfProps}></a>
          <a name={"Cheques sem Fundo"+indexOfProps}></a>
          
          <Col md={12}>
            {rows.length > 0 ?
              <Table fields={fields}>
                <tbody>
                  {rows.map((cheque, index) => {
                    return (
                      <tr key={index}>
                        <td>{cheque.ultimoEm}</td>
                        <td>{cheque.quantidade}</td>
                        <td>{cheque.motivo}</td>
                        <td>{cheque.agencia}</td>
                        <td>{cheque.banco}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            :
              <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
            }
          </Col>
        </Panel>
      )
  }
}