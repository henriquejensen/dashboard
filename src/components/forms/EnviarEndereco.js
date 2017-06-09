import React, { Component } from "react";
import { Button } from "react-bootstrap";

import estados from "../utils/common/estados.json";

export default class EnviarEndereco extends Component {
    state = {
        endereco: {
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            estado: "",
            cep: ""
        }
    }

    onChange = (evt) => {
        let newAddress = Object.assign({},this.state.endereco);
        newAddress[evt.target.name] = evt.target.value;

        this.setState({
            endereco: newAddress
        })
    }

    onFormSubmit = (evt) => {
        evt.preventDefault();

        this.props.sendNewAddress(this.state.endereco);

    }

    render() {
        return (
            <div className="col-md-12">
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputLogradouro">Logradouro</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputLogradouro"
                            name="logradouro"
                            aria-describedby="logradouroHelp"
                            placeholder="Digite o logradouro"
                            value={this.state.endereco.logradouro}
                            onChange={this.onChange}/>
                        <small id="logradouroHelp" className="form-text text-muted">Preencha apenas o nome do logradouro</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputNumero">Número</label>
                        <input
                            type="number"
                            className="form-control"
                            id="inputNumero"
                            placeholder="Digite o número"
                            name="numero"
                            value={this.state.endereco.numero}
                            onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputComplemento">Complemento</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputComplemento"
                            placeholder="Digite o complemento"
                            name="complemento"
                            value={this.state.endereco.complemento}
                            onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputBairro">Bairro</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputBairro"
                            placeholder="Digite o bairro"
                            name="bairro"
                            value={this.state.endereco.bairro}
                            onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputCidade">Cidade</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputCidade"
                            placeholder="Digite o cidade"
                            name="cidade"
                            value={this.state.endereco.cidade}
                            onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectState">Selecione o estado</label>
						<select
							className="form-control"
							name="estado"
							onChange={this.onChange}
							value={this.state.endereco.estado}
						>
							{estados.estados.map((estado,i) => {
								return <option value={estado.sigla} key={i}>{estado.sigla}</option>
							})}
						</select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputCep">CEP</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputCep"
                            placeholder="Digite o cep"
                            name="cep"
                            value={this.state.endereco.cep}
                            onChange={this.onChange}/>
                    </div>
                    <Button type="submit">Enviar</Button>
                </form>
            </div>
        )
    }
}