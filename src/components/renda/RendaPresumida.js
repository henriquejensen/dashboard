import React, { Component } from "react";

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class RendaPresumida extends Component {
    render(){
        return (
            <div>
                <a name={"Renda presumida"+this.props.index}></a>
                <Panel title="RENDA PRESUMIDA">
                    
                    <div className="col-md-12">
                        <Table
                            fields={
                                ["Faixa de Renda", "Probabilidade (%)"]
                            }
                        >
                            <tbody>
                                {this.props.rendas.map((renda, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{renda.faixa}</td>
                                            <td>{renda.probabilidade}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>

                        <div>
                            <h4>Crédito Sugerido</h4>
                            <strong>Limite de Crédito Sugerido</strong> R$: {this.props.limiteSugerido.limiteCreditoSugerido}
                        </div>
                    </div>

                </Panel>
            </div>
        )
    }
}