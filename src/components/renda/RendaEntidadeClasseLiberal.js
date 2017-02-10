import React,  { Component } from "react";

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class RendaEntidadeClasseLiberal extends Component {
    render() {
        return (
            this.props.renda ?
                <Panel title="RENDA ENTIDADE CLASSE LIBERAL">
                    <div className="col-md-12 col-sm-12">            
                        <Table
                            fields={
                                ["Associação", "Profissão", "Renda Média", "Renda Mínima", "Identidade Profisional"]
                            }
                        >
                            <tbody>
                                <tr>
                                    <td>{this.props.renda.associacao}</td>
                                    <td>{this.props.renda.profissao}</td>
                                    <td>{this.props.renda.rendaMedia}</td>
                                    <td>{this.props.renda.rendaMinima}</td>
                                    <td>{this.props.renda.identidadeProfissional}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Panel>
            :
                <Panel title="RENDA ENTIDADE CLASSE LIBERAL">
                    <div className="text-center"><strong>Nada consta</strong></div>
                </Panel>
        )
    }
}