import React, { Component } from 'react'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import { Alert, Col, Form } from "react-bootstrap"

//Actions
import {
    closeMessageErrorBaseCerta,
    getLayoutsBaseCerta,
    loadingBaseCerta,
    postNovoEnriquecimento,
    reprocessedFile
} from "../../actions/actionsBaseCerta"

//Components
import { MyFileUpload, MyFieldGroup, SelectGroup, TextAreaGroup } from "../../components/forms/CommonForms"
import MyButton from "../../components/button/MyButton"
import { LoadingScreen } from "../../components/utils/ElementsAtScreen"

//Constants
import { UPLOAD_NOVO_ENRIQUECIMENTO } from "../../constants/constantsBaseCerta"

class NovoEnriquecimento extends Component {
    constructor(props) {
        super(props)

        this.mailDNS = location.origin + "/basecerta?ticket="
        this.filesExtensionAccept = ".csv,.rem,.zip,.txt"

        this.state = {
            error: false
        }
    }

    componentDidMount() {
        this.props.getLayoutsBaseCerta()
    }

    onSendEnriquecimento = (evt) => {
        evt.preventDefault()

        if(!this.state.error) {
            this.props.loadingBaseCerta()

            this.props.postNovoEnriquecimento({
                layout: this.state.layoutBaseCertaSelected || this.props.layouts[0].value,
                description: this.state.modelosDescricao,
                file: this.state.fileUpload,
                mailDNS: this.mailDNS
            })

            this.props.closeNovoEnriquecimento ? this.props.closeNovoEnriquecimento() : ""
        }

    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    onChangeFileUpload = (evt) => {
        let fileExtensionFound = evt.target.value.split(".")
        fileExtensionFound = fileExtensionFound[fileExtensionFound.length-1].toLowerCase()
        //retira os pontos da extensao do arquivo, os tranforma num array e procura no array o arquivo do upload
        let isFileAccept = this.filesExtensionAccept.replace(/[~./]/g,"").split(",").indexOf(fileExtensionFound)

        if(isFileAccept === -1) {
            this.setState({
                messageErrorFileUpload: `Tipo de arquivo(${fileExtensionFound}) não suportado, entre em contato com o suporte`,
                error: true
            })
        } else {
            this.setState({
                fileUpload: evt.target.files[0],
                error: false
            })
        }
    }

    renderButtonSendDuplicateFile = () => {
        const ticket = this.props.ticketDuplicado
        return (
            <span>
                Ticket <strong>{ticket}</strong> possui o mesmo conteúdo que você enviou, deseja reprocessar o conteúdo? <br/>
                <MyButton
                    onClickButton={() => this.props.reprocessedFile({ticket, mailDNS:this.mailDNS})}
                    myButtonText="Confirmar o reprocessamento"
                    myButtonClass="color-payement"
                />
            </span>
        )
    }

    renderForm = () => {
        return (
            <Form onSubmit={this.onSendEnriquecimento}>
                <Col md={12} >
                    <SelectGroup
                        id="layoutBaseCertaSelected"
                        label="Layout"
                        name="layoutBaseCertaSelected"
                        onChange={this.onChange}
                        value={this.state.layoutBaseCertaSelected}
                        options={this.props.layouts}
                    />
                </Col>

                <Col md={12} >
                    <TextAreaGroup
                        id="modelosDescricao"
                        label="Modelos Descrição"
                        name="modelosDescricao"
                        value={this.state.modelosDescricao}
                        onChange={this.onChange}
                    />
                </Col>

                <Col md={12} >
                    <MyFieldGroup
                        id="formControlsFile"
                        type="file"
                        label={"Arquivo("+this.filesExtensionAccept+")"}
                        required
                        name="uploadEnriquecimentoBaseCerta"
                        message={this.state.error ? this.state.messageErrorFileUpload : ""}
                        accept={this.filesExtensionAccept}
                        onChange={this.onChangeFileUpload}
                    />
                </Col>

                <Col md={12} >
                    <MyButton
                        myButtonText="Enviar enriquecimento"
                        type="submit"
                        myButtonClass="pull-right color-payement"
                    />
                </Col>
            </Form>
        )
    }

    render() {
        const { loading, status } = this.props
        return (
            <span>
                {status ?
                    <Col md={12} sm={12}> 
                        <Alert bsStyle={status === UPLOAD_NOVO_ENRIQUECIMENTO ? "danger" : "success"} className="text-center" onDismiss={this.props.closeMessageErrorBaseCerta}>
                            {status === UPLOAD_NOVO_ENRIQUECIMENTO ?
                                this.renderButtonSendDuplicateFile()
                            : 
                                this.props.message
                            }
                        </Alert>
                    </Col>
                :""}

                {loading ? <LoadingScreen /> : ""}

                {this.renderForm()}
            </span>
        );
    }
}

function mapStateToProps(state) {
    return {
        tickets: state.basecerta.tickets,
        ticketDuplicado: state.basecerta.ticketDuplicado,
        layouts: state.basecerta.layouts,
        message: state.basecerta.message,
        status: state.basecerta.status,
        loading: state.basecerta.loading,
        ticketReprocessed: state.basecerta.ticketReprocessed
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeMessageErrorBaseCerta,
        getLayoutsBaseCerta,
        loadingBaseCerta,
        postNovoEnriquecimento,
        reprocessedFile
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(NovoEnriquecimento)