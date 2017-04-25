import React, { Component } from "react";

import Acoes from "../../components/acoes/Acoes";
import Administracao from "../../components/quadroAdministrativo/QuadroAdministrativo";
import CadastroCnpjCnaesSecundarias from "../../components/dadosBasicos/CadastroCnpjCnaesSecundarias";
import ChequesSemFundo from "../../components/cheques/ChequeSemFundo";
import Consultas from "../../components/consultasAnteriores/Consultas";
import Dados from "../../components/dadosBasicos/Dados";
import DadosPj from "../../components/dadosBasicos/DadosPj";
import Emails from "../../components/email/Email";
import Enderecos from "../../components/endereco/Endereco";
import QuadroResumo from "../../components/quadroResumo/QuadroResumo";
import OutrasGrafias from "../../components/outrasGrafias/OutrasGrafias";
import PanelGroup from "../../components/panel/PanelGroup";
import Protocolo from "../../components/protocolo/Protocolo";
import Protestos from "../../components/protesto/Protesto";
import RendaPresumida from "../../components/renda/RendaPresumida";
import RegistroDebito from "../../components/registroDebito/RegistroDebito";
import Sociedades from "../../components/sociedades/Sociedades";
import Socios from "../../components/sociedades/Socios";
import Score from "../../components/score/Score";
import Telefones from "../../components/telefone/Telefone";

export default class CreditoView extends Component {
    render(){
        return (
            <PanelGroup>
                {this.props.tipo == "CPF" ?
                    <Dados dados={this.props.data.cadastro} />
                : <DadosPj dados={this.props.data.cadastro} />}
                <Telefones telefones={this.props.data.telefones} />
                <Emails emails={this.props.data.emails} />
                <Enderecos enderecos={this.props.data.enderecos} />
                <QuadroResumo ocorrencias={this.props.data.quadroResumo} index={this.props.index} />
                {/*<RendaPresumida rendas={this.props.data.rendasPresumidas} limiteSugerido={this.props.data.limiteSugerido} index={this.props.index}/>*/}
                {this.props.tipo == "CNPJ" ?
                    <CadastroCnpjCnaesSecundarias cnpjCnaesSecundarias={this.props.data.cadastroCnpjCnaesSecundarias} index={this.props.index} />
                : ""}
                <Sociedades
                    participacoes={this.props.data.participacoesEmpresas}
                    index={this.props.index}
                    searchPerson={this.props.searchPerson} />
                {this.props.tipo == "CNPJ" ?
                    <span>
                        <Socios 
                            socios={this.props.data.quadroSocietario}
                            index={this.props.index}
                            searchPerson={this.props.searchPerson} />
                        <Administracao administradores={this.props.data.quadroAdministrativo} index={this.props.index} />
                    </span>
                : ""}
                <Score scores={this.props.data.scores} index={this.props.index} />
                <Protestos protestos={this.props.data.protestosDetalhados} index={this.props.index}/>
                <ChequesSemFundo cheques={this.props.data.cheques} index={this.props.index}/>
                <RegistroDebito registros={this.props.data.registrosDebitos} index={this.props.index} />
                <Acoes acoes={this.props.data.acoes} index={this.props.index} />
                <OutrasGrafias grafias={this.props.data.outrasGrafias} index={this.props.index} />
                <Consultas
                    consultas={this.props.data.consultasAnteriores}
                    index={this.props.index} 
                    searchPerson={this.props.searchPerson} />
                <Protocolo info={this.props.data.cabecalho} />
            </PanelGroup>
        )
    }
}