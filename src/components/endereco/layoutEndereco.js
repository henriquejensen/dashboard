import React, { Component } from "react";
import Tooltip from "react-tooltip";

import MapPanel from "../MapPanel";
import Table from "../Table";

export default class Enderecos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapa: false,
      idCep: ""
    }

    this.mostrarMapa = this.mostrarMapa.bind(this);
  }

  fecharMapa() {
    this.setState({
      mapa: false,
    })
  }

  mostrarMapa(idCep) {
    this.setState({
      mapa: !this.state.mapa,
      idCep: idCep
    })
  }

  render() {
    return (
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
                                        className={this.state.mapa && this.state.idCep == i+end.CEP ? "mapa-button mapa-button-close" : "mapa-button"}
                                        onClick={() => this.mostrarMapa(i+end.CEP)}>
                                        <i className={this.state.mapa && this.state.idCep == i+end.CEP ? "fa fa-times-circle": "fa fa-map-o"} />
                                      </div>
                                    </a>
                                </td>
                              </tr>

                              <tr>
                                  {this.state.mapa && this.state.idCep == i+end.CEP ?
                                    <td colSpan="8" style={{position:"relative"}}>
                                      <MapPanel endereco={end.TIPO_LOGRADOURO + "." + end.LOGRADOURO + "," + end.CIDADE}/>
                                    </td>
                                  : ""}
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

              
              <a data-tip data-for="usersRelated">
                <i className="glyphicon glyphicon-user pull-right relacionados" onClick={this.props.relacionados} />
              </a>

              <Tooltip id="tooltipMap">
                <span>Visualizar endereço</span>
              </Tooltip>
              
            </div>)
  }
}