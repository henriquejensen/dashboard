import React, { Component } from "react";

import TelefoneLayout from "../../components/telefone/layoutTelefone";
import Panel from "../../components/Panel";
import Table from "../../components/Table";

export default class Relacionados extends Component {
    state = {
        showRelacionados: [],
    }

    showRelacionados = (doc) => {
        let newRelacionados = this.state.showRelacionados.concat();

        if(newRelacionados.includes(doc)) {
            newRelacionados.pop(doc);
        } else {
            newRelacionados.push(doc);
        }
        this.setState({
            showRelacionados: newRelacionados
        })
    }

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
                                                {pessoa.telefones.fixos.length == 0 ?
                                                    <a onClick={() => this.props.showTelefonesRelacionados(this.props.documento, pessoa.documento)}>Pesquisar Telefones</a>
                                                : this.state.showRelacionados.includes(pessoa.documento) ?
                                                    <i className="fa fa-caret-up" onClick={() => this.showRelacionados(pessoa.documento)}>Ocultar</i>
                                                    : <i className="fa fa-caret-down" onClick={() => this.showRelacionados(pessoa.documento)}>Mostrar</i>
                                                }
                                            </td>
                                        </tr>
                                        
                                        <tr >
                                            {pessoa.telefones.fixos.length > 0 && this.state.showRelacionados.includes(pessoa.documento) ?
                                                <td colSpan={7} style={{padding:"5px 0"}}>
                                                    <TelefoneLayout fixos = {pessoa.telefones.fixos} moveis = {pessoa.telefones.moveis} />
                                                </td>
                                            : ""}
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