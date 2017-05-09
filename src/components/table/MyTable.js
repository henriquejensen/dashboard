import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class MyTable extends Component {
    render() {
        let fields = this.props.fields ? this.props.fields : [];
        let title = this.props.title ? this.props.title : "";
        let elements = this.props.elements;
        return (
            <div>
                <h4>{title}</h4>
                <Table className="my-table" striped hover responsive>
                    <thead>
                        <th>
                            {fields.map((field, index) => {
                                return (
                                    <th key={index}>{field.label}</th>
                                )
                            })}
                        </th>
                    </thead>

                    {elements ?
                        <tbody>
                            {elements.map((element, index) => {
                                let keysElement = Object.keys(element);
                                return (
                                    <tr key={index}>
                                        {keysElement.map((key, j)=>{
                                            return (
                                                <td key={j}>{element[key]}</td>
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
