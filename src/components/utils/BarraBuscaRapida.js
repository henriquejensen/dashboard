import React, { Component } from "react";
import { FormGroup, FormControl, InputGroup, Button } from "react-bootstrap";

import Modal from "../Modal";
import GridProdutos from "./GridProdutos";
import { patternCPF, patternCNPJ } from "./functions/patternDocuments";

export default class BarraBuscaRapida extends Component {

    state = {
        IsModalOpen: false,
        isCPF: true,
        documento: ""
    }

	onClickBuscaRapida = (evt) => {
		evt.preventDefault();
        let documento = this.state.documento.replace(/[^0-9]/g,"");
        if(documento.length > 0) {
            this.setState({
                IsModalOpen: true,
                isCPF: documento.length <= 11,
                documento: documento
            })
        } else {
            this.setState({
                documento: ""
            })
        }
	}

	onChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

    closeModal() {
        this.setState({
            IsModalOpen: false,
        })
    }

    changeDocumentType = () => {
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
                                type="text"
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
                    title={"Busca pelo "+ (this.state.isCPF? "CPF " + patternCPF(this.state.documento) : "CNPJ " + patternCNPJ(this.state.documento))}
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