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
        this.DELETAR = this.DELETAR
        this.state = {
            IsModalOpen: false,
        }
    }

    componentWillMount() {
        this.props.getCarteiras()
        this.props.getDocumentos()
    }

    openModal = (carteira={}, tipo="") => {
        this.setState({
            IsModalOpen: !this.state.IsModalOpen,
            tipo: tipo,
            carteira: carteira
        })
    }

    openModalDeletar = (callback, parameters) => {
        this.setState({
            IsModalOpen: !this.state.IsModalOpen,
            callback,
            parameters
        })
    }

    renderDeletar(callback, parameters) {
        return (
            <span>
                <MyButton
                    onClickButton={callback}
                    params={[parameters]}
                    myButtonStyle="danger"
                    myButtonClass="pull-right color-payement"
                    myButtonText="Deletar"
                />
            </span>
        )
    }

    novoDocumento = (...parameters) => {
        this.props.novoDocumento(...parameters)
        this.openModal()
    }

    novaCarteira = (...parameters) => {
        this.props.novaCarteira(...parameters)
        this.openModal()
    }

    renderCardCarteira = ({carteiras}) => {
        return (
            <Col md={6} style={{padding:0}}>
                <Col md={12} className="text-center" style={{marginBottom:15}}>
                    <MyButton  tooltip="Criar uma nova carteira"
                        onClickButton={this.openModal}
                        params={[{}, this.NOVA_CARTEIRA]}
                        myButtonClass="btn-block color-payement"
                        myButtonText="Nova Carteira"
                    />
                </Col>
                <Col md={12}>
                    <Panel title="Carteiras">
                        {carteiras.length > 0 ?
                            <Table
                                fields={[
                                    {id:"status", name:"Status", functionToApply:(val) => {
                                        return <i style={{borderRadius:5}} className="fa fa-circle-thin" id={val == "ATIVO" ? "userActivated" : "userDeactivated"}
                                    />}},
                                    {id:"frequenciaConsulta", name:"Freq. (dias)"},
                                    {id:"nome", name:"Nome"},
                                    {id:"quantidadeDocumentos", name:"Qtd"},
                                    {id:"id", name:"Ações", functionToApply:(val, index) => {
                                        const tipo = carteiras[index].tipoConsultaPf ? "CPF" : "CNPJ"
                                        return (
                                            <div>
                                                <MyButton tooltip="Editar Carteira"
                                                    onClickButton={this.openModal}
                                                    params={[carteiras[index], this.NOVA_CARTEIRA]}
                                                    myButtonStyle="default"
                                                    myButtonClass="mybutton-mini-carteira"
                                                    myButtonSize="xsmall"
                                                    myButtonText={<i className="fa fa-pencil" />}
                                                />
                                                {'   '}
                                                <MyButton tooltip="Inserir um novo documento"
                                                    onClickButton={this.openModal}
                                                    params={[carteiras[index].id, this.NOVO_DOCUMENTO]}
                                                    myButtonStyle="default"
                                                    myButtonClass="mybutton-mini-carteira"
                                                    myButtonSize="xsmall"
                                                    myButtonText={<i className="fa fa-plus" />}
                                                />
                                                {'   '}
                                                <MyButton tooltip="Visualizar documentos"
                                                    onClickButton={this.props.getDocumentosCarteira}
                                                    params={[val, carteiras[index].nome, tipo]}
                                                    myButtonStyle="default"
                                                    myButtonClass="mybutton-mini-carteira"
                                                    myButtonSize="xsmall"
                                                    myButtonText={<i className="fa fa-eye" />}
                                                />
                                                {'   '}
                                                <MyButton tooltip="Deletar documento"
                                                    onClickButton={this.openModalDeletar}
                                                    params={[this.props.removerCarteira, [val]]}
                                                    myButtonStyle="danger"
                                                    myButtonClass="mybutton-mini-carteira"
                                                    myButtonSize="xsmall"
                                                    myButtonText={<i className="fa fa-trash" />}
                                                />
                                            </div>
                                        )
                                    }}
                                ]}
                                elements={carteiras}
                            />
                        :
                            <div className="text-center">{NENHUM_REGISTRO}</div>
                        }
                    </Panel>
                </Col>
            </Col>
        )
    }

    renderCardDocumentos = ({documentos}) => {
        return (
            <Col md={6} style={{padding:0}}>
                <Col md={12} className="text-center" style={{marginBottom:15}}>
                    <MyButton tooltip="Criar um novo documento"
                        onClickButton={this.openModal}
                        params={[this.props.carteiras, this.NOVO_DOCUMENTO]}
                        myButtonClass="btn-block color-payement"
                        myButtonText="Novo documento"
                    />
                </Col>
                <Col md={12} >
                    <Panel title={`Documentos ` + (this.props.carteiraNome ? this.props.carteiraNome : "")}>
                        {documentos.length > 0 ?
                            <Table
                                fields={[
                                    {id:"status", name:"Status", functionToApply:(val) => {
                                        return <i style={{borderRadius:5}} className="fa fa-circle-thin" id={val == "ATIVO" ? "userActivated" : "userDeactivated"}
                                    />}},
                                    {id:"documento", name:"Documento"},
                                    {id:"id", name:"Ações", functionToApply:(idDocumento, index) => {
                                        return (
                                            <div>
                                                <MyButton
                                                    tooltip="Visualizar documento"
                                                    myButtonStyle="default"
                                                    myButtonClass="mybutton-mini-carteira"
                                                    myButtonSize="xsmall"
                                                    myButtonText={<i className="fa fa-eye" />}
                                                />
                                                {'   '}
                                                <MyButton
                                                    tooltip="Deletar documento"
                                                    onClickButton={this.openModalDeletar}
                                                    params={[this.props.removerDocumento, [idDocumento, documentos[index].documento]]}
                                                    myButtonStyle="danger"
                                                    myButtonClass="mybutton-mini-carteira"
                                                    myButtonSize="xsmall"
                                                    myButtonText={<i className="fa fa-trash" />}
                                                />
                                            </div>
                                        )
                                    }}
                                ]}
                                elements={documentos}
                            />
                        :
                            <div className="text-center">{NENHUM_REGISTRO}</div>
                        }
                    </Panel>
                </Col>
            </Col>
        )
    }

    render() {
        const {carteiras, documentos} = this.props
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

                {this.renderCardCarteira({carteiras})}

                {this.renderCardDocumentos({documentos})}

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
                    : ""}

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