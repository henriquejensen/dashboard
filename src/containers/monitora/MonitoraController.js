import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Col } from "react-bootstrap"

//Components
import Modal from "../../components/Modal"
import MyButton from "../../components/button/MyButton"
import NovoDocumento from "./NovoDocumento"
import NovaCarteira from "./NovaCarteira"
import Panel from "../../components/panel/Panel"
import Table from "../../components/table/MyTable"
import TitleProduct from "../../components/utils/TitleProduct"
import MonitoraView from "./MonitoraView"

//Actions
import {
    getDocumentosCarteira,
    getCarteiras,
    getDocumentos,
    loadingMonitora,
    novoDocumento,
    novaCarteira,
    removerCarteira,
    removerDocumento
} from "../../actions/actionsMonitora"

//Constants
import {COMPANY_PRODUCT_MONITORA, COMPANY_PRODUCT_MONITORA_COLOR, ICON_MONITORA} from "../../constants/constantsCompany"
import { NENHUM_REGISTRO } from "../../constants/utils"

class Monitora extends Component {
    constructor(props) {
        super(props)
        this.NOVO_DOCUMENTO = "NovoDocumento"
        this.NOVA_CARTEIRA = "NovaCarteira"
        this.DELETAR = "Deletar"
        this.state = {
            IsModalOpen: false,
        }
    }

    componentWillMount() {
        this.props.getCarteiras()
        this.props.getDocumentos()
    }

    openModal = (carteira={}, tipo="", callbackCarteira) => {
        this.setState({
            IsModalOpen: !this.state.IsModalOpen,
            tipo,
            carteira,
            callbackCarteira
        })
    }

    openModalDeletar = (callback, tipo="", parameters) => {
        this.setState({
            IsModalOpen: !this.state.IsModalOpen,
            tipo,
            callback,
            parameters
        })
    }

    renderDeletar(callback, parameters) {
        return (
            <span>
                <Col md={12}>{parameters.message}</Col>
                <Col md={6}>
                    <MyButton
                        onClickButton={() => this.setState({IsModalOpen: false})}
                        myButtonStyle="default"
                        myButtonClass="btn-block"
                        myButtonText="Cancelar"
                    />
                </Col>
                <Col md={6}>
                    <MyButton
                        onClickButton={this.deletar}
                        params={[callback, parameters.parameters]}
                        myButtonStyle="danger"
                        myButtonClass="btn-block"
                        myButtonText="Deletar"
                    />
                </Col>
            </span>
        )
    }

    deletar = (callback, parameters) => {
        callback(parameters)
        this.setState({
            IsModalOpen: false
        })
    }

    novoDocumento = (...parameters) => {
        this.props.novoDocumento(...parameters)
        this.openModal()
    }

    novaCarteira = (...parameters) => {
        this.props.novaCarteira(...parameters)
        this.openModal()
    }

    render() {
        const {carteiras, carteiraNome, documentos, getDocumentosCarteira, removerCarteira, removerDocumento} = this.props
        return (
            <span>
                <Panel>
                    <TitleProduct
                        icon={ICON_MONITORA}
                        title={COMPANY_PRODUCT_MONITORA}
                        color={COMPANY_PRODUCT_MONITORA_COLOR}
                    />
                </Panel>

                <div style={{marginBottom:15}} />

                <MonitoraView
                    NOVO_DOCUMENTO={this.NOVO_DOCUMENTO}
                    NOVA_CARTEIRA={this.NOVA_CARTEIRA}
                    DELETAR={this.DELETAR}
                    documentos={documentos}
                    carteiras={carteiras}
                    carteiraNome={carteiraNome}
                    removerDocumento={removerDocumento}
                    removerCarteira={removerCarteira}
                    getDocumentosCarteira={getDocumentosCarteira}
                    openModal={this.openModal}
                    openModalDeletar={this.openModalDeletar}
                />

                <Modal
                    IsModalOpen={this.state.IsModalOpen}
                    closeModal={() => this.setState({IsModalOpen: false})}
                >
                    {this.state.tipo === this.NOVO_DOCUMENTO ?
                        <NovoDocumento
                            carteira={this.state.carteira}
                            novoDocumento={this.novoDocumento} /> 
                    : this.state.tipo === this.NOVA_CARTEIRA ?
                        <NovaCarteira
                            carteira={this.state.carteira}
                            novaCarteira={this.novaCarteira} />
                    : this.state.tipo === this.DELETAR ?
                        this.renderDeletar(this.state.callback, this.state.parameters)
                    : <span>Opção invalida</span>}
                </Modal>
            </span>
        )
    }
}

function mapStateToProps(state) {
	return {
        carteiras: state.monitora.carteiras,
        documentos: state.monitora.documentos,
        carteiraNome: state.monitora.carteiraNome,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
        getDocumentosCarteira,
        getCarteiras,
        getDocumentos,
        loadingMonitora,
        novoDocumento,
        novaCarteira,
        removerCarteira,
        removerDocumento
    },
    dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitora)