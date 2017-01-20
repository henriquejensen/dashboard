import React, { Component } from "react"

import Panel from "../panel/Panel";
import LayoutEndereco from "./layoutEndereco";

export default class Endereco extends Component {
    render() {
        return (
            this.props.enderecos ?
                <Panel title="ENDEREÇOS" qtdTotal={[{icon:"fa fa-home", qtd:this.props.enderecos.length}]}>
                    <div className="col-md-12 col-xs-12">
                        <LayoutEndereco enderecos={this.props.enderecos} />
                    </div>
                </Panel> :
                <Panel title="ENDEREÇOS">
                    <div className="text-center"><strong>Nada consta</strong></div>
                </Panel>
        )
    }
}