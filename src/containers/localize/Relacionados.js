import React, { Component } from "react";

import TelefoneLayout from "./TelefoneLayout";
import Panel from "../../components/Panel";
import Table from "../../components/Table";

export default class Relacionados extends Component {
    render() {
        return (
            <Panel title={this.props.title} qtdTotal={[{qtd:this.props.relacionados.length,icon:"fa fa-users"}]}>
                <div className="col-md-12">
                    <Table 
                        fields= {["", "Relação", "Nome", "Data nasc", "Cidade", "UF", "Ação"]}
                    >
                            {this.props.relacionados.map((pessoa, index) => {
                                return (
                                    <tbody key={index}>
                                        <tr>
                                            <td>
                                                <div className="mapa-button" onClick={() => this.props.searchLocalize(pessoa.documento, "pf")}>
                                                    <i className='fa fa-search'/>
                                                </div>
                                            </td>
                                            <td>
                                                {pessoa.relacao}
                                            </td>
                                            <td>{pessoa.nome}</td>
                                            <td>{pessoa.dataNasc}</td>
                                            <td>{pessoa.cidade}</td>
                                            <td>{pessoa.uf}</td>
                                            <td>
                                                <a onClick={() => this.props.showTelefonesRelacionados(this.props.documento, pessoa.documento)}>Pesquisar Telefones</a>
                                            </td>
                                        </tr>
                                        
                                        <tr >
                                            <td colSpan={7} style={{padding:"5px 0"}}>
                                                {pessoa.telefones.fixos.length > 0 ? 
                                                    <TelefoneLayout fixos = {pessoa.telefones.fixos} moveis = {pessoa.telefones.moveis} />
                                                : ""}
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                    </Table>
                    
                </div>
            </Panel>
        )
    }
}