import React, { Component } from "react";

import { Tabs, Tab, Col, Button, Label, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export const FieldGroup = (props) => {
    return (
        <FormGroup controlId={props.id} style={{marginLeft:0, marginRight:0}}>
            <ControlLabel>{props.label}</ControlLabel>
            <FormControl
                type={props.type}
            />
        </FormGroup>
    )
}

 export const GrupoCliente = () => {
     return (
         <FieldGroup id="TESTE" label="TATAT" type="text" />
     )
 }

const editar = [
    {label: "Grupo e Cliente", form: <GrupoCliente />},
    {label: "Dados Básicos", form: <GrupoCliente />},
    {label: "Limitação", form: <GrupoCliente />},
    {label: "Observações", form: <GrupoCliente />}
]

class EditarUsuario extends Component {
    render() {
        return (
            <Col md={12}>
                <Tabs
                    defaultActiveKey={1}
                    id="uncontrolled-tab-example">

                    {editar.map((item,index) => {
                        console.log(item.form)
                        return (
                            <Tab eventKey={index} title={item.label} key={index}>
                                {item.form}
                            </Tab>
                        )
                    })}

                </Tabs>
            </Col>
        )
    }
 }

 export default EditarUsuario;