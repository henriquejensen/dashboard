import React, { Component } from "react";

import PanelGroup from "../../components/panel/PanelGroup";
import Dados from "../../components/dadosBasicos/Dados";
import DadosPj from "../../components/dadosBasicos/DadosPj";
import Telefones from "../../components/telefone/Telefone";
import Enderecos from "../../components/endereco/Endereco";
import QuadroResumo from "../../components/quadroResumo/QuadroResumo";
import Sociedades from "../../components/sociedades/Sociedades";
import Score from "../../components/score/Score";
import Protestos from "../../components/protesto/Protesto";
import ChequesSemFundo from "../../components/cheques/ChequeSemFundo";
import RendaPresumida from "../../components/renda/RendaPresumida";
import RegistroDebito from "../../components/registroDebito/RegistroDebito";
import Consultas from "../../components/consultasAnteriores/Consultas";
import Acoes from "../../components/acoes/Acoes";
import OutrasGrafias from "../../components/outrasGrafias/OutrasGrafias";
import Protocolo from "../../components/protocolo/Protocolo";

export default class CreditoView extends Component {
    render(){
        return (

            <PanelGroup>
                {this.props.tipo == "CPF" ?
                    <Dados dados={this.props.data.cadastroPf} />
                : <DadosPj dados={this.props.data.cadastroPj} />}
                <Telefones fixos={this.props.data.telefones.fixos} moveis={this.props.data.telefones.moveis} />
                <Enderecos enderecos={this.props.data.enderecos} />
                <QuadroResumo ocorrencias={this.props.data.quadroResumo} />
                <RendaPresumida rendas={this.props.data.rendasPresumidas} limiteSugerido={this.props.data.limiteSugerido}/>
                <Sociedades participacoes={this.props.data.participacoesEmpresas}/>
                <Score scores={this.props.data.scores} />
                <Protestos protestos={this.props.data.protestosDetalhados} />
                <ChequesSemFundo cheques={this.props.data.cheques} />
                <RegistroDebito registros={this.props.data.registrosDebitos} />
                <Acoes acoes={this.props.data.acoes} />
                <OutrasGrafias grafias={this.props.data.outrasGrafias} />
                <Consultas consultas={this.props.data.consultasAnteriores} />
                <Protocolo info={this.props.data.info} />
            </PanelGroup>
        )
    }
}