import React, { Component} from "react";

export default class Info extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: this.props.user.nome,
            telefone: this.props.user.telefone,
            avatar_url: this.props.user.avatar_url,
            firm_url: this.props.user.firm_url
        }

        this.onSubmitUser = this.onSubmitUser.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeTelefone = this.onChangeTelefone.bind(this);
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

    onChangeName(evt) {
        this.setState({
            nome: evt.target.value
        })
    }

    onChangeTelefone(evt) {
        this.setState({
            telefone: evt.target.value
        })
    }

    sendInfoUser(e) {
        console.log(this.props)
        this.props.userEditInfo(this.state.nome, this.state.telefone, this.state.avatar_url, this.state.firm_url);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading text-center">
                            DADOS PESSOAIS
                        </div>

                        <div className="panel-body">
                            <div className="col-md-4">
                                <div className="col-md-12" style={{margin:"15px 0"}}>
                                    <label>Nome completo</label>
                                    <input
                                        placeholder="Digite seu nome aqui"
                                        type="text"
                                        value={this.state.nome}
                                        onChange={this.onChangeName}
                                        name="nome"
                                        style={{width:"99%", padding:"5px 10px"}}/>
                                </div>
                                <div className="col-md-12" style={{margin:"15px 0"}}>
                                    <label>Telefone</label>
                                    <input
                                        placeholder="Digite seu telefone"
                                        type="tel"
                                        value={this.state.telefone}
                                        onChange={this.onChangeTelefone}
                                        name="telefone"
                                        style={{width:"99%", padding:"5px 10px"}}/>
                                </div>
                            </div>

                            <div className="col-md-4 text-center">
                                <div className="col-md-12">
                                    <img src={this.props.user.avatar_url} className="img-uploaded" />
                                </div>
                                <div className="col-md-12">
                                    <form method="post" encType="multipart/form-data" onSubmit={this.onSubmitUser} ref="imageUpload" name="avatar">
                                        <input name="avatar" ref="user" accept="file_extension|image/.gif,.jpg,.png" type="file" onChange={(e) => console.log(e.target.value)} className="file"/>
                                        <input type="submit" value="Trocar Imagem" className="btn btn-info btn-trocar-image" />
                                    </form>
                                </div>
                            </div>

                            <div className="col-md-4 text-center">
                                <div className="col-md-12">
                                    <img src={this.props.user.firm_url} className="img-uploaded" />
                                </div>
                                <div className="col-md-12">
                                    <form method="post" encType="multipart/form-data" onSubmit={this.onSubmitFirm.bind(this)} ref="imageUpload" name="avatar">
                                        <input name="avatar" ref="firm" accept="file_extension|image/.gif,.jpg,.png" type="file" className="file"/>
                                        <input type="submit" value="Trocar Imagem" className="btn btn-info btn-trocar-image" />
                                    </form>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="col-md-12">
                                    <button className="btn btn-success pull-right" type="submit" onClick={this.sendInfoUser}>Salvar alterações</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}