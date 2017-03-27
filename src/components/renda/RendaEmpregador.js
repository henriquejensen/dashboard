import React,  { Component } from "react";
import { Col, Button} from "react-bootstrap";
import Notification from "react-notification-system";

import Panel from "../panel/Panel";
import Table from "../table/Table";
import Modal from "../Modal";
import EnviarRenda from "../forms/EnviarRenda";

import { formatDate, formatCurrency } from "../utils/functions/patternDocuments";

import { NENHUM_REGISTRO } from "../../constants/utils";

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
                {this.props.rendas ?
                    <Panel title="RENDA EMPREGADOR" qtdTotal={[{icon:"fa fa-money", qtd:this.props.rendas.length}]}>
                        <Col md={12} sm={12}>            
                            <Table
                                fields={
                                    ["Faixa de Renda", "Empregador", "Setor", "Data Referência", "CBO"]
                                }
                            >
                                <tbody>
                                    {this.props.rendas.map((renda, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <a data-tip data-for='tooltipConsultar'>
                                                        <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(renda.documentoEmpregador, "CNPJ")}>
                                                            <i className='fa fa-search'/>
                                                        </Button>
                                                    </a>
                                                    {renda.empregador}
                                                </td>
                                                <td>{renda.setorEmpregador}</td>
                                                <td>{formatDate(renda.rendaDataRef)}</td>
                                                <td>{renda.cboDescricao}</td>
                                                <td>{renda.faixaRenda}</td>
                                            </tr>
                                        )
                                    })}
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
                        <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
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