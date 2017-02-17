import React, { Component } from "react";

import PanelGroup from "../../components/panel/PanelGroup";
import Dados from "../../components/dadosBasicos/Dados";
import DadosPj from "../../components/dadosBasicos/DadosPj";
import Telefones from "../../components/telefone/Telefone";
import Emails from "../../components/email/Email";
import Enderecos from "../../components/endereco/Endereco";
import Protocolo from "../../components/protocolo/Protocolo";

export default class FocoFiscalView extends Component {
    render(){
        console.log("VIEW", this.props)
        return (
            <PanelGroup>
                {this.props.tipo == "CPF" ?
                    <Dados dados={this.props.data.cadastroPf} />
                : <DadosPj dados={this.props.data.cadastroPj} />}
                <Telefones fixos={this.props.data.telefones.fixos} moveis={this.props.data.telefones.moveis} />
                <Emails emails={this.props.data.emails} />
                <Enderecos enderecos={this.props.data.enderecos} />
                <Protocolo info={this.props.data.info} />
            </PanelGroup>
        )
    }
}