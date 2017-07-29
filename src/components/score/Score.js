import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

const title = "SCORE"

export default class Score extends Component {
    render() {
        let scores = this.props.scores ? this.props.scores : [];
        return (
            <div>
                {scores.length > 0 ?
                    <Panel title={title} qtdTotal={[{icon:"fa fa-star", qtd:scores.length}]}>
                        <a name="score"></a>
                        <Col md={12}>
                            <Table fields={["Probabilidade", "Descrição", "Classe", "Grupo", "Período", "Pontos", "Tipo"]}>
                                <tbody>
                                    {scores.map((score, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{score.probabilidade}</td>
                                                <td>{score.descricao}</td>
                                                <td>{score.classe}</td>
                                                <td>{score.grupo}</td>
                                                <td>{score.periodo}</td>
                                                <td>{score.pontos}</td>
                                                <td>{score.tipo}</td>
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