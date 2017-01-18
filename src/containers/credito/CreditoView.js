import React, { Component } from "react";

import Dados from "../../components/dadosBasicos/Dados";

export default class CreditoView extends Component {
    render(){
        return (
            <div>
                <Dados dados={this.props.data.cadastroPf} />
            </div>
        )
    }
}