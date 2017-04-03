import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Button, Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

export default class BuscaPorRelacionados extends Component {
    state = {
        relacionados: this.props.relacionados,
        orderByGreater: true
    }

    orderName(list) {

    }

    orderTableBy = (key) => {
        let newRelacionados = this.state.relacionados.concat();

        let posFieldClicked = key == "Pessoa Relacionada" ? "pessoaRelacionada" : key == "Data nasc." ? "dataNascimento" : key.toLocaleLowerCase() ;
        let order = this.state.orderByGreater;

        newRelacionados.sort(
            function(x,z){
                return x[posFieldClicked] > z[posFieldClicked]
            }
        )

        this.setState({
            relacionados: newRelacionados,
            orderByGreater: !this.state.orderByGreater
        })
    }

    render() {
        return (
            this.props.relacionados ?
                <Panel title="RESULTADOS" qtdTotal={[{qtd:this.state.relacionados.length,icon:"fa fa-users"}]}>
                    {this.props.headerBody ? 
                        <div style={{paddingLeft:16, paddingTop:5}}><strong>Resultados da busca por:</strong> {this.props.headerBody}</div>
                    : ""}

                    <Table fields = {["Nome", "Data nasc.", "Pessoa Relacionada", "Cidade", "UF"]} orderTableBy={this.orderTableBy}>
                        <tbody>
                            {this.state.relacionados.length > 0 ?
                                this.state.relacionados.map((relacionado,index) => {
                                    let tipo = relacionado.tipo == "Pessoa Física" ? "CPF":"CNPJ";
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <a data-tip data-for='tooltipConsultar'>
                                                    <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(relacionado.documento, tipo)}>
                                                        <i className='fa fa-search'/>
                                                    </Button>
                                                </a>
                                                {relacionado.nome}
                                            </td>
                                            <td>{relacionado.dataNascimento}</td>
                                            <td>{relacionado.pessoaRelacionada}</td>
                                            <td>{relacionado.cidade}</td>
                                            <td>{relacionado.uf}</td>
                                        </tr>
                                    )
                                })
                            : 
                            <tr>
                                <td colSpan={8} className="text-center">
                                    <strong>{NENHUM_REGISTRO}</strong>
                                </td>
                            </tr>}
                        </tbody>
                    </Table>

                <Tooltip id="tooltipConsultar">
                    <span>Consultar</span>
                </Tooltip>
                </Panel>
            :   <Panel title="RESULTADOS DA BUSCA">
                    <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                </Panel>
        )
    }
}