import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/MyTable";
import MyButton from "../button/MyButton";
import CardToShowMoreInTable from "../table/CardToShowMoreInTable";

import { NENHUM_REGISTRO, TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE, TOOLTIP_SEE_MORE_INFO_MESSAGE, TOOLTIP_SEE_LESS_INFO_MESSAGE } from "../../constants/utils";

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
            <Panel title={title} >

                <a name={"Participações em Empresas"+this.props.index}></a>

                <Col md={12}>
                    {rows.length > 0 ?
                        <Table fields={fields} handleSortElements={this.handleSortElements}>
                            {rows.map((participacao, index) => {
                            let indexArray = index + participacao.documento;
                            return (
                                <tbody key={index}>
                                <tr>
                                    <td>
                                        <MyButton
                                            tooltip={TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE}
                                            onClickButton={handleSearchPerson}
                                            params={[participacao.documento, isCpfOrCnpj]}
                                            label={participacao.nome}
                                        />
                                    </td>
                                    <td>{participacao.participacao ? participacao.participacao : NENHUM_REGISTRO}</td>
                                    <td>
                                        <MyButton
                                            tooltip={showMoreInfo[indexArray] ? TOOLTIP_SEE_LESS_INFO_MESSAGE : TOOLTIP_SEE_MORE_INFO_MESSAGE}
                                            onClickButton={handleShowMoreInfo}
                                            params={[indexArray]}
                                            myButtonClass="my-button-circle"
                                            myButtonText={showMoreInfo[indexArray] ? <i className="fa fa-minus" aria-hidden="true"></i> : <i className="fa fa-plus" aria-hidden="true"></i>}
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
                    :
                        <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                    }
                </Col>
            </Panel>
        )
    }
}