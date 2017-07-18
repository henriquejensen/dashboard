import "./TitleProduct.css"

import React from 'react'
import { Col } from "react-bootstrap"

const TitleProduct = (props) => {
    return (
        <Col md={12} sm={12} id="title-product">
            <img src={props.icon} />
            <h1 style={{color:props.color}} >{props.title}</h1>
        </Col>
    )
}

export default TitleProduct