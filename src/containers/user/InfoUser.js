import React, { Component} from "react"
import { Col, Form, Image } from "react-bootstrap"

//Components
import Panel from "../../components/panel/Panel"
import MyButton from "../../components/button/MyButton"
import { MyFieldGroup } from "../../components/forms/CommonForms"

export default class Info extends Component {
    constructor(props) {
        super(props)

        this.filesExtensionAccept = ".png,.jpg,.jpeg"

        this.state = {}
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
            let reader = new FileReader()
            let formData = new FormData()
            let file = evt.target.files[0]

            reader.onloadend = () => {
                this.setState({
                    file: file,
                    error: false,
                    usuarioImagem: reader.result
                })
            }

            reader.readAsDataURL(file)
        }
    }

    onSubmitForm = (e) => {
        e.preventDefault()

        this.props.userEditInfo({
            usuarioNome: this.state.usuarioNome ? this.state.usuarioNome : this.props.user.usuarioNome,
            usuarioTelefone: this.state.usuarioTelefone ? this.state.usuarioTelefone : this.props.user.usuarioTelefone,
            usuarioEmail2: this.state.usuarioEmail2 ? this.state.usuarioEmail2 : this.props.user.usuarioEmail2,
            usuarioFoto: this.state.file,
            usuarioImagemPreview: this.state.usuarioImagem ? this.state.usuarioImagem : this.props.user.usuarioFoto
        })
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        let usuarioNome = this.state.usuarioNome !== undefined ? this.state.usuarioNome : this.props.user.usuarioNome
        let usuarioEmail2 = this.state.usuarioEmail2 !== undefined ? this.state.usuarioEmail2 : this.props.user.usuarioEmail2
        let usuarioTelefone = this.state.usuarioTelefone !== undefined ? this.state.usuarioTelefone : this.props.user.usuarioTelefone
        let usuarioFoto = this.state.usuarioFoto !== undefined ? this.state.usuarioFoto : this.props.user.usuarioFoto
        return (
            <Col md={12}>
                <Panel title="DADOS PESSOAIS">
                    <Col md={12}>
                        <Form onSubmit={this.onSubmitForm}>
                            <MyFieldGroup
                                id="usuarioNome"
                                type="text"
                                label="Nome completo"
                                name="usuarioNome"
                                placeholder="Digite seu nome"
                                value={usuarioNome}
                                onChange={this.onChange}
                            />

                            <MyFieldGroup
                                id="usuarioEmail2"
                                type="email"
                                label="Email"
                                name="usuarioEmail2"
                                placeholder="Digite seu email"
                                value={usuarioEmail2}
                                onChange={this.onChange}
                            />

                            <MyFieldGroup
                                id="usuarioTelefone"
                                type="number"
                                label="Telefone"
                                name="usuarioTelefone"
                                placeholder="Digite seu telefone"
                                value={usuarioTelefone}
                                onChange={this.onChange}
                            />

                            <Image src={usuarioFoto} id="menu-image-user"/>

                            <MyFieldGroup
                                id="usuarioFoto"
                                type="file"
                                label={"Arquivo("+this.filesExtensionAccept+")"}
                                name="usuarioFoto"
                                message={this.state.error ? this.state.messageErrorFileUpload : ""}
                                accept={this.filesExtensionAccept}
                                onChange={this.onChangeFileUpload}
                            />

                            <MyButton
                                type="submit"
                                myButtonClass="btn"
                                myButtonStyle="info"
                                myButtonText="Atualizar dados"
                            />
                        </Form>
                    </Col>

                </Panel>
            </Col>)
    }
}