import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/MyTable";
import MyButton from "../button/MyButton";
import CardToShowMoreInTable from "../table/CardToShowMoreInTable";

import { NENHUM_REGISTRO, TOOLTIP_SEARCH_BY_DOCUMENT, TOOLTIP_SEE_MORE_INFO } from "../../constants/utils";

const title = "QUADRO SOCIETÁRIO";

export default class Socios extends Component {

    state = {
      showMoreInfo: {},
      rows: this.props.socios ? this.props.socios : []
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
        let handleShowMoreInfo = this.handleShowMoreInfo;
        let fields= [
            {id:"nome", name:"Nome", sortable:true},
            {id:"qualificacaoSocio", name:"Qualificação"},
            {id:"participacao", name:"Participação", sortable:true},
            {id:"btn", name:"#"}
        ];
        let showMoreInfo = this.state.showMoreInfo;
        return (
                <div>
                    <a name={"Sócios"+this.props.index}></a>
                    {rows.length > 0 ?
                        <Panel title={title} qtdTotal={[{icon:"fa fa-building-o", qtd:rows.length}]}>
                            <Col md={12}>
                                <Table fields={fields} handleSortElements={this.handleSortElements} >
                                    {rows.map((soc,i) => {
                                        /**Alguns documentos ja veem formatados, entao retiro a formatacao para pegar o tamanho */
                                        let documento = soc.documento.toString().replace(/[^0-9]/g,"")
                                        let isCpfOrCnpj = documento.length > 11 ? "CNPJ" : "CPF";
                                        let indexArray = i + documento;
                                        return (
                                            <tbody key={i}>
                                                <tr>
                                                    <td>
                                                        <MyButton
                                                            tooltip={TOOLTIP_SEARCH_BY_DOCUMENT}
                                                            onClickButton={handleSearchPerson}
                                                            params={[documento, isCpfOrCnpj]}
                                                            label={soc.nome}
                                                        />
                                                    </td>
                                                    <td>{soc.qualificacaoSocio ? soc.qualificacaoSocio : NENHUM_REGISTRO}</td>
                                                    <td className="text-center">{soc.participacao ? soc.participacao : NENHUM_REGISTRO}</td>
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
                                                                        {label:"Data entrada", value:soc.dataEntrada},
                                                                        {label:"Data saída", value:soc.dataSaida ? soc.dataSaida : "Atual"},
                                                                        {label:"Valor participação", value:soc.valorParticipacao}
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