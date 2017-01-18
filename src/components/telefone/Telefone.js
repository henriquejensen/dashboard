import React, { Component } from "react"

import Panel from "../panel/Panel";
import LayoutTelefone from "./layoutTelefone";

export default class Telefone extends Component {
    render() {
        return (
            this.props.fixos || this.props.moveis ?
                <Panel title="TELEFONES" qtdTotal={[{icon:"fa fa-phone", qtd:this.props.fixos.length},{icon:"fa fa-mobile", qtd:this.props.moveis.length}]}>
                    <LayoutTelefone fixos={this.props.fixos} moveis={this.props.moveis} />
                </Panel> :
                <Panel title="TELEFONES">
                    <div className="text-center"><strong>Nada consta</strong></div>
                </Panel>
        )
    }
}