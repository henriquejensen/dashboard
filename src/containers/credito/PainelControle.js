import React, { Component } from "react";

import Panel from "../../components/panel/Panel";
import Table from "../../components/table/Table";

export default class PainelControle extends Component {
    render() {
        return (
            <Panel title="PAINEL DE CONTROLE">
                <Table fields={["#", "Ocorrências", "Quantidade"]}>

                </Table>
            </Panel>
        )
    }
}