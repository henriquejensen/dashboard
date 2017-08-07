import React, { Component } from 'react'
import { Col } from "react-bootstrap"

import Panel from "../panel/Panel"
import Table from "../table/MyTable"

class CardWithTable extends Component {
    render() {
        let { title, fields, elements, rows, hiddenRows, mdLength=3, xsLength=6 } = this.props
        fields = fields ? fields : []
        elements = elements ? elements : []
        rows = rows ? rows : []

        return (
            <Panel title={title}>
                {elements.length > 0 ?
                    elements.map((element, index) => {
                        if(element.value) {
                            return (
                                <Col md={mdLength} xs={xsLength} key={index}>
                                    {element.label ? <strong>{element.label}: </strong> : ""} {element.value}
                                </Col>
                            )
                        }
                    })
                : ""}

                {fields.length > 0 ?
                    <Col md={12}>
                        <Table fields={fields} elements={rows} hiddenRows={hiddenRows} />
                    </Col>
                : ""}
            </Panel>
        )
    }
}

export default CardWithTable