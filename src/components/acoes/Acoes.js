import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

import { formatCurrency } from "../utils/functions/patternDocuments";

const title = "RECUPERAÇÕES, FALÊNCIAS E AÇÕES JUDICIAIS";

export default class Acoes extends Component {
  render() {
    return (
        <div>
            <a name={"Recuperações, Falências e Ações Judiciais"+this.props.index}></a>
            <a name={"Recuperação e Falências"+this.props.index}></a>
            <a name={"Ações"+this.props.index}></a>
            <a name={"Ações Judiciais"+this.props.index}></a>
            {this.props.acoes && this.props.acoes.acoes && this.props.acoes.acoes.length > 0 ?
              <Panel title={title} qtdTotal={[{icon:"fa fa-line-chart", qtd:this.props.acoes.quantidadeAcoes}]}>
                <Col md={12}>
                  <Col md={4}><strong>Ocorrência mais Antiga:</strong> {this.props.acoes.ocorrenciaMaisAntiga}</Col>
                  <Col md={4}><strong>Ocorrência mais Recente:</strong> {this.props.acoes.ocorrenciaMaisRecente}</Col>
                  <Col md={4}><strong>Valor Total:</strong> {formatCurrency(this.props.acoes.valorTotal)}</Col>
                </Col>

                <Col md={12}>
                  <Table fields={["Data", "Valor", "Cód. Vara", "Local (vara)", "Cidade", "Avalista"]}>
                    <tbody>
                      {this.props.acoes.acoes.map((acao, index) => {
                        return (
                          <tr key={index}>
                            <td>{acao.dataAcao}</td>
                            <td>{acao.valor}</td>
                            <td>{acao.vara}</td>
                            <td>{acao.forum}</td>
                            <td>{acao.cidade + " " + acao.uf}</td>
                            <td>{acao.avalista}</td>
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