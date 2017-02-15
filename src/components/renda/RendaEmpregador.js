import React,  { Component } from "react";
import { Col, Button} from "react-bootstrap";
import Notification from "react-notification-system";

import Panel from "../panel/Panel";
import Table from "../table/Table";
import Modal from "../Modal";
import EnviarRenda from "../forms/EnviarRenda";

export default class RendaEmpregador extends Component {
    constructor() {
        super();

        this.state = {
            IsModalOpen: false
        }

        this._notificationSystem = null;

        this.closeModal = this.closeModal.bind(this);
        this.sendNewIncome = this.sendNewIncome.bind(this);
    }

    _addNotification(message) {
        if (this._notificationSystem) {
                this._notificationSystem.addNotification({
                message: message,
                level: 'success'
            });
        }
    }

    closeModal() {
        this.setState({
            IsModalOpen: false
        })
    }

    sendNewIncome(newIncome) {
        console.log("NEW INCOME", newIncome);

        this._addNotification("Obrigado pelo envio. Seu pedido de inserção será analisado");

        this.setState({
            IsModalOpen: false
        })
    }

    render() {
        return (
            <span>
                {this.props.renda ?
                    <Panel title="RENDA EMPREGADOR">
                        <Col md={12} sm={12}>            
                            <Table
                                fields={
                                    ["Renda Estimada", "Faixa de Renda", "Empregador", "Setor", "Data Referência", "CBO", "CBO Sinonimos"]
                                }
                            >
                                <tbody>
                                    <tr>
                                        <td>{this.props.renda.rendaEstimada}</td>
                                        <td>{this.props.renda.faixaRenda}</td>
                                        <td>
                                            {this.props.renda.empregador}
                                            <a data-tip data-for='tooltipConsultar'>
                                                <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(this.props.renda.documentoEmpregador, "pf")}>
                                                    <i className='fa fa-search'/>
                                                </Button>
                                            </a>
                                        </td>
                                        <td>{this.props.renda.setorEmpregador}</td>
                                        <td>{this.props.renda.rendaDataRef}</td>
                                        <td>{this.props.renda.cboDescricao + " - " + this.props.renda.cboCodigo}</td>
                                        <td>{this.props.renda.cboSinonimos}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            
                            <a className="moreInfo" onClick={() => this.setState({IsModalOpen:!this.state.IsModalOpen})}>
                                {this.state.IsModalOpen ?
                                    "Cancelar"
                                : "Adicionar um nova renda"}
                            </a>

                        </Col>
                    </Panel>
                :
                    <Panel title="RENDA EMPREGADOR">
                        <div className="text-center"><strong>Nada consta</strong></div>
                    </Panel>
                }
                    <Modal
                        IsModalOpen={this.state.IsModalOpen}
                        closeModal={this.closeModal}
                        title="Inserção de um novo endereço"
                    >

                        <EnviarRenda send={this.sendNewIncome} />

                    </Modal>

                    <Notification ref={n => this._notificationSystem = n} />
            </span>
        )
    }
}