import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/MyTable";
import MyButton from "../button/MyButton";
import CardToShowMoreInTable from "../table/CardToShowMoreInTable";

import { NENHUM_REGISTRO, TOOLTIP_SEE_MORE_INFO_MESSAGE, TOOLTIP_SEE_LESS_INFO_MESSAGE  } from "../../constants/utils";

import { formatCurrency } from "../utils/functions/patternDocuments";

const title = "PROTESTOS";

export default class Protestos extends Component {
    state = {
      showMoreInfo: {},
      rows: this.props.protestos ? this.props.protestos.protestosDetalhados ? this.props.protestos.protestosDetalhados : [] : []
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
        let protestos = this.props.protestos ? this.props.protestos : {};
        let handleShowMoreInfo = this.handleShowMoreInfo;
        let fields= [
            {id:"cartorio", name:"Cartório"},
            {id:"cidade", name:"Cidade-UF"},
            {id:"dataProtesto", name:"Data", sortable:true},
            {id:"valor", name:"Valor", sortable:true},
            {id:"btn", name:"#"}
        ];
        let showMoreInfo = this.state.showMoreInfo;
        let rows = this.state.rows;
        return (
            <Panel title={title} qtdTotal={[{icon:"fa fa-ban", qtd:rows.length}]}>
                <a name={"Protestos"+this.props.index}></a>
                
                <Col md={12}>
                    {rows.length > 0 ?
                        <Table fields={fields} handleSortElements={this.handleSortElements} >
                            {rows.map((protesto, index) => {
                            let indexArray = index;
                            return (
                                <tbody key={index}>
                                <tr>
                                    <td>{protesto.cartorio}</td>
                                    <td>{protesto.cidade+" - "+protesto.uf}</td>
                                    <td>{protesto.dataProtesto}</td>
                                    <td>{formatCurrency(protesto.valor)}</td>
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
                                        <td colSpan={5}>
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
                    :
                        <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                    }
                </Col>
            </Panel>
        )
    }
}