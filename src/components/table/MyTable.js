import React, { Component } from "react";
import { Table } from "react-bootstrap";

import {NENHUM_REGISTRO} from "../../constants/utils";

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
                                    <th key={field.id}>
                                        {field.name}
                                        {' '}
                                        {field.sortable ?
                                            <span>
                                                <i className="noPrint fa fa-chevron-up" onClick={() => handleSortElements(field.id, 'ASC')} aria-hidden="true"></i>
                                                <i className="noPrint fa fa-chevron-down" onClick={() => handleSortElements(field.id, 'DESC')} aria-hidden="true"></i>
                                            </span> : ""}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>

                    {elements ?
                        <tbody>
                            {elements.map((element, index) => {
                                
                                return (
                                    <tr key={index}>
                                        {fields.map((field, j)=>{
                                            
                                            if(field.functionToApply) {
                                                console.log("FUELD", field);
                                                return <td key={j}>{element[field.id] ? field.functionToApply(element[field.id]) : "-"}</td>
                                            }

                                            return <td key={j}>{element[field.id] ? element[field.id] : "-"}</td>
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
