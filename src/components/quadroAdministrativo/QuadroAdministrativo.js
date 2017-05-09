import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Col, Button } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";
import MyButton from "../button/MyButton";

import { NENHUM_REGISTRO, TOOLTIP_SEARCH_BY_DOCUMENT } from "../../constants/utils";

const title = "QUADRO ADMINISTRATIVO";

export default class QuadroAdministrativo extends Component {
  render() {
    let administradores = this.props.administradores ? this.props.administradores : [];
    let fields = ["Nome", "Administração", "Cargo", "Nacionalidade", ""];
    let handleSearchPerson = this.props.searchPerson;
    let isCpfOrCnpj = "CPF";
    return (
          <div>
            <a name={"Quadro administrativo"+this.props.index}></a>
            <a name={"Administradores"+this.props.index}></a>
            {administradores.length > 0 ?
              <Panel title={title} qtdTotal={[{icon:"fa fa-users", qtd:administradores.length}]}>
                
                <Col md={12}>
                  <Table fields={fields}>
                    <tbody>
                      {this.props.administradores.map((admin, index) => {
                        return (
                          <tr key={index}>
                            <td>
                                <MyButton
                                    tooltip={TOOLTIP_SEARCH_BY_DOCUMENT}
                                    onClickButton={handleSearchPerson}
                                    params={[admin.documento, isCpfOrCnpj]}
                                    label={admin.nome}
                                />
                            </td>
                            <td>{admin.administracao ? admin.administracao : NENHUM_REGISTRO}</td>
                            <td>{admin.cargo ? admin.cargo : NENHUM_REGISTRO}</td>
                            <td>{admin.nacionalidade ?  admin.nacionalidade : NENHUM_REGISTRO}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Panel>
              :
              <Panel title={title}>
                  <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
              </Panel>}
          </div>
      )
  }
}