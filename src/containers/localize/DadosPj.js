import React, { Component } from "react";

import Panel from "../../components/Panel";

export default class Cadastro extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
            <Panel title="DADOS CADASTRAIS">
              <div className="col-md-6">
                <strong>Documento: </strong>
                {this.props.dados.CNPJ}
              </div>

              <div className="col-md-6">
                <strong>Ativa Comercialmente: </strong>
                {this.props.dados.ATIVA_COMERCIALENTE ? 
                  <span className={this.props.dados.ATIVA_COMERCIALENTE == "SIM" ? "destaque-ativado" : "destaque-desativado "}>{this.props.dados.ATIVA_COMERCIALENTE}</span>
                : <span>Nada consta</span>}
              </div>

              <div className="col-md-6">
                <strong>Razão social: </strong>
                {this.props.dados.RAZAO}
              </div>

              <div className="col-md-6">
                <strong>Inscrição Estadual: </strong>
                {this.props.dados.SITUACAO_CADASTRAL ? 
                  <span className={this.props.dados.SITUACAO_CADASTRAL == "ATIVA" ? "destaque-ativado" : "destaque-desativado "}>{this.props.dados.SITUACAO_CADASTRAL}</span>
                : <span>Nada consta</span>}
              </div>

              <div className="col-md-6">
                <strong>Nome Fantasia: </strong>
                {this.props.dados.FANTASIA ? this.props.dados.FANTASIA : "Nada consta"}
              </div>

              <div className="col-md-6">
                <strong>Abertura: </strong>
                {this.props.dados.DATA_ABERTURA}
              </div>

              <div className="col-md-6">
                <strong>Grupo CNAE: </strong>
                {this.props.dados.CNAE + " - " + this.props.dados.CNAE_GRUPO}
              </div>

              <div className="col-md-6">
                <strong>Porte: </strong>
                {this.props.dados.PORTE}
              </div>
            </Panel>)
  }
}