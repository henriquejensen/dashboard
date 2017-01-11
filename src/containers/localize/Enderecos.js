import React, { Component } from "react";
import Tooltip from "react-tooltip";

import MapPanel from "../../components/MapPanel";
import Panel from "../../components/Panel";
import Table from "../../components/Table";

export default class Enderecos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapa: false,
      cep: ""
    }

    this.enderecosRelacionados = this.enderecosRelacionados.bind(this);
    this.mostrarMapa = this.mostrarMapa.bind(this);
  }

  fecharMapa() {
    this.setState({
      mapa: false,
    })
  }

  mostrarMapa(cep) {
    this.setState({
      mapa: !this.state.mapa,
      cep: cep
    })
  }

  enderecosRelacionados() {
    this.props.showEnderecosRelacionados();
  }

  render() {
    return (
            <Panel title="ENDEREÇOS" qtdTotal={[{qtd:this.props.enderecos.length,icon:"glyphicon-home"}]}>
              <div className="col-md-12">
                <Table
                  fields={
                    ["Logradouro", "Número", "Complemento", "Bairro", "Cidade", "UF", "CEP", ""]
                  }
                >
                    {this.props.enderecos.length > 0 ?
                      this.props.enderecos.map((end,i) => {
                          let cep = end.CEP.toString();
                          return (
                            <tbody key={i}>
                              <tr>
                                <td>{end.TIPO_LOGRADOURO}. {end.LOGRADOURO}</td>
                                <td>{end.NUMERO}</td>
                                <td>{end.COMPLEMENTO}</td>
                                <td>{end.BAIRRO}</td>
                                <td>{end.CIDADE}</td>
                                <td>{end.UF}</td>
                                <td>{cep.substring(0,cep.length-3)}-{cep.substring(cep.length-3)}</td>
                                <td>
                                    <a data-tip data-for="tooltipMap">
                                      <div
                                        className={this.state.mapa ? "mapa-button mapa-button-close" : "mapa-button"}
                                        onClick={() => this.mostrarMapa(end.CEP)}>
                                        <i className={this.state.mapa ? "fa fa-times-circle": "fa fa-map-o"} />
                                      </div>
                                    </a>
                                </td>
                              </tr>

                              <tr>
                                <td colSpan="8" style={{position:"relative"}}>
                                  {this.state.mapa && this.state.cep == end.CEP ?
                                    <MapPanel endereco={end.TIPO_LOGRADOURO + "." + end.LOGRADOURO + "," + end.CIDADE}/>
                                  : ""}
                                </td>
                              </tr>

                            </tbody>
                          )
                      }) : <tr>
                        <td>{this.props.enderecos.TIPO_LOGRADOURO}. {this.props.enderecos.LOGRADOURO}</td>
                        <td>{this.props.enderecos.NUMERO}</td>
                        <td>{this.props.enderecos.COMPLEMENTO}</td>
                        <td>{this.props.enderecos.BAIRRO}</td>
                        <td>{this.props.enderecos.CIDADE}</td>
                        <td>{this.props.enderecos.UF}</td>
                        <td>{this.props.enderecos.CEP.toString().substring(0,this.props.enderecos.CEP.toString().length-3)}-{this.props.enderecos.CEP.toString().substring(this.props.enderecos.CEP.toString().length-3)}</td>
                        <td>
                            <a data-tip data-for="tooltipMap">
                              <div
                                className="mapa-button"
                                onClick={this.mostrarMapa}>
                                <i className="glyphicon glyphicon-globe" />
                              </div>
                            </a>
                        </td>
                      </tr>
                    }

                </Table>

              </div>
              
              <div className="col-md-12">
                <a data-tip data-for="usersRelated">
                  <i className="glyphicon glyphicon-user pull-right relacionados" onClick={this.enderecosRelacionados} />
                </a>
              </div>

              <Tooltip id="tooltipMap">
                <span>Visualizar endereço</span>
              </Tooltip>
              
            </Panel>)
  }
}