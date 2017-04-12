import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Button, Col } from "react-bootstrap";

import Modal from "../Modal";
import Panel from "../panel/Panel";
import Table from "../table/Table";
import Endereco from "../endereco/layoutEndereco";
import Telefone from "../telefone/layoutTelefone";

import { NENHUM_REGISTRO } from "../../constants/utils";

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
            <a data-tip data-for='tooltipConsultar'>
                <Button
                    bsSize="small"
                    bsStyle={this.state.buttonsClicked[icon][indexArrayElements] ? "danger" : "info"}
                    className="my-button"
                    onClick={items ? () => this.showMoreItems(indexArrayElements, icon) : () => this.search(isEnderecoOrTelefone, indexArrayElements, documento, icon, isCpfOrCnpj)}>
                    {items ?
                        this.state.buttonsClicked[icon][indexArrayElements] ?
                            <i className='fa fa-times'/>
                        : <i className='fa fa-eye'/>
                    :   <i className={'fa fa-'+icon} /> }
                </Button>
            </a>
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
        return (
            this.props.relacionados && this.state.relacionados.length > 0 ?
                <Panel title={title} qtdTotal={[{qtd:this.state.relacionados.length,icon:"fa fa-users"}]}>
                    <div style={{paddingTop:5}}>
                        <Col md={6}>
                            <strong>Resultados da busca por:</strong>
                            {this.props.headerBody}
                        </Col>

                        <Col md={6}>
                            <strong>Busca em lote por:</strong>
                            {" "}
                            <Button
                                bsSize="small"
                                bsStyle="info"
                                style={{marginRight:15}}
                                onClick={() => this.confirmSearch("enderecos", this.state.relacionados, "home")}>
                                    endereços{' '}<i className='fa fa-home'/>
                            </Button>
                            <Button
                                bsSize="small"
                                bsStyle="info"
                                onClick={() => this.confirmSearch("telefones", this.state.relacionados, "phone")}>
                                    telefones{' '}<i className='fa fa-phone'/>
                            </Button>
                        </Col>
                    </div>

                    <Col md={12}>
                        
                        <Table fields = {["Tipo", "Nome", "Data nasc.", "Pessoa Relacionada", "Cidade", "UF", ""]}>
                                {this.state.relacionados.map((relacionado,index) => {
                                    let tipo = relacionado.tipo == "Pessoa Física" ? "CPF":"CNPJ";
                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <td>
                                                    {tipo}
                                                </td>
                                                <td>
                                                    <a data-tip data-for='tooltipConsultar'>
                                                        <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(relacionado.documento, tipo)}>
                                                            <i className='fa fa-search'/>
                                                        </Button>
                                                    </a>
                                                    {relacionado.nome}
                                                </td>
                                                <td>{relacionado.dataNascimento}</td>
                                                <td>{relacionado.pessoaRelacionada}</td>
                                                <td>{relacionado.cidade}</td>
                                                <td>{relacionado.uf}</td>
                                                <td>
                                                    {this.renderButtons(relacionado.enderecos, "enderecos", index, relacionado.documento, "home", tipo)}
                                                    {" "}
                                                    {this.renderButtons(relacionado.telefones, "telefones", index, relacionado.documento, "phone", tipo)}
                                                </td>
                                            </tr>

                                            <tr>
                                                {relacionado.enderecos && this.state.buttonsClicked.home[index] ?
                                                    <td colSpan={6}>
                                                        <Endereco enderecos={relacionado.enderecos} />
                                                    </td>
                                                : ""}
                                            </tr>
                                            
                                            <tr>
                                                {relacionado.telefones && this.state.buttonsClicked.phone[index]?
                                                    <td colSpan={6} style={{padding:0}}>
                                                        <Telefone fixos={relacionado.telefones.fixos} moveis={relacionado.telefones.moveis} />
                                                    </td>
                                                : ""}
                                            </tr>
                                        </tbody>
                                    )
                                })}
                        </Table>
                    </Col>

                    <Tooltip id="tooltipConsultar">
                        <span>Consultar</span>
                    </Tooltip>

                    <Modal
                        IsModalOpen={this.state.IsModalOpen}
                        closeModal={this.closeModal}
                        title="Busca em lote"
                        size="small"
                    >
                        {this.confirmMessage(this.props.relacionados)}
                    </Modal>
                </Panel>
            :   <Panel title={title}>
                    <div style={{paddingTop:5}}>
                        <Col md={12}>
                            <strong>Resultados da busca por:</strong>
                            {this.props.headerBody}
                        </Col>
                    </div>
                    <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                </Panel>
        )
    }
}