import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";
import MyButton from "../button/MyButton";
import CardToShowMoreInTable from "../table/CardToShowMoreInTable";

import { NENHUM_REGISTRO, TOOLTIP_SEE_MORE_INFO } from "../../constants/utils";

import { formatCurrency } from "../utils/functions/patternDocuments";

const title = "REGISTROS DE DÉBITOS";

export default class RegistroDebito extends Component {

    state = {
      showMoreInfo: {}
    }

    handleShowMoreInfo = (indexArray) => {
        let showMoreInfo = this.state.showMoreInfo;
        let newShowMoreInfo = Object.assign({}, this.state.showMoreInfo);
        newShowMoreInfo[indexArray] = this.state.showMoreInfo[indexArray] ? !this.state.showMoreInfo[indexArray] : true;
        this.setState({
            showMoreInfo: newShowMoreInfo          
        })
    }

    render() {
      let registros = this.props.registros;
      let index = this.props.index;
      let fields = ["Associado/Credor", "Data Inclusão", "Valor", "#"];
      let showMoreInfo = this.state.showMoreInfo;
      let handleShowMoreInfo = this.handleShowMoreInfo;
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
                    <Table fields={fields}>
                        {registros.registrosDebitos.map((reg, index) => {
                          let indexArray = index;
                          return (
                            <tbody key={index}>
                              <tr>
                                <td>{reg.credor ? reg.credor : reg.avalistaComprador ? reg.avalistaComprador : NENHUM_REGISTRO}</td>
                                <td>{reg.dataInclusao}</td>
                                <td>{formatCurrency(reg.valor)}</td>                        
                                <td>
                                    <MyButton
                                        tooltip={TOOLTIP_SEE_MORE_INFO}
                                        onClickButton={handleShowMoreInfo}
                                        params={[indexArray]}
                                        myButtonStyle="default"
                                        myButtonClass="my-btn-more-details"
                                        myButtonText={showMoreInfo[indexArray] ? "Menos informações" : "Mais informações"}
                                    />
                                </td>
                              </tr>
                              <tr>
                                  {showMoreInfo[indexArray] ?
                                      <td colSpan={4}>
                                          <CardToShowMoreInTable
                                              elements={
                                                  [
                                                      {label:"Cidade", value:reg.cidade+" - "+reg.uf},
                                                      {label:"Data vencimento", value:reg.dataVencimento},
                                                      {label:"Telefone", value:reg.ddd+reg.telefone},
                                                      {label:"Contrato", value:reg.contrato},
                                                      {label:"Situação", value:reg.situacao},
                                                      {label:"Telefone", value:reg.ddd+reg.telefone},
                                                      {label:"Praça", value:reg.ddd+reg.praca},
                                                      {label:"Informações", value:reg.informacoesAdicionais}
                                                  ]
                                              }
                                          />
                                      </td>
                                  : ""}
                              </tr>
                            </tbody>
                          )
                        })}
                      
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