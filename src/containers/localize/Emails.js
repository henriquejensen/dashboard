import React, { Component } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';
import Tooltip from "react-tooltip";
import Notification from "react-notification-system";

import EnviarEmail from "../../components/forms/EnviarEmail";
import Modal from "../../components/Modal";
import Panel from "../../components/Panel";

export default class Emails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
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

	closeModal() {
		this.setState({
			isModalOpen: false,
            emailEnviar: ""
		})
	}

    render() {
        return (
            <Panel title="EMAILS" qtdTotal={[{qtd:this.props.emails.length,icon:"glyphicon-envelope"}]}>
                {this.props.emails.map((email,i) => {
                    if(email) {
                        return <div className="col-md-6" key={i}>
                                <div className="col-md-8">
                                    {email}
                                </div>

                                <a data-tip data-for="tooltipCopy">
                                    <div className="col-md-1">
                                        <CopyToClipboard text={email} onCopy={() => this._addNotification("Email copiado com sucesso")}>
                                            <i className="fa fa-clipboard icon-tel" />
                                        </CopyToClipboard>
                                    </div>
                                </a>

                                <div className="col-md-1">
                                    <a data-tip data-for="tooltipEmail">
                                        <i className="glyphicon glyphicon-envelope icon-tel icon-tel-msg" onClick={() => this.setState({isModalOpen: true, emailEnviar: email})}/>
                                    </a>
                                </div>
                            </div>
                    }
                })}

                <Modal
                    IsModalOpen={this.state.isModalOpen}
                    closeModal={this.closeModal.bind(this)}>

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

            </Panel>
        )
    }
}