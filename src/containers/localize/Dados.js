import React, { Component } from "react";

export default class Dados extends Component{
  constructor(props) {
    super(props);

    this.state = {
         smShow: false,
         lgShow: false,
     };
  }

  mostrarEmail() {
    for(var email in this.props.dados.EMAIL) {return this.props.dados.EMAIL[email]}
  }

  render() {
    let cpf = this.props.dados.CPF.toString();
    return <div className="row row-localize">
          <div className="col-md-12">
            <div className="panel panel-default">
                <div className="panel-heading text-center">
                    DADOS PESSOAIS
                </div>

                <div className="panel-body">
                  <div className="col-md-6">
                    <strong>Nome: </strong>
                    {this.props.dados.NOME}
                  </div>
                  <div className="col-md-3" style={false ? {backgroundColor:"#F4654D", color: "white"} : {}}>
                    <strong>Óbito: </strong>
                    {this.props.dados.PROBABILIDADE_OBITO ? "SIM" : "NÃO"}
                  </div>
                  <div className="col-md-3" >
                     <div className="mapa-button" style={{margin:0, borderRadius:0, width:200}}>
                       Pessoas Relacionadas <i className="glyphicon glyphicon-search" aria-hidden="true" />
                     </div>
                  </div>

                  <div className="col-md-3">
                    <strong>Nascimento </strong>
                    {this.props.dados.DATA_NASC.split("-").reverse().join("/")}
                  </div>

                  <div className="col-md-3">
                    <strong>Idade: </strong>
                    {this.props.dados.IDADE} anos
                  </div>

                  <div className="col-md-3">
                    <strong>Sexo: </strong>
                    {this.props.dados.SEXO}
                  </div>

                  <div className="col-md-3">
                    <strong>Signo: </strong>
                    {this.props.dados.SIGNO}
                  </div>

                  <div className="col-md-3">
                    <strong>Faixa de renda: </strong>
                    {this.props.dados.SITUACAO_RECEITA_FEDERAL.SITUACAO}
                  </div>

                  <div className="col-md-3">
                    <strong>Renda estimada: </strong>
                    R$ {this.props.dados.RENDA_ESTIMADA}
                  </div>

                  <div className="col-md-3">
                    <strong>Faixa de renda: </strong>
                    {this.props.dados.FAIXA_RENDA_ESTIMADA}
                  </div>

                  <div className="col-md-3">
                    <strong>CPF: </strong>
                    {cpf.substring(0,3)}.{cpf.substring(3,6)}.{cpf.substring(6,9)}-{cpf.substring(9)}
                  </div>


                  <hr className="my-hr"/>
                  <div style={{margin:"5px 0", width:"100%", float:"left"}}>
                    <div className="col-md-6" style={{margin:"5px 0"}}>
                      <strong>MÃE: </strong>
                      {this.props.dados.MAE.NOME}
                    </div>

                    {this.props.dados.MAE.CPF ? (<div className="col-md-3" style={{marginTop:3}}>
                        <div className="mapa-button" style={{margin:0, borderRadius:0, width:100}} onClick={() => this.props.searchLocalize(this.props.dados.MAE.CPF, "pf")}>
                            Consultar <i className='glyphicon glyphicon-search'/>
                        </div>
                    </div>) : ""}
                  </div>

                </div>
            </div>
          </div>
      </div>
  }
}