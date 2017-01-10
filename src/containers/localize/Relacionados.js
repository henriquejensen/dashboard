import React, { Component } from "react";

import Panel from "../../components/Panel";
import Table from "../../components/Table";

export default class Relacionados extends Component {
    render() {
        return (
            <Panel title={this.props.title} qtdTotal={this.props.qtdTotal}>
                <div className="col-md-12">
                    <Table 
                        fields= {["", "Relação", "Nome", "Data nasc", "Cidade", "UF", "Ação"]}
                    >
                        {this.props.children}
                    </Table>
                    
                </div>
            </Panel>
        )
    }
}