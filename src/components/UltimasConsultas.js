import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Col, Button } from "react-bootstrap";

import Panel from "./panel/Panel";
import Table from "./table/Table";

import Telefone from "./telefone/layoutTelefone";
import Endereco from "./endereco/layoutEndereco";

import Modal from "./Modal";

const fields = ["Tipo", "Entrada", "Data/Hora", ""];

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
            <a data-tip data-for='tooltipConsultar'>
                <Button
                    bsSize="small"
                    bsStyle={this.state.buttonsClicked[icon][index] ? "danger" : "info"}
                    className="my-button"
                    onClick={items ? () => this.showMoreItems(index, icon) : () => this.search(tipo, index, documento, icon)}>
                    {items ?
                        this.state.buttonsClicked[icon][index] ?
                            <i className='fa fa-times'/>
                        : <i className='fa fa-eye'/>
                    :   <i className={'fa fa-'+icon} /> }
                </Button>
            </a>
        )
    }

    searchAll = () => {
        this.closeModal();
        
        for(let i=0; i<this.state.data.length; i++) {
            this.search(this.state.tipo, i, this.state.data[i].entrada, this.state.icon);
        }
    }

    render() {
        let consultas = this.props.consultas ? this.props.consultas : [];
        return (
            <Panel title="ÚLTIMAS CONSULTAS">

                {this.props.searchEnderecosTelefonesUltimasConsultas ? 
                    <div style={{paddingLeft:8, paddingTop:5}}>
                        <strong>Busca em lote por:</strong>
                        {" "}
                        <Button
                            bsSize="small"
                            bsStyle="info"
                            style={{marginRight:15}}
                            onClick={() => this.confirmSearch("enderecos", this.props.consultas, "home")}>
                                endereços{' '}<i className='fa fa-home'/>
                        </Button>
                        <Button
                            bsSize="small"
                            bsStyle="info"
                            onClick={() => this.confirmSearch("telefones", this.props.consultas, "phone")}>
                                telefones{' '}<i className='fa fa-phone'/>
                        </Button>
                    </div>
                : ""}

                <Table fields={fields} >
                    {consultas ?
                            consultas.map((consulta,index) => {
                                return (
                                    <tbody key={index}>
                                        <tr>
                                            <td>{this.props.type}</td>
                                            <td>{consulta.entrada}</td>
                                            <td>{new Date(consulta.dataHora).toLocaleString()}</td>
                                            <td>
                                                <a data-tip data-for='tooltipConsultar'>
                                                    <Button
                                                        bsStyle="info"
                                                        className="mapa-button"
                                                        onClick={() => this.props.search(consulta.entrada)}>
                                                        <i className='fa fa-search'/>
                                                    </Button>
                                                </a>

                                                {this.props.searchEnderecosTelefonesUltimasConsultas ?
                                                    <span>
                                                        {" "}
                                                        {this.renderButtons(consulta.enderecos, "enderecos", index, consulta.entrada, "home")}
                                                        {" "}
                                                        {this.renderButtons(consulta.telefones, "telefones", index, consulta.entrada, "phone")}
                                                    </span>
                                                : ""}
                                            </td>
                                        </tr>
                                        
                                        <tr>
                                            {consulta.enderecos && this.state.buttonsClicked.home[index] ?
                                                <td colSpan={4}>
                                                    <Endereco enderecos={consulta.enderecos} />
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
                            })                       
                        
                    : ""}
                </Table>

                <Tooltip id="tooltipConsultar">
                    <span>Consultar</span>
                </Tooltip>

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