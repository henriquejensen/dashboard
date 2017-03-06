import React, { Component } from "react";

import { Tabs, Tab, Col } from "react-bootstrap";

const editar = [
    "Grupo e Cliente", "Dados Básicos", "Limitação", "Observações"
]

class EditarUsuario extends Component {
    render() {
        return (
            <Col md={12}>
                <Tabs
                    defaultActiveKey={1}
                    id="uncontrolled-tab-example">

                    {editar.map((item,index) => {
                        return (
                            <Tab eventKey={index} title={item} key={index}>
                                {item}
                            </Tab>
                        )
                    })}

                </Tabs>
            </Col>
        )
    }
 }

 export default EditarUsuario;