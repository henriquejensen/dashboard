import React, { Component } from "react";

export default class PanelGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel-group"  >
                {this.props.children}
            </div>
        )
    }
}