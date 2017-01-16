import React, { Component } from "react";

export default class EnviarEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assunto: "",
            message: "",
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onFormSubmit(evt) {
        evt.preventDefault();

        console.log("ENVIANDO...", this.state.assunto, this.state.message);
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.onFormSubmit}>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Assunto</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            name="assunto"
                            placeholder="Assunto do email"
                            value={this.state.assunto}
                            onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Email</label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control"
                            name="emails"
                            placeholder="example@domain.com"
                            value={this.props.email} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Mensagem</label>
                    <div className="col-sm-10">
                        <textarea
                            className="form-control"
                            rows="14"
                            name="message"
                            value={this.state.message}
                            onChange={this.onChange}>
                        </textarea>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10 col-sm-offset-2">
                        <input 
                            name="submit"
                            type="submit"
                            value="Enviar"
                            className="btn btn-primary" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10 col-sm-offset-2"></div>
                </div>
            </form>
        )
    }
}