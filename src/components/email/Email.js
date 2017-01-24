import React, { Component } from "react";

import Panel from "../panel/Panel";
import LayoutEmail from "./LayoutEmail";

export default class Email extends Component {
    render() {
        return (
            this.props.emails ?
                <Panel title="EMAILS" qtdTotal={[{icon:"fa fa-envelope-o", qtd:this.props.emails.length}]}>
                    <div className="col-md-12 col-xs-12">
                        <LayoutEmail emails={this.props.emails} />
                    </div>
                </Panel> :
                <Panel title="EMAILS">
                    <div className="text-center"><strong>Nada consta</strong></div>
                </Panel>
        )
    }
}