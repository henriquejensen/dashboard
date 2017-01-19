import React, { Component } from "react";

import PanelGroup from "../../components/panel/PanelGroup";
import Dados from "../../components/dadosBasicos/Dados";
import Telefones from "../../components/telefone/Telefone";
import Enderecos from "../../components/endereco/Endereco";
import QuadroResumo from "../../components/quadroResumo/QuadroResumo";
import Sociedades from "../../components/sociedades/Sociedades";
import Score from "../../components/score/Score";
import Protestos from "../../components/protesto/Protesto";
import ChequesSemFundo from "../../components/cheques/ChequeSemFundo";
import RendaPresumida from "../../components/renda/RendaPresumida";
import Consultas from "../../components/consultasAnteriores/Consultas";
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
                        <QuadroResumo ocorrencias={this.props.data.quadroResumo} />
                        <RendaPresumida rendas={this.props.data.rendasPresumidas} limiteSugerido={this.props.data.limiteSugerido}/>
                        <Sociedades participacoes={this.props.data.participacoesEmpresas}/>
                        <Score scores={this.props.data.scores} />
                        <Protestos protestos={this.props.data.protestosDetalhados} />
                        <ChequesSemFundo cheques={this.props.data.cheques} />
                        <Consultas consultas={this.props.data.consultasAnteriores} />
                        <Protocolo info={this.props.data.info} />
                    </PanelGroup>
                : ""}
            </div>
        )
    }
}