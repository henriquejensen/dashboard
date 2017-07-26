import React, { Component } from 'react';
import { Alert } from "react-bootstrap";

import PanelGroup from "../../components/panel/PanelGroup";
import CardWithTable from "../../components/card/CardWithTable";
import Protocolo from "../../components/protocolo/Protocolo";

import * as pattern from "../../components/utils/functions/patternDocuments";

import { INFORMATION_NOT_AVAILABLE } from "../../constants/utils";

class VeiculosView extends Component {
    mountComunicacaoVenda = (comunicacaoVenda) => {
        return [
            {label: "Ano exercicio licenciamento", value:comunicacaoVenda.anoExercicioLicenciamento},
            {label: "Data inclusão de venda", value:comunicacaoVenda.dataInclusaoVenda},
            {label: "Data venda", value:comunicacaoVenda.dataVenda},
            {label: "Documento Financiado", value:comunicacaoVenda.documentoFinanciado},
            {label: "Indicador comunicação de venda", value:comunicacaoVenda.indicadorComunicacaoVenda}
        ]
    }

    mountCrlv = (crlv) => {
        return [
            {label: "Data evento", value:crlv.dataEvento},
            {label: "Evento", value:crlv.evento},
            {label: "Tipo Documento", value:crlv.tipoDocumento},
            {label: "Observação", value:crlv.observacao},
        ]
    }

    mountDadosCondutor = (dadosCondutor) => {
        return [
            {label: "Categoria", value:dadosCondutor.categoria},
            {label: "CPF", value:dadosCondutor.cpf},
            {label: "Data nascimento", value:dadosCondutor.dataNascimento},
            {label: "Data Primeira Habilitação", value:dadosCondutor.dataPrimeiraHabilitacao},
            {label: "Data Vencimento CNH", value:dadosCondutor.dataVencimentoCnh},
            {label: "Modelo CNH", value:dadosCondutor.modeloCnh},
            {label: "Naturalidade", value:dadosCondutor.naturalidade},
            {label: "Nome", value:dadosCondutor.nome},
            {label: "Nome Mãe", value:dadosCondutor.nomeMae},
            {label: "Número CNH", value:dadosCondutor.numeroCnh},
            {label: "RG", value:dadosCondutor.rg},
            {label: "Situação", value:dadosCondutor.situacao},
            {label: "UF", value:dadosCondutor.uf}
        ]
    }

    mountDadosHistoricos = (dadosHistoricos) => {
        return [
            {label: "Históricos das consultas", value:dadosHistoricos.historicoConsultas},
            {label: "Mês licenciamento", value:dadosHistoricos.mesLicenciamento},
            {label: "UF de emplacamento inicial", value:dadosHistoricos.ufEmplacamentoInicial}
        ]
    }

    mountDecodificacaoChassi = (decodificacaoChassi) => {
        return [
            {label: "Conclusão", value:decodificacaoChassi.conclusao},
            {label: "Fabricante", value:decodificacaoChassi.fabricante},
            {label: "Localização Fabrica", value:decodificacaoChassi.localizacaoFabrica},
            {label: "Motor", value:decodificacaoChassi.motor},
            {label: "Número irregularidades", value:decodificacaoChassi.numeroIrregularidades},
            {label: "País de origem", value:decodificacaoChassi.paisOrigem},
            {label: "Portas", value:decodificacaoChassi.portas},
            {label: "Região geográfica", value:decodificacaoChassi.regiaoGeografica},
            {label: "Tração", value:decodificacaoChassi.tracao},
            {label: "Verificador serial", value:decodificacaoChassi.verificadorSerial},
            {label: "Versão", value:decodificacaoChassi.versao}
        ]
    }

