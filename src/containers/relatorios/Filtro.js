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
                {label: "Todos", value: "todos"},
                {label: "Localizado", value: "OK"},
                {label: "Não localizado", value: "NAO LOC"},
                {label: "Erro", value: "ERROR"},
                {label: "Reconsulta", value: "REC"},
            ],
            R7: [
                {label: "Todos", value: "todos"},
                {label: "Enviando", value: 0},
                {label: "Enviado", value: 1},
                {label: "Recebido", value: 2},
                {label: "Não Recebido", value: 3},
                {label: "Cancelado", value: 99}
            ],
            R8: [
                {label: "Todos", value: "todos"},
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
            {label: "Ponto e Vírgula", value: ";"},
            {label: "Vírgula", value: ","},
            {label: "Cifrão", value: "$"},
            {label: "Cerquilha", value: "#"},
        ]

        this.state = {
            pessoaDescricao : null,    
            pessoaNome : null,
            grupo : null,
            usuario : null,
            campanha : null,
            resultado : null,
            dataIni : null,
            dataFim : null,
            idPessoaPai : null,
            idPessoa : null,
            idGrupo : null,
            idUsuario : null,
            idUsuarioPosVenda: null,
            delimitador : this.separadorOpcoes[0].value,
            tipoRelatorio : null
        }
    }

    onFormSubmit = (evt) => {
        evt.preventDefault()

        let filters = { ...this.state, idRelatorio:this.props.relatorio.id }

        this.props.filterRelatorio(filters)
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
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
                        id="dataIni"
                        label="Data Início"
                        type="date"
                        name="dataIni"
                        value={this.state.dataIni}
                        onChange={this.onChange} />
                </Col>
                <Col md={3}>
                    <MyFieldGroup
                        id="dataFim"
                        label="Data Final"
                        type="date"
                        name="dataFim"
                        value={this.state.dataFim}
                        onChange={this.onChange}
                    />
                </Col>

                <Col md={6}>
                    <MyFieldGroup
                        id="pessoaDescricao"
                        label="Razão social do cliente"
                        type="text"
                        name="pessoaDescricao"
                        placeholder="Digite a razão social do cliente"
                        value={this.state.pessoaDescricao}
                        onChange={this.onChange}
                    />
                </Col>
                <Col md={6}>
                    <MyFieldGroup
                        id="pessoaNome"
                        label="Cliente Login"
                        type="text"
                        name="pessoaNome"
                        placeholder="Digite o login do cliente"
                        value={this.state.pessoaNome}
                        onChange={this.onChange}
                    />
                </Col>

                <Col md={6}>
                    <MyFieldGroup
                        id="grupo"
                        label="Grupo"
                        type="text"
                        name="grupo"
                        placeholder="Digite o nome do grupo"
                        value={this.state.grupo}
                        onChange={this.onChange}
                    />
                </Col>

                <Col md={6}>
                    <MyFieldGroup
                        id="usuario"
                        label="Usuário"
                        type="text"
                        name="usuario"
                        placeholder="Digite o nome do usuário"
                        value={this.state.usuario}
                        onChange={this.onChange}
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
                            value={this.state.campanha}
                            onChange={this.onChange}
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
                        myButtonStyle="info"
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