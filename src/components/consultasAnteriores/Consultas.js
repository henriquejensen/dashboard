import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Col, Button } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";
import MyButton from "../button/MyButton";

import { NENHUM_REGISTRO, TOOLTIP_SEARCH_BY_DOCUMENT } from "../../constants/utils";

const title = "CONSULTAS";

export default class Consultas extends Component {
    render() {
        let consultas = this.props.consultas;
        let index = this.props.index;
        let fields = ["Nome do Associado", "Data da Consulta"];
        let handleSearchPerson = this.props.searchPerson;
        let isCpfOrCnpj = "CNPJ";
        return (
            <div>
                <a name={"Consultas por Segmento"+index}></a>
                <a name={"Consultas"+index}></a>
                {consultas && consultas.consultasAnteriores && consultas.consultasAnteriores.length > 0 ?
                    <Panel title={title} qtdTotal={[{icon:"fa fa-search", qtd:consultas.consultasAnteriores.length}]}>
                        <Col md={12}>
                            <Table fields={fields}>
                                <tbody>
                                    {consultas.consultasAnteriores.map((consulta,index) => {
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