    mountGravame = (gravame) => {
        return [
            {label: "Agente Financeiro", value:gravame.descricao ? gravame.descricao.agenteFinanceiro : undefined},
            {label: "Data inclusão", value:gravame.descricao ? gravame.descricao.dataInclusao : undefined},
            {label: "Documento financiado", value:gravame.descricao ? gravame.descricao.documentoFinanciado : undefined},
            {label: "Nome financiado", value:gravame.descricao ? gravame.descricao.nomeFinanciado : undefined},
            {label: "Restrição financeira", value:gravame.descricao ? gravame.descricao.restricaoFinanceira : undefined},
            {label: "Código agente", value:gravame.gravameDetalhado ? gravame.gravameDetalhado.codigoAgente : undefined},
            {label: "Descrição agente", value:gravame.gravameDetalhado ? gravame.gravameDetalhado.descricaoGravame : undefined},
            {label: "Documento agente", value:gravame.gravameDetalhado ? gravame.gravameDetalhado.documentoAgente : undefined},
            {label: "Ano fabricação", value:gravame.gravameDetalhado ? gravame.gravameDetalhado.gravameAnoFabricacao : undefined},
            {label: "Nome agente", value:gravame.gravameDetalhado ? gravame.gravameDetalhado.nomeAgente : undefined},
            {label: "Número gravame", value:gravame.gravameDetalhado ? gravame.gravameDetalhado.numeroGravame : undefined},
            {label: "Status", value:gravame.gravameDetalhado ? gravame.gravameDetalhado.status : undefined},
            {label: "UF Gravame", value:gravame.gravameDetalhado ? gravame.gravameDetalhado.ufGravame : undefined},
            {label: "UF Placa", value:gravame.gravameDetalhado ? gravame.gravameDetalhado.ufPlaca : undefined},
            {label: "Agente financeiro", value:gravame.intencaoGravame ? gravame.intencaoGravame.agenteFinanceiro : undefined},
            {label: "Data inclusão", value:gravame.intencaoGravame ? gravame.intencaoGravame.dataInclusao : undefined},
            {label: "Documento financiado", value:gravame.intencaoGravame ? gravame.intencaoGravame.documentoFinanciado : undefined},
            {label: "Nome financiado", value:gravame.intencaoGravame ? gravame.intencaoGravame.nomeFinanciado : undefined},
            {label: "Restrição financeira", value:gravame.intencaoGravame ? gravame.intencaoGravame.restricaoFinanceira : undefined}
        ]
    }

    mountProprietarioAtual = (proprietarioAtual) => {
        return [
            {label: "Ano exercício licenciamento", value:proprietarioAtual.anoExercicioLicenciamento},
            {label: "Data emissão CRV/CRVL", value:proprietarioAtual.dataEmissaoCrvCrvl},
            {label: "Data inclusão da venda", value:proprietarioAtual.dataInclusaoVenda},
            {label: "Data licenciamento", value:proprietarioAtual.dataLicenciamento},
            {label: "Data da venda", value:proprietarioAtual.dataVenda},
            {label: "Documento comprador", value:proprietarioAtual.documentoComprador},
            {label: "Indicador da comunicação venda", value:proprietarioAtual.indicadorComunicacaoVenda},
            {label: "Número da nota fiscal", value:proprietarioAtual.numeroNotaFiscal},
            {label: "Protocolo Detran", value:proprietarioAtual.protocoloDetran},
            {label: "Tipo documento comprador", value:proprietarioAtual.tipoDocumentoComprador}
        ]
    }

    mountSinistroIrrecuperavel = (sinistroIrrecuperavel) => {
        return [
            {label: "PT", value:<span className={sinistroIrrecuperavel.ptPositivo == "Sim" ? "destaque-ativado" : "destaque-desativado"}>{sinistroIrrecuperavel.ptPositivo}</span>},
            {label: "Tipo Registro", value:sinistroIrrecuperavel.tipoRegistro},
            {label: "Tamanho", value:sinistroIrrecuperavel.tamanho},
            {label: "Data", value:sinistroIrrecuperavel.data},
            {label: "Descrição", value:sinistroIrrecuperavel.descricao}
        ]
    }

    mountTabelaFipe = (tabelaFipe) => {
        return [
            {label: "Código FIPE", value:tabelaFipe.codigoFipe},
            {label: "Preço FIPE", value:`R$ ${tabelaFipe.precoFipe}`},
            {label: "Preço médio", value:`R$ ${tabelaFipe.precoMedio}`},
        ]
    }

    /*renderFlagsProtocol = (flagsExecuted, flags) => {
        let countFlagsExecuted = 0;
        const showFlagsThatDidntExecuted = flags.map((flag) => {
            //se a flag nao for encontrada no array de executadas
            if(flag.checked && flagsExecuted.indexOf(flag.name) === -1) {
                countFlagsExecuted++;
                return <div>{flag.text} - {INFORMATION_NOT_AVAILABLE} </div>
            }
        })

        return countFlagsExecuted ?
            <Alert bsStyle="danger" className="text-center">
                As seguintes opções não executaram: {showFlagsThatDidntExecuted}
            </Alert>
            
            : "";
    }*/

