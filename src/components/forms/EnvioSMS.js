import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";

import { FieldGroup, TextAreaGroup } from "./CommonForms";

export default class EnviarSMS extends Component {

    render() {
        return (
            <form onSubmit={this.props.onSendSMS}>
                <Col md={12}>
                    <FieldGroup
                        id="numeros"
                        label="Enviar para"
                        type="text"
                        name="numeros"
                        value={this.props.numeros}
                        placeholder="Números para envio da mensagem"
                        onChange={this.props.onChange} />
                </Col>

                <Col md={12}>
                    <TextAreaGroup
                        id="mensagem"
                        label="Mensagem"
                        name="mensagem"
                        placeholder="Escreva o conteúdo da sua mensagem"
                        onChange={this.props.onChange} />
                </Col>
                
                <Col md={6}>
                    <Button onClick={this.props.cancel} >Cancelar</Button>
                </Col>
                <Col md={6}>
                    <Button type="submit" className="pull-right" bsStyle="primary">Enviar</Button>
                </Col>
            </form>
        )
    }
}