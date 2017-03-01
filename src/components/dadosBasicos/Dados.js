import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Col, Button} from "react-bootstrap";

import { patternCPF, patternRG } from "../utils/functions/patternDocuments";

import Panel from "../panel/Panel";

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
              <span className={this.props.dados.status == "ATIVO" ? "destaque-ativado" : "destaque-desativado "}>{this.props.dados.status ? this.props.dados.status : "Nada consta"}</span>
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
              <strong>Óbito: </strong>
              <span className={this.props.dados.obitoProvavel == "SIM" ? "destaque-ativado" : "destaque-desativado "}>{this.props.dados.obitoProvavel ? this.props.dados.obitoProvavel : "Nada consta"}</span>
            </div>

            <div className="col-md-6">
              <strong>RG: </strong>
              {this.props.dados.rg ? patternRG(this.props.dados.rg) + "/" + this.props.dados.ufRg : "Nada consta"}
            </div>
            <div className="col-md-6">
              <strong>Signo: </strong>
              {this.props.dados.signo}
            </div>

            <div className="col-md-12" style={{paddingTop:"5px", width:"100%", border: "0px solid #dddddd", borderTopWidth: "1px"}}>
              <strong>MÃE: </strong>
              {this.props.dados.maeNome ?
                <span>
                  {this.props.dados.maeNome}
                  {this.props.dados.maeCpf ?
                    <a data-tip data-for='tooltipConsultar'>
                      <Button bsStyle="info" className="mapa-button" onClick={() => this.props.searchPerson(this.props.dados.maeCpf, "pf")}>
                          <i className='fa fa-search'/>
                      </Button>
                    </a>
                  :""}
                </span>
              : <div>Nada consta</div>}
            </div>
            
            
            <div className="col-md-12 moreInfo" onClick={() => this.setState({moreInfo:!this.state.moreInfo})}>
              <a data-tip data-for="moreInfo">
                <i className={this.state.moreInfo ? "fa fa-minus pull-right moreInfo" : "fa fa-plus pull-right moreInfo"} />
              </a>
            </div>
            
            <Tooltip id="moreInfo">
              <span>Mais informações</span>
            </Tooltip>
            <Tooltip id="tooltipConsultar">
              <span>Consultar</span>
            </Tooltip>


            {this.state.moreInfo ? 
              <div >
                <div className="col-md-6">
                  <strong>Data status CPF: </strong>
                  {this.props.dados.statusData ? this.props.dados.statusData : "Nada consta"}
                </div>

                <div className="col-md-6" style={{marginBottom:"20px"}}>
                  <strong>Protocolo: </strong>
                  {this.props.dados.statusProtocolo ? this.props.dados.statusProtocolo : "Nada consta"}
                </div>

                <div className="col-md-4" style={{marginBottom:"20px"}}>
                  <strong>Titulo de eleitor: </strong>
                  {this.props.dados.tituloEleitor ? this.props.dados.tituloEleitor : "Nada consta"}
                </div>

                <div className="col-md-4" style={{marginBottom:"20px"}}>
                  <strong>Nacionalidade: </strong>
                  {this.props.dados.nacionalidade ? this.props.dados.nacionalidade : "Nada consta"}
                </div>

                <div className="col-md-4" style={{marginBottom:"20px"}}>
                  <strong>Estado civil: </strong>
                  {this.props.dados.estadoCivil ? this.props.dados.estadoCivil : "Nada consta"}
                </div>
              </div> : ""}
          </Panel>
    )
  }
}