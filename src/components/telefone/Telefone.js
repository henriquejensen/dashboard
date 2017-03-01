import React, { Component } from "react"

import Panel from "../panel/Panel";
import LayoutTelefone from "./layoutTelefone";

export default class Telefone extends Component {
    state = {
        newPhone: false
    }

    sendNewPhone = (newTel) => {
        console.log("NEW PHONE", newTel);

        this.setState({
            newPhone: false
        })
    }

    render() {
        let fixos = this.props.telefones ? this.props.telefones.fixos : "";
        let moveis = this.props.telefones ? this.props.telefones.moveis : "";
        return (
            this.props.telefones ?
                <Panel title="TELEFONES" qtdTotal={[{icon:"fa fa-phone", qtd:fixos.length},{icon:"fa fa-mobile", qtd:moveis.length}]}>
                    <LayoutTelefone
                        fixos={fixos}
                        moveis={moveis}
                        newPhone={this.state.newPhone}
                        sendNewPhone={this.sendNewPhone}/>
                    <div className="col-md-12 col-sm-12 relacionados">
                        <a className="moreInfo" onClick={() => this.setState({newPhone:!this.state.newPhone})}>
                            {this.state.newPhone ?
                                "Cancelar"
                            : "Adicionar um novo telefone"}
                        </a>
                        <a data-tip data-for="moreInfo">
                            <i className="fa fa-plus pull-right moreInfo"/>
                        </a>
                        <a data-tip data-for="usersRelated">
                            <i className="fa fa-users pull-right"  />
                        </a>
                    </div>
                </Panel>
                :
                <Panel title="TELEFONES">
                    <div className="text-center"><strong>Nada consta</strong></div>
                </Panel>
        )
    }
}