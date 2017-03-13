import React, { Component } from "react";
import { Col } from "react-bootstrap";

import { FieldGroup, SelectGroup, TextArea, CheckboxGroup } from "../../components/forms/CommonForms";

export default class SMSRapido extends Component {
    render() {
        return (
            <section>
                <span>
                    <Col md={12}>
                        <FieldGroup
                            id="celulares"
                            type="textarea"
                            label="Celular(es)"
                            name="celulares"
                            placeholder="Ex: 5199999999,518888888,517777777" />
                    </Col>
                </span>
            </section>
        )
    }
}