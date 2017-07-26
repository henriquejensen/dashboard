import "./Login.css"

import React, { Component } from "react"
import ajax from "superagent"
import { Col, Row } from "react-bootstrap"
import { Link } from "react-router"

//Components
import MyButton from "./button/MyButton"
import { MyFieldGroup } from "./forms/CommonForms"
import { LoadingScreen } from "./utils/ElementsAtScreen"

//Constants
import { LOADING_GIF, URL_GET_IP } from "../constants/utils"
import { COMPANY_NAME_LONG, COMPANY_LOGO } from "../constants/constantsCompany"

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cliente: "",
            user: "",
            senha: "",
            ip: ""
        }
    }

    componentWillMount() {
        ajax.get(URL_GET_IP)
            .then((response) => {
                const ip = JSON.parse(response.text).IP
                this.setState({
                    ip: ip
                })                
                this.props.setUserIp(ip)
            })
    }

    onFormSubmit = (evt) => {
        evt.preventDefault()

        let { cliente, usuario, senha } = this.state

        this.props.authUser({ cliente, usuario, senha })
        this.props.getCookieSession({ cliente, usuario, senha })
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    renderForm = () => {
        return (
            <form className="form-signin" onSubmit={this.onFormSubmit}>
                <MyFieldGroup
                    type="text"
                    id="cliente"
                    name="cliente"
                    label="Login Empresa"
                    placeholder="Digite o login da sua empresa"
                    required
                    value={this.state.cliente}
                    onChange={this.onChange}
                />

                <MyFieldGroup
                    type="text"
                    id="usuario"
                    name="usuario"
                    label="Usuário"
                    placeholder="Digite o usuário"
                    required
                    value={this.state.usuario}
                    onChange={this.onChange}
                />

                <MyFieldGroup
                    type="password"
                    id="senha"
                    name="senha"
                    label="Senha"
                    placeholder="*******"
                    required
                    value={this.state.senha}
                    onChange={this.onChange}
                />

                <MyButton
                    type="submit"
                    myButtonClass="btn-lg btn-block"
                    myButtonStyle="info"
                    myButtonText="Entrar"
                />
            </form>
        )
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col xs={12} sm={6} smOffset={4} md={4} mdOffset={4}>
                        <h3 className="text-center login-title">
                            <strong>Bem-vindo</strong><br/>
                            Identifique-se para acessar nossos serviços
                        </h3>

                        {this.props.user && this.props.user.loading ? <LoadingScreen /> : ""}

                        {this.props.user.error ? 
                            <div className="alert alert-danger text-center" role="alert">{this.props.user.message}</div> : ""}

                        <div className="account-wall">
                            <Col md={12} className="text-center">
                                <img src={COMPANY_LOGO} alt={COMPANY_NAME_LONG} height="50" width="170" />
                            </Col>

                            {this.renderForm()}

                            <Col md={12}>
                                <span
                                    className="pull-right need-help">
                                    IP: {this.state.ip}
                                </span>
                            </Col>
                            <span className="clearfix"></span>
                        </div>
                        <Link to="/senha" className="text-center new-account">Esqueci minha senha </Link>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Login