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
            <div>
                <Table
                  fields={
                    ["Logradouro", "Número", "Complemento", "Bairro", "Cidade", "UF", "CEP", ""]
                  }
                >
                    {this.props.enderecos.map((end,i) => {
                        let cep = end.cep.toString();
                        return (
                          <tbody key={i}>
                            <tr>
                              <td>{end.tipoLogradouro}. {end.logradouro}</td>
                              <td>{end.numero}</td>
                              <td>{end.complemento}</td>
                              <td>{end.bairro}</td>
                              <td>{end.cidade}</td>
                              <td>{end.uf}</td>
                              <td>{cep.substring(0,cep.length-3)}-{cep.substring(cep.length-3)}</td>
                              <td>
                                  <a data-tip data-for="tooltipMap">
                                    <div
                                      className={this.state.mapa && this.state.idCep == i+end.cep ? "mapa-button mapa-button-close" : "mapa-button"}
                                      onClick={() => this.mostrarMapa(i+end.cep)}>
                                      <i className={this.state.mapa && this.state.idCep == i+end.cep ? "fa fa-times-circle": "fa fa-map-o"} />
                                    </div>
                                  </a>
                              </td>
                            </tr>

                            <tr>
                                {this.state.mapa && this.state.idCep == i+end.cep ?
                                  <td colSpan="8" style={{position:"relative"}}>
                                    <MapPanel endereco={end.tipoLogradouro + "." + end.logradouro + "," + end.cidade}/>
                                  </td>
                                : ""}
                            </tr>
                          </tbody>
                        )
                    })}
                </Table>

              
              {this.props.relacionados ?
                <a data-tip data-for="usersRelated">
                  <i className="glyphicon glyphicon-user pull-right relacionados" onClick={this.props.relacionados} />
                </a>
              : ""}

              <Tooltip id="tooltipMap">
                <span>Visualizar endereço</span>
              </Tooltip>
              
            </div>)
  }
}