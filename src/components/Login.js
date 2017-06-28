import "./Login.css"

import React, { Component } from "react";
import ajax from "superagent";
import { Col, Row } from "react-bootstrap";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Actions
import { authUser, loading } from "../actions/actionsCommon";

//Components
import MyButton from "./button/MyButton"
import { MyFieldGroup } from "./forms/CommonForms"

//Constants
import { LOADING_GIF, URL_GET_IP } from "../constants/utils";
import { COMPANY_NAME_LONG, COMPANY_LOGO } from "../constants/constantsCompany";

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
                this.setState({
                    ip: JSON.parse(response.text).IP
                })
            })
    }

    onFormSubmit = (evt) => {
        evt.preventDefault();

        this.props.loading();
        this.props.authUser(this.state.cliente, this.state.usuario, this.state.senha);
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    changeroute() {
        browserHistory.push("/localize");
    }

    renderForm = () => {
        return (
            <form className="form-signin" onSubmit={this.onFormSubmit}>
                <MyFieldGroup
                    type="text"
                    id="cliente"
                    name="cliente"
                    label="Cliente"
                    placeholder="Digite o cliente"
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
        if(this.props.auth.logado) {
            return (
                <div>{this.changeroute()}</div>
            )
        }
        return (
            <div className="container">
                <Row>
                    <Col xs={12} sm={6} smOffset={4} md={4} mdOffset={4}>
                        <h3 className="text-center login-title">
                            <strong>Bem-vindo</strong><br/>
                            Identifique-se para acessar nossos serviços
                        </h3>

                        {this.props.auth.loading ? <div className="imgSearching"><img src={LOADING_GIF} /></div> : ""}

                        {this.props.auth.error ? 
                            <div className="alert alert-danger text-center" role="alert">{this.props.auth.msgn}</div> : ""}

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

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        authUser,
        loading
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);