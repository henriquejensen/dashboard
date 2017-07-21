import React, { Component } from 'react'
import { Col } from "react-bootstrap"

import { LOGO_SMS } from "../../constants/constantsCompany"

class SMS extends Component {
    render() {
        return (
            <div>
                <Col md={12} sm={12} className="text-center">
                    <img src={LOGO_SMS} className="logo-produto" />
                </Col>

                {this.props.children}

            </div>
        )
    }
}

export default SMS