    render() {
        let data = this.props.data;
        return (
            <PanelGroup>
                {data.cabecalho && data.cabecalho.flagsExecutadas && data.cabecalho.flagsSelecionadas ?
                    <CardWithTable title="RESUMO DA CONSULTA"
                        mdLength={12}
                        elements={
                            [
                                {label: "Opções selecionadas", value: data.cabecalho.flagsSelecionadas.sort((flagAnt, flagPost) => flagAnt>flagPost).toString()},
                                {label: "Opções executadas", value: data.cabecalho.flagsExecutadas.sort((flagAnt, flagPost) => flagAnt>flagPost).toString()},

                            ]
                        }
                    />
                : ""}

                {data.cadastro && data.cadastro.descricao ?
                    <CardWithTable title="DESCRIÇÃO DO VEÍCULO"
                        mdLength={3}
                        elements={
                            [
                                {label: "Marca", value:data.cadastro.descricao ? data.cadastro.descricao.marca : undefined},
                                {label: "Modelo", value:data.cadastro.descricao ? data.cadastro.descricao.modelo : undefined},
                                {label: "Ano fabricação", value:data.cadastro.descricao ? data.cadastro.descricao.anoFabricacao : undefined},
                                {label: "Ano modelo", value:data.cadastro.descricao ? data.cadastro.descricao.anoModelo : undefined},
                                {label: "Capacidade de passageiros", value:data.cadastro.descricao ? data.cadastro.descricao.capacidadePassageiros : undefined},
                                {label: "Categoria", value:data.cadastro.descricao ? data.cadastro.descricao.categoria : undefined},
                                {label: "Cilindradas", value:data.cadastro.descricao ? data.cadastro.descricao.cilindradas : undefined},
                                {label: "Combustível", value:data.cadastro.descricao ? data.cadastro.descricao.combustivel : undefined},
                                {label: "Cor", value:data.cadastro.descricao ? data.cadastro.descricao.cor : undefined},
                                {label: "Espécie", value:data.cadastro.descricao ? data.cadastro.descricao.especie : undefined},
                                {label: "Segmento", value:data.cadastro.descricao ? data.cadastro.descricao.segmento : undefined},
                                {label: "Sub-Segmento", value:data.cadastro.descricao ? data.cadastro.descricao.subSegmento : undefined},
                            ]
                        }
                    />
                : ""}
                {data.cadastro && data.cadastro.identificadores ?
                    <CardWithTable title="IDENTIFICADORES"
                        mdLength={3}
                        elements={
                            [
                                {label: "Chassi", value:data.cadastro.identificadores ? data.cadastro.identificadores.chassi : undefined},
                                {label: "Nº carroceira", value:data.cadastro.identificadores ? data.cadastro.identificadores.numeroCarroceria : undefined},
                                {label: "Nº atual do motor", value:data.cadastro.identificadores ? data.cadastro.identificadores.numeroMotorAtual : undefined},
                                {label: "Nº original do motor", value:data.cadastro.identificadores ? data.cadastro.identificadores.numeroMotorOriginal : undefined},
                                {label: "Placa", value:data.cadastro.identificadores ? data.cadastro.identificadores.placa : undefined},
                                {label: "Renavam", value:data.cadastro.identificadores ? data.cadastro.identificadores.renavam : undefined},
                            ]
                        }
                    />
                : ""}
                {data.cadastro && data.cadastro.fichaTecnica ?
                    <CardWithTable title="FICHA TÉCNICA"
                        mdLength={3}
                        elements={
                            [
                                {label: "Capacidade carga", value:data.cadastro.fichaTecnica ? data.cadastro.fichaTecnica.capacidadeCarga : undefined},
                                {label: "Máxima tração", value:data.cadastro.fichaTecnica ? data.cadastro.fichaTecnica.capacidadeMaximaTracao : undefined},
                                {label: "Carroceria", value:data.cadastro.fichaTecnica ? data.cadastro.fichaTecnica.carroceria : undefined},
                                {label: "Eixo traseiro diferencial", value:data.cadastro.fichaTecnica ? data.cadastro.fichaTecnica.eixoTraseiroDiferencial : undefined},
                                {label: "Nº caixa câmbio", value:data.cadastro.fichaTecnica ? data.cadastro.fichaTecnica.numeroCaixaCambio : undefined},
                                {label: "Nº eixos", value:data.cadastro.fichaTecnica ? data.cadastro.fichaTecnica.numeroEixos : undefined},
                                {label: "Peso bruto total", value:data.cadastro.fichaTecnica ? data.cadastro.fichaTecnica.pesoBrutoTotal : undefined},
                                {label: "Potência", value:data.cadastro.fichaTecnica ? data.cadastro.fichaTecnica.potencia : undefined},
                                {label: "Terceiro eixo", value:data.cadastro.fichaTecnica ? data.cadastro.fichaTecnica.terceiroEixo : undefined},
                                {label: "Tipo carroceira", value:data.cadastro.fichaTecnica ? data.cadastro.fichaTecnica.tipoCarroceria : undefined},
                                {label: "Tipo veículo", value:data.cadastro.fichaTecnica ? data.cadastro.fichaTecnica.tipoVeiculo : undefined}
                            ]
                        }
                    />
                : ""}

                {data.cadastro && data.cadastro.movimentacao ?
                    <CardWithTable title="MOVIMENTAÇÃO"
                        mdLength={3}
                        elements={
                            [
                                {label: "Emissão CRV/CRVL atual", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.dataEmissaoCrvCrvlAtual : undefined},
                                {label: "Data licenciamento", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.dataLicenciamento : undefined},
                                {label: "Data registro DI", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.dataRegistroDi : undefined},
                                {label: "Última atualização", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.dataUltimaAtualizacao : undefined},
                                {label: "Munícipio", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.municipio : undefined},
                                {label: "Nº documento faturado", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.numeroDocFaturado : undefined},
                                {label: "Nº importadora", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.numeroImportadora : undefined},
                                {label: "Nº registro DI", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.numeroRegistroDi : undefined},
                                {label: "Procedência", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.procedencia : undefined},
                                {label: "Proprietário anterior", value:data.cadastro.movimentacao && data.cadastro.movimentacao.proprietarios ? data.cadastro.movimentacao.proprietarios.proprietarioAnterior : undefined},
                                {label: "Proprietário atual", value:data.cadastro.movimentacao && data.cadastro.movimentacao.proprietarios ? data.cadastro.movimentacao.proprietarios.proprietarioAtual : undefined},
                                {label: "Remarcação chassi", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.remarcacaoChassi : undefined},
                                {label: "Situação chassi", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.situacaoChassi : undefined},
                                {label: "Situação veículo", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.situacaoVeiculo : undefined},
                                {label: "Tipo documento faturado", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.tipoDocFaturado : undefined},
                                {label: "Tipo documento importadora", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.tipoDocumentoImportadora : undefined},
                                {label: "UF", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.uf : undefined},
                                {label: "Uf faturado", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.ufFaturado : undefined}
                            ]
                        }
                    />
                : ""}

                {data.comunicacaoVenda ?
                    <CardWithTable title="COMUNICAÇÃO DE VENDA"
                        elements={this.mountComunicacaoVenda(data.comunicacaoVenda)}
                        mdLength={4}
                    />
                : ""}

                {data.crlv ?
                    <CardWithTable title="DOCUMENTO CRLV"
                        elements={this.mountCrlv(data.crlv)}
                        mdLength={4}
                    />
                : ""}
                {data.dadosCondutor ?
                    <CardWithTable title="DADOS CONDUTOR"
                        elements={this.mountDadosCondutor(data.dadosCondutor)}
                        mdLength={4}
                    />
                : ""}
                {data.dadosHistoricos ?
                    <CardWithTable title="DADOS HISTÓRICOS"
                        elements={this.mountDadosHistoricos(data.dadosHistoricos)}
                        mdLength={4}
                    />
                : ""}
                {data.decodificacaoChassi ?
                    <CardWithTable title="DECODIFICAÇÃO DE CHASSI"
                        elements={this.mountDecodificacaoChassi(data.decodificacaoChassi)}
                        mdLength={4}
                    />
                : ""}
                {data.gravame ?
                    <CardWithTable title="GRAVAME"
                        elements={this.mountGravame(data.gravame)}
                        mdLength={4}
                    />
                : ""}
                {data.proprietarioAtual ?
                    <CardWithTable title="PROPRIETÁRIO ATUAL"
                        elements={this.mountProprietarioAtual(data.proprietarioAtual)}
                        mdLength={4}
                    />
                : ""}
                {data.sinistroIrrecuperavel ?
                    <CardWithTable title="SINISTRO IRRECUPERÁVEL"
                        elements={this.mountSinistroIrrecuperavel(data.sinistroIrrecuperavel)}
                        mdLength={6}
                    />
                : ""}
                {data.tabelaFipe ?
                    <CardWithTable title="TABELA FIPE"
                        elements={this.mountTabelaFipe(data.tabelaFipe)}
                        mdLength={4}
                    />
                : ""}
                {data.historicoLeiloes ?
                    <CardWithTable title="HISTÓRICO DE LEILÕES"
                        elements={
                            [
                                {label: "Aceitação veículo", value:data.historicoLeiloes && data.historicoLeiloes.rating ? data.historicoLeiloes.rating.aceitacaoVeiculo : undefined},
                                {label: "Exige vistoria Especial", value:data.historicoLeiloes && data.historicoLeiloes.rating ? data.historicoLeiloes.rating.exigeVistoriaEspecial : undefined},
                                {label: "Percentual ref", value:data.historicoLeiloes && data.historicoLeiloes.rating ? data.historicoLeiloes.rating.percentualRef : undefined},
                            ]
                        }
                        fields={
                            [
                                {id:"comitente", name:"Comitente"},
                                {id:"condicaoGeral", name:"Condição geral"},
                                {id:"data", name:"Data", functionToApply:(val) => {return <span>{pattern.formatDate(val)}</span>}},
                                {id:"leiloeiro", name:"Leiloeiro"},
                                {id:"lote", name:"Lote"},
                                {id:"patio", name:"Patio"},
                            ]
                        }
                        rows={data.historicoLeiloes.leilao ? data.historicoLeiloes.leilao : []}
                    />
                : ""}
                {data.historicoProprietarios ?
                    <CardWithTable title="HISTÓRICO DE PROPRIETÁRIOS"
                        fields={
                            [
                                {id:"anoExercicio", name:"Ano exercício"},
                                {id:"documento", name:"Documento", functionToApply:(val) => {return <span>{pattern.patternCPF(val)}</span>}},
                                {id:"nome", name:"Nome"},
                                {id:"cidade", name:"Cidade"},
                                {id:"uf", name:"UF"},
                                {id:"dataEmissaoGuia", name:"Data Emissão Guia"},
                            ]
                        }
                        rows={data.historicoProprietarios.proprietario ? data.historicoProprietarios.proprietario : []}
                        hiddenRows={
                            [
                                {id:"cgcCpf", name:"CGC CPF"},
                                {id:"dataProcessamento", name:"Data processamento"},
                                {id:"saldo", name:"Valor", functionToApply:(val) => {return <span>{pattern.formatCurrency(val)}</span>}},
                                {id:"idPag", name:"ID Pag"},
                                {id:"nomeAgenteFinanceiro", name:"Nome agente financeiro"},
                                {id:"numeroBanco", name:"Nº banco"},
                                {id:"numeroDut", name:"Número Dut"},
                            ]
                        }
                    />
                : ""}
                {data.historicoRoubo ?
                    <CardWithTable title="HISTÓRICO DE ROUBO"
                        fields={
                            [
                                {id:"boletim", name:"Boletim"},
                                {id:"categoriaOcorrencia", name:"Categoria Ocorrência"},
                                {id:"dataOcorrencia", name:"Data Ocorrência"},
                                {id:"tipoDeclaracao", name:"Tipo declaração"},
                                {id:"municipio", name:"Município"},
                                {id:"uf", name:"UF"},
                            ]
                        }
                        rows={data.historicoRoubo.roubo ? data.historicoRoubo.roubo : []}
                        hiddenRows={
                            [
                                {id:"anoDeclaracao", name:"Ano Declaração"},
                                {id:"numeroOcorrencia", name:"Número Ocorrência"},
                                {id:"orgaoSeguranca", name:"Órgão segurança"},
                                {id:"alarme", name:"Alarme"},
                            ]
                        }
                    />
                : ""}
                {data.historicoVeiculos ?
                    <CardWithTable title="HISTÓRICO DE VEÍCULOS"
                        fields={
                            [
                                {id:"anoExercicio", name:"Ano exercício"},
                                {id:"chassi", name:"Chassi"},
                                {id:"dataEmissaoGuia", name:"Data emissão guia"},
                                {id:"dataProcessamento", name:"Data processamento"},
                                {id:"idPagDut", name:"ID Pagamento Dut"},
                                {id:"numeroBanco", name:"Número Banco"},
                                {id:"numeroDut", name:"Número Dut"},
                                {id:"placa", name:"Placa"},
                                {id:"renavam", name:"Renavam"},
                                {id:"saldo", name:"Saldo", functionToApply:(val) => {return <span>{pattern.formatCurrency(val)}</span>}},
                                {id:"uf", name:"UF"},
                            ]
                        }
                        rows={data.historicoVeiculos.veiculos}
                    />
                : ""}
                {data.indiciosSinistros ?
                    <CardWithTable title="INDÍCIOS DE SINISTROS"
                        fields={
                            [
                                {id:"data", name:"Data"},
                                {id:"descricao", name:"Descrição"}
                            ]
                        }
                        rows={data.indiciosSinistros.sinistro ? data.indiciosSinistros.sinistro : []}
                    />
                : ""}
                {data.registroDebitos ?
                    <CardWithTable title="REGISTRO DE DÉBITO"
                        fields={
                            [
                                {id:"cidade", name:"Cidade"},
                                {id:"situacao", name:"Situação"},
                                {id:"tipoRegistro", name:"Tipo de registro"},
                                {id:"uf", name:"UF"},
                                {id:"valor", name:"Valor", functionToApply:(val) => {return <span>{pattern.formatCurrency(val)}</span>}},
                            ]
                        }
                        rows={data.registroDebitos.debito ? data.registroDebitos.debito : []}
                    />
                : ""}
                {data.registroRenajud ?
                    <CardWithTable title="REGISTRO DE RENAJUD"
                        elements={
                            [
                                {label: "CMT", value:data.registroRenajud.cmt},
                                {label: "Data", value:data.registroRenajud.data, functionToApply:(val) => {return <span>{pattern.formatDate(val)}</span>}},
                                {label: "Data Di", value:data.registroRenajud.dataDi},
                                {label: "Data limite", value:data.registroRenajud.dataLimite, functionToApply:(val) => {return <span>{pattern.formatDate(val)}</span>}},
                                {label: "Descrição", value:data.registroRenajud.descricao},
                                {label: "Montagem", value:data.registroRenajud.montagem},
                                {label: "Número DI", value:data.registroRenajud.numeroDi},
                                {label: "PTB", value:data.registroRenajud.ptb},
                                {label: "Registro aduaneiro", value:data.registroRenajud.registroAduaneiro},
                                {label: "Remarcação chassi", value:data.registroRenajud.remarcacaoChassi},
                                {label: "SRF", value:data.registroRenajud.srf},
                            ]
                        }
                        fields={
                            [
                                {id:"mensagem", name:"Mensagem"},
                                {id:"numeroProcesso", name:"Número processo"},
                                {id:"orgaoJudicial", name:"Órgão judicial"},
                                {id:"tipoRestricao", name:"Tipo restrição"},
                                {id:"tribunal", name:"Tribunal"}
                            ]
                        }
                        rows={data.registroRenajud.restricaoJudicial ? data.registroRenajud.restricaoJudicial : []}
                    />
                : ""}
                {data.restricoes ?
                    <CardWithTable title="RESTRIÇÕES"
                        fields={
                            [
                                {id:"mensagem", name:"Mensagem"},
                                {id:"numeroProcesso", name:"N° processo"},
                                {id:"orgaoJudicial", name:"Órgão judicial"},
                                {id:"tipoRestricao", name:"Tipo restrição"},
                                {id:"tribunal", name:"tribunal"},
                            ]
                        }
                        rows={data.restricoes.restricao ? data.restricoes.restricao : []}
                    />
                : ""}

                <Protocolo info={data.cabecalho}/>

            </PanelGroup>
        )
    }
}

export default VeiculosView;