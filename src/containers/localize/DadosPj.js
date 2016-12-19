import React, { Component } from "react";

export default class Cadastro extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="row row-localize">
          <div className="col-md-12">
            <div className="panel panel-default">
                <div className="panel-heading text-center">
                    DADOS CADASTRAIS
                </div>
                <div className="panel-body">
                  <div className="col-md-9">
                    <strong>Razão social: </strong>
                    {this.props.dados.RAZAO}
                  </div>
                  <div className="col-md-3">
                    <strong>Inscrição Estadual: </strong>
                    {this.props.dados.SITUACAO_CADASTRAL}
                  </div>

                  <div className="col-md-9">
                    <strong>Nome Fantasia: </strong>
                    {this.props.dados.FANTASIA}
                  </div>
                  <div className="col-md-3">
                    <strong>Abertura: </strong>
                    {this.props.dados.DATA_ABERTURA}
                  </div>

                  <div className="col-md-9">
                    <strong>Grupo CNAE: </strong>
                    {this.props.dados.CNAE_GRUPO}
                  </div>
                  <div className="col-md-3">
                    <strong>CNAE: </strong>
                    {this.props.dados.CNAE}
                  </div>

                  <div className="col-md-3">
                    <strong>Ativa Comercialmente: </strong>
                    {this.props.dados.ATIVA_COMERCIALENTE}
                  </div>
                  <div className="col-md-3">
                    <strong>Porte: </strong>
                    {this.props.dados.PORTE}
                  </div>
                </div>
            </div>
          </div>
        </div>)
  }
}