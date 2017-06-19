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
import { USER_CHANGED_PASSWORD_MESSAGE, USER_CHANGED_PASSWORD } from "../constants/utils"
import { COMPANY_NAME_SHORT, COMPANY_NAME_LONG, COMPANY_LOGO } from "../constants/constantsCompany"

class ResetPassword extends Component {
    constructor(props) {
        super(props)

        this.dadosUrl = "?keyUpdateSenha=7f1cbbf7-62ef-46c7-a027-b580364a7c19b665d81e-e876-4fcd-8d24-0f2ff0f7f68f&email=henrique.teixeira@assertivasolucoes.com.br&cliente=ASSERTIVA&usuario=HENRIQUE.TEIXEIRA".split("&")
        this.key = this.dadosUrl[0].split("=")[1]
        this.email = this.dadosUrl[1].split("=")[1]
        this.cliente = this.dadosUrl[2].split("=")[1]
        this.usuario = this.dadosUrl[3].split("=")[1]

        this.state={}
    }

    onChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    onFormSubmit = evt => {
        evt.preventDefault()

        this.props.resetChangePassword( { usuario:this.usuario, empresa:this.cliente, password:this.state.password, key:this.key })
    }

    renderForm = () => {
        let { password, confirmPassword } = this.state
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
                    type="password"
                    id="password"
                    name="password"
                    label="Nova senha"
                    required
                    value={password}
                    onChange={this.onChange}
                />

                <MyFieldGroup
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirme a nova senha"
                    required
                    value={confirmPassword}
                    onChange={this.onChange}
                />

                <MyButton
                    type="submit"
                    myButtonClass="btn-block"
                    myButtonStyle="primary"
                    myButtonText="Alterar senha"
                />
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

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
			resetChangePassword
		},
		dispatch);
}

export default connect(null, mapDispatchToProps)(ResetPassword)