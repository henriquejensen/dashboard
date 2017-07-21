import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../../components/panel/Panel";

import { patternCNPJ } from "../utils/functions/patternDocuments";
import { NENHUM_REGISTRO, TOOLTIP_SEE_MORE_INFO_MESSAGE, TOOLTIP_SEE_LESS_INFO_MESSAGE } from "../../constants/utils";

const title = "DADOS CADASTRAIS";

export default class Cadastro extends Component{
    state = {
        moreInfo: false
    }

    renderFooterPanel = () => {
        return (
            <div className="text-center moreInfo" onClick={() => this.setState({moreInfo:!this.state.moreInfo})}>
                {!this.state.moreInfo ? TOOLTIP_SEE_MORE_INFO_MESSAGE : TOOLTIP_SEE_LESS_INFO_MESSAGE}
            </div>
        )
    }

    render() {
        return (
            <Panel title={title} footer={this.renderFooterPanel()}>
                <Col md={6} xs={6}>
                    <strong>Documento: </strong>
                    {patternCNPJ(this.props.dados.cnpj)}
                </Col>

                <Col md={6} xs={6}>
                    <strong>Situação CNPJ: </strong>
                    {this.props.dados.receitaStatus ? 
                        <span className={this.props.dados.receitaStatus.toUpperCase() == "ATIVA" ? "destaque-ativado" : "destaque-desativado "}>{this.props.dados.receitaStatus}</span>
                        : NENHUM_REGISTRO
                    }
                </Col>

                <Col md={6} xs={6}>
                    <strong>Razão social: </strong>
                    {this.props.dados.razaoSocial ? this.props.dados.razaoSocial : NENHUM_REGISTRO}
                </Col>

                <Col md={6} xs={6}>
                    <strong>Quantidade de funcionários: </strong>
                    {this.props.dados.quantidadeFuncionarios ?
                        this.props.dados.quantidadeFuncionarios
                        : NENHUM_REGISTRO
                    }
                </Col>

                <Col md={6} xs={6}>
                    <strong>Nome Fantasia: </strong>
                    {this.props.dados.nomeFantasia ?
                        this.props.dados.nomeFantasia
                        : NENHUM_REGISTRO
                    }
                </Col>

                <Col md={6} xs={6}>
                    <strong>Porte: </strong>
                    {this.props.dados.porteEmpresa ?
                        this.props.dados.porteEmpresa
                        : NENHUM_REGISTRO
                    }
                </Col>

                <Col md={6} xs={6}>
                    <strong>Situação sintegra: </strong>
                    {this.props.dados.sintegraSituacao ? 
                        <span className={this.props.dados.sintegraSituacao == "ATIVO" ? "destaque-ativado" : "destaque-desativado "}>{this.props.dados.sintegraSituacao}</span>
                        : NENHUM_REGISTRO
                    }
                </Col>

                <Col md={6} xs={6}>
                    <strong>Inscrição estadual: </strong>
                    {this.props.dados.inscricaoEstadual ?
                        this.props.dados.inscricaoEstadual
                        : NENHUM_REGISTRO
                    }
                </Col>

                <Col md={6} xs={6}>
                    <strong>Abertura: </strong>
                    {this.props.dados.dataAbertura ? 
                        this.props.dados.dataAbertura
                        : NENHUM_REGISTRO
                    }
                </Col>

                <Col md={6} xs={6}>
                    <strong>Idade: </strong>
                    {this.props.dados.idadeEmpresa ? 
                        this.props.dados.idadeEmpresa + " anos"
                        : NENHUM_REGISTRO
                    }
                </Col>

                <Col md={6} xs={6}>
                    <strong>Descrição CNAE: </strong>
                    {this.props.dados.cnaeDescricao ? 
                        this.props.dados.cnaeDescricao
                        : NENHUM_REGISTRO
                    }
                </Col>

                {this.state.moreInfo ?
                    <span>
                        <Col md={6} xs={6}>
                            <strong>NIRE: </strong>
                            {this.props.dados.nire ?
                                this.props.dados.nire
                                : NENHUM_REGISTRO
                            }
                        </Col>

                        <Col md={6} xs={6}>
                            <strong>Grupo CNAE: </strong>
                            {this.props.dados.cnaeGrupo ?
                                this.props.dados.cnaeGrupo + " - " + this.props.dados.cnae
                                : NENHUM_REGISTRO
                            }
                        </Col>

                        <Col md={6} xs={6}>
                            <strong>Subgrupo CNAE: </strong>
                            {this.props.dados.cnaeSubgrupo ? 
                                this.props.dados.cnaeSubgrupo
                                : NENHUM_REGISTRO
                            }
                        </Col>

                        <Col md={6} xs={6}>
                            <strong>Natureza Jurídica: </strong>
                            {this.props.dados.naturezaJuridica ? 
                                this.props.dados.naturezaJuridica
                                : NENHUM_REGISTRO
                            }
                        </Col>

                        <Col md={6} xs={6}>
                            <strong>Regime tributário: </strong>
                            {this.props.dados.regimeTributario ? 
                                this.props.dados.regimeTributario
                                : NENHUM_REGISTRO
                            }
                        </Col>

                        <Col md={6} xs={6}>
                            <strong>Data da consulta na receita: </strong>
                            {this.props.dados.dataReceitaStatus ?
                                this.props.dados.dataReceitaStatus
                                : NENHUM_REGISTRO
                            }
                        </Col>

                        <Col md={6} xs={6}>
                            <strong>Faixa de funcionários: </strong>
                            {this.props.dados.faixaFuncionarios ?
                                this.props.dados.faixaFuncionarios
                                : NENHUM_REGISTRO
                            }
                        </Col>

                        <Col md={6} xs={6}>
                            <strong>Faixa de idade: </strong>
                            {this.props.dados.faixaIdade ? 
                                this.props.dados.faixaIdade
                                : NENHUM_REGISTRO
                            }
                        </Col>

                        <Col md={6} xs={6}>
                            <strong>Site: </strong>
                            {this.props.dados.site ? 
                                <a href={this.props.dados.site} target="_blank">{this.props.dados.site}</a>
                                : NENHUM_REGISTRO
                            }
                        </Col>
                    </span>
                : ""}
            </Panel>)
    }
}