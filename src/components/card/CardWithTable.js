import React, { Component } from 'react';
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/MyTable";

class CardWithTable extends Component {
    render() {
        let title = this.props.title;
        let fields = this.props.fields;
        let elements = this.props.elements ? this.props.elements : [];
        let rows = this.props.rows;
        let hiddenRows = this.props.hiddenRows;
        let mdLength = this.props.mdLength ? this.props.mdLength : 3;
        let xsLength = this.props.xsLength ? this.props.xsLength : 6;
        return (
            <Panel title={title}>
                {elements.length > 0 ?
                    elements.map((element, index) => {
                        if(element.value) {
                            return (
                                <Col md={mdLength} xs={xsLength} key={index}>
                                    <strong>{element.label}: </strong> {element.value}
                                </Col>
                            )
                        }
                    })
                : ""}
                <Col md={12}>
                    <Table fields={fields} elements={rows} hiddenRows={hiddenRows} />
                </Col>
            </Panel>
        );
    }
}

export default CardWithTable;