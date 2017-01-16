import React, { Component } from "react";

import TelefoneLayout from "../../components/telefone/layoutTelefone";
import EnderecoLayout from "../../components/endereco/layoutEndereco";
import Panel from "../../components/Panel";
import Table from "../../components/Table";

export default class Relacionados extends Component {
    state = {
        showRelacionados: {
            telefones: [],
            enderecos: []
        }
    }

    showRelacionados = (doc, tipo) => {
        let newRelacionados;
        if(tipo == "telefone") {
            newRelacionados = this.state.showRelacionados.telefones.concat();
        } else if (tipo == "endereco") {
            newRelacionados = this.state.showRelacionados.enderecos.concat();
        }

        if(newRelacionados.includes(doc)) {
            newRelacionados.pop(doc);
        } else {
            newRelacionados.push(doc);
        }

        if(tipo == "telefone") {
            this.setState({
                showRelacionados: {
                    telefones: newRelacionados,
                    enderecos: this.state.showRelacionados.enderecos
                }
            })
        } else if (tipo == "endereco") {
            this.setState({
                showRelacionados: {
                    telefones: this.state.showRelacionados.telefones,
                    enderecos: newRelacionados
                }
            })
        }
    }

    render() {
        return (
            <Panel title={this.props.title} qtdTotal={[{qtd:this.props.relacionados.length,icon:"fa fa-users"}]}>
                <div className="col-md-12">
                    <Table 
                        fields= {["", "Relação", "Nome", "Data nasc", "Cidade", "UF", "Ação"]}
                    >
                            {console.log("RELACIONADOS", this.props.relacionados)}
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
                                                {this.props.tipo == "telefone" ?
                                                    pessoa.telefones ?
                                                        (this.state.showRelacionados.telefones.includes(pessoa.documento) ?
                                                            <i className="fa fa-caret-up" onClick={() => this.showRelacionados(pessoa.documento, this.props.tipo)}>Ocultar</i>
                                                        : <i className="fa fa-caret-down" onClick={() => this.showRelacionados(pessoa.documento, this.props.tipo)}>Mostrar</i>)
                                                    : <a onClick={() => this.props.searchRelacionados(this.props.documento, pessoa.documento, this.props.tipo)}>Pesquisar {this.props.tipo + "s"}</a>
                                                : this.props.tipo == "endereco" ?
                                                    pessoa.enderecos ?
                                                        (this.state.showRelacionados.enderecos.includes(pessoa.documento) ?
                                                            <i className="fa fa-caret-up" onClick={() => this.showRelacionados(pessoa.documento, this.props.tipo)}>Ocultar</i>
                                                        : <i className="fa fa-caret-down" onClick={() => this.showRelacionados(pessoa.documento, this.props.tipo)}>Mostrar</i>)
                                                    : <a onClick={() => this.props.searchRelacionados(this.props.documento, pessoa.documento, this.props.tipo)}>Pesquisar {this.props.tipo + "s"}</a>
                                                : ""}
                                            </td>
                                        </tr>
                                        
                                        <tr >
                                            {this.props.tipo == "telefone" ?
                                                pessoa.telefones && pessoa.telefones.fixos.length > 0 && this.state.showRelacionados.telefones.includes(pessoa.documento) ?
                                                    <td colSpan={7} style={{padding:"5px 0"}}>
                                                        <TelefoneLayout fixos = {pessoa.telefones.fixos} moveis = {pessoa.telefones.moveis} />
                                                    </td>
                                                : ""
                                            : this.props.tipo == "endereco" ?
                                                pessoa.enderecos && pessoa.enderecos.length > 0 && this.state.showRelacionados.enderecos.includes(pessoa.documento) ?
                                                    <td colSpan={7} style={{padding:"5px 0"}}>
                                                        <EnderecoLayout enderecos = {pessoa.enderecos} />
                                                    </td>
                                                : ""
                                            : ""
                                            }
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