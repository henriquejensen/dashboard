import React, { Component } from "react"
import Notification from "react-notification-system";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Modal from "../Modal";
import LayoutEndereco from "./layoutEndereco";
import EnviarEndereco from "../forms/EnviarEndereco";

import { NENHUM_REGISTRO } from "../../constants/utils";

const title = "ENDEREÇOS";

export default class Endereco extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IsModalOpen: false
        }

        this._notificationSystem = null;

        this.closeModal = this.closeModal.bind(this);
        this.sendNewAddress = this.sendNewAddress.bind(this);
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

    sendNewAddress(newAddress) {
        this._addNotification("Obrigado pelo envio. Seu pedido de inserção será analisado");

        this.setState({
            IsModalOpen: false
        })
    }

    render() {
        return (
            this.props.enderecos ?
                <Panel title={title} qtdTotal={[{icon:"fa fa-home", qtd:this.props.enderecos.length}]}>
                    <Col md={12} xs={12}>
                        <LayoutEndereco
                            enderecos={this.props.enderecos}
                            newAddress={this.state.IsModalOpen}
                            sendNewAddress={this.sendNewAddress}
                            searchEndereco={this.props.searchEndereco} />
                    </Col>
                    
                    <Col md={12} xs={12} className="relacionados">
                        {/*<a className="moreInfo" onClick={() => this.setState({IsModalOpen:!this.state.IsModalOpen})}>
                            {this.state.IsModalOpen ?
                                "Cancelar"
                            : "Adicionar um novo endereço"}
                        </a>*/}
                        {this.props.pessoas}
                    </Col>

                    <Modal
                        IsModalOpen={this.state.IsModalOpen}
                        closeModal={this.closeModal}
                        title="Inserção de um novo endereço"
                    >

                        <EnviarEndereco sendNewAddress={this.sendNewAddress} />

                    </Modal>

                    <Notification ref={n => this._notificationSystem = n} />

                </Panel> :
                <Panel title={title}>
                    <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                </Panel>
        )
    }
}