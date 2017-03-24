import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class Protestos extends Component {
  render() {
    return (
          <div>
            <a name={"Protestos"+this.props.index}></a>
            <Panel title="PROTESTOS" qtdTotal={[{icon:"fa fa-ban", qtd:this.props.protestos.quantidadeRegistros}]}>
              <Col md={12}>
                <Col md={4}><strong>Ocorrência mais Antiga:</strong> {this.props.protestos.ocorrenciaMaisAntiga}</Col>
                <Col md={4}><strong>Ocorrência mais Recente:</strong> {this.props.protestos.ocorrenciaMaisRecente}</Col>
                <Col md={4}><strong>Valor Total:</strong> R$ {this.props.protestos.valorTotal}</Col>
              </Col>

              <Col md={12}>
                <Table
                    fields={
                        ["Data", "Valor", "Cartório", "Cidade", "UF"]
                    }
                    elements={this.props.protestos.protestosDetalhados}
                />
              </Col>
            </Panel>
          </div>
      )
  }
}