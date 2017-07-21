import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Button, Col } from "react-bootstrap";

import Modal from "../Modal";
import Panel from "../panel/Panel";
import Table from "../table/MyTable";
import Endereco from "../endereco/layoutEndereco";
import Telefone from "../telefone/layoutTelefone";
import MyButton from "../button/MyButton";

import {
    NENHUM_REGISTRO,
    TOOLTIP_SEARCH_BY_ADDRESS_MESSAGE,
    TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE,
    TOOLTIP_SEARCH_BY_PHONE_MESSAGE,
    TOOLTIP_SEARCH_BY_ADDRESS_IN_BATCH_MESSAGE,
    TOOLTIP_SEARCH_BY_PHONES_IN_BATCH_MESSAGE
} from "../../constants/utils";

const title = "RESULTADOS";

export default class BuscaPorRelacionados extends Component {
    state = {
        buttonsClicked: {
            phone: {},
            home: {}
        },
        relacionados: this.props.relacionados,
        orderByGreater: true,
        IsModalOpen: false,
        rows: this.props.relacionados ? this.props.relacionados : []
    }

    confirmMessage = (consultas) => {
        return (
            <Col md={12} className="text-center">
                Atenção! Ao realizar esta ação você estará realizando {consultas.length} consultas Localize. Você confirma esta ação?
                <Col md={12}>
                    <Button
                        bsSize="small"
                        bsStyle="danger"
                        style={{marginRight:15}}
                        onClick={this.closeModal} >
                        Não
                    </Button>
                    {" "}
                    <Button
                        bsSize="small"
                        bsStyle="info"
                        onClick={this.searchAll} >
                        Sim
                    </Button>
                </Col>
            </Col>
        )
    }

    confirmSearch = (tipo, data, icon) => {
        this.setState({
            IsModalOpen: true,
            tipo: tipo,
            data: data,
            icon: icon
        })
    }

    closeModal = () => {
        this.setState({
            IsModalOpen: false
        })
    }

