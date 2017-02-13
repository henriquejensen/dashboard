import React, { Component } from "react";
import { Image, Col } from "react-bootstrap";

export default class CardInfoMenuUser extends Component {
    render() {
        return (
            <div style={{position:"relative", height:"72px", backgroundColor: this.props.color, backgroundImage:"url(../../../public/images/myimage.png)", backgroundSize:"cover"}}>
                <Col md={3} sm={12} style={{position:"absolute", top:"27%"}}>
                    <Image src={this.props.user.avatar_url} width="30px" circle/>
                </Col>
                <Col md={9} sm={12} style={{position:"absolute", top:"27%", color: "white", right:"0", fontWeight:"bold"}}>
                    {console.log("USEr", this.props.user)}
                    <p>{this.props.user.usuarioNome}</p>
                    <p>{this.props.user.perfilDescricao}</p>
                </Col>
            </div>
        )
    }
}