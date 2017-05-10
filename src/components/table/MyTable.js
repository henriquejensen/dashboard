import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class MyTable extends Component {
    render() {
        let fields = this.props.fields ? this.props.fields : [];
        let title = this.props.title;
        let elements = this.props.elements;
        let handleSortElements = this.props.handleSortElements;
        return (
            <div>
                {title ? <h4>{title}</h4> : ""}
                <Table className="my-table" striped hover responsive>
                    <thead>
                        <tr>
                            {fields.map((field, index) => {
                                return (
                                    <th key={index}>
                                        {field.name}
                                        {' '}
                                        {field.sortable ?
                                            <span>
                                                <i className="fa fa-chevron-up" onClick={() => handleSortElements(field.id, 'ASC')} aria-hidden="true"></i>
                                                <i className="fa fa-chevron-down" onClick={() => handleSortElements(field.id, 'DESC')} aria-hidden="true"></i>
                                            </span> : ""}
                                    </th>
                                )
                            })}
                        </tr>
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
