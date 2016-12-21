import React, { Component } from "react";
import { Link } from "react-router";

export default class Login extends Component {
	componentDidMount() {
		document.title = "Assertiva";
	}

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <h3 className="text-center login-title">
                            <strong>Bem-vindo</strong><br/>
                            Identifique-se para acessar nossos serviços
                        </h3>
                        <div className="account-wall text-center">
                            <img src="../public/assertiva/assertiva-top-index.png" alt="Assertiva" height="50"/>
                            <form className="form-signin">
                                <input type="text" className="form-control" placeholder="Empresa" required />
                                <input type="text" className="form-control" placeholder="Usuário" required autofocus />
                                <input type="password" className="form-control" placeholder="Senha" required />
                                <Link to="/dashboard" className="btn btn-lg btn-primary btn-block" type="submit">
                                    Entrar
                                </Link>
                                <label className="checkbox pull-left">
                                    <input type="checkbox" value="remember-me" />
                                    Lembre-me
                                </label>
                                <Link href="#" className="pull-right need-help">IP: 187.108.44.218</Link><span className="clearfix"></span>
                            </form>
                        </div>
                        <Link to="/signin" className="text-center new-account">Esqueci minha senha </Link>
                    </div>
                </div>
            </div>
        )
    }
}