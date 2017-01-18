import React, { Component } from "react";

import PanelGroup from "../../components/panel/PanelGroup";
import Dados from "../../components/dadosBasicos/Dados";
import Telefones from "../../components/telefone/Telefone";
import Enderecos from "../../components/endereco/Endereco";
import PainelControle from "./PainelControle";
import Sociedades from "../../components/sociedades/Sociedades";
import Consultas from "./Consultas";
import Protocolo from "../../components/protocolo/Protocolo";

export default class CreditoView extends Component {
    render(){
        console.log("DFAD", this.props.data)
        return (
            <div>
                {this.props.tipo == "CPF" ?
                    <PanelGroup>
                        <Dados dados={this.props.data.cadastroPf} />
                        <Telefones fixos={this.props.data.telefones.fixos} moveis={this.props.data.telefones.moveis} />
                        <Enderecos enderecos={this.props.data.enderecos} />
                        <PainelControle />
                        <Sociedades />
                        <Consultas />
                        <Protocolo info={this.props.data.info} />
                    </PanelGroup>
                : ""}
            </div>
        )
    }
}