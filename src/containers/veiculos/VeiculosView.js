import React, { Component } from 'react';

import PanelGroup from "../../components/panel/PanelGroup";
import CardWithTable from "../../components/card/CardWithTable";
import Card from "../../components/card/Card";

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
            {label: "Data evento", value:crlv.data_evento},
            {label: "Evento", value:crlv.evento},
            {label: "Tipo Documento", value:crlv.tipo_documento},
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
            {label: "Data", value:sinistroIrrecuperavel.data},
            {label: "Descrição", value:sinistroIrrecuperavel.descricao}
        ]
    }

    mountSinistroIrrecuperavel = (sinistroIrrecuperavel) => {
        return [
            {label: "Data", value:sinistroIrrecuperavel.data},
            {label: "Descrição", value:sinistroIrrecuperavel.descricao}
        ]
    }

    mountTabelaFipe = (tabelaFipe) => {
        return [
            {label: "Código FIPE", value:tabelaFipe.codigoFipe},
            {label: "Preço FIPE", value:tabelaFipe.precoFipe},
            {label: "Preço médio", value:tabelaFipe.precoMedio}
        ]
    }

    render() {
        let data = this.props.data;
        console.log("DATA", data);  
        return (
            <PanelGroup>
                {data.cadastro ?
                    <CardWithTable title="CADASTRO"
                        elements={
                            [
                                {label: "Ano fabricação", value:data.cadastro.descricao ? data.cadastro.descricao.anoFabricacao : undefined},
                                {label: "Ano modelo", value:data.cadastro.descricao ? data.cadastro.descricao.anoModelo : undefined},
                                {label: "Capacidade de passageiros", value:data.cadastro.descricao ? data.cadastro.descricao.capacidadePassageiros : undefined},
                                {label: "Categoria", value:data.cadastro.descricao ? data.cadastro.descricao.categoria : undefined},
                                {label: "Cilindradas", value:data.cadastro.descricao ? data.cadastro.descricao.cilindradas : undefined},
                                {label: "Combustível", value:data.cadastro.descricao ? data.cadastro.descricao.combustivel : undefined},
                                {label: "Cor", value:data.cadastro.descricao ? data.cadastro.descricao.cor : undefined},
                                {label: "Espécie", value:data.cadastro.descricao ? data.cadastro.descricao.especie : undefined},
                                {label: "Marca", value:data.cadastro.descricao ? data.cadastro.descricao.marca : undefined},
                                {label: "Modelo", value:data.cadastro.descricao ? data.cadastro.descricao.modelo : undefined},
                                {label: "Segmento", value:data.cadastro.descricao ? data.cadastro.descricao.segmento : undefined},
                                {label: "Sub-Segmento", value:data.cadastro.descricao ? data.cadastro.descricao.subSegmento : undefined},

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
                                {label: "Tipo veículo", value:data.cadastro.fichaTecnica ? data.cadastro.fichaTecnica.tipoVeiculo : undefined},

                                {label: "Emissão CRV/CRVL atual", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.dataEmissaoCrvCrvlAtual : undefined},
                                {label: "Data licenciamento", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.dataLicenciamento : undefined},
                                {label: "Data registro DI", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.dataRegistroDi : undefined},
                                {label: "Data última atualização", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.dataUltimaAtualizacao : undefined},
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
                                {label: "Uf faturado", value:data.cadastro.movimentacao ? data.cadastro.movimentacao.ufFaturado : undefined},
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
                {data.comunicacaoVenda ?
                    <Card title="COMUNICAÇÃO DE VENDA"
                        elements={this.mountComunicacaoVenda(data.comunicacaoVenda)}
                        colLength={4}
                    />
                : ""}
                {data.crlv ?
                    <Card title="DOCUMENTO CRLV"
                        elements={this.mountCrlv(data.crlv)}
                        colLength={4}
                    />
                : ""}
                {data.dadosCondutor ?
                    <Card title="DADOS CONDUTOR"
                        elements={this.mountDadosCondutor(data.dadosCondutor)}
                        colLength={4}
                    />
                : ""}
                {data.dadosHistoricos ?
                    <Card title="DADOS HISTÓRICOS"
                        elements={this.mountDadosHistoricos(data.dadosHistoricos)}
                        colLength={4}
                    />
                : ""}
                {data.decodificacaoChassi ?
                    <Card title="DECODIFICAÇÃO DE CHASSI"
                        elements={this.mountDecodificacaoChassi(data.decodificacaoChassi)}
                        colLength={4}
                    />
                : ""}
                {data.gravame ?
                    <Card title="GRAVAME"
                        elements={this.mountGravame(data.gravame)}
                        colLength={4}
                    />
                : ""}
                {data.proprietarioAtual ?
                    <Card title="PROPRIETÁRIO ATUAL"
                        elements={this.mountProprietarioAtual(data.proprietarioAtual)}
                        colLength={4}
                    />
                : ""}
                {data.sinistroIrrecuperavel ?
                    <Card title="SINISTRO IRRECUPERÁVEL"
                        elements={this.mountSinistroIrrecuperavel(data.sinistroIrrecuperavel)}
                        colLength={6}
                    />
                : ""}
                {data.tabelaFipe ?
                    <Card title="TABELA FIPE"
                        elements={this.mountTabelaFipe(data.tabelaFipe)}
                        colLength={4}
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
                                {id:"data", name:"Data"},
                                {id:"leiloeiro", name:"Leiloeiro"},
                                {id:"lote", name:"Lote"},
                                {id:"patio", name:"Patio"},
                            ]
                        }
                        rows={data.historicoLeiloes.leilao}
                    />
                : ""}
                {data.historicoProprietarios ?
                    <CardWithTable title="HISTÓRICO DE PROPRIETÁRIOS"
                        fields={
                            [
                                {id:"anoExercicio", name:"Ano exercício"},
                                {id:"cgcCpf", name:"CGC CPF"},
                                {id:"cidade", name:"Cidade"},
                                {id:"dataEmissaoGuia", name:"Data Emissão Guia"},
                                {id:"dataProcessamento", name:"Data processamento"},
                                {id:"documento", name:"Documento"},
                                {id:"idPag", name:"ID Pag"},
                                {id:"nome", name:"Nome"},
                                {id:"nomeAgenteFinanceiro", name:"Nome agente financeiro"},
                                {id:"numeroBanco", name:"Nº banco"},
                                {id:"numeroDut", name:"Número Dut"},
                                {id:"saldo", name:"Saldo"},
                                {id:"uf", name:"UF"},
                            ]
                        }
                        rows={data.historicoProprietarios.proprietario}
                    />
                : ""}
                {data.historicoRoubo ?
                    <CardWithTable title="HISTÓRICO DE ROUBO"
                        fields={
                            [
                                {id:"alarme", name:"Alarme"},
                                {id:"anoDeclaracao", name:"Ano Declaração"},
                                {id:"boletim", name:"Boletim"},
                                {id:"categoriaOcorrencia", name:"Categoria Ocorrência"},
                                {id:"dataOcorrencia", name:"Data Ocorrência"},
                                {id:"municipio", name:"Município"},
                                {id:"numeroOcorrencia", name:"Número Ocorrência"},
                                {id:"orgaoSeguranca", name:"Órgão segurança"},
                                {id:"tipoDeclaracao", name:"Tipo declaração"},
                                {id:"uf", name:"UF"},
                            ]
                        }
                        rows={data.historicoRoubo.roubo}
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
                                {id:"saldo", name:"Saldo"},
                                {id:"uf", name:"UF"},
                            ]
                        }
                        rows={data.historicoVeiculos.veiculo}
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
                        rows={data.indiciosSinistros.sinistro}
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
                                {id:"valor", name:"Valor"},
                            ]
                        }
                        rows={data.registroDebitos.debito}
                    />
                : ""}
                {data.registroRenajud ?
                    <CardWithTable title="REGISTRO DE RENAJUD"
                        elements={
                            [
                                {label: "CMT", value:data.registroRenajud.cmt},
                                {label: "Data", value:data.registroRenajud.data},
                                {label: "Data Di", value:data.registroRenajud.dataDi},
                                {label: "Data limite", value:data.registroRenajud.dataLimite},
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
                                {id:"numeroProcesso", name:"Núemro processo"},
                                {id:"orgaoJudicial", name:"Órgão judicial"},
                                {id:"tipoRestricao", name:"Tipo restrição"},
                                {id:"tribunal", name:"Tribunal"}
                            ]
                        }
                        rows={data.registroRenajud.restricaoJudicial}
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
                        rows={data.restricoes.restricao}
                    />
                : ""}
            </PanelGroup>
        )
    }
}

export default VeiculosView;