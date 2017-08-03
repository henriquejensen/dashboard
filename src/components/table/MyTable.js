import React, { Component } from "react";
import { Col, Table } from "react-bootstrap";

import MyButton from "../button/MyButton";

import { NENHUM_REGISTRO, TOOLTIP_SEE_LESS_INFO_MESSAGE, TOOLTIP_SEE_MORE_INFO_MESSAGE } from "../../constants/utils";

export default class MyTable extends Component {
    state = {
        showMoreInfo: {}
    }

    handleShowMoreInfo = (indexArray) => {
        let showMoreInfo = this.state.showMoreInfo;
        let newShowMoreInfo = Object.assign({}, this.state.showMoreInfo);
        newShowMoreInfo[indexArray] = this.state.showMoreInfo[indexArray] ? !this.state.showMoreInfo[indexArray] : true;
        this.setState({
            showMoreInfo: newShowMoreInfo          
        })
    }

    render() {
        const { fields=[], title, elements, hiddenRows, handleSortElements } = this.props
        let showMoreInfo = this.state.showMoreInfo
        return (
            <div>
                {title ? <h4>{title}</h4> : ""}
                <Table className="my-table" striped hover responsive>
                    <thead>
                        <tr>
                            {fields.map((field, index) => {
                                return (
                                    <th key={field.id+index}>
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
                            {hiddenRows ?
                                <th>#</th>
                            : ""}
                        </tr>
                    </thead>

                    {elements ?
                        elements.length > 0 ?
                            elements.map((row, indexRow) => {
                                return (
                                    <tbody key={indexRow}>
                                        <tr>
                                            {fields.map((field)=>{
                                                if(field.functionToApply) {
                                                    return <td key={field.id}>{field.functionToApply(row[field.id], indexRow)}</td>
                                                }

                                                return <td key={field.id}>{row[field.id] !== undefined || row[field.id] !== null ? row[field.id] : "-"}</td>
                                            })}

                                            {hiddenRows ?
                                                <td>
                                                    <MyButton
                                                        tooltip={showMoreInfo[indexRow] ? TOOLTIP_SEE_LESS_INFO_MESSAGE : TOOLTIP_SEE_MORE_INFO_MESSAGE}
                                                        onClickButton={this.handleShowMoreInfo}
                                                        params={[indexRow]}
                                                        myButtonClass="my-button-circle"
                                                        myButtonText={showMoreInfo[indexRow] ? <i className="fa fa-minus" aria-hidden="true"></i> : <i className="fa fa-plus" aria-hidden="true"></i>}
                                                    />
                                                </td>
                                            : <td></td>}

                                        </tr>
                                        <tr>
                                            {hiddenRows && showMoreInfo[indexRow] ?
                                                <td colSpan={fields.length}>
                                                    {hiddenRows.map((hiddenElement, j) => {
                                                        if(row[hiddenElement.id]) {
                                                            return (                                                            
                                                                <Col md={hiddenElement.mdLength ? hiddenElement.mdLength : 4} key={hiddenElement.id+j}>
                                                                    <strong>{hiddenElement.name}: </strong> {row[hiddenElement.id]}
                                                                </Col>                                                                
                                                            )
                                                        }
                                                    })}
                                                </td>
                                            : ""}                                            
                                        </tr>
                                    </tbody>
                                )
                            })
                        :
                            <tr>
                                <td colSpan={fields.length} className="text-center"><strong>{NENHUM_REGISTRO}</strong></td>
                            </tr>
                    : 
                        this.props.children
                    }
                    
                </Table>
            </div>
        )
    }

}
