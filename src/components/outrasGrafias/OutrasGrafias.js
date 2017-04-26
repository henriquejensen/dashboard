import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Endereco from "../endereco/layoutEndereco";
import Panel from "../panel/Panel";

import { NENHUM_REGISTRO } from "../../constants/utils";

const title = "OUTRAS GRAFIAS";

export default class OutrasGrafias extends Component {
    render() {
        let grafias = this.props.grafias ? this.props.grafias : [];
        return(
            grafias.length > 0 ?
                <div>
                    <a name={"Outras grafias"+this.props.index}></a>
                    <Panel title={title} qtdTotal={[{icon:"fa fa-pencil", qtd:grafias.length}]}>
                        
                        {grafias.map((grafia, index) => {
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
                </div>
            :
            <Panel title={title}>
                <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
            </Panel>
        )
    }
}