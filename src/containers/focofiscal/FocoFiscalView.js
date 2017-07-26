import React from "react";

import PanelGroup from "../../components/panel/PanelGroup";
import CardWithTable from "../../components/card/CardWithTable";
import Dados from "../../components/dadosBasicos/Dados";
import DadosPj from "../../components/dadosBasicos/DadosPj";
import Telefones from "../../components/telefone/Telefone";
import Emails from "../../components/email/Email";
import Enderecos from "../../components/endereco/Endereco";
import Protocolo from "../../components/protocolo/Protocolo";

// funcoes de apoio
import * as pattern from "../../components/utils/functions/patternDocuments";

const FocoFiscalView = (props) => {
    let data = props.data
    return (
        <PanelGroup>
            {data.cadastro ?
                <CardWithTable title="DADOS CADASTRAIS"
                    mdLength={6}
                    elements={
                        [
                            //Dados documento PF
                            {label: "Documento", value:data.cadastro.cpf ? pattern.patternCPF(data.cadastro.cpf) : undefined},
                            {label: "Nome", value:data.cadastro.nome ? data.cadastro.nome : undefined},
                            {label: "Nascimento", value:data.cadastro.dataNascimento && data.cadastro.idade ? data.cadastro.dataNascimento + " " + data.cadastro.idade + " anos" : data.cadastro.dataNascimento ? data.cadastro.dataNascimento : undefined},
                            {label: "Ano Óbito", value:data.cadastro.anoObito ? data.cadastro.anoObito : undefined},
                            {label: "Mensagem Óbito", value:data.cadastro.mensagemObito ? data.cadastro.mensagemObito : undefined},

                            //Dados documento PJ
                            {label: "Documento", value:data.cadastro.cnpj ? pattern.patternCNPJ(data.cadastro.cnpj) : undefined},
                            {label: "Inscrição Estadual", value:data.cadastro.numeroInscricaoEstadual ? data.cadastro.numeroInscricaoEstadual : undefined},
                            {label: "Data Abertura", value:data.cadastro.dataAbertura ? data.cadastro.dataAbertura : undefined},
                            {label: "Razão Social", value:data.cadastro.razaoSocial ? data.cadastro.razaoSocial : undefined},
                            {label: "Nome Fantasia", value:data.cadastro.nomeFantasia ? data.cadastro.nomeFantasia : undefined},
                            {label: "Ente Federativo Responsável", value:data.cadastro.enteFederativoResponsavel ? data.cadastro.enteFederativoResponsavel : undefined},
                            {label: "Email", value:data.cadastro.enderecoEletronico ? <a href={`mailto:${data.cadastro.enderecoEletronico}`}>{data.cadastro.enderecoEletronico}</a> : undefined},
                            {label: "Matriz/Filial", value:data.cadastro.matrizFilial ? data.cadastro.matrizFilial : undefined},
                            {label: "Capital Social", value:data.cadastro.capitalSocial ? pattern.formatCurrency(data.cadastro.capitalSocial) : undefined},
                            {label: "Porte Empresa", value:data.cadastro.porteEmpresa ? data.cadastro.porteEmpresa : undefined},
                            {label: "Natureza Jurídica", value:data.cadastro.naturezaJuridica ? data.cadastro.naturezaJuridica.codigo : undefined},
                            {label: "Natureza Descrição", value:data.cadastro.naturezaJuridica ? data.cadastro.naturezaJuridica.descricao : undefined}
                        ]
                    }
                />
            : ""}

            {data.cadastro && data.cadastro.cnaePrincipal ?
                <CardWithTable title="CNAE"
                    mdLength={6}
                    elements={
                        [
                            {label: "CNAE Principal", value:data.cadastro.cnaePrincipal.codigo ? data.cadastro.cnaePrincipal.codigo : undefined},
                            {label: "CNAE Principal Descrição", value:data.cadastro.cnaePrincipal.descricao ? data.cadastro.cnaePrincipal.descricao : undefined}
                        ]
                    }
                    fields={
                        [
                            {id:"codigo", name:"Código"},
                            {id:"descricao", name:"Descrição"}
                        ]
                    }
                    rows={data.cadastro.cnaesSecundarias}
                />
            : ""}

            {data.situacaoReceita ?
                <CardWithTable title="SITUAÇÃO RECEITA"
                    mdLength={6}
                    elements={
                        [
                            {label: "Situação Cadastral Receita", value:data.situacaoReceita.dataSituacaoCadastral ? data.situacaoReceita.dataSituacaoCadastral : undefined},
                            {label: "Data Emissão", value:data.situacaoReceita.dataEmissao ? data.situacaoReceita.dataEmissao : undefined},
                            {label: "Situação Cadastral", value:data.situacaoReceita.situacaoCadastral ? 
                                <span className={data.situacaoReceita.situacaoCadastral == "ATIVA" || data.situacaoReceita.situacaoCadastral == "REGULAR" ? "destaque-ativado" : "destaque-desativado"}>{data.situacaoReceita.situacaoCadastral}</span> : undefined},
                            {label: "Situação Especial", value:data.situacaoReceita.dataSituacaoEspecial ? data.situacaoReceita.dataSituacaoEspecial : undefined},
                            {label: "Código Comprovante", value:data.situacaoReceita.codigoComprovante ? data.situacaoReceita.codigoComprovante : undefined},
                        ]
                    }
                />
            : ""}

            {data.situacaoSintegra ?
                <CardWithTable title="SITUAÇÃO SINTEGRA"
                    mdLength={6}
                    elements={
                        [
                            {label: "Situação Contribuinte", value:data.situacaoSintegra.situacaoContribuinte ? data.situacaoSintegra.situacaoContribuinte : undefined},
                            {label: "Substituição Tributária", value:data.situacaoSintegra.substituicaoTributaria ? data.situacaoSintegra.substituicaoTributaria : undefined}
                        ]
                    }
                />
            : ""}

            {data.simplesNacional ?
                <CardWithTable title="SIMPLES NACIONAL"
                    mdLength={6}
                    elements={
                        [
                            {label: "", value:data.simplesNacional.optanteSimples.situacao ? data.simplesNacional.optanteSimples.situacao : undefined},
                            {label: "", value:data.simplesNacional.optanteSimei.situacao ? data.simplesNacional.optanteSimei.situacao : undefined},
                            {label: "", value:data.simplesNacional.optanteSimples.periodoAnterior ? data.simplesNacional.optanteSimples.periodoAnterior : undefined},
                            {label: "", value:data.simplesNacional.optanteSimei.periodosAnteriores ? data.simplesNacional.optanteSimei.periodosAnteriores : undefined},
                            {label: "", value:data.simplesNacional.optanteSimples.agendamento ? data.simplesNacional.optanteSimples.agendamento : undefined},
                            {label: "", value:data.simplesNacional.optanteSimples.eventosFuturos ? data.simplesNacional.optanteSimples.eventosFuturos : undefined},
                            {label: "", value:data.simplesNacional.optanteSimei.eventosFuturos ? data.simplesNacional.optanteSimei.eventosFuturos : undefined}
                        ]
                    }
                />
            : ""}

            {data.socios ?
                <CardWithTable title="SÓCIOS"
                    fields={
                        [
                            {id:"nome", name:"Nome"},
                            {id:"qualificacaoCodigo", name:"Qualificação"},
                            {id:"qualificacaoDescricao", name:"Descrição"}
                        ]
                    }
                    rows={data.socios}
                />
            : ""}

            {data.telefones ?
                <CardWithTable title="TELEFONES"
                    fields={
                        [
                            {id:"telefone", name:"Telefone"}
                        ]
                    }
                    rows={data.telefones}
                />
            : ""}

            {data.endereco ?
                <Enderecos enderecos={[props.data.endereco]} />
            : ""}

            <Protocolo info={props.data.cabecalho} />

            {data.erro ?
                <CardWithTable title="MENSAGEM DE ALERTA"
                    mdLength={12}
                    elements={
                        [
                            {label: "Mensagem", value:data.erro.mensagemErro ? data.erro.mensagemErro : undefined},
                        ]
                    }
                />
            : ""}
        </PanelGroup>
    )
}

export default FocoFiscalView