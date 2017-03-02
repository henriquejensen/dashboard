import React, { Component } from "react";

import Panel from "../../components/Panel";

import { patternCNPJ } from "../utils/functions/patternDocuments";

export default class Cadastro extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Panel title="DADOS CADASTRAIS">
            <div className="col-md-4">
                <strong>Razão social: </strong>
                {this.props.dados.razaoSocial}
            </div>

            <div className="col-md-4">
                <strong>CNPJ: </strong>
                {patternCNPJ(this.props.dados.cnpj)}
            </div>

            <div className="col-md-4">
                <strong>Situação do CNPJ: </strong>
                {this.props.dados.receitaStatus ? 
                    <span className={this.props.dados.receitaStatus == "Ativa" ? "destaque-ativado" : "destaque-desativado "}>{this.props.dados.receitaStatus}</span>
                : <span>Nada consta</span>}
            </div>

            <div className="col-md-4">
                <strong>Nome Fantasia: </strong>
                {this.props.dados.nomeFantasia ?
                    this.props.dados.nomeFantasia
                : <span>Nada consta</span>}
            </div>

            <div className="col-md-4">
                <strong>NIRE: </strong>
                {this.props.dados.nire ?
                    this.props.dados.nire
                : <span>Nada consta</span>}
            </div>

            <div className="col-md-4">
                <strong>Data da consulta na receita: </strong>
                {this.props.dados.dataReceitaStatus ?
                    this.props.dados.dataReceitaStatus
                : <span>Nada consta</span>}
            </div>

            <div className="col-md-4">
                <strong>Porte: </strong>
                {this.props.dados.porteEmpresa ?
                    this.props.dados.porteEmpresa
                : <span>Nada consta</span>}
            </div>

            <div className="col-md-4">
                <strong>Faixa de funcionários: </strong>
                {this.props.dados.faixaFuncionarios ?
                    this.props.dados.faixaFuncionarios
                : <span>Nada consta</span>}
            </div>

            <div className="col-md-4">
                <strong>Quantidade de funcionários: </strong>
                {this.props.dados.quantidadeFuncionarios ?
                    this.props.dados.quantidadeFuncionarios
                : <span>Nada consta</span>}
            </div>

            <div className="col-md-4">
                <strong>Abertura: </strong>
                {this.props.dados.dataAbertura ? 
                    this.props.dados.dataAbertura
                : <span>Nada consta</span>}
            </div>

            <div className="col-md-4">
                <strong>Faixa de idade: </strong>
                {this.props.dados.faixaIdade ? 
                    this.props.dados.faixaIdade
                : <span>Nada consta</span>}
            </div>

            <div className="col-md-4">
                <strong>Idade: </strong>
                {this.props.dados.idadeEmpresa ? 
                    this.props.dados.idadeEmpresa + " anos"
                : <span>Nada consta</span>}
            </div>

            <div className="col-md-4">
                <strong>Grupo CNAE: </strong>
                {this.props.dados.cnaeGrupo ?
                    this.props.dados.cnaeGrupo + " - " + this.props.dados.cnae
                : <span>Nada consta</span>}
            </div>

            <div className="col-md-4">
                <strong>Descrição CNAE: </strong>
                {this.props.dados.cnaeDescricao ? 
                    this.props.dados.cnaeDescricao
                : <span>Nada consta</span>}
            </div>

            <div className="col-md-4">
                <strong>Subgrupo CNAE: </strong>
                {this.props.dados.cnaeSubgrupo ? 
                    this.props.dados.cnaeSubgrupo
                : <span>Nada consta</span>}
            </div>

            <div className="col-md-4">
                <strong>Natureza Jurídica: </strong>
                {this.props.dados.naturezaJuridica ? 
                    this.props.dados.naturezaJuridica
                : <span>Nada consta</span>}
            </div>

            <div className="col-md-4">
                <strong>Regime tributário: </strong>
                {this.props.dados.regimeTributario ? 
                    this.props.dados.regimeTributario
                : <span>Nada consta</span>}
            </div>

            <div className="col-md-4">
                <strong>Site: </strong>
                {this.props.dados.site ? 
                    <a href={this.props.dados.site} target="_blank">{this.props.dados.site}</a>
                : <span>Nada consta</span>}
            </div>
        </Panel>)
  }
}