import React, { Component } from 'react'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import { Alert, Col, Form } from "react-bootstrap"

//Actions
import {closeMessageErrorBaseCerta, getLayoutsBaseCerta, postNovoEnriquecimento} from "../../actions/actionsBaseCerta"

//Components
import { MyFileUpload, MyFieldGroup, SelectGroup, TextAreaGroup } from "../../components/forms/CommonForms"
import MyButton from "../../components/button/MyButton"

class NovoEnriquecimento extends Component {
    constructor(props) {
        super(props)

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

        console.log("EVT", this.state)

        if(!this.state.error)
            this.props.postNovoEnriquecimento({
                layout: this.state.layoutBaseCertaSelected || this.props.layouts[0].value,
                description: this.state.modelosDescricao,
                file: this.state.fileUpload
            })
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
                        label={"Arquivo("+this.filesExtensionAccept+")"}
                        required
                        name="uploadEnriquecimentoBaseCerta"
                        message={this.state.error ? this.state.messageErrorFileUpload : ""}
                        accept={`file_extension/${this.filesExtensionAccept}`}
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
        getLayoutsBaseCerta,
        postNovoEnriquecimento
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(NovoEnriquecimento)