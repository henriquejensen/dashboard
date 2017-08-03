import React, { Component } from 'react'
import { Col } from "react-bootstrap"

//Components
import MyButton from "../../components/button/MyButton"
import { MyCheckboxGroup, MyFieldGroup, SelectGroup, TextAreaGroup } from "../../components/forms/CommonForms"

class NovaDocumento extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idCarteira: typeof(this.props.carteira) === "object" ? this.props.carteira[0].id : this.props.carteira,
            carteiras: typeof(this.props.carteira) === "object" ? this.props.carteira.map(carteira => {
                return {
                    label: carteira.nome,
                    value: carteira.id
                }
            }) : null
        }
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    onFormSubmit = (evt) => {
        evt.preventDefault()
        debugger
        const { documento, cep, idCarteira } = this.state
        this.props.novoDocumento({idCarteira, documento, cep})
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                {this.state.carteiras ?
                    <Col md={12}>
                        <SelectGroup
                            id="idCarteira"
                            type="select"
                            label="Selecione a carteira"
                            name="idCarteira"
                            onChange={this.onChange}
                            options={this.state.carteiras} />
                    </Col>
                : ""}
                <Col md={6}>
                    <MyFieldGroup label="Documento"
                        type="text"
                        placeHolder="Informe o número do documento"
                        name="documento"
                        value={this.state.documento}
                        onChange={this.onChange}
                        required
                    />
                </Col>
                <Col md={6}>
                    <MyFieldGroup label="CEP"
                        type="text"
                        placeHolder="Digite o cep do documento"
                        name="cep"
                        value={this.state.cep}
                        onChange={this.onChange}
                    />
                </Col>

                <Col md={12}>
                    <MyButton
                        type="submit"
                        myButtonClass="btn-block color-payement"
                        myButtonText="Salvar"
                    />
                </Col>
            </form>
        )
    }
}

export default NovaDocumento