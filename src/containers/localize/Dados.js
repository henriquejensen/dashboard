import React, { Component } from "react";
import Tooltip from 'react-tooltip'

import Panel from "../../components/Panel";

export default class Dados extends Component{
  constructor(props) {
    super(props);

    this.state = {
         smShow: false,
         lgShow: false,
         moreInfo: false
     };
  }

  mostrarEmail() {
    for(var email in this.props.dados.EMAIL) {return this.props.dados.EMAIL[email]}
  }

  render() {
    let cpf = this.props.dados.CPF.toString();
    return (            
            <Panel title="DADOS CADASTRAIS">
              <div className="col-md-6">
                <strong>Documento: </strong>
                {cpf.substring(0,3)}.{cpf.substring(3,6)}.{cpf.substring(6,9)}-{cpf.substring(9)}
              </div>
              <div className="col-md-6">
                <strong>Status CPF: </strong>
                <span className={!this.props.dados.baseCpfFiscal ? "destaque-ativado" : "destaque-desativado "}>{this.props.dados.baseCpfFiscal ? this.props.dados.baseCpfFiscal.status : "Nada consta"}</span>
              </div>

              <div className="col-md-6">
                <strong>Nome: </strong>
                {this.props.dados.NOME}
              </div>
              <div className="col-md-6">
                <strong>Nascimento </strong>
                {this.props.dados.DATA_NASC.split("-").reverse().join("/") + " - " + this.props.dados.IDADE + " anos"}
              </div>

              <div className="col-md-6">
                <strong>Sexo: </strong>
                {this.props.dados.SEXO}
              </div>
              <div className="col-md-6">
                <strong>Óbito: </strong>
                <span className={!this.props.dados.PROBABILIDADE_OBITO ? "destaque-ativado" : "destaque-desativado "}>{this.props.dados.PROBABILIDADE_OBITO ? "SIM" : "NÃO"}</span>
              </div>

              <div className="col-md-6">
                <strong>RG: </strong>
                {this.props.dados.RG ? this.props.dados.RG + "-" + this.props.dados.UFRG : "Nada consta"}
              </div>
              <div className="col-md-6">
                <strong>Signo: </strong>
                {this.props.dados.SIGNO}
              </div>

              <div style={{margin:"5px 0", width:"100%", float:"left", border: "0px solid #dddddd", borderTopWidth: "1px"}}>
                <div className="col-md-6" style={{margin:"5px 0"}}>
                  <strong>MÃE: </strong>
                  {this.props.dados.MAE ? this.props.dados.MAE.NOME : "Nada consta"}
                </div>

                {this.props.dados.MAE && this.props.dados.MAE.CPF ? (<div className="col-md-6" style={{marginTop:3}}>
                    <a data-tip data-for='tooltipConsultar'>
                      <div className="mapa-button" onClick={() => this.props.searchLocalize(this.props.dados.MAE.CPF, "pf")}>
                          <i className='fa fa-search'/>
                      </div>
                    </a>
                </div>) : ""}
              </div>
              
              
              <div className="col-md-12 moreInfo" onClick={() => this.setState({moreInfo:!this.state.moreInfo})}>
                <a data-tip data-for="moreInfo">
                  <i className="glyphicon glyphicon-plus pull-right moreInfo" />
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
                    {this.props.dados.baseCpfFiscal ? this.props.dados.baseCpfFiscal.data : "Nada consta"}
                  </div>

                  <div className="col-md-6" style={{marginBottom:"20px"}}>
                    <strong>Protocolo: </strong>
                    {this.props.dados.baseCpfFiscal ? this.props.dados.baseCpfFiscal.protocolo : "Nada consta"}
                  </div>

                  <div className="col-md-4" style={{marginBottom:"20px"}}>
                    <strong>Titulo de eleitor: </strong>
                    {this.props.dados.baseCpfFiscal ? this.props.dados.baseCpfFiscal.tituloEleitor : "Nada consta"}
                  </div>

                  <div className="col-md-4" style={{marginBottom:"20px"}}>
                    <strong>Nacionalidade: </strong>
                    {this.props.dados.baseCpfFiscal ? this.props.dados.baseCpfFiscal.nacionalidade : "Nada consta"}
                  </div>

                  <div className="col-md-4" style={{marginBottom:"20px"}}>
                    <strong>Estado civil: </strong>
                    {this.props.dados.baseCpfFiscal ? this.props.dados.baseCpfFiscal.estadoCivil : "Nada consta"}
                  </div>
                </div> : ""}

          </Panel>
    )
  }
}