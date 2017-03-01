import React, { Component } from "react";

import { Tabs, Tab } from "react-bootstrap";

const editar = [
    "Grupo e Cliente", "Dados Básicos", "Limitação", "Observações"
]

class EditarUsuario extends Component {
    render() {
        return (
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
        )
    }
 }

 export default EditarUsuario;