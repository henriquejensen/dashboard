import React, { Component } from "react";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ajax from "superagent";

import { authUser, loading } from "../actions/actionsCommon";


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            empresa: "",
            user: "",
            senha: "",
            ip: ""
        }

        this.onChange = this.onChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.changeroute = this.changeroute.bind(this);
    }

    componentWillMount() {
        ajax.get("https://auth.assertivasolucoes.com.br/auth/get-info-request/d9230bc071484cdd9fc721b")
            .then((response) => {
                this.setState({
                    ip: JSON.parse(response.text).IP
                })
            })
    }

	componentDidMount() {
		document.title = "Assertiva";
	}

    onFormSubmit(evt) {
        evt.preventDefault();

        this.props.loading();
        this.props.authUser(this.state.empresa, this.state.user, this.state.senha);
    }

    onChange(evt) {
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
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <h3 className="text-center login-title">
                            <strong>Bem-vindo</strong><br/>
                            Identifique-se para acessar nossos serviços
                        </h3>

                        {this.props.auth.loading ? <div className="imgSearching"><img src="../../public/loading.gif" /></div> : ""}

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
                                <Link href="#" className="pull-right need-help">IP: {this.state.ip}</Link><span className="clearfix"></span>
                            </form>
                        </div>
                        <Link to="/signin" className="text-center new-account">Esqueci minha senha </Link>
                    </div>
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