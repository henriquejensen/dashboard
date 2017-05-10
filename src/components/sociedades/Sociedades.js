import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/MyTable";
import MyButton from "../button/MyButton";
import CardToShowMoreInTable from "../table/CardToShowMoreInTable";

import { NENHUM_REGISTRO, TOOLTIP_SEARCH_BY_DOCUMENT, TOOLTIP_SEE_MORE_INFO } from "../../constants/utils";

const title = "PARTICIPAÇÕES EM EMPRESAS";

export default class Sociedades extends Component {
    state = {
      showMoreInfo: {},
      rows: this.props.participacoes ? this.props.participacoes : []
    }

    handleShowMoreInfo = (indexArray) => {
        let showMoreInfo = this.state.showMoreInfo;
        let newShowMoreInfo = Object.assign({}, this.state.showMoreInfo);
        newShowMoreInfo[indexArray] = this.state.showMoreInfo[indexArray] ? !this.state.showMoreInfo[indexArray] : true;
        this.setState({
            showMoreInfo: newShowMoreInfo          
        })
    }

    handleSortElements = (sortColumn, sortDirection='ASC') => {
        const comparer = (a, b) => {
            if (sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            } else if (sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        }
 
        const rows = sortDirection === 'NONE' ? this.state.rows.slice(0) : this.state.rows.sort(comparer);

        this.setState({ rows });
    }

    render() {
      let rows = this.state.rows;
      let handleSearchPerson = this.props.searchPerson;
      let isCpfOrCnpj = "CNPJ";
      let handleShowMoreInfo = this.handleShowMoreInfo;
      let fields= [
            {id:"nome", name:"Nome", sortable:true},
            {id:"participacao", name:"Participação", sortable:true},
            {id:"btn", name:"#"}
      ];
      let showMoreInfo = this.state.showMoreInfo;
      return (
            <div>
              <a name={"Participações em Empresas"+this.props.index}></a>
                
                {rows.length > 0 ?
                  <Panel title={title} >
                    <Col md={12}>
                      <Table fields={fields}>
                          {rows.map((participacao, index) => {
                            let indexArray = index + participacao.documento;
                            return (
                              <tbody key={index}>
                                <tr>
                                  <td>
                                    <MyButton
                                        tooltip={TOOLTIP_SEARCH_BY_DOCUMENT}
                                        onClickButton={handleSearchPerson}
                                        params={[participacao.documento, isCpfOrCnpj]}
                                        label={participacao.nome}
                                    />
                                  </td>
                                  <td>{participacao.participacao ? participacao.participacao : NENHUM_REGISTRO}</td>
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
                                                        {label:"Data entrada", value:participacao.dataEntrada},
                                                        {label:"Data saída", value:participacao.dataSaida},
                                                        {label:"Valor participação", value:participacao.valorParticipacao}
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
                  </Panel>
                }
            </div>
        )
    }
}