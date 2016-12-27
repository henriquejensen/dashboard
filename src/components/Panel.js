import React, { Component } from "react";

export default class PanelGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row row-localize">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading text-center">
                            {this.props.title}
                        </div>

                        <div className="panel-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}