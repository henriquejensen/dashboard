import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class MyTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.title ?
                    <h4>{this.props.title}</h4>
                : ""}
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            {this.props.fields ? 
                                this.props.fields.map((field, index) => {
                                    return <th key={index}>{field}</th>
                                })
                            : ""}
                        </tr>
                    </thead>
                    
                    {this.props.children}
                    
                </Table>
            </div>
        )
    }

}
