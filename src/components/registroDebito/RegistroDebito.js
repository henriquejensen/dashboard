import React, { Component } from "react";

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class RegistroDebito extends Component {
  render() {
    return (
          <div>
            <a name={"Registros de Débitos"+this.props.index}></a>
            <Panel title="REGISTROS DE DÉBITOS" qtdTotal={[{icon:"fa fa-credit-card-alt", qtd:this.props.registros.quantidadeRegistros}]}>
              
              <div className="col-md-12">
                <div className="col-md-4"><strong>Ocorrência mais Antiga:</strong> {this.props.registros.ocorrenciaMaisAntiga}</div>
                <div className="col-md-4"><strong>Ocorrência mais Recente:</strong> {this.props.registros.ocorrenciaMaisRecente}</div>
                <div className="col-md-4"><strong>Valor Total:</strong> R$ {this.props.registros.valorTotal}</div>
                <Table
                    fields={
                        ["Associado/Credor", "Data Inclusão", "Data vencimento", "Origem", "Contrato", "Comprador/Avalista", "Valor", "Cidade", "Telefone"]
                    }
                >
                  <tbody>
                    {this.props.registros.registrosDebitos.map((registro, index) => {
                      return (
                        <tr key={index}>
                          <td>{registro.credor}</td>
                          <td>{registro.dataInclusao}</td>
                          <td>{registro.dataVencimento}</td>
                          <td>{registro.praca}</td>
                          <td>{registro.contrato}</td>
                          <td>{registro.avalistaComprador}</td>
                          <td>{registro.valor}</td>                        
                          <td>{registro.cidade}</td>
                          <td>{registro.ddd + " " + registro.telefone}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            </Panel>
          </div>
      )
  }
}