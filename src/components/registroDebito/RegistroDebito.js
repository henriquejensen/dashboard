import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

import { formatCurrency } from "../utils/functions/patternDocuments";

const title = "REGISTROS DE DÉBITOS";

export default class RegistroDebito extends Component {
  render() {
    let registros = this.props.registros;
    let index = this.props.index;
    return (
          <div>
            <a name={"Registro de Débitos"+index}></a>
            <a name={"Pendências e Restrições Financeiras"+index}></a>
            {registros && registros.registrosDebitos ?
              <Panel title={title} qtdTotal={[{icon:"fa fa-credit-card-alt", qtd:registros.registrosDebitos.length}]}>
                
                <Col md={12}>
                  <Col md={4}><strong>Ocorrência mais Antiga:</strong> {registros.ocorrenciaMaisAntiga}</Col>
                  <Col md={4}><strong>Ocorrência mais Recente:</strong> {registros.ocorrenciaMaisRecente}</Col>
                  <Col md={4}><strong>Valor Total:</strong> {formatCurrency(registros.valorTotal)}</Col>
                </Col>

                <Col md={12}>
                  <Table fields={["Associado/Credor", "Data Inclusão", "Data vencimento", "Origem", "Contrato", "Comprador/Avalista", "Valor", "Cidade", "Telefone"]}>
                    <tbody>
                      {registros.registrosDebitos.map((reg, index) => {
                        return (
                          <tr key={index}>
                            <td>{reg.credor}</td>
                            <td>{reg.dataInclusao}</td>
                            <td>{reg.dataVencimento}</td>
                            <td>{reg.praca}</td>
                            <td>{reg.contrato}</td>
                            <td>{reg.avalistaComprador}</td>
                            <td>{reg.valor}</td>                        
                            <td>{reg.cidade}</td>
                            <td>{reg.ddd + " " + reg.telefone}</td>
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