    handleSortElements = (sortColumn, sortDirection='ASC') => {
        const comparer = (a, b) => {
            if (sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            } else if (sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        }
 
        const rows = sortDirection === 'NONE' ? this.state.rows.slice(0) : this.state.rows.sort(comparer);

        this.setState({ rows });
    }

    renderButtons = (items, isEnderecoOrTelefone, indexArrayElements, documento, icon, isCpfOrCnpj) => {
        return (
            <MyButton
                tooltip={icon == "phone" ? TOOLTIP_SEARCH_BY_PHONE_MESSAGE : TOOLTIP_SEARCH_BY_ADDRESS_MESSAGE}
                onClickButton={items ? this.showMoreItems :  this.search}
                params={items ? [indexArrayElements, icon] : [isEnderecoOrTelefone, indexArrayElements, documento, icon, isCpfOrCnpj]}
                myButtonStyle={this.state.buttonsClicked[icon][indexArrayElements] ? "danger" : "info"}
                myButtonText={items ?
                        this.state.buttonsClicked[icon][indexArrayElements] ?
                            <i className='fa fa-times'/>
                        : <i className='fa fa-eye'/>
                    :   <i className={'fa fa-'+icon} /> }
            />
        )
    }

    search = (isEnderecoOrTelefone, indexArrayElements, documento, icon, isCpfOrCnpj) => {
        let buttonsClickedNew = Object.assign({},this.state.buttonsClicked);
        buttonsClickedNew[icon][indexArrayElements] = buttonsClickedNew[icon][indexArrayElements] ? !buttonsClickedNew[icon][indexArrayElements] : true;

        this.setState({
            buttonsClicked: buttonsClickedNew
        })

        this.props.searchEnderecosTelefonesResultadosBusca(isCpfOrCnpj, this.props.indexLabel, indexArrayElements, isEnderecoOrTelefone, documento);
    }

    searchAll = () => {
        this.closeModal();
        
        for(let i=0; i<this.state.data.length; i++) {
            let isCpfOrCnpj = this.state.data[i].tipo == "Pessoa Física" ? "CPF":"CNPJ";
            this.search(this.state.tipo, i, this.state.data[i].documento, this.state.icon, isCpfOrCnpj);
        }
    }

    showMoreItems = (index, tipo) => {
        let buttonsClickedNew = Object.assign({},this.state.buttonsClicked);
        /*exemplo: buttonsClickedNew.phones[1234] = false*/
        buttonsClickedNew[tipo][index] = !buttonsClickedNew[tipo][index];
        
        this.setState({
            buttonsClicked: buttonsClickedNew
        })
    }

    render() {
        let rows = this.state.rows;
        let handleSearchPerson = this.props.searchPerson;
        let handleSortElements = this.handleSortElements;
        let fields= [
            {id:"tipo", name:"Tipo"},
            {id:"nome", name:"Nome", sortable:true},
            {id:"dataNascimento", name:"Nasc.", sortable:true},
            {id:"pessoaRelacionada", name:"Pessoa Relacionada", sortable:true},
            {id:"cidade", name:"Cidade - UF", sortable:true},
            {id:"btn", name:"#"}
        ];
        return (
                <Panel title={title}>
                    <div style={{paddingTop:5}}>
                        <Col md={6}>
                            <strong>Resultados da busca por:</strong>
                            {this.props.headerBody}
                        </Col>

                        {/*rows.length > 0 ?
                            <Col md={6}>
                                <strong>Busca em lote por:</strong>
                                {" "}
                                <MyButton
                                    tooltip={TOOLTIP_SEARCH_BY_ADDRESS_IN_BATCH_MESSAGE}
                                    onClickButton={this.confirmSearch}
                                    params={["enderecos", rows, "home"]}
                                    myButtonText={<i className='fa fa-home'/>}
                                />
                                <span style={{paddingRight:15}}></span>
                                <MyButton
                                    tooltip={TOOLTIP_SEARCH_BY_PHONES_IN_BATCH_MESSAGE}
                                    onClickButton={this.confirmSearch}
                                    params={["telefones", rows, "phone"]}
                                    myButtonText={<i className='fa fa-phone'/>}
                                />
                            </Col>
                        : ""*/}
                    </div>

                    <Col md={12}>
                        {rows.length > 0 ?
                            <Table fields = {fields} handleSortElements={this.handleSortElements}>
                                    {rows.map((relacionado,index) => {
                                        let isCpfOrCnpj = relacionado.tipo == "Pessoa Física" ? "CPF":"CNPJ";
                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    <td>
                                                        {isCpfOrCnpj}
                                                    </td>

                                                    <td>
                                                        <MyButton
                                                            tooltip={TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE}
                                                            onClickButton={handleSearchPerson}
                                                            params={[relacionado.documento, isCpfOrCnpj]}
                                                            label={relacionado.nome}
                                                        />
                                                    </td>
                                                    <td>{relacionado.dataNascimento}</td>
                                                    <td>{relacionado.pessoaRelacionada}</td>
                                                    <td>{relacionado.cidade && relacionado.uf ? relacionado.cidade + " - " + relacionado.uf : relacionado.cidade ? relacionado.cidade : NENHUM_REGISTRO}</td>
                                                    <td>
                                                        {this.renderButtons(relacionado.enderecos, "enderecos", index, relacionado.documento, "home", isCpfOrCnpj)}
                                                        <span style={{paddingRight:15}}></span>
                                                        {this.renderButtons(relacionado.telefones, "telefones", index, relacionado.documento, "phone", isCpfOrCnpj)}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    {relacionado.enderecos && this.state.buttonsClicked.home[index] ?
                                                        <td colSpan={7}>
                                                            <Endereco enderecos={relacionado.enderecos} />
                                                        </td>
                                                    : ""}
                                                </tr>
                                                
                                                <tr>
                                                    {relacionado.telefones && this.state.buttonsClicked.phone[index]?
                                                        <td colSpan={7} style={{padding:0}}>
                                                            <Telefone fixos={relacionado.telefones.fixos} moveis={relacionado.telefones.moveis} />
                                                        </td>
                                                    : ""}
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                            </Table>
                        :
                            <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                        }
                    </Col>

                    <Modal
                        IsModalOpen={this.state.IsModalOpen}
                        closeModal={this.closeModal}
                        title="Busca em lote"
                        size="small"
                    >
                        {this.confirmMessage(rows)}
                    </Modal>
                </Panel>
        )
    }
}