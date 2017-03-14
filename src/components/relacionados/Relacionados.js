import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";

import TelefoneLayout from "../telefone/layoutTelefone";
import EnderecoLayout from "../endereco/layoutEndereco";
import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class Relacionados extends Component {
    state = {
        showMessageSeeMore: true,
        phone: true,
        map: true,
        buttonsClicked: {
            phone: {},
            map: {}
        }
    }

    searchPessoasRelacionadas = (doc) => {
        this.setState({
            showMessageSeeMore: false
        })

        this.props.searchPessoasRelacionadas(doc);
    }

    showMoreItems = (doc, tipo) => {
        let buttonsClickedNew = Object.assign({},this.state.buttonsClicked);
        /*exemplo: buttonsClickedNew.phones[1234] = false*/
        buttonsClickedNew[tipo][doc] = buttonsClickedNew[tipo][doc] ? !buttonsClickedNew[tipo][doc] : true;
        
        this.setState({
            buttonsClicked: buttonsClickedNew
        })
    }

    search = (docPessoa, docPesquisa, icon) => {
        if(icon == "phone")
            this.props.searchTelefonesPessoaRelacionada(docPessoa, docPesquisa);
        else
            this.props.searchEnderecosPessoaRelacionada(docPessoa, docPesquisa);
        
    }

    renderButtons = (items, relacao, pos, documento, icon) => {
        return (
            <a data-tip data-for='tooltipConsultar'>
                <Button
                    bsSize="small"
                    bsStyle={items ? "danger" : "info"}
                    className="my-button"
                    onClick={relacao == "MAE" ? ()=> {} : items ? () => this.showMoreItems(documento, icon) : () => this.search(this.props.documento, documento, icon)} >
                    {items ?
                        <i className='fa fa-times'/>
                    :   <i className={'fa fa-'+icon}/> }
                </Button>
            </a>
        )
    }

    render() {
        return (
            <Panel
                title="PESSOAS RELACIONADAS"
                qtdTotal={[{qtd:this.props.relacionados.length,icon:"fa fa-users"}]}>
                <div className="col-md-12">
                    <Table fields= {["Relação", "Nome", ""]} >
                        {this.props.relacionados.reverse().map((pessoa, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>
                                            {pessoa.relacao}
                                        </td>
                                        <td>
                                            {pessoa.nome}
                                            {pessoa.documento ? 
                                                <a data-tip data-for='tooltipConsultar'>
                                                    <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(pessoa.documento, "pf")}>
                                                        <i className='fa fa-search'/>
                                                    </Button>
                                                </a>
                                            : ""}
                                        </td>
                                        <td>
                                            {this.renderButtons(pessoa.telefones, pessoa.relacao, index, pessoa.documento, "phone")}
                                            {' '}
                                            {this.renderButtons(pessoa.enderecos, pessoa.relacao, index, pessoa.documento, "map")}
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        {pessoa.enderecos && this.state.buttonsClicked.map[pessoa.documento] ? 
                                            <td colSpan={3}>
                                                <EnderecoLayout enderecos={pessoa.enderecos} />
                                            </td>
                                        : ""}
                                    </tr>
                                    <tr>
                                        {pessoa.telefones && this.state.buttonsClicked.phone[pessoa.documento] ? 
                                            <td colSpan={3}>
                                                <TelefoneLayout fixos={pessoa.telefones.fixos} moveis={pessoa.telefones.moveis} />
                                            </td>
                                        : ""}
                                    </tr>
                                </tbody>
                            )
                        })}
                    </Table>

                    {this.state.showMessageSeeMore ?
                        <Col md={12}>
                            <a onClick={() => this.searchPessoasRelacionadas(this.props.documento)} className="moreInfo pull-right">
                                Ver mais pessoas relacionadas
                            </a>
                        </Col>
                    : ""}
                    
                </div>
            </Panel>
        )
    }
}