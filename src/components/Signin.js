import React, { Component } from "react";
import { Link } from "react-router";

export default class Signin extends Component {
	componentDidMount() {
		document.title = "Assertiva";
	}

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <h3 className="text-center login-title">
                            <strong>Solicitação de troca de senha</strong><br/>
                            Os dados serão enviados ao email cadastrado
                        </h3>
                        <div className="account-wall text-center">
                            <img src="../public/assertiva/assertiva-top-index.png" alt="Assertiva" height="50"/>
                            <form className="form-signin">
                                <input type="text" className="form-control" placeholder="Empresa" required autofocus />
                                <input type="text" className="form-control" placeholder="Usuário" required autofocus />
                                <div className="btn-group btn-password">
                                    <Link to="/login" className="btn btn-default">
                                        Cancelar
                                    </Link>
                                    <Link to="/login" className="btn btn-primary pull-right">
                                        Entrar
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}