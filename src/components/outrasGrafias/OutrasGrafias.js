import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Table from "../table/Table";
import Panel from "../panel/Panel";

import { NENHUM_REGISTRO } from "../../constants/utils";

const title = "OUTRAS GRAFIAS";

export default class OutrasGrafias extends Component {
    render() {
        let grafias = this.props.grafias ? this.props.grafias : [];
        let fields= ["Grafia", "Logradouro", "Bairro", "Cidade-UF"];
        return(
            <div>
                <a name={"Outras grafias"+this.props.index}></a>
                {grafias.length > 0 ?
                <Panel title={title} qtdTotal={[{icon:"fa fa-pencil", qtd:grafias.length}]}>
                    <Table fields={fields}>
                    <tbody>
                        {grafias.map((grafia, index) => {
                            return (
                                <tr key={index}>
                                    <td>{grafia.nome}</td>
                                    <td>{grafia.endereco}</td>
                                    <td>{grafia.bairro}</td>
                                    <td>{grafia.cidade+" - " + grafia.uf}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </Panel>
            
            :
            <Panel title={title}>
                <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
            </Panel>}
        </div>
            
        )
    }
}