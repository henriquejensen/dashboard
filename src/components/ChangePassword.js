import "./Login.css"

import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Alert, Col, Row } from "react-bootstrap"
import { Link } from "react-router"

//Actions
import { requestChangePassword, closeChangePasswordMessage } from "../actions/actionsCommon"

//Components
import MyButton from "./button/MyButton"
import { MyFieldGroup } from "./forms/CommonForms"

//Constants
import { USER_CHANGED_PASSWORD_MESSAGE, USER_CHANGED_PASSWORD } from "../constants/utils"
import { COMPANY_NAME_SHORT, COMPANY_NAME_LONG, COMPANY_LOGO } from "../constants/constantsCompany"

class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.state={}
    }

    onChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    onFormSubmit = evt => {
        evt.preventDefault()

        this.props.requestChangePassword(this.state.cliente, this.state.usuario)
    }

    renderForm = ({ cliente, usuario }) => {
        return (
            <form className="form-signin" onSubmit={this.onFormSubmit}>
                {this.props.status === USER_CHANGED_PASSWORD ?
                    <Col md={12} sm={12}> 
                        <Alert
                            bsStyle="success"
                            className="text-center"
                            onDismiss={this.props.closeChangePasswordMessage}
                        >

                            {USER_CHANGED_PASSWORD_MESSAGE + " " + this.props.message}

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
                    <Link to="/login" className="btn btn-default">
                        Voltar ao Login
                    </Link>
                    <MyButton
                        type="submit"
                        myButtonClass="btn pull-right"
                        myButtonStyle="primary"
                        myButtonText="Solicitar Troca"
                    />
                </div>
            </form>
        )
    }
    
    render() {
        let cliente = this.state.cliente || this.props.cliente
        let usuario = this.state.usuario || this.props.usuario
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

function mapStateToProps(state) {
    return {
        cliente: state.user.pessoaDescricao,
        usuario: state.user.usuarioNome,
        status: state.auth.status,
        message: state.auth.msgn
    }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
			requestChangePassword,
            closeChangePasswordMessage
		},
		dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)