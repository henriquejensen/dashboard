import React, { Component } from "react"

import Panel from "../panel/Panel";
import Modal from "../Modal";
import LayoutEndereco from "./layoutEndereco";
import EnviarEndereco from "../forms/EnviarEndereco";

export default class Endereco extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IsModalOpen: false
        }

        this.closeModal = this.closeModal.bind(this);
        this.sendNewAddress = this.sendNewAddress.bind(this);
    }

    closeModal() {
        this.setState({
            IsModalOpen: false
        })
    }

    sendNewAddress(newAddress) {
        console.log("NEW ADDRESS", newAddress);

        this.setState({
            IsModalOpen: false
        })
    }

    render() {
        return (
            <span>
                {this.props.enderecos ?
                    <Panel title="ENDEREÇOS" qtdTotal={[{icon:"fa fa-home", qtd:this.props.enderecos.length}]}>
                        <div className="col-md-12 col-xs-12">
                            <LayoutEndereco enderecos={this.props.enderecos} newAddress={this.state.IsModalOpen} sendNewAddress={this.sendNewAddress} />
                        </div>
                        
                        <div className="col-md-12 col-sm-12 relacionados">
                            <a className="moreInfo" onClick={() => this.setState({IsModalOpen:!this.state.IsModalOpen})}>
                                {this.state.IsModalOpen ?
                                    "Cancelar"
                                : "Adicionar um novo endereço"}
                            </a>
                            <a data-tip data-for="moreInfo">
                                <i className="fa fa-plus pull-right moreInfo"/>
                            </a>
                            <a data-tip data-for="usersRelated">
                                <i className="fa fa-users pull-right"  />
                            </a>
                        </div>
                    </Panel> :
                    <Panel title="ENDEREÇOS">
                        <div className="text-center"><strong>Nada consta</strong></div>
                    </Panel>}

                    <Modal
                        IsModalOpen={this.state.IsModalOpen}
                        closeModal={this.closeModal}
                        title="Inserção de um novo endereço"
                    >

                        <EnviarEndereco sendNewAddress={this.sendNewAddress} />

                    </Modal>
              
            </span>
        )
    }
}