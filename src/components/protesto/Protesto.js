import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";
import MyButton from "../button/MyButton";
import CardToShowMoreInTable from "../table/CardToShowMoreInTable";

import { NENHUM_REGISTRO, TOOLTIP_SEE_MORE_INFO } from "../../constants/utils";

import { formatCurrency } from "../utils/functions/patternDocuments";

const title = "PROTESTOS";

export default class Protestos extends Component {

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
        let protestos = this.props.protestos  ? this.props.protestos  : {};
        let handleShowMoreInfo = this.handleShowMoreInfo;
        let fields= ["Cartório", "Cidade-UF", "Data", "Valor", "#"];
        let showMoreInfo = this.state.showMoreInfo;
        return (
            <div>
                <a name={"Protestos"+this.props.index}></a>
                {protestos.protestosDetalhados && protestos.quantidadeRegistros > 0 ?
                  <Panel title={title} qtdTotal={[{icon:"fa fa-ban", qtd:protestos.protestosDetalhados.length}]}>
                    <Col md={12}>
                      <Col md={4}><strong>Ocorrência mais Antiga:</strong> {protestos.ocorrenciaMaisAntiga}</Col>
                      <Col md={4}><strong>Ocorrência mais Recente:</strong> {protestos.ocorrenciaMaisRecente}</Col>
                      <Col md={4}><strong>Valor Total:</strong> {formatCurrency(protestos.valorTotal)}</Col>
                    </Col>

                    <Col md={12}>
                      <Table fields={fields}>
                        
                          {protestos.protestosDetalhados.map((protesto, index) => {
                            let indexArray = index;
                            return (
                              <tbody key={index}>
                                <tr>
                                  <td>{protesto.cartorio}</td>
                                  <td>{protesto.cidade+" - "+protesto.uf}</td>
                                  <td>{protesto.dataProtesto}</td>
                                  <td>{protesto.valor}</td>
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
                                                        {label:"Data vencimento", value:protesto.dataVencimento},
                                                        {label:"Grupo", value:protesto.grupo},
                                                        {label:"Informações", value:protesto.informacoesAdicionais},
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