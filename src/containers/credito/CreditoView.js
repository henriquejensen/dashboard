import React, { Component } from "react";

import Dados from "../../components/dadosBasicos/Dados";

export default class CreditoView extends Component {
    render(){
        console.log("DFAD", this.props.data)
        return (
            <div>
                {this.props.tipo == "CPF" ? 
                    <Dados dados={this.props.data.cadastroPf} />
                : ""}
            </div>
        )
    }
}