import React, { Component } from "react";

import Panel from "../panel/Panel";
import LayoutEmail from "./LayoutEmail";

export default class Email extends Component {
    constructor() {
        super();

        this.state = {
            newEmail: false
        }

        this.sendNewEmail = this.sendNewEmail.bind(this);
    }

    sendNewEmail(newEmail) {
        this.setState({
            newEmail: false
        })
    }

    render() {
        return (
            this.props.emails ?
                <Panel title="EMAILS" qtdTotal={[{icon:"fa fa-envelope-o", qtd:this.props.emails.length}]}>
                    <LayoutEmail
                        emails={this.props.emails}
                        newEmail={this.state.newEmail}
                        sendNewEmail={this.sendNewEmail}
                    />
                    <div className="col-md-12 col-sm-12 relacionados">
                        <a className="moreInfo" onClick={() => this.setState({newEmail:!this.state.newEmail})}>
                            {this.state.newEmail ?
                                "Cancelar"
                            : "Adicionar um novo email"}
                        </a>
                    </div>
                </Panel> :
                <Panel title="EMAILS">
                    <div className="text-center"><strong>Nada consta</strong></div>
                </Panel>
        )
    }
}