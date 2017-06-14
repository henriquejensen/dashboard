import React, { Component } from 'react'
import { Col, Form } from "react-bootstrap"

// Components
import Panel from "../../components/panel/Panel"
import CardWithTable from "../../components/card/CardWithTable"
import { MyFieldGroup, SelectGroup } from "../../components/forms/CommonForms"

//Constants
import { LOADING_GIF } from "../../constants/utils"
import { COMPANY_NAME_SHORT } from "../../constants/constantsCompany"
import { TITLE_CONSUME } from "../../constants/utils"

class Consumo extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

	componentDidMount() {
		document.title = TITLE_CONSUME + " > " + COMPANY_NAME_SHORT
	}

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    renderForm = () => {
        return (
          <Panel>
            <Form onSubmit={this.onFormSubmit}>
                <Col md={6}>
                    <MyFieldGroup
                      id="usuario"
                      label="Usuario"
                      type="text"
                      name="usuario"
                      onChange={this.onChange} />
                </Col>

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
                        label="Data Fim"
                        type="date"
                        name="dataFim"
                        onChange={this.onChange}
                    />
                </Col>

                <Col md={3}>
                    <MyFieldGroup
                        id="razaoSocial"
                        label="Razão social"
                        type="text"
                        name="razaoSocial"
                        onChange={this.onChange}
                    />
                </Col>
                <Col md={3}>
                    <MyFieldGroup
                        id="clienteLogin"
                        label="Cliente Login"
                        type="text"
                        name="clienteLogin"
                        onChange={this.onChange}
                    />
                </Col>
                <Col md={3}>
                    <MyFieldGroup
                        id="nomeGrupo"
                        label="Nome do grupo"
                        type="text"
                        name="nomeGrupo"
                        onChange={this.onChange}
                    />
                </Col>
                <Col md={3}>
                    <SelectGroup
                        id="resultado"
                        type="select"
                        name="resultado"
                        label="Resultado"
                        options={["TODOS"]}
                        onChange={this.onChange}
                    />
                </Col>

            </Form>
          </Panel>
        )
    }

    render() {
        return (
            <div>
                {this.renderForm()}

                <div style={{marginBottom:15}} />

                <CardWithTable title="RESULTADOS DA PESQUISA"
                    fields={
                        [
                            {id:"data", name:"Data"},
                            {id:"usuario", name:"Usuario"},
                            {id:"consulta", name:"Consulta"},
                            {id:"dado", name:"Dado"},
                            {id:"status", name:"Status"}
                        ]
                    }
                    rows={[]}
                />
            </div>
        )
    }
}

export default Consumo