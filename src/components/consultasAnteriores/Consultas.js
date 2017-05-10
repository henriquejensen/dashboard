import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Col, Button } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/MyTable";
import MyButton from "../button/MyButton";

import { NENHUM_REGISTRO, TOOLTIP_SEARCH_BY_DOCUMENT } from "../../constants/utils";

const title = "CONSULTAS";

export default class Consultas extends Component {
    state = {
      rows: this.props.consultas ? this.props.consultas.consultasAnteriores ? this.props.consultas.consultasAnteriores : [] : []
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
        let consultas = this.props.consultas ? this.props.consultas : {};
        let index = this.props.index;
        let fields= [
            {id:"consultante", name:"Nome do Associado"},
            {id:"data", name:"Data da Consulta", sortable:true}
        ];
        let handleSearchPerson = this.props.searchPerson;
        let isCpfOrCnpj = "CNPJ";
        let rows = this.state.rows;
        return (
            <div>
                <a name={"Consultas por Segmento"+index}></a>
                <a name={"Consultas"+index}></a>
                {consultas.consultasAnteriores && rows.length > 0 ?
                    <Panel title={title} qtdTotal={[{icon:"fa fa-search", qtd:rows.length}]}>
                        <Col md={12}>
                            <Table fields={fields} handleSortElements={this.handleSortElements}>
                                <tbody>
                                    {rows.map((consulta,index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {consulta.documento ?
                                                        <MyButton
                                                            tooltip={TOOLTIP_SEARCH_BY_DOCUMENT}
                                                            onClickButton={handleSearchPerson}
                                                            params={[consulta.documento, isCpfOrCnpj]}
                                                            label={soc.nome}
                                                        />
                                                    : ""}
                                                    {consulta.consultante}
                                                </td>
                                                <td>{consulta.data}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </Table>

                        </Col>
                        <Tooltip id="tooltipConsultar">
                            <span>Consultar</span>
                        </Tooltip>
                    </Panel>
                :
                <Panel title={title}>
                    <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                </Panel>}
            </div>
        )
    }
}