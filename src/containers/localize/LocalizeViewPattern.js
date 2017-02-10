import React, { Component } from "react";

import Dados from "../../components/dadosBasicos/Dados";
import DadosPj from "../../components/dadosBasicos/DadosPj";
import Telefones from "../../components/telefone/Telefone";
import Emails from "../../components/email/Email";
import Enderecos from "../../components/endereco/Endereco";
import Sociedades from "../../components/sociedades/Sociedades";
import RendaEstimada from "../../components/renda/RendaEstimada";
import RendaEmpregador from "../../components/renda/RendaEmpregador";
import BeneficioINSS from "../../components/renda/BeneficioINSS";
import RendaEntidadeClasseLiberal from "../../components/renda/RendaEntidadeClasseLiberal";
import Veiculos from "../../components/veiculos/Veiculos";

import Protocolo from "../../components/protocolo/Protocolo";

import PanelGroup from "../../components/panel/PanelGroup";

export default class LocalizeView extends Component {
    render() {
        console.log("DATa", this.props.data)
        return (
            <PanelGroup>
                {this.props.tipo == "CPF" ?
                    <Dados dados={this.props.data.cadastroPf} searchPerson={this.props.searchLocalize} showPessoasRelacionadas={this.props.showPessoasRelacionadas}/>
                : <DadosPj dados={this.props.data.cadastroPj} searchPerson={this.props.searchLocalize} />}
                <Telefones fixos={this.props.data.telefones.fixos} moveis={this.props.data.telefones.moveis} />
                <Enderecos enderecos={this.props.data.enderecos} />
                <Emails emails={this.props.data.emails} />
                <Sociedades participacoes={this.props.data.quadroSocialParticipacoes.participacao} />
                <RendaEmpregador renda={this.props.data.rendaEmpregador} searchPerson={this.props.searchLocalize}/>
                <RendaEstimada rendaEstimada={this.props.data.rendaEstimada} />
                <BeneficioINSS beneficio={this.props.data.rendaBeneficioAssistencial} />
                <RendaEntidadeClasseLiberal renda={this.props.data.rendaEntidadeClasseLiberal} />
                <Veiculos veiculos={this.props.data.veiculos} />
                <Protocolo info={this.props.data.info} />
            </PanelGroup>
        )
    }
}