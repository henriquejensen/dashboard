import React, { Component } from "react";

export default class Protocolo extends Component {
    render() {
        return (
            <div className="text-center">
                Protocolo: {this.props.protocolo}
            </div>
        )
    }
}