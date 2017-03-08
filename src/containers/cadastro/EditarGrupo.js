import React, { Component } from "react";
import { Tabs, Tab, Col, Button, Form } from "react-bootstrap";

import { FieldGroup, SelectGroup, TextArea, CheckboxGroup } from "../../components/forms/CommonForms";
import Table from "../../components/table/Table";

const Cliente = (props) => {
    return (
        <span>
            <Col md={6}>
                <FieldGroup
                    id="razaoSocial"
                    type="text"
                    label="Razão social"
                    name="razaoSocial"
                    placeholder="Nome do cliente"
                    onChange={props.onChange} />
            </Col>

            <Col md={6}>
                <FieldGroup
                    id="inputUser"
                    type="text"
                    label="Cliente Login"
                    name="login"
                    placeholder="Cliente login"
                    onChange={props.onChange} />
            </Col>
        </span>
    )
}

const DadosBasicos = (props) => {
    return (
        <span>
            <Col md={4}>
                <FieldGroup
                    id="nomeGrupo"
                    type="text"
                    label="Nome do grupo"
                    name="nomeGrupo"
                    placeholder="Nome do grupo"
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <FieldGroup
                    id="inicioConsumo"
                    type="date"
                    label="Início do consumo"
                    name="inicioConsumo"
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <FieldGroup
                    id="fimConsumo"
                    type="date"
                    label="Fim do consumo"
                    name="fimConsumo"
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <SelectGroup
                    id="bloqueado"
                    type="select"
                    label="Bloqueado"
                    name="bloqueado"
                    options={["SIM", "NAO"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <SelectGroup
                    id="tipoGrupo"
                    type="select"
                    label="Status ativo"
                    name="tipoGrupo"
                    options={["CLIENTE", "FUNCIONARIO", "TESTE", "OUTROS"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <SelectGroup
                    id="acessoWS"
                    type="select"
                    label="Acesso a WebService"
                    name="acessoWS"
                    options={["SIM", "NAO"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={12}>
                <FieldGroup
                    id="ipAcesso"
                    type="text"
                    label="Ip's de acesso"
                    name="ipAcesso"
                    placeholder="0.0.0.0, 0.0.0.0, 0.0.0.0"
                    onChange={props.onChange} />
            </Col>
        </span>
    )
}

const Horario = (props) => {
    return (
        <span>
            <Col md={4}>
                <SelectGroup
                    id="bloquearHorario"
                    type="select"
                    label="Bloquear por horário?"
                    name="bloquearHorario"
                    options={["SIM", "NAO"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <FieldGroup
                    id="acessarDas"
                    type="time"
                    label="Acessar das 00:00"
                    name="acessarDas"
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <FieldGroup
                    id="acessarAte"
                    type="time"
                    label="Acessar até às 00:00"
                    name="acessarAte"
                    onChange={props.onChange} />
            </Col>

            <Col md={12}>
                <CheckboxGroup
                    id="diasAcesso"
                    label="Selecionar os dias que poderá acessar"
                    center={true}
                    inline={true}
                    options={["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"]} />
            </Col>

        </span>
    )
}

const LimitacaoTotal = (props) => {
    return (
        <span>
            <Col md={4}>
                <FieldGroup
                    id="limite"
                    type="number"
                    label="Limite de quantidade"
                    name="limite"
                    placeholder="0"
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <SelectGroup
                    id="tipoLimitacao"
                    type="select"
                    label="Tipo da limitação"
                    name="tipoLimitacao"
                    options={["INATIVO", "CONSUMO"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <SelectGroup
                    id="periodoLimitacao"
                    type="select"
                    label="Período da limitação"
                    name="periodoLimitacao"
                    options={["AVULSO", "MENSAL"]}
                    onChange={props.onChange} />
            </Col>
            <Col md={12}>
                Total do consumo deste Mês : 0
            </Col>
            <Col md={12}>
                Total do consumo desde o início : 0
            </Col>
            <Col md={12}>
                A limitação e o consumo acima é referente apenas aos produtos de LOCALIZE, CRÉDITO, VEÍCULO, FOCO FISCAL e CONSIG+
            </Col><br/>
        </span>
    )
}

const LimitacaoProduto = (props) => {
    let produtos = ["Localize", "Veículo", "Consig+", "Crédito", "FocoFiscal", "Venda+", "SMS", "BaseCerta"];
    return (
            <Table>
                <tbody>
                    {produtos.map((produto,index) => {
                        return (
                            <tr key={index}>
                                <td><h3>{produto}</h3></td>
                                <td>
                                    <FieldGroup
                                        id="produtoQuantidade"
                                        type="number"
                                        label="Quantidade"
                                        name="produtoQuantidade"
                                        onChange={props.onChange} />
                                </td>

                                <td>
                                    <SelectGroup
                                        id="tipoLimitacaoProduto"
                                        type="select"
                                        label="Tipo da limitação"
                                        name="tipoLimitacaoProduto"
                                        options={["INATIVO", "CONSUMO"]}
                                        onChange={props.onChange} />
                                </td>

                                <td>
                                    <SelectGroup
                                        id="periodoLimitacaoProduto"
                                        type="select"
                                        label="Período da limitação"
                                        name="periodoLimitacaoProduto"
                                        options={["AVULSO", "MENSAL"]}
                                        onChange={props.onChange} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

    )
}

const Observacoes = (props) => {
    return (
        <Col md={12}>
            <TextArea
                id="observacoes"
                label="Observações"
                placeholder="Escreva alguma observação sobre o usuário"
                name="observacoes"
                onChange={props.onChange} />
        </Col>
    )
}


class EditarGrupo extends Component {
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
            {label: "Cliente", form: <Cliente onChange={this.onChange} />},
            {label: "Dados Básicos", form: <DadosBasicos onChange={this.onChange} />},
            {label: "Horário", form: <Horario onChange={this.onChange} />},
            {label: "Limitação total", form: <LimitacaoTotal onChange={this.onChange} />},
            {label: "Limitação por produto", form: <LimitacaoProduto onChange={this.onChange} />},
            {label: "Observações", form: <Observacoes onChange={this.onChange} />}
        ]

        return (
            <Col md={12}>
                <Form horizontal onSubmit={this.onFormSubmit}>
                    <Tabs
                        defaultActiveKey={1}
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

 export default EditarGrupo;