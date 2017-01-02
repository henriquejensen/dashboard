import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import { authUser } from "../actions/index";


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            empresa: "",
            user: "",
            senha: ""
        }

        this.onChange = this.onChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

	componentDidMount() {
		document.title = "Assertiva";
	}

    onFormSubmit(evt) {
        evt.preventDefault();

        this.props.authUser(this.state.empresa, this.state.user, this.state.senha);
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
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
                            <form className="form-signin" onSubmit={this.onFormSubmit}>
                                <input type="text" className="form-control" placeholder="Empresa" value={this.state.empresa} name="empresa" required onChange={this.onChange}/>
                                <input type="text" className="form-control" placeholder="Usuário" value={this.state.user} name="user" required onChange={this.onChange} />
                                <input type="password" className="form-control" placeholder="Senha" value={this.state.senha} name="senha" required onChange={this.onChange}/>
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
                                
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

export default connect(null, {authUser})(Login);