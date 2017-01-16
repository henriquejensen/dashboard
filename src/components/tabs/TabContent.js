import React, { Component } from "react";

export default class TabContent extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="tab-content" id="localize-content">
                {this.props.children}
            </div>
        )
    }
}