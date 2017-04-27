import React,  { Component } from "react";
import { Col, Button} from "react-bootstrap";
import Notification from "react-notification-system";

import Panel from "../panel/Panel";
import Table from "../table/Table";
import Modal from "../Modal";
import EnviarRenda from "../forms/EnviarRenda";

import { formatDate, formatCurrency } from "../utils/functions/patternDocuments";

import { NENHUM_REGISTRO } from "../../constants/utils";

const title = "RENDA EMPREGADOR";

export default class RendaEmpregador extends Component {
    constructor() {
        super();

        this.state = {
            IsModalOpen: false
        }

        this._notificationSystem = null;
    }

    _addNotification(message) {
        if (this._notificationSystem) {
                this._notificationSystem.addNotification({
                message: message,
                level: 'success'
            });
        }
    }

    closeModal = () => {
        this.setState({
            IsModalOpen: false
        })
    }

    sendNewIncome = (newIncome) => {
        console.log("NEW INCOME", newIncome);

        this._addNotification("Obrigado pelo envio. Seu pedido de inserção será analisado");

        this.setState({
            IsModalOpen: false
        })
    }

    render() {
        let rendas = this.props.rendas ? this.props.rendas : [];
        let handleSearchPerson = this.props.searchPerson;
        let isCpfOrCnpj = "CNPJ";
        let IsModalOpen = this.state.IsModalOpen;
        let fields = ["Empregador", "Setor", "Data Referência", "CBO", "Faixa de Renda"];
        return (
            <span>
                {rendas.length > 0 ?
                    <Panel title={title} qtdTotal={[{icon:"fa fa-money", qtd:rendas.length}]}>
                        <Col md={12} sm={12}>            
                            <Table fields={fields}>
                                <tbody>
                                    {rendas.map((renda, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <a data-tip data-for='tooltipConsultar'>
                                                        <Button bsStyle="info" className="mapa-button" onClick={() => handleSearchPerson(renda.documentoEmpregador, isCpfOrCnpj)}>
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
                            
                            <a className="moreInfo" onClick={() => this.setState({IsModalOpen:!IsModalOpen})}>
                                {IsModalOpen ?
                                    "Cancelar"
                                : "Adicionar um nova renda"}
                            </a>

                        </Col>
                    </Panel>
                :
                    <Panel title={title}>
                        <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                    </Panel>
                }
                    <Modal
                        IsModalOpen={IsModalOpen}
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