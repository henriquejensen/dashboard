import React, { Component } from "react";
import { Form, FormGroup, Col, FormControl, Label, ControlLabel, Button, Radio } from "react-bootstrap";

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
        console.log("ASDFA", id, value)
        this.setState({
            [id]: value
        })
    }

    renderFieldGroup(id, label, type, name, placeholder) {
        return (
            <FormGroup controlId={id} style={{marginLeft:0, marginRight:0}}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={this.onChange}
                />
            </FormGroup>
        )
    }

    renderSelectGroup(id, label, type, name, options) {
        return (
            <FormGroup controlId={id} style={{marginLeft:0, marginRight:0}}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    name={name}
                    componentClass={type}
                >
                    {options.map((opt, index) => {
                        return <option key={index} value={opt}>{opt}</option>
                    })}
                </FormControl>
            </FormGroup>
        )
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
                        {this.renderFieldGroup("inputUser", "Usuário", "text", "name", "Digite o nome do usuário")}
                    </Col>
                    <Col md={6}>
                        {this.renderFieldGroup("inputEmailPrincipal", "Email Principal", "email", "email", "Email principal")}
                    </Col>
                    <Col md={6}>
                        {this.renderFieldGroup("inputEmail2", "Email 2", "email", "email2", "Email secundário")}
                    </Col>
                    <Col md={6}>
                        {this.renderSelectGroup("perfil", "Perfil", "select", "perfil", perfilOptions)}
                    </Col>
                    <Col md={6}>
                        {this.renderSelectGroup("status", "Status", "select", "status", ["SIM", "NÃO"])}
                    </Col>

                    <Col md={6}>
                        {this.renderRadioGroup("boleto", "Visualizar boleto", this.state.boleto)}
                    </Col>

                    <Col md={6}>
                        {this.renderRadioGroup("dossie", "Acesso ao Dossiê", this.state.dossie)}
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