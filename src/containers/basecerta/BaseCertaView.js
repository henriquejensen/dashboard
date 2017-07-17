import React, { Component } from 'react'
import { Col, DropdownButton, MenuItem, ProgressBar } from "react-bootstrap"

// Components
import MyButton from "../../components/button/MyButton"
import Panel from "../../components/panel/Panel"
import Modal from "../../components/Modal"
import DetalhesTicket from "./DetalhesTicket"

// Constants
import { IN_PROCESS, TOOLTIP_SEE_MORE_INFO_MESSAGE } from "../../constants/utils"
import { URL_DOWNLOAD_ENTRADA, URL_DOWNLOAD_SAIDA } from "../../constants/constantsBaseCerta"

class BaseCertaView extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            IsModalOpen: false,
            id: ""
        }
    }

    showOrCloseModal = (id) => {
        this.setState({
            IsModalOpen: !this.state.IsModalOpen,
            id: id
        })
    }

    downloadDocument = (tipo) => {
        if(tipo === "SAIDA")
            this.props.getDocumentoSaidaBaseCerta(this.props.ticket.id)
        else
            this.props.getDocumentoEntradaBaseCerta(this.props.ticket.id)
    }

    render() {
        let ticket = this.props.ticket
        let { documentosEnviados, documentosEntregues } = ticket
        documentosEnviados = documentosEnviados || 0
        documentosEntregues = documentosEntregues || 0
        return (
            <Panel title={"Ticket: " + ticket.id} >
                <Col md={12} style={{padding:0}}>
                    <Col md={4}>
                        <strong>Solicitante: </strong>{ticket.usuario.usuario}
                    </Col>

                    <Col md={4}>
                        <strong>Total entrada/saída: </strong>{documentosEnviados  + "/" + documentosEntregues}
                    </Col>

                    <Col md={4}>
                        <strong>Arquivo: </strong>{ticket.nomeArquivo}
                    </Col>
                </Col>

                <Col md={12} style={{padding:0}}>
                    <Col md={4}>
                        <strong>Layout: </strong>{ticket.descricaoLayout}
                    </Col>

                    <Col md={4}>
                        <strong>Início: </strong>{ticket.dataPostagem}
                    </Col>
                    <Col md={4}>
                        <strong>Fim: </strong>{ticket.dataEntrega ? ticket.dataEntrega : IN_PROCESS }
                    </Col>
                </Col>

                <Col md={8}>
                    <ProgressBar
                        now={ticket.porcentagem}
                        label={`${ticket.porcentagem}%`}
                        bsStyle={ticket.porcentagem === 100 && ticket.statusTela === "Processado" ? "success" : ticket.porcentagem === 100 ? "danger" : "warning"}
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
                            onClick={this.downloadDocument}
                            eventKey="1"
                            target="_blank"
                        >
                            Baixar entrada
                        </MenuItem>

                        {ticket.porcentagem === 100 && this.props.perfilOrdem == 2 ?
                            <MenuItem
                                download
                                onClick={() => this.props.reprocessedFile({ticket:ticket.id})}
                                eventKey="2"
                            >
                                Reprocessar entrada
                            </MenuItem>
                        : ""}

                        {ticket.porcentagem === 100 && ticket.statusTela === "Processado" ?
                            <MenuItem
                                download
                                onClick={() => this.downloadDocument("SAIDA")}
                                eventKey="3"
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
                        myButtonClass="my-button-circle"
                        myButtonText={<i className="fa fa-plus" aria-hidden="true"></i>}
                    />
                </Col>

                <Modal
                    IsModalOpen={this.state.IsModalOpen}
                    closeModal={this.showOrCloseModal}
                    title={"Detalhes do Ticket"}
                >
                    <DetalhesTicket ticket={ticket} />
                </Modal>

            </Panel>
        )
    }
}

export default BaseCertaView;