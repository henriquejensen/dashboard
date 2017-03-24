import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Button } from "react-bootstrap";

import Panel from "./panel/Panel";
import Table from "./table/Table";

import Telefone from "./telefone/layoutTelefone";
import Endereco from "./endereco/layoutEndereco";

import { patternCPF, patternCNPJ } from "./utils/functions/patternDocuments";

const fields = ["Tipo", "Entrada", "Data/Hora", ""];

export default class UltimasConsultas extends Component {
    state = {
        buttonsClicked: {
            phone: {},
            home: {}
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

    render() {
        let consultas = this.props.consultas;
        return (
            <Panel title="Últimas consultas">
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
                                                    <Button bsStyle="info" className="mapa-button" onClick={() => this.props.search(consulta.entrada)}>
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
                                                <td colSpan={4}>
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
            </Panel>
        )
    }
}