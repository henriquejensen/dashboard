import React, { Component } from "react";
import { Form, FormGroup, Col, FormControl, Label, ControlLabel, Button, Radio } from "react-bootstrap";

import { FieldGroup, SelectGroup, RadioGroup } from "../../components/forms/CommonForms";

let perfilOptions = [
    "Operador", "Gerente", "ADM"
]

class NovoUsuario extends Component {
    state = {
        boleto: this.props.usuario.boleto,
        dossie: this.props.usuario.dossie
    }

    onFormSubmit = (evt) => {
        evt.preventDefault();

        console.log(this.state);

        this.props.cancel();
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
        return (
            <Col md={12}>
                <Form horizontal onSubmit={this.onFormSubmit}>
                    <Col md={12}>
                        <FieldGroup
                            id="inputUser"
                            type="text"
                            label="Usuário"
                            name="nome"
                            placeholder="Digite o nome do usuário"
                            onChange={this.onChange} />
                    </Col>
                    <Col md={6}>
                        <FieldGroup
                            id="inputEmailPrincipal"
                            type="email"
                            label="Email Principal"
                            name="email"
                            placeholder="Email principal"
                            onChange={this.onChange} />
                    </Col>
                    <Col md={6}>
                        <FieldGroup
                            id="inputEmail2"
                            type="email"
                            label="Email 2"
                            name="email2"
                            placeholder="Email secundário"
                            onChange={this.onChange} />
                    </Col>
                    <Col md={6}>
                        <SelectGroup
                            id="perfil"
                            type="select"
                            label="Perfil"
                            name="perfil"
                            onChange={this.onChange}
                            options={perfilOptions} />
                    </Col>
                    <Col md={6}>
                        <SelectGroup
                            id="status"
                            type="select"
                            label="Status"
                            name="perfil"
                            onChange={this.onChange}
                            options={["SIM", "NÃO"]} />
                    </Col>

                    <Col md={6}>
                        <RadioGroup
                            id="boleto"
                            label="Visualizar boleto"
                            onChangeRadio={this.onChangeRadio}
                            fieldChecked={this.state.boleto} />
                    </Col>

                    <Col md={6}>
                        <RadioGroup
                            id="dossie"
                            label="Acesso ao Dossiê"
                            onChangeRadio={this.onChangeRadio}
                            fieldChecked={this.state.dossie} />
                    </Col>

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

 export default NovoUsuario;