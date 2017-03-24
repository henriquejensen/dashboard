import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class Acoes extends Component {
  render() {
    return (
        <div>
            <a name={"Recuperações, Falências e Ações Judiciais"+this.props.index}></a>
            <a name={"Ações"+this.props.index}></a>
            <Panel title="RECUPERAÇÕES, FALÊNCIAS E AÇÕES JUDICIAIS" qtdTotal={[{icon:"fa fa-line-chart", qtd:this.props.acoes.quantidadeAcoes}]}>
              <Col md={12}>
                <Col md={4}><strong>Ocorrência mais Antiga:</strong> {this.props.acoes.ocorrenciaMaisAntiga}</Col>
                <Col md={4}><strong>Ocorrência mais Recente:</strong> {this.props.acoes.ocorrenciaMaisRecente}</Col>
                <Col md={4}><strong>Valor Total:</strong> R$ {this.props.acoes.valorTotal}</Col>
              </Col>

              <Col md={12}>
                <Table
                    fields={
                        ["Data", "Valor", "Cód. Vara", "Local (vara)", "Cidade", "UF", "Tipo"]
                    }
                >
                  <tbody>
                    {this.props.acoes.acoes.map((acao, index) => {
                      return (
                        <tr key={index}>
                          <td>{acao.dataAcao}</td>
                          <td>{acao.valor}</td>
                          <td>{acao.vara}</td>
                          <td>{acao.forum}</td>
                          <td>{acao.cidade + " " + acao.uf}</td>
                          <td>{acao.tipoAcao}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Col>
            </Panel>
          </div>
      )
  }
}