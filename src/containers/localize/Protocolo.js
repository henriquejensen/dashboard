import React, { Component } from "react";

export default class Protocolo extends Component {
    render() {
        return (
            <div className="text-center">
                <strong>Protocolo:</strong> {this.props.protocolo}
            </div>
        )
    }
}