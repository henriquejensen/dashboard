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
            isCPF: true,
            documento: ""
        }

        this.onChange = this.onChange.bind(this);
		this.onClickBuscaRapida = this.onClickBuscaRapida.bind(this);
        this.changeDocumentType = this.changeDocumentType.bind(this);
    }

	onClickBuscaRapida(evt) {
		evt.preventDefault();

		this.setState({
			IsModalOpen: true,
            isCPF: this.state.documento.length <= 11,
		})
	}

	onChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

    closeModal() {
        this.setState({
            IsModalOpen: false,
        })
    }

    changeDocumentType() {
        this.setState({
            isCPF: !this.state.isCPF
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onClickBuscaRapida}>
                    <FormGroup bsSize="small">
                        <InputGroup>
                            <FormControl
                                style={{minWidth:"290px"}}
                                placeholder="Digite o CPF ou CNPJ"
                                type="number"
                                name="documento"
                                defaultValue={this.state.documento}
                                onChange={this.onChange}
                                required />
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
                    title={"Busca pelo "+ (this.state.isCPF? "CPF" : "CNPJ") + ": "+format(this.state.documento)}
                >
                    <GridProdutos
                        changeDocumentType={this.changeDocumentType}
                        closeModal={this.closeModal.bind(this)}
                        documento={this.state.documento}
                        isCPF={this.state.isCPF} />
                </Modal>
            </div>
        )
    }
}