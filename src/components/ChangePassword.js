import "./Login.css"

import React, { Component } from "react"
import { Alert, Col, Row } from "react-bootstrap"
import { Link } from "react-router"

//Components
import MyButton from "./button/MyButton"
import { MyFieldGroup } from "./forms/CommonForms"

//Constants
import { CHANGE_PASSWORD, ERROR } from "../constants/utils"
import { COMPANY_NAME_SHORT, COMPANY_NAME_LONG, COMPANY_LOGO, URL_LOGIN } from "../constants/constantsCompany"

class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.state={
            cliente: this.props.cliente,
            usuario: this.props.usuario
        }
    }

    onChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    onFormSubmit = evt => {
        evt.preventDefault()

        let { cliente, usuario } = this.state

        this.props.requestChangePassword(cliente, usuario)
    }

    renderForm = ({ cliente, usuario }) => {
        let status = this.props.status
        status = status === ERROR ? "danger" : status
        return (
            <form className="form-signin" onSubmit={this.onFormSubmit} >
                {status ?
                    <Col md={12} sm={12}> 
                        <Alert
                            bsStyle={status.toLocaleLowerCase()}
                            className="text-center"
                            onDismiss={this.props.closeChangePasswordMessage}
                        >

                            {this.props.message}

                        </Alert>
                    </Col>
                : ""}

                <MyFieldGroup
                    type="text"
                    id="cliente"
                    name="cliente"
                    label="Cliente (O mesmo utilizado na tela de login)"
                    placeholder="Digite o cliente"
                    required
                    value={cliente}
                    onChange={this.onChange}
                />

                <MyFieldGroup
                    type="text"
                    id="usuario"
                    name="usuario"
                    label="Usuário"
                    placeholder="Digite o usuário"
                    required
                    value={usuario}
                    onChange={this.onChange}
                />

                <div className="btn-group btn-password">
                    <Link to={URL_LOGIN} className="btn btn-default">
                        Voltar ao Login
                    </Link>
                    <MyButton
                        type="submit"
                        myButtonClass="btn pull-right"
                        myButtonStyle="primary"
                        myButtonText={CHANGE_PASSWORD}
                    />
                </div>
            </form>
        )
    }
    
    render() {
        let { cliente, usuario } = this.state

        return (
            <div className="container">
                <Row>
                    <Col md={4} mdOffset={4} sm={12}>
                        <h3 className="text-center login-title">
                            <strong>Solicitação de troca de senha</strong><br/>
                            Os dados serão enviados ao email cadastrado
                        </h3>

                        <div className="account-wall">
                            <Col md={12} className="text-center">
                                <img src={COMPANY_LOGO} alt={COMPANY_NAME_LONG} height="50" width="170" />
                            </Col>

                            {this.renderForm({ cliente, usuario })}

                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ChangePassword