import React, { Component } from 'react';
import { Col, DropdownButton, MenuItem, ProgressBar } from "react-bootstrap";

// Components
import MyButton from "../../components/button/MyButton"
import Panel from "../../components/panel/Panel"
import Modal from "../../components/Modal"
import DetalhesTicket from "./DetalhesTicket"

// Constants
import { IN_PROCESS, TOOLTIP_SEE_MORE_INFO_MESSAGE } from "../../constants/utils"

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
            <Panel title={"Ticket: " + ticket.id} >
                <Col md={4}>
                    <strong>Solicitante: </strong>{ticket.usuario.usuario}
                </Col>
                <Col md={4}>
                    <strong>Layout: </strong>{ticket.descricaoLayout}
                </Col>
                <Col md={4}>
                    <strong>Arquivo: </strong>{ticket.nomeArquivo}
                </Col>

                <Col md={4}>
                    <strong>Total entrada/saída: </strong>{ticket.documentosEntregues + "/" + ticket.documentosEnviados}
                </Col>

                <Col md={4}>
                    <strong>Início: </strong>{ticket.dataPostagem}
                </Col>
                <Col md={4}>
                    <strong>Fim: </strong>{ticket.dataEntrega ? ticket.dataEntrega : IN_PROCESS }
                </Col>

                <Col md={8}>
                    <ProgressBar
                        now={ticket.porcentagem}
                        label={`${ticket.porcentagem}%`}
                        bsStyle={ticket.porcentagem === 100 ? "success" : "warning"}
                        style={{marginBottom:0}}
                    />
                    <div className="text-center">
                        <strong>STATUS:</strong> {ticket.statusTela}
                    </div>
                </Col>

                <Col md={2}>
                    <DropdownButton title="Ações" id="bg-nested-dropdown">
                        <MenuItem
                            download
                            href={ticket.s3Entrada}
                            eventKey="1"
                            target="_blank"
                        >
                            Baixar entrada
                        </MenuItem>
                        {ticket.porcentagem === 100 && ticket.statusTela === "PROCESSADO" && ticket.s3Saida ?
                            <MenuItem
                                download
                                href={ticket.s3Saida}
                                eventKey="2"
                                target="_blank"
                            >
                                Baixar saída
                            </MenuItem>
                        : ""}
                    </DropdownButton>
                </Col>

                <Col md={2}>
                    <MyButton
                        tooltip={TOOLTIP_SEE_MORE_INFO_MESSAGE}
                        onClickButton={this.showOrCloseModal}
                        params={[ticket.id]}
                        myButtonStyle="default"
                        myButtonClass="my-btn-more-details"
                        myButtonText={TOOLTIP_SEE_MORE_INFO_MESSAGE}
                    />
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