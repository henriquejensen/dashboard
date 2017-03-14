import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Button } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

export default class BuscaPorRelacionados extends Component {
    render() {
        return (
            this.props.relacionados ? 
                <Panel title="RESULTADOS DA BUSCA" qtdTotal={[{qtd:this.props.relacionados.length,icon:"fa fa-users"}]}>
                    <Table 
                        fields = {[
                            "Nome", "Data nasc.", "Pessoa Relacionada", "Cidade", "UF"]}
                    >
                        <tbody>
                            {this.props.relacionados.map((relacionado,index) => {
                                let tipo = relacionado.tipo == "Pessoa Física" ? "pf":"pj";
                                return (
                                    <tr key={index}>
                                        <td>
                                            {relacionado.nome}
                                            <a data-tip data-for='tooltipConsultar'>
                                                <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(relacionado.documento, tipo)}>
                                                    <i className='fa fa-search'/>
                                                </Button>
                                            </a>
                                        </td>
                                        <td>{relacionado.dataNascimento}</td>
                                        <td>{relacionado.pessoaRelacionada}</td>
                                        <td>{relacionado.cidade}</td>
                                        <td>{relacionado.uf}</td>
                                    </tr>
                                )
                            })}
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