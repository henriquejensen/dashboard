import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

import { formatCurrency } from "../utils/functions/patternDocuments";

const title = "RECUPERAÇÕES, FALÊNCIAS E AÇÕES JUDICIAIS";

export default class Acoes extends Component {
  render() {
    let indexOfProps = this.props.index;
    let acoes = this.props.acoes ? this.props.acoes : {};
    let fields = ["Data", "Cód. Vara",  "Cidade"];
    return (
        <div>
            <a name={"Recuperações, Falências e Ações Judiciais"+indexOfProps}></a>
            <a name={"Recuperação e Falências"+indexOfProps}></a>
            <a name={"Ações"+indexOfProps}></a>
            <a name={"Ações Judiciais"+indexOfProps}></a>
            {acoes.acoes && acoes.acoes.length > 0 ?
              <Panel title={title} qtdTotal={[{icon:"fa fa-line-chart", qtd:acoes.quantidadeAcoes}]}>
                <Col md={12}>
                  <Col md={4}><strong>Ocorrência mais Antiga:</strong> {acoes.ocorrenciaMaisAntiga}</Col>
                  <Col md={4}><strong>Ocorrência mais Recente:</strong> {acoes.ocorrenciaMaisRecente}</Col>
                  <Col md={4}><strong>Valor Total:</strong> {formatCurrency(acoes.valorTotal)}</Col>
                </Col>

                <Col md={12}>
                  <Table fields={fields}>
                    <tbody>
                      {acoes.acoes.map((acao, index) => {
                        return (
                          <tr key={index}>
                            <td>{acao.dataAcao}</td>
                            <td>{acao.vara}</td>
                            <td>{acao.cidade + " - " + acao.uf}</td>
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