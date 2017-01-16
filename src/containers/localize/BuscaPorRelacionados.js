import React, { Component } from "react";
import Tooltip from 'react-tooltip'

import Panel from "../../components/Panel";
import Table from "../../components/Table";

export default class BuscaPorRelacionados extends Component {
    render() {
        return (
            <Panel title="RESULTADOS DA BUSCA" qtdTotal={[{qtd:this.props.relacionados.length,icon:"fa fa-users"}]}>
                <Table 
                    fields = {[
                        "Nome", "Data nasc.", "Pessoa Relacionada", "Cidade", "UF", ""
                    ]}
                >
                    <tbody>
                        {this.props.relacionados.map((relacionado,index) => {
                            return (
                                <tr key={index}>
                                    <td>{relacionado.nome}</td>
                                    <td>{relacionado.data}</td>
                                    <td>{relacionado.pessoaRelacionada}</td>
                                    <td>{relacionado.cidade}</td>
                                    <td>{relacionado.uf}</td>
                                    <td>
                                        <a data-tip data-for="tooltipConsultar">
                                            <div className="mapa-button" onClick={() => this.props.searchLocalize(relacionado.documento, "pf")}>
                                                <i className='fa fa-search'/>
                                            </div>
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

              <Tooltip id="tooltipConsultar">
                <span>Consultar</span>
              </Tooltip>
            </Panel>
        )
    }
}