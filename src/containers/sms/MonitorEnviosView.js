import React, { Component } from 'react';
import { Col } from "react-bootstrap";

// Components
import MyButton from "../../components/button/MyButton"
import Panel from "../../components/panel/Panel"
import Modal from "../../components/Modal"
import DetalhesCampanha from "./DetalhesCampanha"

// Constants
import { TOOLTIP_SEE_MORE_INFO_MESSAGE } from "../../constants/utils"
import { STATUS_SMS } from "../../constants/constantsSMS"

class MonitorEnviosView extends Component {
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

    renderTitlePanel(campanha) {
        return (
            <span>
                ID: <strong>{campanha.id}</strong> - STATUS: <span style={{color:STATUS_SMS[campanha.status].color}}>
                    {STATUS_SMS[campanha.status].label}
                </span>
            </span>
        )
    }

    render() {
        let { user } = this.props.campanha
        return (
            <Panel title={this.renderTitlePanel(this.props.campanha) } >
                <Col md={3}>
                    <strong>Campanha: </strong>{this.props.campanha.campanha}
                </Col>
                <Col md={3}>
                    <strong>Cadastro: </strong>{this.props.campanha.cadastro}
                </Col>

                <Col md={3}>
                    <strong>Cliente: </strong>{user.clienteLogin}
                </Col>
                <Col md={3}>
                    <strong>Grupo: </strong>{user.grupo}
                </Col>
                <Col md={3}>
                    <strong>Usuário: </strong>{user.usuario}
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