import "./CardInfoMenuUser.css";

import React, { Component } from "react";
import { Image, Col } from "react-bootstrap";

export default class CardInfoMenuUser extends Component {
    render() {
        return (
            <div id="card-info-user">
                <Col md={3} sm={12} >
                    <Image src={this.props.user.avatar_url} id="menu-image-user" circle/>
                </Col>
                <Col md={9} sm={12} >
                    <div>{this.props.user.usuarioNome}</div>
                    <div>{this.props.user.perfilDescricao}</div>
                </Col>
            </div>
        )
    }
}