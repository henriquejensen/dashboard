import React, { Component } from "react";

import MapPanel from "../../components/mapPanel";

export default class Enderecos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rua: "",
      cidade: "",
      cep: "",
      mapa: false,
    }
  }

  componentWillMount() {
    this.state = {
      mapa: false,
    }
  }

  fecharMapa() {
    this.setState({
      mapa: false,
      cep: null
    })
  }

  mostrarMapa(rua,cidade,cep) {
    this.setState({
      mapa: false,
      cep: cep
    })
    console.log("MAPA");
    setTimeout(()=> {this.setState({
      rua: rua,
      cidade: cidade,
      mapa: true
    })},1000);
  }

  render() {
    return (
        <div className="row row-localize">
          <div className="col-md-12">
            <div className="panel panel-default">
                <div className="panel-heading text-center">
                    ENDEREÇOS
                </div>

                <div className="panel-body">
                      <div className="col-md-12">
                        <table className="table table-striped table-hover">
                          <thead>
                            <tr>
                              <th>Logradouro</th>
                              <th>Número</th>
                              <th>Complemento</th>
                              <th>Bairro</th>
                              <th>Cidade</th>
                              <th>UF</th>
                              <th>CEP</th>
                              <th className="text-center">Ação</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.enderecos.length > 1 ?
                              this.props.enderecos.map((end,i) => {
                                  let cep = end.CEP.toString()
                                  return this.state.cep == end.CEP || this.state.cep == null ?
                                    (<tr key={i}>
                                      <td>{end.TIPO_LOGRADOURO}. {end.LOGRADOURO}</td>
                                      <td>{end.NUMERO}</td>
                                      <td>{end.COMPLEMENTO}</td>
                                      <td>{end.BAIRRO}</td>
                                      <td>{end.CIDADE}</td>
                                      <td>{end.UF}</td>
                                      <td>{cep.substring(0,cep.length-3)}-{cep.substring(cep.length-3)}</td>
                                      <td>
                                          <div
                                            className="mapa-button"
                                            onClick={this.mostrarMapa.bind(this,end.LOGRADOURO, end.CIDADE, end.CEP)}>
                                            <i className="glyphicon glyphicon-globe" />
                                          </div>
                                      </td>
                                    </tr>) : <tr></tr>
                              }) : <tr>
                                <td>{this.props.enderecos.TIPO_LOGRADOURO}. {this.props.enderecos.LOGRADOURO}</td>
                                <td>{this.props.enderecos.NUMERO}</td>
                                <td>{this.props.enderecos.COMPLEMENTO}</td>
                                <td>{this.props.enderecos.BAIRRO}</td>
                                <td>{this.props.enderecos.CIDADE}</td>
                                <td>{this.props.enderecos.UF}</td>
                                <td>{cep.substring(0,cep.length-3)}-{cep.substring(cep.length-3)}</td>
                                <td>
                                    <div
                                      className="mapa-button"
                                      onClick={this.mostrarMapa.bind(this,this.props.enderecos.LOGRADOURO, this.props.enderecos.CIDADE, this.props.enderecos.CEP)}>
                                      <i className="glyphicon glyphicon-globe" />
                                    </div>
                                </td>
                              </tr>}
                          </tbody>
                        </table>

                        {this.state.mapa ? (<div style={{position:"relative"}}>
                          <i className="glyphicon-remove-sign" className="fechar-mapa" onClick={this.fecharMapa.bind(this)}/>
                          <MapPanel rua={this.state.rua} cidade={this.state.cidade} cep={this.state.cep}/>
                        </div>) : ""}
                      </div>
                </div>
            </div>
          </div>
    </div>)
  }
}