import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/MyTable";
import MyButton from "../button/MyButton";
import CardToShowMoreInTable from "../table/CardToShowMoreInTable";

import { NENHUM_REGISTRO, TOOLTIP_SEE_MORE_INFO_MESSAGE, TOOLTIP_SEE_LESS_INFO_MESSAGE } from "../../constants/utils";

import { formatCurrency } from "../utils/functions/patternDocuments";

const title = "REGISTROS DE DÉBITOS";

export default class RegistroDebito extends Component {
    state = {
      showMoreInfo: {},
      rows: this.props.registros ? this.props.registros.registrosDebitos ? this.props.registros.registrosDebitos : [] : []
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
      let registros = this.props.registros;
      let index = this.props.index;
      let fields= [
        {id:"credor", name:"Associado/Credor"},
        {id:"dataInclusao", name:"Data Inclusão", sortable:true},
        {id:"valor", name:"Valor", sortable:true},
        {id:"btn", name:"#"}
      ];
      let showMoreInfo = this.state.showMoreInfo;
      let handleShowMoreInfo = this.handleShowMoreInfo;
      let rows = this.state.rows;
      return (
        <Panel title={title}>
            <a name={"Registro de Débitos"+index}></a>
            <a name={"Pendências e Restrições Financeiras"+index}></a>
            <Col md={12}>
                {registros && registros.registrosDebitos ?
                    <Table fields={fields} handleSortElements={this.handleSortElements} >
                        {rows.map((reg, index) => {
                            let indexArray = index;
                            return (
                                <tbody key={index}>
                                    <tr>
                                    <td>{reg.credor ? reg.credor : reg.avalistaComprador ? reg.avalistaComprador : NENHUM_REGISTRO}</td>
                                    <td>{reg.dataInclusao}</td>
                                    <td>{formatCurrency(reg.valor)}</td>                        
                                    <td>
                                        <MyButton
                                            tooltip={showMoreInfo[indexArray] ? TOOLTIP_SEE_LESS_INFO_MESSAGE : TOOLTIP_SEE_MORE_INFO_MESSAGE}
                                            onClickButton={handleShowMoreInfo}
                                            params={[indexArray]}
                                            myButtonStyle="default"
                                            myButtonClass="my-btn-more-details"
                                            myButtonText={showMoreInfo[indexArray] ? TOOLTIP_SEE_LESS_INFO_MESSAGE : TOOLTIP_SEE_MORE_INFO_MESSAGE}
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
                :
                    <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                }
            </Col>
        </Panel>
        )
    }
}