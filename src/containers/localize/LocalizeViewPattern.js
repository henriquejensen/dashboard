import React, { Component } from "react";

import Dados from "../../components/dadosBasicos/Dados";
import DadosPj from "../../components/dadosBasicos/DadosPj";
import Telefones from "../../components/telefone/Telefone";
import Emails from "../../components/email/Email";
import Enderecos from "../../components/endereco/Endereco";

import Protocolo from "../../components/protocolo/Protocolo";

import PanelGroup from "../../components/panel/PanelGroup";

export default class LocalizeView extends Component {
    render() {
        return (
            <PanelGroup>
                {this.props.tipo == "CPF" ?
                    <Dados dados={this.props.data.cadastroPf} searchLocalize={this.props.searchLocalize} showPessoasRelacionadas={this.props.showPessoasRelacionadas}/>
                : <DadosPj dados={this.props.data.cadastroPj} searchLocalize={this.props.searchLocalize} />}


                <Protocolo info={this.props.data.info} />
            </PanelGroup>
        )
    }
}