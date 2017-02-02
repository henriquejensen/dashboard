import React, { Component } from "react";
import { FormGroup, FormControl, InputGroup, Button } from "react-bootstrap";

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
                    <FormGroup bsSize="small">
                        <InputGroup>
                            <FormControl
                                style={{minWidth:"500px"}}
                                placeholder="Digite o CPF ou CNPJ"
                                type="number"
                                name="documento"
                                defaultValue={this.state.documento}
                                onChange={this.onChange} />
                            <InputGroup.Button>
                                <Button
                                    type="submit"
                                    bsSize="small"
                                    bsStyle="info">Consultar</Button>
                            </InputGroup.Button>
                      </InputGroup>
                    </FormGroup>
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