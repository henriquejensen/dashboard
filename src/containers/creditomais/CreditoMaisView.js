import React from 'react'

// Components
import PanelGroup from "../../components/panel/PanelGroup"
import CardWithTable from "../../components/card/CardWithTable"
import Enderecos from "../../components/endereco/Endereco"
import MyButton from "../../components/button/MyButton"
import QuadroSocialCompleto from "../../components/sociedades/QuadroSocialCompleto"
import Telefones from "../../components/telefone/Telefone"

//Constants
import { NENHUM_REGISTRO, TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE } from "../../constants/utils"

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

const renderCheque = ({title, cheque}) => {
    return (
        <CardWithTable title={title}
            mdLength={6}
            elements={
                [
                    {label: "Última Ocorrência", value:cheque.dataUltimaOcorrencia ? cheque.dataUltimaOcorrencia : undefined},
                    {label: "Total", value:cheque.total ? cheque.total : undefined},
                ]
            }

            fields={
                [
                    {id:"banco", name:"Banco"},
                    {id:"numeroAgencia", name:"Nº Agência"},
                    {id:"motivo", name:"Motivo"},
                    {id:"quantidade", name:"Quantidade"},
                    {id:"ultimoEm", name:"Data Último"}
                ]
            }
            rows={cheque.cheques}
        />
    )
}

