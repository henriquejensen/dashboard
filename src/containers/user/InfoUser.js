import React, { Component} from "react";

export default class Info extends Component {
    constructor(props) {
        super(props);

    }

    onSubmitUser(e) {
        e.preventDefault();
        e.stopPropagation();

        var form = this.refs.user.files[0];

    }

   onSubmitFirm(e) {
        e.preventDefault();
        e.stopPropagation();

        console.log("Submit Form")
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
                                            defaultValue={this.props.user.nome}
                                            name="nome"
                                            ref="nome"
                                            style={{width:"99%", padding:"5px 10px"}}/>
                                    </div>
                                    <div className="col-md-12" style={{margin:"15px 0"}}>
                                        <label>Telefone</label>
                                        <input
                                            placeholder="Digite seu telefone"
                                            type="tel"
                                            defaultValue={this.props.user.telefone}
                                            name="nome"
                                            ref="nome"
                                            style={{width:"99%", padding:"5px 10px"}}/>
                                    </div>
                                </div>

                                <div className="col-md-4 text-center">
                                    <div className="col-md-12">
                                        <img src={this.props.user.avatar_url} className="img-uploaded" />
                                    </div>
                                    <div className="col-md-12">
                                        <form method="post" encType="multipart/form-data" onSubmit={this.onSubmitUser.bind(this)} ref="imageUpload" name="avatar">
                                            <input name="avatar" ref="user" accept="file_extension|image/.gif,.jpg,.png" type="file" className="file"/>
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
                            </div>
                    </div>
                </div>
            </div>)
    }
}