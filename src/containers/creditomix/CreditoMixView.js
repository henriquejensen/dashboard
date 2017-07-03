import React from 'react'

// Components
import PanelGroup from "../../components/panel/PanelGroup"
import CardWithTable from "../../components/card/CardWithTable"
import Enderecos from "../../components/endereco/Endereco"
import Telefones from "../../components/telefone/Telefone"

// funcoes de apoio
import * as pattern from "../../components/utils/functions/patternDocuments"

const CreditoViewMix = (props) => {
    let data = props.data
    return (
        <PanelGroup>
                {data.cadastro ?
                    <CardWithTable title="DADOS CADASTRAIS"
                        mdLength={6}
                        elements={
                            [
                                {label: "Documento", value:data.cadastro.cpf ? pattern.patternCPF(data.cadastro.cpf) : undefined},
                                {label: "Status CPF", value:data.cadastro.status ? data.cadastro.status : undefined},
                                {label: "Nome", value:data.cadastro.nome ? data.cadastro.nome : undefined},
                                {label: "Nascimento", value:data.cadastro.dataNascimento ? data.cadastro.dataNascimento + " " + data.cadastro.idade + " anos" : undefined},
                                {label: "Sexo", value:data.cadastro.sexo ? data.cadastro.sexo : undefined},
                                {label: "Provável óbito", value:data.cadastro.obitoProvavel ? data.cadastro.obitoProvavel : undefined},
                                {label: "RG", value:data.cadastro.rg ? data.cadastro.rg + data.cadastro.ufRg : undefined},
                                {label: "Signo", value:data.cadastro.signo ? data.cadastro.signo : undefined},
                                {label: "Faixa idade", value:data.cadastro.faixaIdade ? data.cadastro.faixaIdade : undefined},
                                {label: "Data status CPF", value:data.cadastro.status ? data.cadastro.status : undefined},
                                {label: "Titulo de eleitor", value:data.cadastro.tituloEleitoral ? data.cadastro.tituloEleitoral : undefined},
                                {label: "Estado civil", value:data.cadastro.estadoCivil ? data.cadastro.estadoCivil : undefined},
                            ]
                        }
                    />
                : ""}

                {data.quadroResumo ?
                    <CardWithTable title="QUADRO DE RESUMO"
                        fields={
                            [
                                {id:"descricao", name:"Descrição"},
                                {id:"primeiraOcorrencia", name:"Primeira Ocorrência"},
                                {id:"quantidade", name:"Quantidade"},
                                {id:"ultimaOcorrencia", name:"Última Ocorrência"},
                                {id:"valor", name:"Valor", functionToApply:(val) => {return <span>{pattern.formatCurrency(val)}</span>}}
                            ]
                        }
                        rows={data.quadroResumo}
                    />
                : ""}

                {data.acoes ?
                    <CardWithTable title="AÇÕES"
                        fields={
                            [
                                {id:"dataAcao", name:"Data"},
                                {id:"vara", name:"Vara"},
                                {id:"cidade", name:"Cidade"}
                            ]
                        }
                        rows={data.acoes.acoes ? data.acoes.acoes : []}
                    />
                : ""}

                {data.cheques && data.cheques.cheques ?
                    <CardWithTable title="CHEQUES"
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

                {data.consultasAnteriores && data.consultasAnteriores.consultasAnteriores ?
                    <CardWithTable title="CONSULTAS ANTERIORES"
                        fields={
                            [
                                {id:"consultante", name:"Consultante"},
                                {id:"data", name:"Data da consulta"}
                            ]
                        }
                        rows={data.consultasAnteriores.consultasAnteriores}
                    />
                : ""}

                {data.emails ?
                    <CardWithTable title="EMAILS"

                    />
                : ""}

                <Enderecos enderecos={props.data.enderecos} />

                {data.limiteSugerido ?
                    <CardWithTable title="LIMITE SUGERIDO"

                    />
                : ""}

                {data.outrasGrafias ?
                    <CardWithTable title="OUTRAS GRAFIAS"

                    />
                : ""}

                {data.outrasGrafias ?
                    <CardWithTable title="PARTICIPAÇÕES EM EMPRESAS"
                        fields={
                            [
                                {id:"nome", name:"Nome"},
                                {id:"participacao", name:"Participação"}
                            ]
                        }
                        rows={data.consultasAnteriores.consultasAnteriores}

                        hiddenRows={
                            [
                                {id:"dataEntrada", name:"Data entrada"},
                                {id:"dataSaida", name:"Data saída"},
                                {id:"valorParticipacao", name:"Valor participação"}
                            ]
                        }
                    />
                : ""}

                {data.protestosDetalhados && data.protestosDetalhados.protestosDetalhados ?
                    <CardWithTable title="PROTESTOS"
                        fields={
                            [
                                {id:"cartorio", name:"Cartório"},
                                {id:"cidade", name:"Cidade"},
                                {id:"uf", name:"UF"},
                                {id:"dataProtesto", name:"Data"},
                                {id:"valor", name:"Valor"},
                            ]
                        }
                        rows={data.protestosDetalhados.protestosDetalhados}

                        hiddenRows={
                            [
                                {id:"dataVencimento", name:"Data vencimento"},
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

                <Telefones telefones={props.data.telefones} />
        </PanelGroup>
    );
};

export default CreditoViewMix;