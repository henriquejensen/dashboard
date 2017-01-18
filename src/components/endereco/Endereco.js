import React, { Component } from "react"

import Panel from "../panel/Panel";
import LayoutEndereco from "./layoutEndereco";

export default class Endereco extends Component {
    render() {
        return (
            this.props.enderecos ?
                <Panel title="ENDEREÇOS" qtdTotal={[{icon:"fa fa-home", qtd:this.props.enderecos.length}]}>
                    <LayoutEndereco enderecos={this.props.enderecos} />
                </Panel> :
                <Panel title="ENDEREÇOS">
                    <div className="text-center"><strong>Nada consta</strong></div>
                </Panel>
        )
    }
}