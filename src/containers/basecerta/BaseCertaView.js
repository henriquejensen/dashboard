import React, { Component } from 'react';
import { Col, ProgressBar } from "react-bootstrap";

// Components
import MyButton from "../../components/button/MyButton"
import Panel from "../../components/panel/Panel"
import Modal from "../../components/Modal"
import DetalhesTicket from "./DetalhesTicket"

// Constants
import { TOOLTIP_SEE_MORE_INFO_MESSAGE } from "../../constants/utils"

class BaseCertaView extends Component {
    state = {
        IsModalOpen: false,
        id: ""
    }

    showOrCloseModal = (id) => {
        this.setState({
            IsModalOpen: !this.state.IsModalOpen,
            id: id
        })
    }

    render() {
        let ticket = this.props.ticket
        return (
            <Panel title={"Ticket: " + ticket.id + " - Layout: " + ticket.layout} >
                <Col md={4}>
                    <strong>Solicitante: </strong>{ticket.solicitante}
                </Col>
                <Col md={4}>
                    <strong>Layout: </strong>{ticket.solicitante}
                </Col>
                <Col md={4}>
                    <strong>Arquivo: </strong>{ticket.arquivo}
                </Col>

                <Col md={4}>
                    <strong>Início: </strong>{ticket.inicio}
                </Col>
                <Col md={4}>
                    <strong>Fim: </strong>{ticket.fim}
                </Col>

                <Col md={3}>
                    <MyButton
                        tooltip={TOOLTIP_SEE_MORE_INFO_MESSAGE}
                        onClickButton={this.showOrCloseModal}
                        params={[ticket.id]}
                        myButtonStyle="default"
                        myButtonClass="my-btn-more-details"
                        myButtonText={TOOLTIP_SEE_MORE_INFO_MESSAGE}
                    />
                </Col>

                <Col md={8}>
                    <ProgressBar now={ticket.status} label={`${ticket.status}%`} active bsStyle={ticket.status == 100 ? "success" : "warning"} />
                </Col>


                <Modal
                    IsModalOpen={this.state.IsModalOpen}
                    closeModal={this.showOrCloseModal}
                    title={"Detalhes da campanha"}
                >
                    <DetalhesTicket ticket={ticket} />
                </Modal>

            </Panel>
        )
    }
}

export default BaseCertaView;