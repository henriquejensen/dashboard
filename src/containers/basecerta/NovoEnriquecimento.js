import React, { Component } from 'react'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import { Alert, Col, Form } from "react-bootstrap"

//Actions
import {closeMessageErrorBaseCerta, getTicketsBaseCerta, postNovoEnriquecimento} from "../../actions/actionsBaseCerta"

//Components
import { MyFileUpload, MyFieldGroup, SelectGroup, TextAreaGroup } from "../../components/forms/CommonForms"
import MyButton from "../../components/button/MyButton"

class NovoEnriquecimento extends Component {
    constructor(props) {
        super(props)

        this.filesExtensionAccept = ".csv,.rem,.zip,.txt"

        this.state = {
            layoutBaseCertaSelected: this.props.layouts,
            error: false
        }
    }

    onSendEnriquecimento = (evt) => {
        evt.preventDefault()

        if(!this.state.error)
            this.props.postNovoEnriquecimento({
                layout: this.state.layoutBaseCertaSelected,
                description: this.state.modelosDescricao,
                file: this.state.fileUpload
            })
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.name
        })
    }

    onChangeFileUpload = (evt) => {
        let fileExtensionFound = evt.target.value.split(".")
        fileExtensionFound = fileExtensionFound[fileExtensionFound.length-1]
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

    renderForm = () => {
        return (
            <Form onSubmit={this.onSendEnriquecimento}>
                <Col md={12} >
                    <SelectGroup
                        id="layoutsBaseCerta"
                        label="Layout"
                        name="layoutsBaseCerta"
                        onChange={this.onChange}
                        value={this.state.layoutBaseCertaSelected}
                        options={[{label:"360iu", value:"360"}, {label:"A1 VOX", value:"165"}, {label:"311", value:"ABRAZ"},]}
                    />
                </Col>

                <Col md={12} >
                    <TextAreaGroup
                        id="modelosDescricao"
                        label="Modelos Descrição"
                        required
                        name="modelosDescricao"
                        value={this.state.modelosDescricao}
                        onChange={this.onChange}
                    />
                </Col>

                <Col md={12} >
                    <MyFieldGroup
                        id="formControlsFile"
                        type="file"
                        label="Arquivo(.txt, .csv, .rem ou zip)"
                        required
                        name="uploadEnriquecimentoBaseCerta"
                        message={this.state.messageErrorFileUpload}
                        error={this.state.error}
                        accept={`file_extension/${this.filesExtensionAccept}`}
                        onChange={this.onChangeFileUpload}
                    />
                </Col>

                <Col md={12} >
                    <MyButton
                        myButtonText="Enviar enriquecimento"
                        type="submit"
                        myButtonClass="pull-right"
                    />
                </Col>
            </Form>
        )
    }

    render() {
        return (
            <span>
                {this.props.status ?
                    <Col md={12} sm={12}> 
                        <Alert bsStyle="success" className="text-center" onDismiss={this.props.closeMessageErrorBaseCerta}>
                            {this.props.message}
                        </Alert>
                    </Col>
                :""}

                {this.renderForm()}
            </span>
        );
    }
}

function mapStateToProps(state) {
    return {
        layouts: state.basecerta.layouts,
        message: state.basecerta.message,
        status: state.basecerta.status
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeMessageErrorBaseCerta,
        postNovoEnriquecimento
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(NovoEnriquecimento)