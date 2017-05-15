import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Button, Col } from "react-bootstrap";

import Modal from "../Modal";
import Panel from "../panel/Panel";
import Table from "../table/Table";
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
        IsModalOpen: false
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
        let relacionados = this.props.relacionados ? this.props.relacionados : [];
        let handleSearchPerson = this.props.searchPerson;
        let fields = ["Tipo", "Nome", "Data nasc.", "Pessoa Relacionada", "Cidade", "UF", ""];
        return (
                <Panel title={title} qtdTotal={[{qtd:relacionados.length,icon:"fa fa-users"}]}>
                    <div style={{paddingTop:5}}>
                        <Col md={6}>
                            <strong>Resultados da busca por:</strong>
                            {this.props.headerBody}
                        </Col>

                        {relacionados.length > 0 ?
                            <Col md={6}>
                                <strong>Busca em lote por:</strong>
                                {" "}
                                <MyButton
                                    tooltip={TOOLTIP_SEARCH_BY_ADDRESS_IN_BATCH_MESSAGE}
                                    onClickButton={this.confirmSearch}
                                    params={["enderecos", relacionados, "home"]}
                                    myButtonText={<i className='fa fa-home'/>}
                                />
                                <span style={{paddingRight:15}}></span>
                                <MyButton
                                    tooltip={TOOLTIP_SEARCH_BY_PHONES_IN_BATCH_MESSAGE}
                                    onClickButton={this.confirmSearch}
                                    params={["telefones", relacionados, "phone"]}
                                    myButtonText={<i className='fa fa-phone'/>}
                                />
                            </Col>
                        : ""}
                    </div>

                    <Col md={12}>
                        {relacionados.length > 0 ?
                            <Table fields = {fields}>
                                    {relacionados.map((relacionado,index) => {
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
                                                    <td>{relacionado.cidade}</td>
                                                    <td>{relacionado.uf}</td>
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
                        {this.confirmMessage(relacionados)}
                    </Modal>
                </Panel>
        )
    }
}