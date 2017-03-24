import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Endereco from "../endereco/layoutEndereco";
import Panel from "../panel/Panel";

export default class OutrasGrafias extends Component {
    render() {
        return(
            <Panel title="OUTRAS GRAFIAS" qtdTotal={[{icon:"fa fa-pencil", qtd:this.props.grafias.length}]}>
                <a name={"Outras grafias"+this.props.index}></a>
                {this.props.grafias.map((grafia, index) => {
                    return (
                        <div key={index}>
                            <Col md={6}><strong>Nome:</strong> {grafia.nome}</Col>
                            <Col md={6}><strong>Documento:</strong> {grafia.documento}</Col>

                            <Col md={12}>
                                <Endereco enderecos={[
                                    grafia
                                ]} />
                            </Col>
                        </div>
                    )
                })}

            </Panel>
        )
    }
}