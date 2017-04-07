import React,  { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { formatDate, formatCurrency } from "../utils/functions/patternDocuments";

import { NENHUM_REGISTRO } from "../../constants/utils";

export default class CadastroCnpjCnaesSecundarias extends Component {
    render() {
        return (
            this.props.cnpjCnaesSecundarias && this.props.cnpjCnaesSecundarias.length > 0 ?
                <Panel title="CNPJ OU CNAES SECUNDÁRIAS" qtdTotal={[{icon:"fa fa-building-o", qtd:this.props.cnpjCnaesSecundarias.length}]} showPanel={false}>
                    <Col md={12} sm={12}>            
                        <Table
                            fields={
                                ["CNAE", "Descrição", "Grupo"]
                            }
                        >
                            <tbody>
                                {this.props.cnpjCnaesSecundarias.map((cnpjCnaeSecundaria, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{cnpjCnaeSecundaria.cnae}</td>
                                            <td>{cnpjCnaeSecundaria.descricao}</td>
                                            <td>{cnpjCnaeSecundaria.grupo}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Panel>
            :
                <Panel title="CNPJ OU CNAES SECUNDÁRIAS">
                    <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                </Panel>
        )
    }
}