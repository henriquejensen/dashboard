import "./PessoasRelacionadas.css"

import React, { Component } from "react";
import { Col } from "react-bootstrap";

import TelefoneLayout from "../telefone/layoutTelefone";
import EnderecoLayout from "../endereco/layoutEndereco";
import Panel from "../panel/Panel";
import Table from "../table/MyTable";
import MyButton from "../button/MyButton";

import {
    TOOLTIP_SEARCH_BY_ADDRESS_MESSAGE,
    TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE,
    TOOLTIP_SEARCH_BY_PHONE_MESSAGE
} from "../../constants/utils";

export default class PessoasRelacionadas extends Component {
    state = {
        showMessageSeeMore: true,
        phone: true,
        map: true,
        buttonsClicked: {
            phone: {},
            home: {}
        },
        rows: this.props.relacionados ? this.props.relacionados : []
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

    search = (docPessoa, docPesquisa, icon, isCpfOrCnpj) => {
        let buttonsClickedNew = Object.assign({},this.state.buttonsClicked);
        buttonsClickedNew[icon][docPesquisa] = buttonsClickedNew[icon][docPesquisa] ? !buttonsClickedNew[icon][docPesquisa] : true;

        this.setState({
            buttonsClicked: buttonsClickedNew
        })

        if(icon == "phone")
            this.props.searchTelefonesPessoaRelacionada(docPessoa, docPesquisa, isCpfOrCnpj);
        else
            this.props.searchEnderecosPessoaRelacionada(docPessoa, docPesquisa, isCpfOrCnpj);
        
    }

    renderButtons = (items, relacao, pos, documento, icon, isCpfOrCnpj) => {
        return (
            <MyButton
                tooltip={icon == "phone" ? TOOLTIP_SEARCH_BY_PHONE_MESSAGE : TOOLTIP_SEARCH_BY_ADDRESS_MESSAGE}
                onClickButton={items ? this.showMoreItems :  this.search}
                params={items ? [documento, icon] : [this.props.label, documento, icon, isCpfOrCnpj]}
                myButtonStyle={this.state.buttonsClicked[icon][documento] ? "danger" : "info"}
                myButtonText={items ?
                        this.state.buttonsClicked[icon][documento] ?
                            <i className='fa fa-times'/>
                        : <i className='fa fa-eye'/>
                    :   <i className={'fa fa-'+icon} /> }
            />
        )
    }

    renderFooterPanel = () => {
        return (
            <MyButton
                tooltip="VER MAIS PESSOAS RELACIONADAS"
                onClickButton={this.searchPessoasRelacionadas}
                params={[this.props.documento, this.props.label]}
                myButtonClass="my-button-pessoas-relacionadas color-payement"
                //myButtonStyle={this.state.buttonsClicked[icon][documento] ? "danger" : "info"}
                myButtonText="Ver mais pessoas relacionadas"
            />
        )
    }

    render() {
        let handleSearchPerson = this.props.searchPerson;
        let title = "PESSOAS RELACIONADAS";
        let fields= [
            {id:"relacao", name:"Relação"},
            {id:"nome", name:"Nome"},
            {id:"btn", name:"#"}
        ];
        let rows = this.props.relacionados;
        return (
            <Panel
                title={title}
                footerStyle={{textAlign:"right"}}
                footer={this.state.showMessageSeeMore ? this.renderFooterPanel() : ""}
                >
                <Col md={12}>
                    <Table fields= {fields} handleSortElements={this.handleSortElements} >
                        {rows.map((pessoa, index) => {
                            let isCpfOrCnpj = pessoa.documento ? pessoa.documento.length > 11 ? "CNPJ" : "CPF" : "";
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>
                                            {isCpfOrCnpj + " --- " + pessoa.relacao }
                                        </td>
                                        <td>                                            
                                            {pessoa.documento ?
                                                <MyButton
                                                    tooltip={TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE}
                                                    onClickButton={handleSearchPerson}
                                                    params={[pessoa.documento, isCpfOrCnpj]}
                                                    label={pessoa.nome}
                                                />
                                            : pessoa.nome}
                                        </td>
                                        {pessoa.documento ?
                                            <td>
                                                {this.renderButtons(pessoa.telefones, pessoa.relacao, index, pessoa.documento, "phone", isCpfOrCnpj)}
                                                <span style={{paddingRight:15}}></span>
                                                {this.renderButtons(pessoa.enderecos, pessoa.relacao, index, pessoa.documento, "home", isCpfOrCnpj)}
                                            </td>
                                        : ""}
                                    </tr>
                                    
                                    <tr>
                                        {pessoa.enderecos && this.state.buttonsClicked.home[pessoa.documento] ? 
                                            <td colSpan={3}>
                                                <Col md={12}>
                                                    <EnderecoLayout enderecos={pessoa.enderecos} />
                                                </Col>
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
                </Col>
            </Panel>
        )
    }
}