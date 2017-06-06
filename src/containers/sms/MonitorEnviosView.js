import React, { Component } from 'react';
import { Col, ProgressBar } from "react-bootstrap";

// Components
import MyButton from "../../components/button/MyButton"
import Panel from "../../components/panel/Panel"
import Modal from "../../components/Modal"
import DetalhesCampanha from "./DetalhesCampanha"

// Constants
import { TOOLTIP_SEE_MORE_INFO_MESSAGE } from "../../constants/utils"

class MonitorEnviosView extends Component {
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
        return (
            <Panel title={"Ticket: " + this.props.campanha.id + " - Campanha: " + this.props.campanha.campanha} >
                <Col md={3}>
                    <strong>Campanha: </strong>{this.props.campanha.campanha}
                </Col>
                <Col md={3}>
                    <strong>Cadastro: </strong>{this.props.campanha.cadastro}
                </Col>
                <Col md={3}>
                    <strong>Centro de Custo: </strong>{this.props.campanha.centroCusto}
                </Col>

                <Col md={3}>
                    <strong>Cliente: </strong>{this.props.campanha.cliente}
                </Col>
                <Col md={3}>
                    <strong>Grupo: </strong>{this.props.campanha.grupo}
                </Col>
                <Col md={3}>
                    <strong>Usuário: </strong>{this.props.campanha.usuario}
                </Col>

                <Col md={3}>
                    <strong>Rota: </strong>{this.props.campanha.rota}
                </Col>

                <Col md={3}>
                    <MyButton
                        tooltip={TOOLTIP_SEE_MORE_INFO_MESSAGE}
                        onClickButton={this.showOrCloseModal}
                        params={[this.props.campanha.id]}
                        myButtonStyle="default"
                        myButtonClass="my-btn-more-details"
                        myButtonText={TOOLTIP_SEE_MORE_INFO_MESSAGE}
                    />
                </Col>

                <Col md={8}>
                    <ProgressBar now={this.props.campanha.status} label={`${this.props.campanha.status}%`} active bsStyle={this.props.campanha.status == 100 ? "success" : "warning"} />
                </Col>


                <Modal
                    IsModalOpen={this.state.IsModalOpen}
                    closeModal={this.showOrCloseModal}
                    title={"Detalhes da campanha"}
                >
                    <DetalhesCampanha id={this.state.id} />
                </Modal>

            </Panel>
        )
    }
};

export default MonitorEnviosView;