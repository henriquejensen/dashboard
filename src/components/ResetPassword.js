import "./Login.css"

import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Alert, Col, Row } from "react-bootstrap"
import { Link } from "react-router"

//Actions
import { resetChangePassword, closeChangePasswordMessage } from "../actions/actionsCommon"

//Components
import MyButton from "./button/MyButton"
import { MyFieldGroup } from "./forms/CommonForms"

//Constants
import { MESSAGE_ERROR_CHANGE_PASSWORD, ERROR } from "../constants/utils"
import { COMPANY_NAME_SHORT, COMPANY_NAME_LONG, COMPANY_LOGO, URL_LOGIN } from "../constants/constantsCompany"

class ResetPassword extends Component {
    constructor(props) {
        super(props)

        //verificacao caso o usuario tente acessar o link sem os dados do servidor na URL
        try {
            this.dadosUrl = location.search.split("&")
            this.usuario = this.dadosUrl[0].split("=")[1]
            this.cliente = this.dadosUrl[1].split("=")[1]
            this.email = this.dadosUrl[2].split("=")[1]
            this.key = this.dadosUrl[3].split("=")[1]
        } catch (e) {
            console.log("Link não permitido sem dados")
        }

        this.state={}
    }

    onChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    onFormSubmit = evt => {
        evt.preventDefault()

        let error = true

        if(this.state.password === this.state.confirmPassword) {
            error = false
            this.props.resetChangePassword( { usuario:this.usuario, empresa:this.cliente, password:this.state.password, key:this.key })
        }

        this.setState({
            error
        })
    }

    renderForm = () => {
        let { password, confirmPassword } = this.state
        let status = this.props.status
        status = status === ERROR ? "danger" : status
        return (
            <form className="form-signin" onSubmit={this.onFormSubmit}>
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
                    type="password"
                    id="password"
                    name="password"
                    label="Nova senha"
                    error={this.state.error}                
                    required
                    value={password}
                    onChange={this.onChange}
                />

                <MyFieldGroup
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirme a nova senha"
                    error={this.state.error}
                    message={this.state.error ? MESSAGE_ERROR_CHANGE_PASSWORD : ""}
                    required
                    value={confirmPassword}
                    onChange={this.onChange}
                />

                <div className="btn-group btn-password">
                    <Link to={URL_LOGIN} className="btn btn-default">
                        Voltar ao Login
                    </Link>
                    <MyButton
                        type="submit"
                        myButtonClass="btn pull-right"
                        myButtonStyle="info"
                        myButtonText="Trocar senha"
                    />
                </div>
            </form>
        )
    }
    
    render() {
        return (
            <div className="container">
                <Row>
                    <Col md={4} mdOffset={4} sm={12}>
                        <h3 className="text-center login-title">
                            <strong>Formulário de Alteração de Senha</strong>
                        </h3>

                        <div className="account-wall">
                            <Col md={12} className="text-center">
                                <img src={COMPANY_LOGO} alt={COMPANY_NAME_LONG} height="50" width="170" />
                            </Col>

                            <Col md={12}>
                                <div>Cliente: {this.cliente}</div>
                                <div>Usuário: {this.usuario}</div>
                                <div>Email: {this.email}</div>
                            </Col>

                            {this.renderForm()}

                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        status: state.auth.status,
        message: state.auth.msgn
    }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
			resetChangePassword,
            closeChangePasswordMessage
		},
		dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)