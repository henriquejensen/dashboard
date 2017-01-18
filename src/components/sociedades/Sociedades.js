import React, { Component } from "react";
import Tooltip from 'react-tooltip'

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class Sociedades extends Component {
  render() {
    return (
            <Panel title="PARTICIPAÇÕES EM EMPRESAS">
              <div className="col-md-12">
                <Table
                    fields={
                        ["CNPJ", "Razão social", "Área de atuação", "Participação", "Entrada", "Ação"]
                    }
                >

                  </Table>
                </div>

                <Tooltip id="tooltipConsultar">
                    <span>Consultar</span>
                </Tooltip>
            </Panel>)
  }
}