import React, { Component } from "react";
import ajax from "superagent";
import { Col } from "react-bootstrap";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { authUser, loading } from "../actions/actionsCommon";

import { LOADING_GIF, URL_GET_IP } from "../constants/utils";
import { COMPANY_NAME_SHORT } from "../constants/constantsCompany";

class Login extends Component {
    state = {
        empresa: "",
        user: "",
        senha: "",
        ip: ""
    }

    componentWillMount() {
        ajax.get(URL_GET_IP)
            .then((response) => {
                this.setState({
                    ip: JSON.parse(response.text).IP
                })
            })
    }

	componentDidMount() {
		document.title = COMPANY_NAME_SHORT;
	}

    onFormSubmit = (evt) => {
        evt.preventDefault();

        this.props.loading();
        this.props.authUser(this.state.empresa, this.state.user, this.state.senha);
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    changeroute() {
        browserHistory.push("/");
    }

    render() {
        if(this.props.auth.logado) {
            return (
                <div>{this.changeroute()}</div>
            )
        }
        return (
            <div className="container">
                <div className="row">
                    <Col xs={12} sm={6} smOffset={4} md={4} mdOffset={4}>
                        <h3 className="text-center login-title">
                            <strong>Bem-vindo</strong><br/>
                            Identifique-se para acessar nossos serviços
                        </h3>

                        {this.props.auth.loading ? <div className="imgSearching"><img src={LOADING_GIF} /></div> : ""}

                        {this.props.auth.error ? 
                            <div className="alert alert-danger text-center" role="alert">{this.props.auth.msgn}</div> : ""}

                        <div className="account-wall text-center">
                            <img src="../public/assertiva/assertiva-top-index.png" alt="Assertiva" height="50"/>
                            <form className="form-signin" onSubmit={this.onFormSubmit}>
                                <input type="text" className="form-control" placeholder="Empresa" value={this.state.empresa} name="empresa" required onChange={this.onChange}/>
                                <input type="text" className="form-control" placeholder="Usuário" value={this.state.user} name="user" required onChange={this.onChange} />
                                <input type="password" className="form-control" placeholder="Senha" value={this.state.senha} name="senha" required onChange={this.onChange}/>
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
                                
                                <label className="checkbox pull-left">
                                    <input type="checkbox" value="remember-me" />
                                    Lembre-me
                                </label>
                                <span href="#" className="pull-right need-help">IP: {this.state.ip}</span>
                                <span className="clearfix"></span>
                            </form>
                        </div>
                        <Link to="/signin" className="text-center new-account">Esqueci minha senha </Link>
                    </Col>
                </div>
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