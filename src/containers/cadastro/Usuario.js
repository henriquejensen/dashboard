import React, { Component } from "react";
import { Button, Col, ControlLabel, Form, FormGroup, Label,  Radio, Tabs, Tab } from "react-bootstrap";

import { FieldGroup, SelectGroup, RadioGroup, TextAreaGroup } from "../../components/forms/CommonForms";

const Grupo = (props) => {
    return (
        <Col md={12}>
            <FieldGroup
                id="inputUser"
                type="text"
                label="Nome do Cliente"
                value={props.cliente} />

            <FieldGroup
                id="inputUser"
                type="text"
                label="Login do Cliente"
                value={props.login} />

            <FieldGroup
                id="inputUser"
                type="text"
                label="Nome do grupo"
                value={props.grupo} />
        </Col>
    )
}

const DadosBasicos = (props) => {
    return (
        <span>
            <Col md={12}>
                <FieldGroup
                    id="usuario"
                    type="text"
                    label="Usuário"
                    name="usuario"
                    placeholder="Digite o nome do usuario"
                    error={props.isFieldUsuarioFilled}
                    message={props.isFieldUsuarioFilled ? "Campo obrigatório" : ""}
                    value={props.usuario}
                    onChange={props.onChange} />
            </Col>

            <Col md={6}>
                <FieldGroup
                    id="email1"
                    type="email"
                    label="Email principal"
                    name="email1"
                    placeholder="Digite o email principal"
                    error={props.isFieldEmail1Filled}
                    message={props.isFieldEmail1Filled ? "Campo obrigatório" : ""}
                    value={props.email1}
                    onChange={props.onChange} />
            </Col>

            <Col md={6}>
                <FieldGroup
                    id="email2"
                    type="email"
                    label="Email 2"
                    name="email2"
                    placeholder="Digite o email secundário"
                    value={props.email2}
                    onChange={props.onChange} />
            </Col>

            <Col md={6}>
                <SelectGroup
                    id="perfilVO"
                    type="select"
                    label="Perfil"
                    name="perfilVO"
                    value={props.perfilVO}
                    options={props.options}
                    onChange={props.onChange} />
            </Col>

            <Col md={6}>
                <SelectGroup
                    id="statusAtivo"
                    type="select"
                    label="Status ativo"
                    name="statusAtivo"
                    value={props.statusAtivo}
                    options={["SIM", "NÃO"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={6}>
                <SelectGroup
                    id="statusBoleto"
                    type="select"
                    label="Visualizar boleto"
                    name="statusBoleto"
                    value={props.statusBoleto}
                    options={["NÃO", "SIM"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={6}>
                <SelectGroup
                    id="accessDossieTemp"
                    type="select"
                    label="Acesso ao dossiê"
                    name="accessDossieTemp"
                    value={props.accessDossieTemp}
                    options={["NÃO", "SIM"]}
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
                    id="limiteValorString"
                    type="number"
                    label="Limite de quantidade"
                    name="limiteValorString"
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
            <TextAreaGroup
                id="obs"
                label="Observações"                
                name="obs"
                value={props.obs}
                placeholder="Escreva alguma observação sobre o usuário"
                onChange={props.onChange} />
        </Col>
    )
}

class Usuario extends Component {
    state = {
        perfilVO: this.props.perfilVO ? this.props.perfilVO :"14",
        usuario: this.props.usuario,
        email1: this.props.email1,
        email2: this.props.email2,
        statusAtivo: this.props.statusAtivo ? this.props.statusAtivo : "SIM",
        tipoLimitacao: this.props.tipoLimitacao,
        periodoLimitacao: this.props.periodoLimitacao,
        limiteValorString: this.props.limiteValorString ? this.props.limiteValorString : 0,
        statusBoleto: this.props.statusBoleto,
        obs: this.props.obs,
        isFieldUsuarioFilled: false,
        isFieldEmail1Filled: false
    }

    onFormSubmit = (evt) => {
        evt.preventDefault();

        if(!this.state.usuario || !this.state.email1) {
            this.setState({
                isFieldUsuarioFilled: !this.state.usuario ? true : false,
                isFieldEmail1Filled: !this.state.email1 ? true : false
            })
        } else {

            let usuario = {
                    grupoUsuarioVO: {
                        id: 49908
                    },
                    perfilVO: {
                        id: this.state.perfilVO
                    },
                    id: this.props.usuarioId,
                    usuario: this.state.usuario,
                    email1: this.state.email1,
                    email2: this.state.email2,
                    statusAtivo: this.state.statusAtivo,
                    tipoLimitacao: this.state.tipoLimitacao,
                    periodoLimitacao: this.state.periodoLimitacao,
                    limiteValorString: this.state.limiteValorString,
                    obs: this.state.obs
            }

            this.props.addNewUser(usuario);
        }
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    onChangeRadio = (id, value) => {
        this.setState({
            [id]: value
        })
    }

    renderRadioGroup(id, label, fieldChecked) {
        return (
            <FormGroup controlId={id} style={{marginLeft:0, marginRight:0}}>
                <Col md={12}><ControlLabel>{label}</ControlLabel></Col>
                <Col md={6}>
                    <Radio onClick={() => this.onChangeRadio(id,"SIM")} checked={fieldChecked == "SIM" ? true : false}>
                        SIM
                    </Radio>
                </Col>
                <Col md={6} >
                    <Radio inline onClick={() => this.onChangeRadio(id,"NAO")} checked={fieldChecked == "NAO" ? true : false}>
                        NAO
                    </Radio>
                </Col>
            </FormGroup>
        )
    }

    render() {
        const editar = [
            {
                label: "Dados Básicos",
                form: <DadosBasicos
                        isFieldEmail1Filled={this.state.isFieldEmail1Filled}
                        isFieldUsuarioFilled={this.state.isFieldUsuarioFilled}
                        onChange={this.onChange}
                        usuario={this.state.usuario}
                        senha={this.state.senha}
                        email1={this.state.email1}
                        email2={this.state.email2}
                        options={this.props.options}
                        perfilVO={this.state.perfilVO}
                        statusAtivo={this.state.statusAtivo}
                        statusBoleto={this.state.statusBoleto}
                        accessDossieTemp={this.state.accessDossieTemp} />
            },
            {label: "Limitação", form: <Limitacao onChange={this.onChange} limiteValorString={this.state.limiteValorString} tipoLimitacao={this.state.tipoLimitacao} periodoLimitacao={this.state.periodoLimitacao} />},
            {label: "Observações", form: <Observacoes onChange={this.onChange} obs={this.state.obs} />}
        ];

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

                    <Col md={12} style={{padding:0}}>
                        <Col md={6}>
                            <Button
                                type="submit"
                                onClick={this.props.cancel}>Cancelar</Button>
                        </Col>
                        <Col md={6}>
                            <Button
                                className="pull-right"
                                type="submit"
                                bsStyle="info" >Salvar</Button>
                        </Col>
                    </Col>
                </Form>
            </Col>
        )
    }
 }

 export default Usuario;