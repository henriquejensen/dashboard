import React, { Component } from "react"

import Panel from "../panel/Panel"
import LayoutTelefone from "./layoutTelefone"
import MyButton from "../button/MyButton"

import { TOOLTIP_SEE_MORE_INFO_MESSAGE, TOOLTIP_SEE_LESS_INFO_MESSAGE, NENHUM_REGISTRO } from "../../constants/utils"

export default class Telefone extends Component {
    state = {
        newPhone: false,
        showMoreTel: false
    }

    sendNewPhone = (newTel) => {
        this.setState({
            newPhone: false
        })
    }

    render() {
        let fixos = this.props.telefones ? this.props.telefones.fixos ? this.props.telefones.fixos : [] : "";
        let moveis = this.props.telefones ? this.props.telefones.moveis ? this.props.telefones.moveis : [] : "";
        return (
            this.props.telefones ?
                <Panel title="TELEFONES" qtdTotal={[{icon:"fa fa-phone", qtd:fixos.length},{icon:"fa fa-mobile", qtd:moveis.length}]}>
                    <LayoutTelefone
                        showMoreTel={this.state.showMoreTel}
                        fixos={fixos}
                        moveis={moveis}
                        newPhone={this.state.newPhone}
                        sendNewPhone={this.sendNewPhone}/>
                    <div className="col-md-12 col-sm-12 relacionados" style={{textAlign:"right"}}>
                        {/*<a className="moreInfo" onClick={() => this.setState({newPhone:!this.state.newPhone})}>
                            {this.state.newPhone ?
                                "Cancelar"
                            : "Adicionar um novo telefone"}
                        </a>*/}
                        {fixos.length > 4 || moveis.length > 4 ?
                            <MyButton
                                tooltip={this.state.showMoreTel ? TOOLTIP_SEE_LESS_INFO_MESSAGE : TOOLTIP_SEE_MORE_INFO_MESSAGE}
                                onClickButton={() => this.setState({showMoreTel: !this.state.showMoreTel})}
                                myButtonClass="my-button-circle"
                                myButtonText={this.state.showMoreTel ? <i className="fa fa-minus" aria-hidden="true"></i> : <i className="fa fa-plus" aria-hidden="true"></i>}
                            />
                        : ""}
                    </div>
                </Panel>
                :
                <Panel title="TELEFONES">
                    <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                </Panel>
        )
    }
}