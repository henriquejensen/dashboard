import React, { Component } from 'react';
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";

class Card extends Component {
    render() {
        let title = this.props.title;
        let elements = this.props.elements;
        let colLength = this.props.colLength;
        return (
            <Panel title={title}>
                {elements.map((element, index) => {
                    return (
                        <Col md={colLength} key={index}>
                            <strong>{element.label}: </strong> {element.value}
                        </Col>
                    )
                })}
            </Panel>
        );
    }
}

export default Card;