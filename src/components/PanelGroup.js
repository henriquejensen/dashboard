import React, { Component } from "react";

export default class PanelGroup extends Component {
    return(){
        return (
            <div className="panel-group"  >
                {this.props.children}
            </div>
        )
    }
}