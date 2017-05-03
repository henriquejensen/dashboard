import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class MyTable extends Component {
    render() {
        let fields = this.props.fields;
        let title = this.props.title;
        let elements = this.props.elements;
        return (
            <div>
                {title ?
                    <h4>{title}</h4>
                : ""}
                <Table className="my-table" striped hover responsive>
                    <thead>
                        <tr>
                            {fields ? 
                                fields.map((field, index) => {
                                    return (
                                        <th key={index}>{field}</th>
                                    )
                                })
                            : ""}
                        </tr>
                    </thead>

                    {elements ?
                        <tbody>
                            {elements.map((element, index) => {
                                return (
                                    <tr key={index}>
                                        {Object.values(element).map((el, j)=>{
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
