import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";

import TelefoneLayout from "../telefone/layoutTelefone";
import EnderecoLayout from "../endereco/layoutEndereco";
import Panel from "../panel/Panel";
import Table from "../table/Table";

import {
    TOOLTIP_SEARCH_BY_ADDRESS,
    TOOLTIP_SEARCH_BY_ADDRESS_MESSAGE,
    TOOLTIP_SEARCH_BY_DOCUMENT,
    TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE,
    TOOLTIP_SEARCH_BY_PHONE,
    TOOLTIP_SEARCH_BY_PHONE_MESSAGE
} from "../../constants/utils";

export default class Relacionados extends Component {
    state = {
        showMessageSeeMore: true,
        phone: true,
        map: true,
        buttonsClicked: {
            phone: {},
            home: {}
        }
    }

    searchPessoasRelacionadas = (doc, label) => {
        this.setState({
            showMessageSeeMore: false
        })

        this.props.searchPessoasRelacionadas(doc, label);
    }

    showMoreItems = (doc, tipo) => {
        let buttonsClickedNew = Object.assign({},this.state.buttonsClicked);
        /*exemplo: buttonsClickedNew.phones[1234] = false*/
        buttonsClickedNew[tipo][doc] = !buttonsClickedNew[tipo][doc];
        
        this.setState({
            buttonsClicked: buttonsClickedNew
        })
    }

    search = (docPessoa, docPesquisa, icon) => {
        let buttonsClickedNew = Object.assign({},this.state.buttonsClicked);
        buttonsClickedNew[icon][docPesquisa] = buttonsClickedNew[icon][docPesquisa] ? !buttonsClickedNew[icon][docPesquisa] : true;

        this.setState({
            buttonsClicked: buttonsClickedNew
        })

        if(icon == "phone")
            this.props.searchTelefonesPessoaRelacionada(docPessoa, docPesquisa);
        else
            this.props.searchEnderecosPessoaRelacionada(docPessoa, docPesquisa);
        
    }

    renderButtons = (items, relacao, pos, documento, icon) => {
        return (
            <a data-tip data-for={icon == "phone" ? TOOLTIP_SEARCH_BY_PHONE : TOOLTIP_SEARCH_BY_ADDRESS}>
                <Button
                    bsSize="small"
                    bsStyle={this.state.buttonsClicked[icon][documento] ? "danger" : "info"}
                    className="my-button"
                    onClick={items ? () => this.showMoreItems(documento, icon) : () => this.search(this.props.documento, documento, icon)} >
                    {items ?
                        this.state.buttonsClicked[icon][documento] ?
                            <i className='fa fa-times'/>
                        : <i className='fa fa-eye'/>
                    :   <i className={'fa fa-'+icon} /> }
                </Button>
            </a>
        )
    }

    render() {
        let documento = this.props.documento;
        let label = this.props.label;
        return (
            <Panel
                title="PESSOAS RELACIONADAS"
                qtdTotal={[{qtd:this.props.relacionados.length,icon:"fa fa-users"}]}>
                <Col md={12}>
                    <Table fields= {["Relação", "Nome", ""]} >
                        {this.props.relacionados.map((pessoa, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>
                                            {pessoa.relacao}
                                        </td>
                                        <td>                                            
                                            {pessoa.documento ? 
                                                <a data-tip data-for='tooltipConsultar'>
                                                    <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(pessoa.documento, pessoa.documento.length > 11 ? "CNPJ" : "CPF")}>
                                                        <i className='fa fa-search'/>
                                                    </Button>
                                                </a>
                                            : ""}
                                            {pessoa.nome}
                                        </td>
                                        <td>
                                            {this.renderButtons(pessoa.telefones, pessoa.relacao, index, pessoa.documento, "phone")}
                                            {' '}
                                            {this.renderButtons(pessoa.enderecos, pessoa.relacao, index, pessoa.documento, "home")}
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        {pessoa.enderecos && this.state.buttonsClicked.home[pessoa.documento] ? 
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
                            <a onClick={() => this.searchPessoasRelacionadas(documento, label)} className="moreInfo pull-right">
                                Ver mais pessoas relacionadas
                            </a>
                        </Col>
                    : ""}

                </Col>
            </Panel>
        )
    }
}