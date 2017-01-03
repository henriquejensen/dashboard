import React, { Component } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';

import Panel from "../../components/Panel";

export default class Emails extends Component {

    render() {
        return (
            <Panel title="EMAILS RELACIONADOS" qtdTotal={[{qtd:this.props.emails.emails.length,icon:"glyphicon-envelope"}]}>
                <div className="col-md-12">
                    <div className="col-md-2">
                        <strong>Relação:</strong> {this.props.emails.relacao}
                    </div>
                    <div className="col-md-10">
                        <strong>Nome:</strong> {this.props.emails.nome}
                    </div>
                </div>
                {this.props.emails.emails.map((email,i) => {
                    return <div className="col-md-6" key={i}>
                            <div className="col-md-8">
                                {email}
                            </div>

                            <div className="col-md-2" style={{cursor:"pointer"}}>
                                <CopyToClipboard text={email}>
                                    <span >Copiar</span>
                                </CopyToClipboard>&nbsp;
                            </div>

                            <div className="col-md-1">
                                <a data-tip data-for="tooltipEmail">
                                    <i className="glyphicon glyphicon-envelope icon-tel icon-tel-msg"/>
                                </a>
                            </div>
                        </div>
                })}
            </Panel>
        )
    }
}