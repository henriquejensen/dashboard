import "./CardInfoMenuUser.css";

import React, { Component } from "react";
import { Image, Col } from "react-bootstrap";

export default class CardInfoMenuUser extends Component {
    render() {
        let  { usuarioImagem, usuarioNome, perfilDescricao } = this.props.user
        usuarioNome = usuarioNome ? usuarioNome : ""

        return (
            <div id="card-info-user">
                <div>
                    <Image src={usuarioImagem} id="menu-image-user" />
                </div>
                <div id="card-info-text">
                    <div>{usuarioNome.substring(0,17)}</div>
                    <div>{perfilDescricao}</div>
                </div>
            </div>
        )
    }
}