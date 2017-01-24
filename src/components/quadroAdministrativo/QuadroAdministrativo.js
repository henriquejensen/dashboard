import React, { Component } from "react";
import Tooltip from 'react-tooltip'

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class QuadroAdministrativo extends Component {
  render() {
    return (
          <div>
            <a name={"Quadro administrativo"+this.props.index}></a>
            <Panel title="QUADRO ADMINISTRATIVO" qtdTotal={[{icon:"fa fa-users", qtd:this.props.administradores.length}]}>
              
              <div className="col-md-12">
                <Table
                    fields={
                        ["Documento", "Administração", "Cargo", "Nacionalidade", ""]
                    }
                >
                  <tbody>
                    {this.props.administradores.map((admin, index) => {
                      return (
                        <tr key={index}>
                          <td>{admin.documento}</td>
                          <td>{admin.administracao}</td>
                          <td>{admin.cargo}</td>
                          <td>{admin.nacionalidade}</td>
                          <td>
                            <a data-tip data-for='tooltipConsultar'>
                              <div className="mapa-button">
                                  <i className='fa fa-search'/>
                              </div>
                            </a>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>

              <Tooltip id="tooltipConsultar">
                  <span>Consultar</span>
              </Tooltip>
            </Panel>
          </div>
      )
  }
}