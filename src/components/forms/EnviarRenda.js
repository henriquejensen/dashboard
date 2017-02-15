import React, { Component } from "react";
import { FieldGroup, Button } from "react-bootstrap";

export default class EnviarRenda extends Component {
    constructor() {
        super();

        this.state = {
            income: {
                rendaEstimada: "",
                faixaRenda: "",
                empregador: "",
                setor: "",
                dataReferencia: "",
                cbo: "",
                cboSinonimos: ""
            }
        }

        this.onChange = this.onChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);

    }


    onChange(evt) {
        let newAddress = Object.assign({},this.state.income);
        newAddress[evt.target.name] = evt.target.value;

        this.setState({
            income: newAddress
        })
    }

    onFormSubmit(evt) {
        evt.preventDefault();

        console.log("SEND", this.state.income);

        this.props.send(this.state.income);

    }

    render() {
        return (
            <div className="col-md-12">
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputRendaEstimada">Renda Estimada</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputRendaEstimada"
                            name="rendaEstimada"
                            aria-describedby="logradouroHelp"
                            placeholder="Digite a renda estimada"
                            value={this.state.income.rendaEstimada}
                            onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputFaixaRenda">Faixa de Renda</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputFaixaRenda"
                            placeholder="Digite a faixa de renda"
                            name="faixaRenda"
                            value={this.state.income.faixaRenda}
                            onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmpregador">Empregador</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputEmpregador"
                            placeholder="Digite o empregador"
                            name="empregador"
                            value={this.state.income.empregador}
                            onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputSetor">Setor</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputSetor"
                            placeholder="Digite o setor"
                            name="setor"
                            value={this.state.income.setor}
                            onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDataReferencia">Data Referência</label>
                        <input
                            type="date"
                            className="form-control"
                            id="inputDataReferencia"
                            name="dataReferencia"
                            value={this.state.income.inputDataReferencia}
                            onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputCBO">CBO</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputCBO"
                            name="cbo"
                            value={this.state.income.cbo}
                            onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputCBOSinonimos">CBO Sinônimos</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputCBOSinonimos"
                            name="cboSinonimos"
                            value={this.state.income.cboSinonimos}
                            onChange={this.onChange}/>
                    </div>
                    <Button type="submit">Enviar</Button>
                </form>
            </div>
        )
    }
}