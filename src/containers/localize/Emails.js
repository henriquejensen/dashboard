import React, { Component } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';

import Panel from "../../components/Panel";

export default class Emails extends Component {

    render() {
        return (
            <Panel title="EMAILS" qtdTotal={[{qtd:this.props.emails.length,icon:"glyphicon-envelope"}]}>
                {this.props.emails.map((email,i) => {
                    if(email) {
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
                                    <i className="glyphicon glyphicon-envelope icon-tel icon-tel-msg"/>
                                </div>
                            </div>
                    }
                })}

              <div className="col-md-12">
                <i className="glyphicon glyphicon-user pull-right relacionados" onClick={this.props.showEmailsRelacionados} />
              </div>
            </Panel>
        )
    }
}