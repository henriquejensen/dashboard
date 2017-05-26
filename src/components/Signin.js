import React, { Component } from "react";
import { Link } from "react-router";

import { COMPANY_NAME_SHORT, COMPANY_NAME_LONG, COMPANY_LOGO } from "../constants/constantsCompany";

export default class Signin extends Component {
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
                            <img src={COMPANY_LOGO} alt={COMPANY_NAME_LONG} height="50" width="170" />
                            <form className="form-signin">
                                <input type="text" className="form-control" placeholder="Empresa" required />
                                <input type="text" className="form-control" placeholder="Usuário" required />
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