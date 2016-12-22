import React, { Component} from "react";

export default class Info extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: this.props.user.nome,
            telefone: this.props.user.telefone,
            email: this.props.user.email
        }

        this.onSubmitUser = this.onSubmitUser.bind(this);
        this.onChange = this.onChange.bind(this);
        this.sendInfoUser = this.sendInfoUser.bind(this);
    }

    onSubmitUser(e) {
        e.preventDefault();
        e.stopPropagation();

        var form = this.refs.user.files[0];

        console.log(e.target);

    }

   onSubmitFirm(e) {
        e.preventDefault();
        e.stopPropagation();

        console.log("Submit Form")
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    sendInfoUser(e) {
        console.log(this.props)
        this.props.userEditInfo(this.state.nome, this.state.telefone, this.state.email);
    }

    render() {
        return (
            <div className="col-md-7">
                <div className="panel panel-default">
                    <div className="panel-heading text-center">
                        DADOS PESSOAIS
                    </div>
                    <div className="panel-body">
                        <div className="col-md-12">
                            <div className="col-md-12" style={{margin:"15px 0"}}>
                                <label>Nome completo</label>
                                <input
                                    placeholder="Digite seu nome aqui"
                                    type="text"
                                    value={this.state.nome}
                                    onChange={this.onChange}
                                    name="nome"
                                    style={{width:"99%", padding:"5px 10px"}}/>
                            </div>
                            <div className="col-md-12" style={{margin:"15px 0"}}>
                                <label>Email</label>
                                <input
                                    placeholder="Digite seu email aqui"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    name="email"
                                    style={{width:"99%", padding:"5px 10px"}}/>
                            </div>
                            <div className="col-md-12" style={{margin:"15px 0"}}>
                                <label>Telefone</label>
                                <input
                                    placeholder="Digite seu telefone"
                                    type="tel"
                                    value={this.state.telefone}
                                    onChange={this.onChange}
                                    name="telefone"
                                    style={{width:"99%", padding:"5px 10px"}}/>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="col-md-12">
                                <button className="btn btn-primary pull-right" type="submit" onClick={this.sendInfoUser}>Atualizar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}