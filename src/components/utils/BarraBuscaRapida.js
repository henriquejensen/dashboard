import React, { Component } from "react";

import Modal from "../Modal";
import GridProdutos from "./GridProdutos";
import { format } from "./formatDocumento";

export default class BarraBuscaRapida extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IsModalOpen: false,
            documento: ""
        }

        this.onChange = this.onChange.bind(this);
		this.onClickBuscaRapida = this.onClickBuscaRapida.bind(this);
    }

	onClickBuscaRapida(evt) {
		evt.preventDefault();

		this.setState({
			IsModalOpen: true
		})
	}

	onChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

    closeModal() {
        this.setState({
            IsModalOpen: false
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onClickBuscaRapida}>
                    <div className="input-group stylish-input-group">
                        <input
                            type="number"
                            name="documento"
                            className="form-control"
                            value={this.state.documento}
                            placeholder="Digite o CPF ou CNPJ"
                            onChange={this.onChange}
                        />
                        <span className="input-group-addon">
                            <button type="submit">
                                <span className="fa fa-search"></span>
                            </button>  
                        </span>
                    </div>
                </form>

                <Modal
                    IsModalOpen={this.state.IsModalOpen}
                    closeModal={this.closeModal.bind(this)}
                    title={"Busca pelo "+ (this.state.documento.length <= 11 ? "CPF" : "CNPJ") + ": "+format(this.state.documento)}
                >
                    <GridProdutos
                        closeModal={this.closeModal.bind(this)}
                        documento={this.state.documento}
                        isCPF={this.state.documento.length <= 11 ? true : false} />
                </Modal>
            </div>
        )
    }
}