import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";

import Panel from "./panel/Panel";
import Table from "./table/Table";

import Telefone from "./telefone/layoutTelefone";
import Endereco from "./endereco/layoutEndereco";

import Modal from "./Modal";
import MyButton from "./button/MyButton";

import {
    NENHUM_REGISTRO,
    TOOLTIP_SEARCH_BY_ADDRESS_MESSAGE,
    TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE,
    TOOLTIP_SEARCH_BY_PHONE_MESSAGE,
    TOOLTIP_SEARCH_BY_ADDRESS_IN_BATCH_MESSAGE,
    TOOLTIP_SEARCH_BY_PHONES_IN_BATCH_MESSAGE
} from "../constants/utils";

import { patternCNPJ, patternCPF } from "./utils/functions/patternDocuments";

const title = "ÚLTIMAS CONSULTAS";

export default class UltimasConsultas extends Component {
    state = {
        buttonsClicked: {
            phone: {},
            home: {}
        },
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

    showMoreItems = (index, tipo) => {
        let buttonsClickedNew = Object.assign({},this.state.buttonsClicked);
        /*exemplo: buttonsClickedNew.phones[1234] = false*/
        buttonsClickedNew[tipo][index] = !buttonsClickedNew[tipo][index];
        
        this.setState({
            buttonsClicked: buttonsClickedNew
        })
    }

    search = (tipo, index, documento, icon) => {
        let buttonsClickedNew = Object.assign({},this.state.buttonsClicked);
        buttonsClickedNew[icon][index] = buttonsClickedNew[icon][index] ? !buttonsClickedNew[icon][index] : true;

        this.setState({
            buttonsClicked: buttonsClickedNew
        })

        this.props.searchEnderecosTelefonesUltimasConsultas(tipo, this.props.type, index, documento);
        
    }

    renderButtons = (items, tipo, index, documento, icon) => {
        return (
            <MyButton
                tooltip={icon == "phone" ? TOOLTIP_SEARCH_BY_PHONE_MESSAGE : TOOLTIP_SEARCH_BY_ADDRESS_MESSAGE}
                onClickButton={items ? this.showMoreItems :  this.search}
                params={items ? [index, icon] : [tipo, index, documento, icon]}
                myButtonStyle={this.state.buttonsClicked[icon][index] ? "danger" : "info"}
                myButtonText={items ?
                        this.state.buttonsClicked[icon][index] ?
                            <i className='fa fa-times'/>
                        : <i className='fa fa-eye'/>
                    :   <i className={'fa fa-'+icon} /> }
            />
        )
    }

    searchAll = () => {
        this.closeModal()
        
        for(let i=0; i<this.state.data.length; i++) {
            this.search(this.state.tipo, i, this.state.data[i].entrada, this.state.icon)
        }
    }

    render() {
        let consultas = this.props.consultas ? this.props.consultas : []
        let handleSearchPerson = this.props.search
        const produtoInformacoes = this.props.produtoInformacoes
        let fields = ["Tipo", "Entrada", "Data/Hora", ""]
        return (
                <Panel title={title}>
                    {this.props.searchEnderecosTelefonesUltimasConsultas ? 
                        <Col md={12}>
                            <strong>Busca em lote por:</strong>
                            {" "}
                            <MyButton
                                tooltip={TOOLTIP_SEARCH_BY_ADDRESS_IN_BATCH_MESSAGE}
                                onClickButton={this.confirmSearch}
                                params={["enderecos", this.props.consultas, "home"]}
                                myButtonText={<i className='fa fa-home'/>}
                            />
                            <span style={{paddingRight:15}}></span>
                            <MyButton
                                tooltip={TOOLTIP_SEARCH_BY_PHONES_IN_BATCH_MESSAGE}
                                onClickButton={this.confirmSearch}
                                params={["telefones", this.props.consultas, "phone"]}
                                myButtonText={<i className='fa fa-phone'/>}
                            />
                        </Col>
                    : ""}

                    <Col md={12}>
                        {consultas.length > 0 ?
                            <Table fields={fields} >
                                {consultas.map((consulta, index) => {
                                    let produto = produtoInformacoes.find(prod => prod.id === this.props.type)
                                    let isCpfOrCnpj = produto.label === "CPF" ? "CPF"
                                        : produto.label === "CNPJ" ? "CNPJ" : ""
                                    if(produto) {
                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    <td>{produto.label}</td>
                                                    <td>
                                                        <MyButton
                                                            tooltip={TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE}
                                                            onClickButton={handleSearchPerson}
                                                            params={[consulta.entrada, isCpfOrCnpj]}
                                                            label={isCpfOrCnpj === "CPF" ? patternCPF(consulta.entrada)
                                                                        : isCpfOrCnpj === "CNPJ" ? patternCNPJ(consulta.entrada)
                                                                        : typeof(consulta.entrada) === "string" ? consulta.entrada
                                                                        : Object.keys(consulta.entrada).map(val => {
                                                                            if(consulta.entrada[val])
                                                                                 return consulta.entrada[val]+ ", "
                                                                            return
                                                                        })
                                                            }
                                                        />
                                                    </td>
                                                    <td>{new Date(consulta.dataHora).toLocaleString()}</td>
                                                    <td>
                                                        {this.props.searchEnderecosTelefonesUltimasConsultas ?
                                                            <span>
                                                                {this.renderButtons(consulta.enderecos, "enderecos", index, consulta.entrada, "home")}
                                                                <span style={{paddingRight:15}}></span>
                                                                {this.renderButtons(consulta.telefones, "telefones", index, consulta.entrada, "phone")}
                                                            </span>
                                                        : ""}
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    {consulta.enderecos && this.state.buttonsClicked.home[index] ?
                                                        <td colSpan={4}>
                                                            <Col md={12}>
                                                                <Endereco enderecos={consulta.enderecos} />
                                                            </Col>
                                                        </td>
                                                    : ""}
                                                </tr>
                                                
                                                <tr>
                                                    {consulta.telefones && this.state.buttonsClicked.phone[index]? 
                                                        <td colSpan={4} style={{padding:0}}>
                                                            <Telefone fixos={consulta.telefones.fixos} moveis={consulta.telefones.moveis} />
                                                        </td>
                                                    : ""}
                                                </tr>                                       
                                            </tbody>
                                        )
                                    }
                                })}                   
                            </Table>
                        :
                            <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                        }   
                    </Col>

                    <Modal
                        IsModalOpen={this.state.IsModalOpen}
                        closeModal={this.closeModal}
                        title={"Busca em lote"}
                        size="small"
                    >
                        {this.confirmMessage(consultas)}
                    </Modal>

                </Panel>
        )
    }
}