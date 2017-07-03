import React, { Component } from "react"

import Acoes from "../../components/acoes/Acoes"
import Administracao from "../../components/quadroAdministrativo/QuadroAdministrativo"
import CadastroCnpjCnaesSecundarias from "../../components/dadosBasicos/CadastroCnpjCnaesSecundarias"
import ChequesSemFundo from "../../components/cheques/ChequeSemFundo"
import Consultas from "../../components/consultasAnteriores/Consultas"
import Dados from "../../components/dadosBasicos/Dados"
import DadosPj from "../../components/dadosBasicos/DadosPj"
import Emails from "../../components/email/Email"
import Enderecos from "../../components/endereco/Endereco"
import QuadroResumo from "../../components/quadroResumo/QuadroResumo"
import OutrasGrafias from "../../components/outrasGrafias/OutrasGrafias"
import PanelGroup from "../../components/panel/PanelGroup"
import Protocolo from "../../components/protocolo/Protocolo"
import Protestos from "../../components/protesto/Protesto"
import RendaPresumida from "../../components/renda/RendaPresumida"
import RegistroDebito from "../../components/registroDebito/RegistroDebito"
import Sociedades from "../../components/sociedades/Sociedades"
import Socios from "../../components/sociedades/Socios"
import Score from "../../components/score/Score"
import Telefones from "../../components/telefone/Telefone"

import CardWithTable from "../../components/card/CardWithTable"

export default class CreditoView extends Component {
    render(){
        return (
            <PanelGroup>
                {this.props.tipo == "CPF" ?
                    <Dados dados={this.props.data.cadastro} />
                : <DadosPj dados={this.props.data.cadastro} />}

                {this.props.data.resumoConsulta ?
                    <CardWithTable title="RESUMO DA CONSULTA"
                        fields={
                            [
                                {id:"descricao", name:"Descrição"},
                                {id:"retorno", name:"Retorno da consulta"}
                            ]
                        }
                        rows={this.props.data.resumoConsulta}
                    />
                : ""}

                {this.props.data.situacaoReceita ?
                    <CardWithTable title="SITUAÇÃO NA RECEITA"
                        mdLength={4}
                        elements={
                            [
                                {label: "Situação", value:this.props.data.situacaoReceita.situacao ? this.props.data.situacaoReceita.situacao : undefined},
                                {label: "Data Emissão", value:this.props.data.situacaoReceita.dataEmissao ? this.props.data.situacaoReceita.dataEmissao : undefined},
                                {label: "Data Inscrição", value:this.props.data.situacaoReceita.dataInscricao ? this.props.data.situacaoReceita.dataInscricao : undefined},
                                {label: "Código Comprovante", value:this.props.data.situacaoReceita.codigoComprovante ? this.props.data.situacaoReceita.codigoComprovante : undefined},
                                {label: "Digíto Verificador", value:this.props.data.situacaoReceita.digitoVerificador ? this.props.data.situacaoReceita.digitoVerificador : undefined}
                            ]
                        }
                    />
                : ""}

                {this.props.data.quadroResumo ?
                    <QuadroResumo ocorrencias={this.props.data.quadroResumo} index={this.props.index} />
                : ""}

                {this.props.data.registrosDebitos ?
                    <RegistroDebito registros={this.props.data.registrosDebitos} index={this.props.index} />
                : ""}

                {this.props.data.protestosDetalhados ?
                    <Protestos protestos={this.props.data.protestosDetalhados} index={this.props.index}/>
                : ""}

                {this.props.data.ccf ?
                    <CardWithTable title="CCF"
                        fields={
                            [
                                {id:"dataUltimoCheque", name:"Último"},
                                {id:"origem", name:"Origem"},
                                {id:"motivo", name:"Motivo", functionToApply:(val) => {return <span>{val.descricao}</span>}},
                                {id:"ultimoCheque", name:"Banco/Agência - Último Cheque", functionToApply:(val) => {return <span>{val.banco.nome + "/" + val.numeroAgencia}</span>}}
                            ]
                        }
                        rows={this.props.data.ccf.detalhesCcf}
                    />
                : ""}

                {this.props.data.cheques ?
                    <ChequesSemFundo cheques={this.props.data.cheques} index={this.props.index}/>
                : ""}

                {this.props.data.acoes ?
                    <Acoes acoes={this.props.data.acoes} index={this.props.index} />
                : ""}
                
                {this.props.data.consultaRealizada ?
                    <CardWithTable title="CONSULTA"
                        mdLength={4}
                        elements={
                            [
                                {label: "Última Ocorrência", value:this.props.data.consultaRealizada.dataUltimaOcorrencia ? this.props.data.consultaRealizada.dataUltimaOcorrencia : undefined},
                                {label: "Quantidade Dias Consultados", value:this.props.data.consultaRealizada.quantidadeDiasConsultados ? this.props.data.consultaRealizada.quantidadeDiasConsultados : undefined},
                                {label: "Total", value:this.props.data.consultaRealizada.quantidadeTotal ? this.props.data.consultaRealizada.quantidadeTotal : undefined}
                            ]
                        }

                        fields={
                            [
                                {id:"dataConsulta", name:"Data"},
                                {id:"nomeAssociado", name:"Associado"},
                                {id:"nomeEntidadeOrigem", name:"Entidade Origem"},
                                {id:"origemAssociado", name:"Origem", functionToApply:(val) => {return <span>{val.nome + "/" + val.uf}</span>}}
                            ]
                        }
                        rows={this.props.data.consultaRealizada.ultimasConsultas}
                    />
                : ""}
                
                {this.props.data.consultasAnteriores ?
                    <Consultas
                        consultas={this.props.data.consultasAnteriores}
                        index={this.props.index} 
                        searchPerson={this.props.searchPerson} />
                : ""}

                {this.props.data.participacoesEmpresas ?
                    <Sociedades
                        participacoes={this.props.data.participacoesEmpresas}
                        index={this.props.index}
                        searchPerson={this.props.searchPerson} />
                : ""}

                {(this.props.data.quadroSocietario || this.props.data.socios) && this.props.tipo == "CNPJ" ?
                    <Socios 
                        socios={this.props.data.quadroSocietario}
                        index={this.props.index}
                        searchPerson={this.props.searchPerson} />
                : ""}

                {this.props.data.outrasGrafias ?
                    <OutrasGrafias grafias={this.props.data.outrasGrafias} index={this.props.index} />
                : ""}

                <Telefones telefones={this.props.data.telefones} />
                <Emails emails={this.props.data.emails} />

                <Enderecos enderecos={this.props.data.enderecos ? this.props.data.enderecos : this.props.data.ultimosEnderecos } />

                {this.props.tipo == "CNPJ" ?
                    <CadastroCnpjCnaesSecundarias cnpjCnaesSecundarias={this.props.data.cadastroCnpjCnaesSecundarias} index={this.props.index} />
                : ""}
                <Protocolo info={this.props.data.cabecalho} />
            </PanelGroup>
        )
    }
}