import React, { Component } from "react";

import Endereco from "../endereco/layoutEndereco";
import Panel from "../panel/Panel";

export default class OutrasGrafias extends Component {
    render() {
        return(
            <Panel title="OUTRAS GRAFIAS" qtdTotal={[{icon:"fa fa-pencil", qtd:this.props.grafias.length}]}>
                <a name={"Outras grafias"+this.props.index}></a>
                <div className="col-md-12">
                    {this.props.grafias.map((grafia, index) => {
                        return (
                            <div key={index}>
                                <div className="col-md-6"><strong>Nome:</strong> {grafia.nome}</div>
                                <div className="col-md-6"><strong>Documento:</strong> {grafia.documento}</div>

                                <Endereco enderecos={[
                                    grafia
                                ]} />
                            </div>
                        )
                    })}

                </div>
            </Panel>
        )
    }
}