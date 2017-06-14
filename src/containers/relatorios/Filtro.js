import React, { Component } from 'react';
import { Col, Form } from "react-bootstrap"

//Components
import { MyFieldGroup, SelectGroup } from "../../components/forms/CommonForms"
import MyButton from "../../components/button/MyButton"

class Filtro extends Component {
    constructor(props) {
        super(props)

        this.resultadoOpcoes = {
            R6: [
                {label: "Todos"},
                {label: "Localizado", value: "OK"},
                {label: "Não localizado", value: "NAO LOC"},
                {label: "Erro", value: "ERROR"},
                {label: "Reconsulta", value: "REC"},
            ],
            R7: [
                {label: "Todos"},
                {label: "Enviando", value: 0},
                {label: "Enviado", value: 1},
                {label: "Recebido", value: 2},
                {label: "Não Recebido", value: 3},
                {label: "Cancelado", value: 99}
            ],
            R8: [
                {label: "Todos"},
                {label: "Processados", value: 17},
                {label: "Cancelados", value: 18}
            ]
        }

        this.relatorioOpcoes = {
            R6: [
                {label: "Total", value: "total"},
                {label: "Detalhado", value: "detalhado"}
            ],
            R7: [
                {label: "Total", value: "total"},
                {label: "Detalhado", value: "detalhado"},
                {label: "Centro de custo", value: "centroCusto"},
                {label: "Respostas", value: "respostas"}
            ]
        }

        this.separadorOpcoes = [
            {label: "Ponto e Vírgula", value: "pontoVirgula"},
            {label: "Vírgula", value: "virgula"},
            {label: "Cifrão", value: "cifrao"},
            {label: "Cerquilha", value: "cerquilha"},
        ]

        this.state = {}
    }

    onFormSubmit = (evt) => {
        evt.preventDefault()
    }

    render() {
        let tipo = this.props.relatorio.tipo
        return (
            <Form onSubmit={this.onFormSubmit}>
                <Col md={3}>
                    <SelectGroup
                        id="separador"
                        type="select"
                        name="separador"
                        label="Separador"
                        options={this.separadorOpcoes}
                    />
                </Col>
                
                {tipo === "R6" || tipo === "R7" ?
                    <Col md={3}>
                        <SelectGroup
                            id="tipoRelatorio"
                            type="select"
                            name="tipoRelatorio"
                            label="Tipo do relatório"
                            options={this.relatorioOpcoes[tipo]}
                        />
                    </Col>
                : ""}

                <Col md={3}>
                    <MyFieldGroup
                        id="dataInicio"
                        label="Data Início"
                        type="date"
                        name="dataInicio"
                        onChange={this.onChange} />
                </Col>
                <Col md={3}>
                    <MyFieldGroup
                        id="dataFim"
                        label="Data Final"
                        type="date"
                        name="dataFim"
                        onChange={this.onChange} />
                </Col>

                <Col md={6}>
                    <MyFieldGroup
                        id="razaoSocial"
                        label="Razão social do cliente"
                        type="text"
                        name="razaoSocial"
                        placeholder="Digite a razão social do cliente"
                    />
                </Col>
                <Col md={6}>
                    <MyFieldGroup
                        id="clienteLogin"
                        label="Cliente Login"
                        type="text"
                        name="clienteLogin"
                        placeholder="Digite o login do cliente"
                    />
                </Col>

                <Col md={6}>
                    <MyFieldGroup
                        id="grupo"
                        label="Grupo"
                        type="text"
                        name="grupo"
                        placeholder="Digite o nome do grupo"
                    />
                </Col>
                <Col md={6}>
                    <MyFieldGroup
                        id="usuario"
                        label="Usuário"
                        type="text"
                        name="usuario"
                        placeholder="Digite o nome do usuário"
                    />
                </Col>

                {tipo === "R7" ?
                    <Col md={6}>
                        <MyFieldGroup
                            id="campanha"
                            label="Campanha"
                            type="text"
                            name="campanha"
                            placeholder="Digite a campanha do SMS"
                        />
                    </Col>
                : ""}
                {tipo !== "R9" ?
                    <Col md={6}>
                        <SelectGroup
                            id="resultado"
                            type="select"
                            name="resultado"
                            label="Resultado"
                            options={this.resultadoOpcoes[tipo]}
                        />
                    </Col>
                : ""}
                <Col md={12} >
                    <MyButton
                        myButtonText="Exportar"
                        type="submit"
                        myButtonClass="pull-right"
                    />
                </Col>
            </Form>
        )
    }
}

export default Filtro;