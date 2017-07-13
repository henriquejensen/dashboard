import "./CardInfoMenuUser.css";

import React, { Component } from "react";
import { Image, Col } from "react-bootstrap";

export default class CardInfoMenuUser extends Component {
    render() {
        let  { usuarioFoto, usuarioLogin, perfilDescricao } = this.props.user
        usuarioLogin = usuarioLogin ? usuarioLogin : "" //Verificacao no primeiro load, quanto nao se tem as info do user

        return (
            <div id="card-info-user">
                <div>
                    <Image src={usuarioFoto} id="menu-image-user" />
                </div>
                <div id="card-info-text">
                    <div>{usuarioLogin.substring(0,17)}</div>
                    <div>{perfilDescricao}</div>
                </div>
            </div>
        )
    }
}