import React, { Component } from "react";
import Tooltip from 'react-tooltip'

import Panel from "../panel/Panel";

export default class Dados extends Component{

  state = {
    moreInfo: false
  }

  render() {
    let documento = this.props.dados.cpf.toString();
    return (            
            <Panel title="DADOS CADASTRAIS">
              <div className="col-md-6">
                <strong>Documento: </strong>
                {documento.substring(0,3)}.{documento.substring(3,6)}.{documento.substring(6,9)}-{documento.substring(9)}
              </div>
              <div className="col-md-6">
                <strong>Status CPF: </strong>
                <span className={this.props.dados.status == "ATIVO" ? "destaque-ativado" : "destaque-desativado "}>{this.props.dados.status}</span>
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
                <span className={this.props.dados.obitoProvavel ? "destaque-ativado" : "destaque-desativado "}>{this.props.dados.obitoProvavel ? "SIM" : "NÃO"}</span>
              </div>

              <div className="col-md-6">
                <strong>RG: </strong>
                {this.props.dados.rg ? this.props.dados.rg + "-" + this.props.dados.ufRg : "Nada consta"}
              </div>
              <div className="col-md-6">
                <strong>Signo: </strong>
                {this.props.dados.signo}
              </div>

              <div style={{margin:"5px 0", width:"100%", float:"left", border: "0px solid #dddddd", borderTopWidth: "1px"}}>
                <div className="col-md-6" style={{margin:"5px 0"}}>
                  <strong>MÃE: </strong>
                  {this.props.dados.maeNome ? this.props.dados.maeNome : "Nada consta"}
                </div>

                {this.props.dados.maeNome && this.props.dados.maeCpf ? (<div className="col-md-6" style={{marginTop:3}}>
                    <a data-tip data-for='tooltipConsultar'>
                      <div className="mapa-button" onClick={() => this.props.searchCredito(this.props.dados.maeCpf)}>
                          <i className='fa fa-search'/>
                      </div>
                    </a>
                </div>) : ""}
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