import React, { Component } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';
import Tooltip from "react-tooltip";
import Notification from "react-notification-system";
import { Col } from "react-bootstrap";

import EnviarEmail from "../forms/EnviarEmail";
import Table from "../table/Table";
import Modal from "../Modal";

export default class Emails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            emailEnviar: ""
        }

        this._notificationSystem = null;

        this.renderEmail = this.renderEmail.bind(this);
    }

	closeModal() {
		this.setState({
			isModalOpen: false,
            emailEnviar: ""
		})
	}

    _addNotification(message) {
        if (this._notificationSystem) {
                this._notificationSystem.addNotification({
                message: message,
                level: 'success'
            });
        }
    }

    renderEmail(emails) {
        return (
            <Table>
                <tbody>
                    {emails.map((email,i) => {
                        return (
                            <tr key={i}>
                                <td>{email.email}</td>
                                <td>
                                    <a data-tip data-for="tooltipCopy">
                                        <div className="col-md-1">
                                            <CopyToClipboard text={email.email} onCopy={() => this._addNotification("Email copiado com sucesso")}>
                                                <i className="fa fa-clipboard icon-tel" />
                                            </CopyToClipboard>
                                        </div>
                                    </a>
                                </td>
                                <td>
                                    <a data-tip data-for="tooltipEmail">
                                        <i className="glyphicon glyphicon-envelope icon-tel icon-tel-msg" onClick={() => this.setState({isModalOpen: true, emailEnviar: email.email})}/>
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    render() {
        let emails = this.props.emails;
        return (
            <div>
                <Col md={6}>
                    {this.renderEmail(emails.slice(0,emails.length/2))}
                </Col>
                
                <Col md={6}>
                    {this.renderEmail(emails.slice(emails.length/2, emails.length))}
                </Col>

                <Modal
                    IsModalOpen={this.state.isModalOpen}
                    closeModal={this.closeModal.bind(this)}
                    title="Enviar email">

                    <EnviarEmail email={this.state.emailEnviar} />

                </Modal>

                <Tooltip id="tooltipCopy">
                    <span>Copiar número</span>
                </Tooltip>

                <Tooltip id="usersRelated">
                    <span>Informações relacionadas</span>
                </Tooltip>

                <Tooltip id="tooltipEmail">
                    <span>Enviar email</span>
                </Tooltip>

                <Notification ref={n => this._notificationSystem = n} />

            </div>
        )
    }
}