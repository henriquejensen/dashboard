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
            formData.append('avatar', file, file.name);

            reader.onloadend = () => {
                this.setState({
                    fileUpload: formData,
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
            usuario: this.state.usuario ? this.state.usuario : this.props.user.usuario.usuario,
            usuarioTelefone: this.state.usuarioTelefone ? this.state.usuarioTelefone : this.props.user.usuario.telefone,
            usuarioEmail: this.state.usuarioEmail ? this.state.usuarioEmail : this.props.user.usuario.email2,
            usuarioImagem: this.state.fileUpload,
            usuarioImagemPreview: this.state.usuarioImagem ? this.state.usuarioImagem : this.props.user.usuario.avatar
        });
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        console.log("HAAPAPA", this.props)
        let usuario = this.state.usuario !== undefined ? this.state.usuario : this.props.user.usuario.usuario
        let usuarioEmail = this.state.usuarioEmail !== undefined ? this.state.usuarioEmail : this.props.user.usuario.email2
        let usuarioTelefone = this.state.usuarioTelefone !== undefined ? this.state.usuarioTelefone : this.props.user.usuario.telefone
        let usuarioImagem = this.state.usuarioImagem !== undefined ? this.state.usuarioImagem : this.props.user.usuario.avatar
        return (
            <Col md={12}>
                <Panel title="DADOS PESSOAIS">
                    <Col md={12}>
                        <Form onSubmit={this.onSubmitForm}>
                            <MyFieldGroup
                                id="usuario"
                                type="text"
                                label="Nome completo"
                                name="usuario"
                                placeholder="Digite seu nome"
                                value={usuario}
                                onChange={this.onChange}
                            />

                            <MyFieldGroup
                                id="usuarioEmail"
                                type="email"
                                label="Email"
                                name="usuarioEmail"
                                placeholder="Digite seu email"
                                value={usuarioEmail}
                                onChange={this.onChange}
                            />

                            <MyFieldGroup
                                id="usuarioTelefone"
                                type="tel"
                                label="Telefone"
                                name="usuarioTelefone"
                                placeholder="Digite seu telefone"
                                value={usuarioTelefone}
                                onChange={this.onChange}
                            />

                            <Image src={usuarioImagem} id="menu-image-user"/>

                            <MyFieldGroup
                                id="usuarioImagem"
                                type="file"
                                label={"Arquivo("+this.filesExtensionAccept+")"}
                                name="usuarioImagem"
                                message={this.state.error ? this.state.messageErrorFileUpload : ""}
                                accept={`file_extension/${this.filesExtensionAccept}`}
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