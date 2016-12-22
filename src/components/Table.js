import React, { Component } from "react";

export default class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-12 col-sm-12">
                <h4>{this.props.title}</h4>
                <table className="table table-striped table-hover table-responsive">
                    <thead>
                        <tr>
                            {this.props.fields.map((field, index) => {
                                return <th key={index}>{field}</th>
                            })}
                        </tr>
                    </thead>
                    
                    {this.props.children}
                    
                </table>
            </div>
        )
    }

}
