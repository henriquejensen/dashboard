import React, { Component } from 'react'
import { Col } from "react-bootstrap"

import { LOGO_BASECERTA } from "../../constants/constantsCompany"

class BaseCertaController extends Component {
    render() {
        return (
            <div>
                <Col md={12} sm={12} className="text-center">
                    <img src={LOGO_BASECERTA} className="logo-produto" />
                </Col>

                {this.props.children}

            </div>
        );
    }
}

export default BaseCertaController;