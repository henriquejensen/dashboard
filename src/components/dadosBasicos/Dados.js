import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Col, Button} from "react-bootstrap";

import { patternCPF, patternRG } from "../utils/functions/patternDocuments";

import Panel from "../panel/Panel";

import { NENHUM_REGISTRO } from "../../constants/utils";

export default class Dados extends Component{

  state = {
    moreInfo: false
  }

  render() {
    return (            
          <Panel title="DADOS CADASTRAIS">
            <div className="col-md-6">
              <strong>Documento: </strong>
              {patternCPF(this.props.dados.cpf)}
            </div>
            <div className="col-md-6">
              <strong>Status CPF: </strong>
              {this.props.dados.status ?
                <span className={this.props.dados.status == "REGULAR" ? "destaque-ativado" : "destaque-desativado "}>{this.props.dados.status}</span>
              : <span>{NENHUM_REGISTRO}</span>}
            </div>

            <div className="col-md-6">
              <strong>Nome: </strong>
              {this.props.dados.nome}
            </div>
            <div className="col-md-6">
              <strong>Nascimento </strong>
              {this.props.dados.dataNascimento + " - " + this.props.dados.idade + " anos"}
            </div>

            <div className="col-md-6">
              <strong>Sexo: </strong>
              {this.props.dados.sexo}
            </div>
            <div className="col-md-6">
              <strong>Provável óbito: </strong>
              {this.props.dados.obitoProvavel ?
              <span className={this.props.dados.obitoProvavel == "SIM" ? "destaque-desativado" : "destaque-ativado"}>{this.props.dados.obitoProvavel}</span>
              : <span>{NENHUM_REGISTRO}</span>}
            </div>

            <div className="col-md-6">
              <strong>RG: </strong>
              {this.props.dados.rg ? patternRG(this.props.dados.rg) + "/" + this.props.dados.ufRg : NENHUM_REGISTRO}
            </div>
            <div className="col-md-6">
              <strong>Signo: </strong>
              {this.props.dados.signo}
            </div>

            {this.state.moreInfo ? 
              <div >
                <Col md={6}>
                  <strong>Faixa de idade: </strong>
                  {this.props.dados.faixaIdade ? this.props.dados.faixaIdade : NENHUM_REGISTRO}
                </Col>
                <div className="col-md-6">
                  <strong>Data status CPF: </strong>
                  {this.props.dados.statusData ? this.props.dados.statusData : NENHUM_REGISTRO}
                </div>

                <div className="col-md-6">
                  <strong>Protocolo: </strong>
                  {this.props.dados.statusProtocolo ? this.props.dados.statusProtocolo : NENHUM_REGISTRO}
                </div>

                <div className="col-md-6">
                  <strong>Titulo de eleitor: </strong>
                  {this.props.dados.tituloEleitor ? this.props.dados.tituloEleitor : NENHUM_REGISTRO}
                </div>

                <div className="col-md-6">
                  <strong>Nacionalidade: </strong>
                  {this.props.dados.nacionalidade ? this.props.dados.nacionalidade : NENHUM_REGISTRO}
                </div>

                <div className="col-md-6">
                  <strong>Estado civil: </strong>
                  {this.props.dados.estadoCivil ? this.props.dados.estadoCivil : NENHUM_REGISTRO}
                </div>
              </div> : ""}
            
              <div className="col-md-12 moreInfo" onClick={() => this.setState({moreInfo:!this.state.moreInfo})}>
                <a data-tip data-for="moreInfo">
                  <i 
                    className={this.state.moreInfo ? "fa fa-minus pull-right moreInfo" : "fa fa-plus pull-right moreInfo"}
                    style={!this.state.moreInfo ? {color:"#4caf50"} : {color:"#f44336"}} />
                </a>
              </div>

              <Tooltip id="moreInfo">
                <span>Mais informações</span>
              </Tooltip>
              <Tooltip id="tooltipConsultar">
                <span>Consultar</span>
              </Tooltip>
          </Panel>
    )
  }
}