const renderCard = (data, key, props) => {
    switch(key) {
        case "cadastro":
            return <CardWithTable title="DADOS CADASTRAIS"
                mdLength={6}
                elements={
                    [
                        {label: "Documento", value:data.cadastro.cpf ? pattern.patternCPF(data.cadastro.cpf) : undefined},
                        {label: "Documento", value:data.cadastro.cnpj ? pattern.patternCNPJ(data.cadastro.cnpj) : undefined},
                        {label: "Status Documento", value:data.cadastro.receitaStatus ? 
                            <span className={data.cadastro.receitaStatus == "ATIVA" || data.cadastro.receitaStatus == "REGULAR" ? "destaque-ativado" : "destaque-desativado"}>{data.cadastro.receitaStatus}</span> : undefined},
                        {label: "Nome", value:data.cadastro.nome ? data.cadastro.nome : undefined},
                        {label: "Nascimento", value:data.cadastro.dataNascimento ? `${data.cadastro.dataNascimento} - ${data.cadastro.idade} anos` : undefined},
                        {label: "Sexo", value:data.cadastro.sexo ? data.cadastro.sexo : undefined},
                        {label: "Provável óbito", value:data.cadastro.obitoProvavel ? data.cadastro.obitoProvavel : undefined},
                        {label: "RG", value:data.cadastro.rgNumero && data.cadastro.rgUf ?
                            data.cadastro.rgNumero + "/" + data.cadastro.rgUf :
                            data.cadastro.rgNumero ? data.cadastro.rgNumero : undefined},
                        {label: "Signo", value:data.cadastro.signo ? data.cadastro.signo : undefined},
                        {label: "Faixa idade", value:data.cadastro.faixaIdade ? data.cadastro.faixaIdade : undefined},
                        {label: "Receita Status", value:data.cadastro.dataReceitaStatus ? data.cadastro.dataReceitaStatus : undefined},
                        {label: "Titulo de eleitor", value:data.cadastro.numeroTituloEleitor ? data.cadastro.numeroTituloEleitor : undefined},
                        {label: "Estado civil", value:data.cadastro.estadoCivil ? data.cadastro.estadoCivil : undefined},
                        {label: "Grau de instrução", value:data.cadastro.grauInstrucao ? data.cadastro.grauInstrucao : undefined},
                        {label: "Email", value:data.cadastro.email ? data.cadastro.email : undefined},
                        {label: "Índice Relacionamento Mercado", value:data.cadastro.indiceRelacionamentoMercado ? data.cadastro.indiceRelacionamentoMercado : undefined},
                        {label: "Email", value:data.cadastro.email ? data.cadastro.email : undefined},
                        {label: "Nome Mãe", value:data.cadastro.maeNome || data.cadastro.nomeMae ? data.cadastro.maeNome || data.cadastro.nomeMae : undefined},
                        {label: "Alerta Identidade", value:data.cadastro.alertaIdentidade ? <span className="destaque-ativado">{data.cadastro.alertaIdentidade}</span> : undefined},
                        //CNPJ
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
                        {label: "Nire", value:data.cadastro.nire ? data.cadastro.nire : undefined},
                        {label: "Regime Tributário", value:data.cadastro.regimeTributario ? data.cadastro.regimeTributario : undefined},
                        {label: "Natureza Jurídica", value:data.cadastro.naturezaJuridica ? data.cadastro.naturezaJuridica : undefined},
                        {label: "Regime tributário", value:data.cadastro.regimeTributario ? data.cadastro.regimeTributario : undefined},
                        {label: "Data da consulta na receita", value:data.cadastro.dataReceitaStatus ? data.cadastro.dataReceitaStatus : undefined},
                        {label: "Faixa de funcionários", value:data.cadastro.faixaFuncionarios ? data.cadastro.faixaFuncionarios : undefined},
                        {label: "Faixa de idade", value:data.cadastro.faixaIdade ? data.cadastro.faixaIdade : undefined},
                        {label: "Site", value:data.cadastro.site ? data.cadastro.site : undefined},
                        {label: "Capital Social", value:data.capitalSocial ? data.capitalSocial : undefined},
                        {label: "CNAE", value:data.cadastro.cnae ? data.cadastro.cnae : undefined},
                        {label: "Grupo CNAE", value:data.cadastro.cnaeGrupo ? data.cadastro.cnaeGrupo : undefined},
                        {label: "Subgrupo CNAE", value:data.cadastro.cnaeSubgrupo ? data.cadastro.cnaeSubgrupo : undefined},
                        {label: "Descrição CNAE", value:data.cadastro.cnaeDescricao ? data.cadastro.cnaeDescricao : undefined},
                    ]
                }
            />

        case "quadroResumo":
        case "resumoConsulta":
            return <CardWithTable title="QUADRO DE RESUMO"
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

        case "gastoEstimado":
            return <CardWithTable title="GASTO ESTIMADO"
                mdLength={6}
                elements= {
                    [
                        {label: "Valor Total", value:data.gastoEstimado.valorTotal ? pattern.formatCurrency(data.gastoEstimado.valorTotal) : undefined},
                        {label: "Faixa", value:data.gastoEstimado.faixaValor ? data.gastoEstimado.faixaValor : undefined},
                        {label: "Interpretação", value:data.gastoEstimado.interpretacao ? data.gastoEstimado.interpretacao : undefined},
                        {label: "Quantidade", value:data.gastoEstimado.quantidade ? data.gastoEstimado.quantidade : undefined},
                        {label: "Mensagem", value:data.gastoEstimado.mensagem ? data.gastoEstimado.mensagem : undefined},
                    ]
                }
            />

        case "store":
            return <CardWithTable title="SCORE"
                fields={
                    [
                        {id:"classe", name:"Classe"},
                        {id:"descricao", name:"Descrição"},
                        {id:"periodo", name:"Período"},
                        {id:"pontos", name:"Pontos"},
                        {id:"tipo", name:"Tipo"},
                    ]
                }
                rows={data.score}
            />

        case "acoes":
            return <CardWithTable title="AÇÕES"
                fields={
                    [
                        {id:"tipoAcao", name:"Tipo Ação"},
                        {id:"dataAcao", name:"Data"},
                        {id:"forum", name:"Fórum"},
                        {id:"cidade", name:"Cidade"},
                        {id:"vara", name:"Vara"},
                        {id:"valor", name:"Valor", functionToApply:(val) => {return <span>{pattern.formatCurrency(val)}</span>}},
                    ]
                }
                rows={data.acoes.listaAcoes}
            />

        case "chequesLojista":
            return renderCheque({title:"CHEQUES LOGISTA", cheque:data.chequesLojista})

        case "cheques":
            return renderCheque({title:"CHEQUES", cheque:data.cheques})

        case "contraOrdem":
            return renderCheque({title:"CHEQUES CONTRA ORDEM", cheque:data.contraOrdem})

        case "contraOrdemDocumentoDiferente":
            return renderCheque({title:"CHEQUES CONTRA ORDEM DOCUMENTO DIFERENTE", cheque:data.contraOrdemDocumentoDiferente})

        case "contumacia":
            return renderCheque({title:"CONTUMACIA", cheque:data.contumacia})

        case "contumacia":
            return renderCheque({title:"CONTUMACIA", cheque:data.contumacia})

        case "informacaoPoderJudiciario":
            return <CardWithTable title="INFORMAÇÃO DO PODER JUDICIÁRIO"
                mdLength={3}
                elements={
                    [
                        {label: "Primeira Ocorrência", value:data.informacaoPoderJudiciario.dataPrimeiraOcorrencia ? data.informacaoPoderJudiciario.dataPrimeiraOcorrencia : NENHUM_REGISTRO},
                        {label: "Última Ocorrência", value:data.informacaoPoderJudiciario.dataUltimaOcorrencia ? data.informacaoPoderJudiciario.dataUltimaOcorrencia : NENHUM_REGISTRO},
                        {label: "Quantidade Total", value:data.informacaoPoderJudiciario.quantidadeTotal ? data.informacaoPoderJudiciario.quantidadeTotal : NENHUM_REGISTRO},
                        {label: "Valor Total", value:data.informacaoPoderJudiciario.valorTotal ? data.informacaoPoderJudiciario.valorTotal : NENHUM_REGISTRO},
                    ]
                }
            />

        case "riscoSetor":
            return <CardWithTable title="RISCO DO SETOR"
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

        case "consultasAnteriores" :
            return <CardWithTable title="CONSULTAS ANTERIORES"
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
                        {id:"data", name:"Data da consulta"},
                        {id:"cidade", name:"Cidade de Origem"},
                        {id:"uf", name:"UF"},
                    ]
                }
                rows={data.consultasAnteriores.consultas || data.consultasAnteriores.consultasAnteriores}
            />

        case "limiteCredito":
            return <CardWithTable title="LIMITE CRÉDITO"
                mdLength={6}
                elements={
                    [
                        {label: "Valor Crédito", value:data.limiteCredito.valorLimiteCredito ? pattern.formatCurrency(data.limiteCredito.valorLimiteCredito) : NENHUM_REGISTRO},
                        {label: "Cálculo", value:data.limiteCredito.dataCalculo ? data.limiteCredito.dataCalculo : NENHUM_REGISTRO},
                        {label: "Metodologia", value:data.limiteCredito.interpretacao ? data.limiteCredito.interpretacao : undefined}
                    ]
                }
            />

        case "gastoEstimado":
            return <CardWithTable title="GASTO ESTIMADO"
                mdLength={12}
                elements={
                    [
                        {label: "Valor Total", value:data.gastoEstimado.valorTotal ? pattern.formatCurrency(data.gastoEstimado.valorTotal) : NENHUM_REGISTRO},
                        {label: "Metodologia", value:data.gastoEstimado.interpretacao ? data.gastoEstimado.interpretacao : undefined}
                    ]
                }
            />

        case "rendasPresumidas":
            return <CardWithTable title="RENDA PRESUMIDA"
                mdLength={6}
                elements={
                    [
                        {label: "Valor Total", value:data.rendasPresumidas.valorTotal ? pattern.formatCurrency(data.rendasPresumidas.valorTotal) : undefined},
                        {label: "Valor Mediano", value:data.rendasPresumidas.mediana ? pattern.formatCurrency(data.rendasPresumidas.mediana) : undefined},
                    ]
                }

                fields={
                    [
                        {id:"descricao", name:"Descrição"},
                        {id:"probabilidade", name:"Probabilidade", functionToApply:(val) => {return <span>{`${val}%`}</span>}},
                    ]
                }
                rows={data.rendasPresumidas.faixasRenda}
            />

        case "faturamentoPresumido":
            return <CardWithTable title="FATURAMENTO PRESUMIDO"
                mdLength={12}
                elements={
                    [
                        {label: "Anual", value:data.faturamentoPresumido.anual ? pattern.formatCurrency(data.faturamentoPresumido.anual) : NENHUM_REGISTRO},
                        {label: "Interpretação", value:"INTERPRETAÇÃO O RESULTADO É CALCULADO POR MEIO DE TÉCNICAS ESTATISTICAS QUE UTILIZAM INFORMAÇÕES CADASTRAIS E COMPORTAMENTO DA EMPRESA"}
                    ]
                }
            />

        case "participacoesEmpresas":
            return <CardWithTable title="PARTICIPAÇÕES EM EMPRESAS"
                fields={
                    [
                        {id:"nome", name:"Nome", functionToApply:(nome, indexRow) => {
                            return <ButtonSearchDocument
                                search={props.onClickDocument}
                                label={nome}
                                parameters={[data.participacoesEmpresas[indexRow].documento]} />}
                        },
                        {id:"relacao", name:"Tipo Relacionamento"},
                        {id:"participacao", name:"Participação", functionToApply:(val) => <span>{val}%</span>}
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

        case "quadroSocietario":
            return <CardWithTable title="QUADRO SOCIETÁRIO"
                fields={
                    [
                        {id:"nome", name:"Nome", functionToApply:(nome, indexRow) => {
                            return <ButtonSearchDocument
                                search={props.onClickDocument}
                                label={nome}
                                parameters={[data.quadroSocietario[indexRow].documento]} />}
                        },
                        {id:"posicao", name:"Posição"},
                        {id:"relacao", name:"Tipo Relacionamento"},
                        {id:"participacao", name:"Participação", functionToApply:(val) => <span>{val}%</span> }
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

        case "quadroSocialCompleto":
            return <QuadroSocialCompleto quadroSocialCompleto={data.quadroSocialCompleto} search={props.onClickDocument} />

        case "protestosDetalhados":
            return <CardWithTable title="PROTESTOS"
                mdLength={3}
                elements={
                    [
                        {label: "Ocorrência Mais Antiga", value:data.protestosDetalhados.ocorrenciaMaisAntiga ? data.protestosDetalhados.ocorrenciaMaisAntiga : undefined},
                        {label: "Última Ocorrência", value:data.protestosDetalhados.ocorrenciaMaisRecente ? data.protestosDetalhados.ocorrenciaMaisRecente : undefined},
                        {label: "Quantidade", value:data.protestosDetalhados.quantidadeRegistros ? data.protestosDetalhados.quantidadeRegistros : undefined},
                        {label: "Total", value:data.protestosDetalhados.valorTotal ? pattern.formatCurrency(data.protestosDetalhados.valorTotal) : undefined},
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

                /*hiddenRows={
                    [
                        {id:"dataVencimento", name:"Data Vencimento"},
                        {id:"grupo", name:"Grupo"},
                        {id:"informacoesAdicionais", name:"Informações"}
                    ]
                }*/
            />

        case "pendenciasFinanceiras":
            return <CardWithTable title="PENDÊNCIAS FINANCEIRAS"
                fields={
                    [
                        {id:"origem", name:"Origem"},
                        {id:"dataOcorrencia", name:"Ocorrência"},
                        {id:"contrato", name:"Contrato"},
                        {id:"avalista", name:"Avalista"},
                        {id:"valorPendencia", name:"Valor", functionToApply:(val) => {return <span>{pattern.formatCurrency(val)}</span>}},
                    ]
                }
                rows={data.pendenciasFinanceiras.pendencias}

                hiddenRows={
                    [
                        {id:"cidade", name:"Cidade"},
                        {id:"uf", name:"Estado"},
                        {id:"moeda", name:"Moeda"},
                        {id:"tituloOcorrencia", name:"Título da Ocorrência"}
                    ]
                }
            />

        case "spc":
            return <CardWithTable title="REGISTRO DE DÉBITOS"
                mdLength={12}
                elements={
                    [
                        {label: "Total", value:data.spc.valorTotal ? pattern.formatCurrency(data.spc.valorTotal) : undefined},
                    ]
                }
                fields={
                    [
                        {id:"dataInclusao", name:"Inclusão"},
                        {id:"dataVencimento", name:"Vencimento"},
                        {id:"nomeAssociado", name:"Associado"},
                        {id:"cidadeAssociado", name:"Cidade Associado", functionToApply:(val, indexRow) => {return <span>{val} {data.spc.listaSpc[indexRow].estadoAssociado ? "-" + data.spc.listaSpc[indexRow].estadoAssociado : ""}</span>}},
                        {id:"compradorFiadorAvalista", name:"Comprador/Fiador/Avalista"},
                        {id:"contrato", name:"Contrato"},
                        {id:"nomeEntidade", name:"Praça"},
                        {id:"registroInstituicaoFinanceira", name:"Registro"},
                        {id:"valor", name:"Valor", functionToApply:(val) => {return <span>{pattern.formatCurrency(val)}</span>}},
                    ]
                }
                rows={data.spc.listaSpc}
            />

        case "registrosDebitos":
            return <CardWithTable title="REGISTRO DE DÉBITOS"
                fields={
                    [
                        {id:"dataInclusao", name:"Inclusão"},
                        {id:"dataVencimento", name:"Vencimento"},
                        {id:"credor", name:"Credor"},
                        {id:"cidade", name:"Cidade Associado", functionToApply:(val, indexRow) => {return <span>{val} {data.registrosDebitos.registrosDebitos[indexRow].uf ? "-" + data.registrosDebitos.registrosDebitos[indexRow].uf : ""}</span>}},
                        {id:"avalistaComprador", name:"Comprador/Fiador/Avalista"},
                        {id:"contrato", name:"Contrato"},
                        {id:"praca", name:"Praça"},
                        {id:"valor", name:"Valor", functionToApply:(val) => {return <span>{pattern.formatCurrency(val)}</span>}},
                    ]
                }

                rows={data.registrosDebitos.registrosDebitos}
            />

        case "cadastroCnpjCnaesSecundarias":
            return <CardWithTable title="CNAES SECUNDÁRIAS"
                fields={
                    [
                        {id:"cnae", name:"CNAE"},
                        {id:"descricao", name:"Descrição"},
                        {id:"grupo", name:"Grupo"}
                    ]
                }
                rows={data.cadastroCnpjCnaesSecundarias}
            />

        case "enderecos":
        case "ultimosEnderecos":
            return <Enderecos enderecos={data.enderecos || data.ultimosEnderecos} />

        case "telefones":
        case "ultimosTelefonesInformados":
            return <Telefones telefones={data.telefones || data.ultimosTelefonesInformados} />

        case "outrasGrafias":
            return <CardWithTable title="OUTRAS GRAFIAS"
                fields={
                    [
                        {id:"nome", name:"Grafia"},
                    ]
                }
                rows={data.outrasGrafias}
            />
    }
}

const CreditoMaisView = (props) => {
    const data = props.data
    return (
        <PanelGroup>
            {data.ordem.map(key => {
                if(data[key])
                    return renderCard({[key]:data[key]}, key, props)
            })}
        </PanelGroup>
    )
}

export default CreditoMaisView