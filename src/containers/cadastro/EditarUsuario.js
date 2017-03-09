import React, { Component } from "react";
import { Tabs, Tab, Col, Button, Form } from "react-bootstrap";

import { FieldGroup, SelectGroup, TextArea } from "../../components/forms/CommonForms";

const Grupo = (props) => {
    return (
        <Col md={12}>
            <FieldGroup
                id="inputUser"
                type="text"
                label="Cliente Nome"
                name="nome"
                value={props.cliente}
                placeholder="Digite o nome do cliente"
                onChange={props.onChange} />

            <FieldGroup
                id="inputUser"
                type="text"
                label="Cliente Login"
                name="login"
                value={props.login}
                placeholder="Digite o login do cliente"
                onChange={props.onChange} />

            <FieldGroup
                id="inputUser"
                type="text"
                label="Nome do grupo"
                name="grupo"
                value={props.grupo}
                placeholder="Digite o nome do grupo"
                onChange={props.onChange} />
        </Col>
    )
}

const DadosBasicos = (props) => {
    return (
        <span>
            <Col md={6}>
                <FieldGroup
                    id="inputUser"
                    type="text"
                    label="Usuário"
                    name="nome"
                    placeholder="Digite o nome do usuario"
                    value={props.nome}
                    onChange={props.onChange} />
            </Col>
            
            <Col md={6}>
                <FieldGroup
                    id="inputPassword"
                    type="password"
                    label="Senha"
                    name="senha"
                    placeholder="********"
                    value={props.senha}
                    onChange={props.onChange} />
            </Col>

            <Col md={6}>
                <FieldGroup
                    id="inputEmail"
                    type="email"
                    label="Email principal"
                    name="email"
                    placeholder="Digite o email principal"
                    value={props.email1}
                    onChange={props.onChange} />
            </Col>

            <Col md={6}>
                <FieldGroup
                    id="inputEmail2"
                    type="email"
                    label="Email 2"
                    name="email2"
                    placeholder="Digite o email secundário"
                    value={props.email2}
                    onChange={props.onChange} />
            </Col>

            <Col md={6}>
                <SelectGroup
                    id="perfil"
                    type="select"
                    label="Perfil"
                    name="perfil"
                    value={props.perfil}
                    options={["GERENTE", "OPERADOR", "ADM"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={6}>
                <SelectGroup
                    id="status"
                    type="select"
                    label="Status ativo"
                    name="status"
                    options={["SIM", "NAO"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={6}>
                <SelectGroup
                    id="boleto"
                    type="select"
                    label="Visualizar boleto"
                    name="boleto"
                    options={["SIM", "NAO"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={6}>
                <SelectGroup
                    id="inputEmail2"
                    type="select"
                    label="Acesso ao dossiê"
                    name="dossie"
                    options={["SIM", "NAO"]}
                    onChange={props.onChange} />
            </Col>
        </span>
    )
}

const Limitacao = (props) => {
    return (
        <span>
            <Col md={4}>
                <FieldGroup
                    id="limite"
                    type="number"
                    label="Limite de quantidade"
                    name="limite"
                    value={props.limiteValor}
                    placeholder="0"
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <SelectGroup
                    id="tipoLimitacao"
                    type="select"
                    label="Tipo da limitação"
                    name="tipoLimitacao"
                    value={props.tipoLimitacao}
                    options={["INATIVO", "CONSUMO"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <SelectGroup
                    id="periodoLimitacao"
                    type="select"
                    label="Período da limitação"
                    name="periodoLimitacao"
                    value={props.periodoLimitacao}
                    options={["AVULSO", "MENSAL"]}
                    onChange={props.onChange} />
            </Col>
        </span>
    )
}

const Observacoes = (props) => {
    return (
        <Col md={12}>
            <TextArea
                id="observacoes"
                label="Observações"                
                name="observacoes"
                value={props.obs}
                placeholder="Escreva alguma observação sobre o usuário"
                onChange={props.onChange} />
        </Col>
    )
}


class EditarUsuario extends Component {
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
        const user = this.props.userInfo;
        const editar = [
            {label: "Grupo e Cliente", form: <Grupo onChange={this.onChange} cliente={user.grupoUsuarioVO.pessoaVO.razaoSocial} login={user.grupoUsuarioVO.pessoaVO.descricao} grupo={user.grupoUsuarioVO.descricao} />},
            {label: "Dados Básicos", form: <DadosBasicos onChange={this.onChange} nome={user.nome} senha={user.senha} email1={user.email1} email2={user.email2} perfil={user.perfilVO} status={user.statusAtivo} boleto={user.statusBoleto} accessDossieTemp={user.accessDossieTemp} />},
            {label: "Limitação", form: <Limitacao onChange={this.onChange} limiteValor={user.limiteValor} tipoLimitacao={user.tipoLimitacao} periodoLimitacao={user.periodoLimitacao} />},
            {label: "Observações", form: <Observacoes onChange={this.onChange} obs={user.obs} />}
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

 export default EditarUsuario;