import React, { Component } from "react";
import { Image, Col } from "react-bootstrap";

export default class CardInfoMenuUser extends Component {
    render() {
        return (
            <div style={{position:"relative", height:"100px", backgroundImage:"url(../../../public/images/myimage.jpg)", backgroundSize:"cover"}}>
                <Col md={4} style={{position:"absolute", top:"20%", width:"45%"}}>
                    <Image src="https://pickaface.net/assets/images/slides/slide2.png" circle width="100%"/>
                </Col>
                <Col md={8} style={{position:"absolute", top:"35%", right:"0"}}>
                    NOME.USUARIO
                    PERFIL: ADMN
                </Col>
            </div>
        )
    }
}