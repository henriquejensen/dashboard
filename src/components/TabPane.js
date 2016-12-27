import React, { Component } from "react";

export default class TabPane extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.tabActive == this.props.label ? "tab-pane active": (this.props.index == 0 && this.props.tabActive == "" ? "tab-pane active" : "tab-pane")} >
                {this.props.children}
            </div>
        )
    }
}