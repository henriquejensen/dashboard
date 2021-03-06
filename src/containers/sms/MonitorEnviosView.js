import React, { Component } from 'react';
import { Col } from "react-bootstrap";

// Components
import MyButton from "../../components/button/MyButton"
import Panel from "../../components/panel/Panel"
import Modal from "../../components/Modal"
import DetalhesCampanha from "./DetalhesCampanha"

// Constants
import { TOOLTIP_SEE_MORE_INFO_MESSAGE } from "../../constants/utils"
import { STATUS_SMS, STATUS_SMS_CAMPANHA } from "../../constants/constantsSMS"

class MonitorEnviosView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            IsModalOpen: false,
            id: ""
        }
    }

    showOrCloseModal = ({ id, campanha }) => {
        this.setState({
            IsModalOpen: !this.state.IsModalOpen,
            id: id,
            campanha: campanha,

        })
    }

    renderTitlePanel(campanha) {
        return (
            <span>
                <strong>ID:</strong> {campanha.id} - <strong>STATUS:</strong>
                <span style={{backgroundColor:STATUS_SMS_CAMPANHA[campanha.status].color, padding:5, margin:"0 5px", color:"gainsboro"}}>
                    {STATUS_SMS_CAMPANHA[campanha.status].label}
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
                    <strong>Envio: </strong>{this.props.campanha.dataEnvio}
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
                        params={[this.props.campanha]}
                        myButtonClass="my-button-circle"
                        myButtonText={<i className="fa fa-plus" aria-hidden="true"></i>}
                    />
                </Col>

                <Modal
                    IsModalOpen={this.state.IsModalOpen}
                    closeModal={() => this.setState({IsModalOpen: false})}
                    title={`Campanha ${this.state.campanha} - id ${this.state.id}`}
                >
                    <DetalhesCampanha id={this.state.id} />
                </Modal>

            </Panel>
        )
    }
};

export default MonitorEnviosView;