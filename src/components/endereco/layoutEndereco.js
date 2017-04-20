import React, { Component } from "react";
import Tooltip from "react-tooltip";
import { Form, FormControl, FormGroup, Button } from "react-bootstrap";

import MapPanel from "./MapPanel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

const tooltipMap = "tooltipMap";
const tooltipConsultarMap = "tooltipConsultarMap";

export default class Enderecos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapa: false,
      idCep: "",
      IsModalOpen: false
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
    let enderecos = this.props.enderecos ? this.props.enderecos : [];
    return (
            <div>
                <Table
                  fields={
                    ["Endereço", "Bairro", "Cidade", "UF", "CEP", ""]
                  }
                >
                  {enderecos.length > 0 ?
                      enderecos.map((end,i) => {
                          let cep = end.cep.toString();
                          return (
                            <tbody key={i}>
                              <tr>
                                <td>
                                  {end.endereco ?
                                    end.endereco :
                                    (
                                      (end.tipoLogradouro ? end.tipoLogradouro : "")
                                      + (end.logradouro ? " " + end.logradouro : "")
                                      + (end.numero ? ", " + end.numero : "")
                                      + (end.complemento ? ", " + end.complemento : "")
                                    )
                                  }</td>
                                <td>{end.bairro}</td>
                                <td>{end.cidade}</td>
                                <td>{end.uf}</td>
                                <td>{cep.substring(0,cep.length-3)}-{cep.substring(cep.length-3)}</td>
                                <td>
                                    <a data-tip data-for={tooltipMap}>
                                        <Button
                                          bsStyle="info"
                                          className={this.state.mapa && this.state.idCep == i+end.cep ? "noPrint mapa-button mapa-button-close" : "noPrint mapa-button"}
                                          onClick={() => this.mostrarMapa(i+end.cep)}>
                                            <i className={this.state.mapa && this.state.idCep == i+end.cep ? "fa fa-times-circle": "fa fa-map-o"} />
                                        </Button>
                                    </a>

                                    {this.props.searchEndereco ? 
                                      <a data-tip data-for={tooltipConsultarMap}>
                                          <Button
                                            bsStyle="info"
                                            className="mapa-button"
                                            onClick={() => this.props.searchEndereco(end, "ENDERECO", "ENDERECO")}>
                                              <i className='fa fa-home'/>
                                          </Button>
                                      </a>
                                    : ""}
                                </td>
                              </tr>

                              <tr>
                                  {this.state.mapa && this.state.idCep == i+end.cep ?
                                    <td colSpan="8" style={{position:"relative"}}>
                                      <MapPanel
                                        endereco={end.tipoLogradouro + "." + end.logradouro + "," + end.cidade}
                                        latitude={end.latitude}
                                        longitude={end.longitude} />
                                    </td>
                                  : ""}
                              </tr>
                            </tbody>
                          )
                      })
                      :
                      <tr>
                        <td colSpan={6} className="text-center">
                          <strong>{NENHUM_REGISTRO}</strong>
                          </td>
                        </tr>}

                </Table>

              <Tooltip id={tooltipMap}>
                <span>Visualizar endereço</span>
              </Tooltip>

              <Tooltip id={tooltipConsultarMap}>
                <span>Consulta por endereço</span>
              </Tooltip>

            </div>)
  }
}