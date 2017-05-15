import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Col, Button} from "react-bootstrap";

import { patternCPF, patternRG } from "../utils/functions/patternDocuments";

import Panel from "../panel/Panel";

import { NENHUM_REGISTRO, TOOLTIP_SEE_MORE_INFO_MESSAGE, TOOLTIP_SEE_LESS_INFO_MESSAGE } from "../../constants/utils";

const title = "DADOS CADASTRAIS";

export default class Dados extends Component{

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
              {patternCPF(this.props.dados.cpf)}
            </Col>
            <Col md={6} xs={6}>
              <strong>Status CPF: </strong>
              {this.props.dados.status ?
                <span className={this.props.dados.status == "REGULAR" ? "destaque-ativado" : "destaque-desativado "}>{this.props.dados.status}</span>
              : <span>{NENHUM_REGISTRO}</span>}
            </Col>

            <Col md={6} xs={6}>
              <strong>Nome: </strong>
              {this.props.dados.nome}
            </Col>
            <Col md={6} xs={6}>
              <strong>Nascimento </strong>
              {this.props.dados.dataNascimento + " - " + this.props.dados.idade + " anos"}
            </Col>

            <Col md={6} xs={6}>
              <strong>Sexo: </strong>
              {this.props.dados.sexo}
            </Col>
            <Col md={6} xs={6}>
              <strong>Provável óbito: </strong>
              {this.props.dados.obitoProvavel ?
              <span className={this.props.dados.obitoProvavel == "SIM" ? "destaque-desativado" : "destaque-ativado"}>{this.props.dados.obitoProvavel}</span>
              : <span>{NENHUM_REGISTRO}</span>}
            </Col>

            <Col md={6} xs={6}>
              <strong>RG: </strong>
              {this.props.dados.rg ? patternRG(this.props.dados.rg) + "/" + this.props.dados.ufRg : NENHUM_REGISTRO}
            </Col>
            <Col md={6} xs={6}>
              <strong>Signo: </strong>
              {this.props.dados.signo}
            </Col>

            {this.state.moreInfo ? 
              <div >
                <Col md={6}>
                  <strong>Faixa de idade: </strong>
                  {this.props.dados.faixaIdade ? this.props.dados.faixaIdade : NENHUM_REGISTRO}
                </Col>
                <Col md={6} xs={6}>
                  <strong>Data status CPF: </strong>
                  {this.props.dados.statusData ? this.props.dados.statusData : NENHUM_REGISTRO}
                </Col>

                <Col md={6} xs={6}>
                  <strong>Titulo de eleitor: </strong>
                  {this.props.dados.tituloEleitor ? this.props.dados.tituloEleitor : NENHUM_REGISTRO}
                </Col>

                <Col md={6} xs={6}>
                  <strong>Protocolo: </strong>
                  {this.props.dados.statusProtocolo ? this.props.dados.statusProtocolo : NENHUM_REGISTRO}
                </Col>

                <Col md={6} xs={6}>
                  <strong>Nacionalidade: </strong>
                  {this.props.dados.nacionalidade ? this.props.dados.nacionalidade : NENHUM_REGISTRO}
                </Col>

                <Col md={6} xs={6}>
                  <strong>Estado civil: </strong>
                  {this.props.dados.estadoCivil ? this.props.dados.estadoCivil : NENHUM_REGISTRO}
                </Col>
              </div> : ""}          
          </Panel>
    )
  }
}