import React, { Component } from 'react'
import { Col } from "react-bootstrap"

//Components
import MyButton from "../../components/button/MyButton"
import { MyCheckboxGroup, MyFieldGroup, SelectGroup, TextAreaGroup } from "../../components/forms/CommonForms"

class NovaCarteira extends Component {
    constructor(props) {
        super(props)

        let { tipoConsultaPf, tipoConsultaPj } = this.props.carteira
        tipoConsultaPf = tipoConsultaPf ? tipoConsultaPf : {}
        tipoConsultaPj = tipoConsultaPj ? tipoConsultaPj : {}
        this.state = {
            ...this.props.carteira,
            frequenciaConsulta: "7",
            tipoCarteira: "CPF",
            options: {
                CPF: [
                    {name:"acao", text:"Ação", checked:tipoConsultaPf.acao ? true : false},                            
                    {name:"score12Meses", text:"Score 12 meses", checked:tipoConsultaPf.score12Meses ? true : false}, 
                    {name:"score3Meses", text:"Score 3 meses", checked:tipoConsultaPf.score3Meses ? true : false}, 
                    {name:"participacaoEmpresa", text:"Part. Empresa", checked:tipoConsultaPf.participacaoEmpresa ? true : false}, 
                    {name:"obito", text:"Óbito", checked:tipoConsultaPf.obito ? true : false}, 
                    {name:"rendaPresumida", text:"Renda presumida", checked:tipoConsultaPf.rendaPresumida ? true : false}, 
                    {name:"gastoEstimado", text:"Gasto Estimado", checked:tipoConsultaPf.gastoEstimado ? true : false}, 
                    {name:"limiteCredito", text:"Limite Crédito", checked:tipoConsultaPf.limiteCredito ? true : false}, 
                    {name:"indiceRelacionamentoMercado", text:"Indice Relacionamento Mercado", checked:tipoConsultaPf.indiceRelacionamentoMercado ? true : false}, 
                ],
                CNPJ: [
                    {name:"acao", text:"Ação", checked:tipoConsultaPj.acao ? true : false},                            
                    {name:"score12Meses", text:"Score 12 meses", checked:tipoConsultaPj.score12Meses ? true : false},
                    {name:"score3Meses", text:"Score 3 meses", checked:tipoConsultaPj.score3Meses ? true : false},
                    {name:"participacaoEmpresa", text:"Part. Empresa", checked:tipoConsultaPj.participacaoEmpresa ? true : false},
                    {name:"riscoCredito", text:"Risco Crédito", checked:tipoConsultaPj.riscoCredito ? true : false},
                    {name:"socio", text:"Sócio", checked:tipoConsultaPj.socio ? true : false},
                    {name:"gastoEstimado", text:"Gasto Estimado", checked:tipoConsultaPj.gastoEstimado ? true : false},
                    {name:"limiteCredito", text:"Limite Crédito", checked:tipoConsultaPj.limiteCredito ? true : false},
                ]
            }
        }
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    onChangeCheckbox = (name,index) => {
        let newCheckbox = [...this.state.options[this.state.tipoCarteira]]
        newCheckbox.filter(elem => elem.name === name).checked = true

        this.setState({
            options: {
                ...this.state.options,
                [this.state.tipoCarteira]: newCheckbox
            }
        })
    }

    onFormSubmit = (evt) => {
        evt.preventDefault()

        const requestNovaCarteira = {
            nome: this.state.nome,
            descricao: this.state.descricao,
            frequenciaConsulta: this.state.frequenciaConsulta,
            tipoConsultaPj: this.state.tipoCarteira === "CNPJ" ?
                this.state.options.CNPJ.reduce((result, item) => {
                    result[item.name] = item.checked || false
                    return result
                } , {}): null,
            tipoConsultaPf: this.state.tipoCarteira === "CPF" ?
                this.state.options.CPF.reduce((result, item) => {
                    result[item.name] = item.checked || false
                    return result
                } , {}): null,
        }
        this.props.novaCarteira(requestNovaCarteira)
    }

    renderCheckBox = (tipo) => {
        return (
            <span>
                <Col md={4}>
                    <MyCheckboxGroup
                        options={this.state.options[tipo].slice(0,3)}
                        onChange={this.onChangeCheckbox}
                    />
                </Col>

                <Col md={4}>
                    <MyCheckboxGroup
                        options={this.state.options[tipo].slice(3,6)}
                        onChange={this.onChangeCheckbox}
                    />
                </Col>

                <Col md={4}>
                    <MyCheckboxGroup
                        options={this.state.options[tipo].slice(6)}
                        onChange={this.onChangeCheckbox}
                    />
                </Col>
            </span>
        )
    }

    render() {
        const { carteira={} } = this.props
        return (
            <form onSubmit={this.onFormSubmit}>
                <Col md={12}>
                    <MyFieldGroup label="Nome da Carteira"
                        type="text"
                        placeHolder="Informe o nome da nova carteira"
                        name="nome"
                        value={this.state.nome}
                        onChange={this.onChange}
                        required
                    />
                </Col>

                <Col md={carteira.tipoConsultaPf || carteira.tipoConsultaPj ? 6 : 4}>
                    <SelectGroup label="Frequência (dias)"
                        name="frequenciaConsulta"
                        options={[
                            {value:7, label:7},
                            {value:15, label:15},
                            {value:30, label:30},
                            {value:60, label:60}
                        ]}
                        value={this.state.frequenciaConsulta}
                        onChange={this.onChange}
                    />
                </Col>
                
                {carteira.tipoConsultaPf || carteira.tipoConsultaPj ? "" :
                    <Col md={4}>
                        <SelectGroup label="Tipo da carteira"
                            name="tipoCarteira"
                            options={[
                                {value:"CPF", label:"CPF"},
                                {value:"CNPJ", label:"CNPJ"}
                            ]}
                            value={this.state.tipoConsultaPf ? "CPF" : "CNPJ"}
                            onChange={this.onChange}
                            required
                        />
                    </Col>
                }

                <Col md={carteira.tipoConsultaPf || carteira.tipoConsultaPj ? 6 : 4}>
                    <SelectGroup label="Status"
                        name="status"
                        options={[
                            {value:"ativo", label:"ATIVO"},
                            {value:"INATIVO", label:"INATIVO"}
                        ]}
                        onChange={this.onChange}
                        required
                    />
                </Col>

                <Col md={12}>
                    <TextAreaGroup label="Descrição"
                        name="descricao"
                        value={this.state.descricao}
                        onChange={this.onChange}
                    />
                </Col>
            
                {this.state.tipoCarteira === "CNPJ" ?
                    this.renderCheckBox("CNPJ")
                    : this.renderCheckBox("CPF")
                }

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

export default NovaCarteira