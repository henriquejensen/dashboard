import React, { Component } from "react";
import ReactDOM from "react-dom";

class Modal extends Component {
    componentDidMount() {
        this.modalTarget = document.createElement("div");
        this.modalTarget.className = "modal fade in";
        document.body.appendChild(this.modalTarget);
        this._render()
    }

    _render() {
        ReactDOM.render(
            <div className="modal-dialog">
                <div className="modal-content">
                    {this.props.children}
                </div>
            </div>,
            this.modalTarget
        )
    }

    render() {
        return <noscript />;
    }
}

export default Modal;