import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class MyTable extends Component {
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
                                    return (
                                        <th key={index} onClick={() => this.props.orderTableBy(field)}>{field}</th>
                                    )
                                })
                            : ""}
                        </tr>
                    </thead>

                    {this.props.elements ?
                        <tbody>
                            {this.props.elements.map((elements, index) => {
                                return (
                                    <tr key={index}>
                                        {Object.values(elements).map((el, j)=>{
                                            return (
                                                <td key={j}>{el}</td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    : 
                        this.props.children
                    }
                    
                </Table>
            </div>
        )
    }

}
