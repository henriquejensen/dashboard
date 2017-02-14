import React, { Component } from "react";

import Panel from "../panel/Panel";
import LayoutEmail from "./LayoutEmail";

export default class Email extends Component {
    render() {
        return (
            this.props.emails ?
                <Panel title="EMAILS" qtdTotal={[{icon:"fa fa-envelope-o", qtd:this.props.emails.length}]}>
                    <LayoutEmail emails={this.props.emails} />
                    <div className="col-md-12 col-sm-12 relacionados">
                        <a className="moreInfo">
                            Adicionar um novo email
                        </a>
                        <a data-tip data-for="moreInfo">
                            <i className="fa fa-plus pull-right moreInfo"/>
                        </a>
                        <a data-tip data-for="usersRelated">
                            <i className="fa fa-users pull-right"  />
                        </a>
                    </div>
                </Panel> :
                <Panel title="EMAILS">
                    <div className="text-center"><strong>Nada consta</strong></div>
                </Panel>
        )
    }
}