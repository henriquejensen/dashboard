import React, { Component } from "react";

import PanelGroup from "../../components/panel/PanelGroup";
import Dados from "../../components/dadosBasicos/Dados";
import DadosPj from "../../components/dadosBasicos/DadosPj";
import Telefones from "../../components/telefone/Telefone";
import Emails from "../../components/email/Email";
import Enderecos from "../../components/endereco/Endereco";
import QuadroResumo from "../../components/quadroResumo/QuadroResumo";
import Sociedades from "../../components/sociedades/Sociedades";
import Administracao from "../../components/quadroAdministrativo/QuadroAdministrativo";
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
        console.log(this.props.data)
        return (
            <PanelGroup>
                {this.props.tipo == "CPF" ?
                    <Dados dados={this.props.data.cadastroPf} />
                : <DadosPj dados={this.props.data.cadastroPj} />}
                <Telefones fixos={this.props.data.telefones.fixos} moveis={this.props.data.telefones.moveis} />
                <Emails emails={this.props.data.emails} />
                <Enderecos enderecos={this.props.data.enderecos} />
                <QuadroResumo ocorrencias={this.props.data.quadroResumo} index={this.props.index} />
                <RendaPresumida rendas={this.props.data.rendasPresumidas} limiteSugerido={this.props.data.limiteSugerido} index={this.props.index}/>
                <Sociedades participacoes={this.props.data.participacoesEmpresas} index={this.props.index}/>
                <Administracao administradores={this.props.data.quadroAdministrativo} />
                <Score scores={this.props.data.scores} />
                <Protestos protestos={this.props.data.protestosDetalhados} index={this.props.index}/>
                <ChequesSemFundo cheques={this.props.data.cheques} index={this.props.index}/>
                <RegistroDebito registros={this.props.data.registrosDebitos} index={this.props.index} />
                <Acoes acoes={this.props.data.acoes} index={this.props.index} />
                <OutrasGrafias grafias={this.props.data.outrasGrafias} index={this.props.index} />
                <Consultas consultas={this.props.data.consultasAnteriores} index={this.props.index} />
                <Protocolo info={this.props.data.info} />
            </PanelGroup>
        )
    }
}