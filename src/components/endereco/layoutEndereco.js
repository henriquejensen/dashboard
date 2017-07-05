import React, { Component } from "react";
import Tooltip from "react-tooltip";
import { Form, FormControl, FormGroup, Button } from "react-bootstrap";

import MapPanel from "./MapPanel";
import Table from "../table/Table";
import MyButton from "../button/MyButton";

import { NENHUM_REGISTRO, TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE, TOOLTIP_SEE_MAP_MESSAGE, TOOLTIP_SEARCH_RELATED_PEOPLE_COMPANY_MESSAGE_ADDRESS } from "../../constants/utils";

const tooltipMap = "tooltipMap";
const tooltipConsultarMap = "tooltipConsultarMap";

export default class Enderecos extends Component {
  state = {
    mapa: false,
    idCep: ""
  }

  fecharMapa() {
    this.setState({
      mapa: false,
    })
  }

  mostrarMapa = (idCep) => {
    this.setState({
      mapa: !this.state.mapa,
      idCep: idCep
    })
  }

  render() {
    let enderecos = this.props.enderecos ? this.props.enderecos : [];
    let fields = ["Endereço", "Bairro", "Cidade", "UF", "CEP", "#"];
    return (
        <Table fields={fields}>
          {enderecos.length > 0 ?
              enderecos.map((end,i) => {
                  let cep = end.cep ? end.cep.toString() : end.cep;
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
                        <td>{cep ? (cep.substring(0,cep.length-3) + "-" + cep.substring(cep.length-3)) : cep}</td>
                        <td>
                            <MyButton
                                tooltip={TOOLTIP_SEE_MAP_MESSAGE}
                                onClickButton={this.mostrarMapa}
                                params={[i+end.cep]}
                                myButtonClass="noPrint my-button-circle"
                                myButtonText={<i className={this.state.mapa && this.state.idCep == i+end.cep ? "fa fa-times-circle": "fa fa-map-o"} />}
                            />

                            {this.props.searchEndereco ?
                                <MyButton
                                    tooltip={TOOLTIP_SEARCH_RELATED_PEOPLE_COMPANY_MESSAGE_ADDRESS}
                                    onClickButton={this.props.searchEndereco}
                                    params={[end, "ENDERECO", "ENDERECO"]}
                                    myButtonText={<i className='fa fa-home'/>}
                                />
                            : ""}
                        </td>
                      </tr>

                      <tr>
                          {this.state.mapa && this.state.idCep == i+end.cep ?
                            <td colSpan="8" style={{position:"relative"}}>
                              <MapPanel
                                endereco={
                                  end.endereco ?
                                    end.endereco :
                                    (end.tipoLogradouro ? end.tipoLogradouro + "." : "") +
                                  end.logradouro + "," + end.cidade}
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
                <td colSpan={fields.length} className="text-center">
                  <strong>{NENHUM_REGISTRO}</strong>
                  </td>
                </tr>
              }
        </Table>
    )
  }
}