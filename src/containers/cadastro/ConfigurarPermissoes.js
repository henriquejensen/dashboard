import React, { Component } from "react";
import { Tabs, Tab, Col, Button, Form } from "react-bootstrap";

import { CheckboxGroup } from "../../components/forms/CommonForms";

const bloqueioRelatorios = [
    "Não extrair relatórios de informações de clientes",
    "Não extrair relatórios de informações de grupos",
    "Não extrair relatórios de informações de usuários",
    "Não extrair relatórios de informações de contato dos clientes",
    "Não extrair relatórios de informações dos valores das consultas",
    "Não extrair relatórios de consumo de Localize, Crédito, Veículo e Foco Fiscal",
    "Não extrair relatórios dos envios de sms",
    "Não extrair relatórios das informações do Base certa",
    "Não extrair relatórios do consumo total de todos os produtos",
    "Não extrair relatórios das informações de Cancelamento",
    "Não extrair relatórios das informações dos Clientes x Carteira",
    "Não extrair relatórios das informações do ranking de vendas"
]
const bloqueioAcessos = [
    "Não inserir/alterar clientes, contratos e contatos.",
    "Não visualizar lista de clientes em cadastro",
    "Não visualizar lista de grupos em cadastro",
    "Não visualizar lista de usuários em cadastro",
    "Não visualizar o Histórico de Faturamento por filtro de cliente",
    "Não visualizar a Prévia de Faturamento por filtro de cliente"
]

const Horario = (props) => {
    return (
        <span>
            <Col md={12}>
                <CheckboxGroup
                    id="diasAcesso"
                    options={props.options} />
            </Col>
        </span>
    )
}

class ConfigurarPermissoes extends Component {
    onFormSubmit = (evt) => {
        evt.preventDefault();

        console.log(this.state);
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        const editar = [
            {label: "Bloqueio de relatórios", form: <Horario onChange={this.onChange} options={bloqueioRelatorios} />},
            {label: "Bloqueio de acessos", form: <Horario onChange={this.onChange} options={bloqueioAcessos} />}
        ]

        return (
            <Col md={12}>
                <Form horizontal onSubmit={this.onFormSubmit}>
                    <Tabs
                        defaultActiveKey={0}
                        id="uncontrolled-tab-example">

                        {editar.map((item,index) => {
                            return (
                                <Tab eventKey={index} title={item.label} key={index}>
                                    {item.form}
                                </Tab>
                            )
                        })}

                    </Tabs>

                    <Col md={6}>
                        <Button
                            type="submit"
                            onClick={this.props.cancel}>Cancelar</Button>
                    </Col>
                    <Col md={6}>
                        <Button
                            className="pull-right"
                            type="submit"
                            bsStyle="info">Salvar</Button>
                    </Col>
                </Form>
            </Col>
        )
    }
}

export default ConfigurarPermissoes;