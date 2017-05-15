import React, { Component } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';
import Tooltip from "react-tooltip";
import Notification from "react-notification-system";
import { Col, Form, FormControl, FormGroup, Button } from "react-bootstrap";

import EnviarEmail from "../forms/EnviarEmail";
import Table from "../table/Table";
import Modal from "../Modal";

export default class Emails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            emailEnviar: "",
            email: ""
        }

        this._notificationSystem = null;

        this.renderEmail = this.renderEmail.bind(this);
        this.onChange = this.onChange.bind(this);
        this.sendNewEmail = this.sendNewEmail.bind(this);
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

    onChange(evt) {
        this.setState({
            email: evt.target.value
        })
    }

    sendNewEmail(evt) {
        evt.preventDefault();

        this._addNotification("Obrigado pelo envio. Seu pedido de inserção será analisado");

        this.props.sendNewEmail(this.state.email);
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
                                    <a data-tip data-for="tooltipCopyEmail">
                                        <div className="col-md-1">
                                            <CopyToClipboard text={email.email} onCopy={() => this._addNotification("Email copiado com sucesso")}>
                                                <i className="noPrint fa fa-clipboard icon-tel" />
                                            </CopyToClipboard>
                                        </div>
                                    </a>
                                </td>
                                <td>
                                    <a data-tip data-for="tooltipEmail">
                                        <i className="noPrint glyphicon glyphicon-envelope icon-tel icon-tel-msg" onClick={() => this.setState({isModalOpen: true, emailEnviar: email.email})}/>
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
        let medium = Math.round(emails.length/2);
        return (
            <div>
                <Col md={6} xs={6}>
                    {this.renderEmail(emails.slice(0, medium))}
                </Col>
                
                <Col md={6} xs={6}>
                    {this.renderEmail(emails.slice(medium, emails.length))}
                </Col>

                {this.props.newEmail ?
                    <Col md={12}>
                        <Form inline onSubmit={this.sendNewEmail}>
                            <FormGroup controlId="formInlineName" bsSize="small">
                                <FormControl
                                    type="email"
                                    placeholder="Digite o novo email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}/>
                            </FormGroup>
                            {' '}
                            <Button type="submit" bsSize="small" bsStyle="success">
                                Enviar
                            </Button>
                        </Form>
                    </Col>                                     
                : ""}

                <Modal
                    IsModalOpen={this.state.isModalOpen}
                    closeModal={this.closeModal.bind(this)}
                    title="Enviar email">

                    <EnviarEmail email={this.state.emailEnviar} />

                </Modal>

                <Tooltip id="tooltipCopyEmail">
                    <span>Copiar email</span>
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