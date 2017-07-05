import React from 'react'

// Components
import PanelGroup from "../../components/panel/PanelGroup"
import CardWithTable from "../../components/card/CardWithTable"
import QuadroSocialCompleto from "../../components/sociedades/QuadroSocialCompleto"
import Enderecos from "../../components/endereco/Endereco"
import MyButton from "../../components/button/MyButton"
import Telefones from "../../components/telefone/Telefone"

//Constants
import { TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE } from "../../constants/utils"

// funcoes de apoio
import * as pattern from "../../components/utils/functions/patternDocuments"

const ButtonSearchDocument = (props) => {
    return (
        <MyButton
            tooltip={TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE}
            onClickButton={props.search}
            label={props.label}
            params={props.parameters}
        />
    )
}

const CreditoViewMix = (props) => {
    let data = props.data
    return (
        <PanelGroup>
                {data.cadastro ?
                    <CardWithTable title="DADOS CADASTRAIS"
                        mdLength={6}
                        elements={
                            data.cadastro.cpf ?
                            [
                                {label: "Documento", value:data.cadastro.cpf ? pattern.patternCPF(data.cadastro.cpf) : undefined},
                                {label: "Status CPF", value:data.cadastro.receitaStatus ? data.cadastro.receitaStatus : undefined},
                                {label: "Nome", value:data.cadastro.nome ? data.cadastro.nome : undefined},
                                {label: "Nascimento", value:data.cadastro.dataNascimento ? `${data.cadastro.dataNascimento} - ${data.cadastro.idade} anos` : undefined},
                                {label: "Sexo", value:data.cadastro.sexo ? data.cadastro.sexo : undefined},
                                {label: "Provável óbito", value:data.cadastro.obitoProvavel ? data.cadastro.obitoProvavel : undefined},
                                {label: "RG", value:data.cadastro.rgNumero ? data.cadastro.rgNumero + "/" + data.cadastro.rgUf : undefined},
                                {label: "Signo", value:data.cadastro.signo ? data.cadastro.signo : undefined},
                                {label: "Faixa idade", value:data.cadastro.faixaIdade ? data.cadastro.faixaIdade : undefined},
                                {label: "Data status CPF", value:data.cadastro.dataReceitaStatus ? data.cadastro.dataReceitaStatus : undefined},
                                {label: "Titulo de eleitor", value:data.cadastro.numeroTituloEleitor ? data.cadastro.numeroTituloEleitor : undefined},
                                {label: "Estado civil", value:data.cadastro.estadoCivil ? data.cadastro.estadoCivil : undefined},
                                {label: "Grau de instrução", value:data.cadastro.grauInstrucao ? data.cadastro.grauInstrucao : undefined},
                                {label: "Email", value:data.cadastro.email ? data.cadastro.email : undefined},
                                {label: "Gasto Estimado Valor", value:data.cadastro.gastoEstimadoValor ? data.cadastro.gastoEstimadoValor : undefined},
                                {label: "Gasto Estimado Faixa", value:data.cadastro.gastoEstimadoFaixa ? data.cadastro.gastoEstimadoFaixa : undefined},
                                {label: "Índice Relacionamento Mercado", value:data.cadastro.indiceRelacionamentoMercado ? data.cadastro.indiceRelacionamentoMercado : undefined},
                                {label: "Email", value:data.cadastro.email ? data.cadastro.email : undefined},
                                {label: "Nome Mãe", value:data.cadastro.nomeMae ? data.cadastro.nomeMae : undefined},
                            ] :
                            [
                                {label: "Documento", value:data.cadastro.cnpj ? pattern.patternCNPJ(data.cadastro.cnpj) : undefined},
                                {label: "Status CNPJ", value:data.cadastro.receitaStatus ? data.cadastro.receitaStatus : undefined},
                                {label: "Razão social", value:data.cadastro.razaoSocial ? data.cadastro.razaoSocial : undefined},
                                {label: "Quantidade de funcionários", value:data.cadastro.quantidadeFuncionarios ? data.cadastro.quantidadeFuncionarios : undefined},
                                {label: "Nome Fantasia", value:data.cadastro.nomeFantasia ? data.cadastro.nomeFantasia : undefined},
                                {label: "Porte", value:data.cadastro.porteEmpresa ? data.cadastro.porteEmpresa : undefined},
                                {label: "Situação sintegra", value:data.cadastro.sintegraSituacao ? data.cadastro.sintegraSituacao : undefined},
                                {label: "Data Situação Sintegra", value:data.cadastro.dataSintegraSituacao ? data.cadastro.dataSintegraSituacao : undefined},
                                {label: "Inscrição estadual", value:data.cadastro.inscricaoEstadual ? data.cadastro.inscricaoEstadual : undefined},
                                {label: "Abertura", value:data.cadastro.dataAbertura ? data.cadastro.dataAbertura : undefined},
                                {label: "Idade", value:data.cadastro.idadeEmpresa ? data.cadastro.idadeEmpresa : undefined},
                                {label: "Tipo Empresa", value:data.cadastro.tipoEmpresa ? data.cadastro.tipoEmpresa : undefined},
                                {label: "CNAE", value:data.cadastro.cnae ? data.cadastro.cnae : undefined},
                                {label: "Descrição CNAE", value:data.cadastro.cnaeDescricao ? data.cadastro.cnaeDescricao : undefined},
                                {label: "Grupo CNAE", value:data.cadastro.cnaeGrupo ? data.cadastro.cnaeGrupo : undefined},
                                {label: "Subgrupo CNAE", value:data.cadastro.cnaeSubgrupo ? data.cadastro.cnaeSubgrupo : undefined},
                                {label: "Nire", value:data.cadastro.nire ? data.cadastro.nire : undefined},
                                {label: "Regime Tributário", value:data.cadastro.regimeTributario ? data.cadastro.regimeTributario : undefined},
                                {label: "Natureza Jurídica", value:data.cadastro.naturezaJuridica ? data.cadastro.naturezaJuridica : undefined},
                                {label: "Regime tributário", value:data.cadastro.regimeTributario ? data.cadastro.regimeTributario : undefined},
                                {label: "Data da consulta na receita", value:data.cadastro.dataReceitaStatus ? data.cadastro.dataReceitaStatus : undefined},
                                {label: "Faixa de funcionários", value:data.cadastro.faixaFuncionarios ? data.cadastro.faixaFuncionarios : undefined},
                                {label: "Faixa de idade", value:data.cadastro.faixaIdade ? data.cadastro.faixaIdade : undefined},
                                {label: "Site", value:data.cadastro.site ? data.cadastro.site : undefined},
                                {label: "Capital Social", value:data.capitalSocial ? data.capitalSocial : undefined},
                            ]
                        }
                    />
                : ""}

                {data.quadroResumo || data.resumoConsulta ?
                    <CardWithTable title="QUADRO DE RESUMO"
                        fields={
                            [
                                {id:"descricao", name:"Descrição"},
                                {id:"quantidade", name:"Quantidade"},
                                {id:"primeiraOcorrencia", name:"Primeira Ocorrência"},
                                {id:"ultimaOcorrencia", name:"Última Ocorrência"},
                                {id:"valor", name:"Valor", functionToApply:(val) => {return <span>{pattern.formatCurrency(val)}</span>}}
                            ]
                        }
                        rows={data.quadroResumo || data.resumoConsulta}
                    />
                : ""}

                {data.score ?
                    <CardWithTable title="SCORE"
                        mdLength={3}
                        elements={
                            [
                               {label: "Classe", value:data.score.classe ? data.score.classe : undefined},
                               {label: "Pontos", value:data.score.pontos ? data.score.pontos : undefined},
                               {label: "Período", value:data.score.periodo ? data.score.periodo : undefined},
                               {label: "Descrição", value:data.score.descricao ? data.score.descricao : undefined},
                            ]
                        }
                    />
                : ""}

                {data.acoes ?
                    <CardWithTable title="AÇÕES"
                        fields={
                            [
                                {id:"tipoAcao", name:"Tipo Ação"},
                                {id:"dataAcao", name:"Data"},
                                {id:"cidade", name:"Cidade"},
                                {id:"vara", name:"Vara"},
                                {id:"valor", name:"Valor", functionToApply:(val) => {return <span>{pattern.formatCurrency(val)}</span>}},
                            ]
                        }
                        rows={data.acoes.listaAcoes}
                    />
                : ""}

                {data.cheques && data.cheques.cheques ?
                    <CardWithTable title="CHEQUES"
                        mdLength={6}
                        elements={
                            [
                               {label: "Última Ocorrência", value:data.cheques.dataUltimaOcorrencia ? data.cheques.dataUltimaOcorrencia : undefined},
                               {label: "Total", value:data.cheques.total ? data.cheques.total : undefined},
                            ]
                        }

                        fields={
                            [
                                {id:"agencia", name:"Agência"},
                                {id:"banco", name:"Banco"},
                                {id:"motivo", name:"Motivo"},
                                {id:"origem", name:"Origem"},
                                {id:"quantidade", name:"Quantidade"},
                                {id:"ultimoEm", name:"Data Último"}
                            ]
                        }
                        rows={data.cheques.cheques}
                    />
                : ""}

                {data.concedidos ?
                    <CardWithTable title="CONCEDIDOS"
                        
                    />
                : ""}

                {data.riscoSetor ?
                    <CardWithTable title="RISCO DO SETOR"
                        mdLength={3}
                        elements={
                            [
                               {label: "Pontuação", value:data.riscoSetor.pontuacao ? data.riscoSetor.pontuacao : undefined},
                               {label: "Probabilidade Inadimplência", value:data.riscoSetor.probabilidadeMediaInadimplencia ? data.riscoSetor.probabilidadeMediaInadimplencia : undefined},
                               {label: "Interpretação", value:data.riscoSetor.interpretacao ? data.riscoSetor.interpretacao : undefined},
                               {label: "Mais Informações", value:data.riscoSetor.maisInformacoes ? data.riscoSetor.maisInformacoes : undefined},
                            ]
                        }
                    />
                : ""}

                {data.consultasAnteriores && data.consultasAnteriores.consultas ?
                    <CardWithTable title="CONSULTAS ANTERIORES"
                        mdLength={6}
                        elements={
                            [
                               {label: "Última Ocorrência", value:data.consultasAnteriores.dataUltimaOcorrencia ? data.consultasAnteriores.dataUltimaOcorrencia : undefined},
                               {label: "Total", value:data.consultasAnteriores.quantidadeTotal ? data.consultasAnteriores.quantidadeTotal : undefined},
                            ]
                        }

                        fields={
                            [
                                {id:"consultante", name:"Consultante"},
                                {id:"data", name:"Data da consulta"}
                            ]
                        }
                        rows={data.consultasAnteriores.consultas}
                    />
                : ""}

                {data.emails ?
                    <CardWithTable title="EMAILS"

                    />
                : ""}

                <Enderecos enderecos={props.data.enderecos || props.data.ultimosEnderecos} />

                {data.limiteSugerido ?
                    <CardWithTable title="LIMITE SUGERIDO"

                    />
                : ""}

                {data.outrasGrafias ?
                    <CardWithTable title="OUTRAS GRAFIAS"
                        fields={
                            [
                                {id:"nome", name:"Grafia"},
                            ]
                        }
                        rows={data.outrasGrafias}
                    />
                : ""}

                {data.participacoesEmpresas ?
                    <CardWithTable title="PARTICIPAÇÕES EM EMPRESAS"
                        fields={
                            [
                                {id:"nome", name:"Nome", functionToApply:(nome, indexRow) => {
                                    return <ButtonSearchDocument
                                        search={props.onClickDocument}
                                        label={nome}
                                        parameters={[data.quadroSocietario[indexRow].documento]} />}
                                },
                                {id:"participacao", name:"Participação"}
                            ]
                        }
                        rows={data.participacoesEmpresas}

                        hiddenRows={
                            [
                                {id:"dataEntrada", name:"Data entrada"},
                                {id:"dataSaida", name:"Data saída"},
                                {id:"valorParticipacao", name:"Valor participação"}
                            ]
                        }
                    />
                : ""}

                {data.quadroSocietario ?
                    <CardWithTable title="QUADRO SOCIETÁRIO"
                        fields={
                            [
                                {id:"nome", name:"Nome", functionToApply:(nome, indexRow) => {
                                    return <ButtonSearchDocument
                                        search={props.onClickDocument}
                                        label={nome}
                                        parameters={[data.quadroSocietario[indexRow].documento]} />}
                                },
                                {id:"participacao", name:"Participação"}
                            ]
                        }
                        rows={data.quadroSocietario}

                        hiddenRows={
                            [
                                {id:"dataEntrada", name:"Data entrada"},
                                {id:"dataSaida", name:"Data saída"},
                                {id:"valorParticipacao", name:"Valor", functionToApply:(val) => {return <span>{pattern.formatCurrency(val)}</span>}},
                            ]
                        }
                    />
                : ""}

                {/*
                    Serrano pediu para retirar pois as informacoes nao sao tão diferentes dos outros quadros
                    data.quadroAdministrativo ?
                    <CardWithTable title="QUADRO ADMINISTRATIVO"
                        fields={
                            [
                                {id:"nome", name:"Nome"},
                                {id:"cargo", name:"Cargo"},
                                {id:"vinculo", name:"Vínculo"}
                            ]
                        }
                        rows={data.quadroAdministrativo}
                    />
                : ""*/}

                {data.quadroSocialCompleto ?
                    <QuadroSocialCompleto quadroSocialCompleto={data.quadroSocialCompleto} search={props.onClickDocument} />
                : ""}

                {data.spcs ?
                    <CardWithTable title="SPC"
                        mdLength={12}
                        elements={
                            [
                               {label: "Total", value:data.spcs.valorTotal ? pattern.formatCurrency(data.spcs.valorTotal) : undefined},
                            ]
                        }
                        fields={
                            [
                                {id:"dataInclusao", name:"Inclusão"},
                                {id:"dataVencimento", name:"Vencimento"},
                                {id:"nomeAssociado", name:"Associado"},
                                {id:"cidadeAssociado", name:"Cidade Associado"},
                                {id:"compradorFiadorAvalista", name:"Comprador/Fiador/Avalista"},
                                {id:"estadoAssociado", name:"Estado Associado"},
                                {id:"contrato", name:"Contrato"},
                                {id:"nomeEntidade", name:"Entidade"},
                                {id:"registroInstituicaoFinanceira", name:"Registro"},
                                {id:"valor", name:"Valor", functionToApply:(val) => {return <span>{pattern.formatCurrency(val)}</span>}},
                            ]
                        }
                        rows={data.spcs.spc}
                    />
                : ""}

                {data.protestosDetalhados && data.protestosDetalhados.protestosDetalhados ?
                    <CardWithTable title="PROTESTOS"
                        mdLength={3}
                        elements={
                            [
                               {label: "Ocorrência Mais Antiga", value:data.protestosDetalhados.ocorrenciaMaisAntiga ? data.protestosDetalhados.ocorrenciaMaisAntiga : undefined},
                               {label: "Última Ocorrência", value:data.protestosDetalhados.ocorrenciaMaisRecente ? data.protestosDetalhados.ocorrenciaMaisRecente : undefined},
                               {label: "Quantidade", value:data.consultasAnteriores.quantidadeRegistros ? data.consultasAnteriores.quantidadeRegistros : undefined},
                               {label: "Total", value:data.consultasAnteriores.valorTotal ? pattern.formatCurrency(data.consultasAnteriores.valorTotal) : undefined},
                            ]
                        }

                        fields={
                            [
                                {id:"cartorio", name:"Cartório"},
                                {id:"cidade", name:"Cidade"},
                                {id:"uf", name:"UF"},
                                {id:"dataProtesto", name:"Data"},
                                {id:"valor", name:"Valor", functionToApply:(val) => {return <span>{pattern.formatCurrency(val)}</span>}},
                            ]
                        }
                        rows={data.protestosDetalhados.protestosDetalhados}

                        hiddenRows={
                            [
                                {id:"dataVencimento", name:"Data Vencimento"},
                                {id:"dataProtesto", name:"Data Protesto"},
                                {id:"grupo", name:"Grupo"},
                                {id:"informacoesAdicionais", name:"Informações"}
                            ]
                        }
                    />
                : ""}

                {data.protestosSimples ?
                    <CardWithTable title="PROTESTOS SIMPLES"

                    />
                : ""}

                {data.registrosDebitos && data.registrosDebitos.registrosDebitos ?
                    <CardWithTable title="REGISTRO DE DÉBITOS"
                        fields={
                            [
                                {id:"avalistaComprador", name:"Avalista comprador"},
                                {id:"dataInclusao", name:"Data Inclusão"},
                                {id:"valor", name:"Valor"}
                            ]
                        }
                        rows={data.registrosDebitos.registrosDebitos}

                        hiddenRows={
                            [
                                {id:"cidade", name:"Cidade"},
                                {id:"dataVencimento", name:"Grupo"},
                                {id:"telefone", name:"Telefone"},
                                {id:"contrato", name:"Contrato"},
                                {id:"situacao", name:"Situação"},
                                {id:"praca", name:"Praça"},
                                {id:"informacoesAdicionais", name:"Informações"}
                            ]
                        }
                    />
                : ""}

                {data.cadastroCnpjCnaesSecundarias ?
                    <CardWithTable title="CNAES SECUNDÁRIAS"
                        fields={
                            [
                                {id:"cnae", name:"CNAE"},
                                {id:"descricao", name:"Descrição"},
                                {id:"grupo", name:"Grupo"}
                            ]
                        }
                        rows={data.cadastroCnpjCnaesSecundarias}
                    />
                : ""}

                <Telefones telefones={props.data.telefones || props.data.ultimosTelefonesInformados} />
        </PanelGroup>
    );
};

export default CreditoViewMix;