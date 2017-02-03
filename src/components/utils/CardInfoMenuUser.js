import React, { Component } from "react";
import { Image, Col } from "react-bootstrap";

export default class CardInfoMenuUser extends Component {
    render() {
        return (
            <div style={{position:"relative", height:"72px", backgroundColor: this.props.color, backgroundImage:"url(../../../public/images/myimage.png)", backgroundSize:"cover"}}>
                <Col md={4} style={{position:"absolute", top:"27%"}}>
                    <Image src="../../../public/images/avatar.png" width="100%" circle/>
                </Col>
                <Col md={8} style={{position:"absolute", top:"27%", color: "white", right:"0", fontWeight:"bold"}}>
                    NOME.USUARIO
                    PERFIL: ADMN
                </Col>
            </div>
        )
    }
}