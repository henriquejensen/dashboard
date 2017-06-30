import React, { Component } from "react";
import { Alert, Col } from "react-bootstrap";

import Panel from "../../components/panel/Panel";

import { COMPANY_NAME_LONG, COMPANY_SITE_CONTACT, COMPANY_EMAIL,COMPANY_PHONE } from "../../constants/constantsCompany";

export default class Contato extends Component {

    renderAlert() {
        return (
            <Alert bsStyle="warning">
                <p>Para qualquer informação, dúvida, reclamação ou sugestão, contate-nos pelos recursos acima que em breve retornaremos.</p>
            </Alert>
        )
    }
    render() {
        return (
            <Col md={12}>
                <Panel title={COMPANY_NAME_LONG}>
                    <Col md={12} style={{fontSize:16, textAlign:"center", padding:5}}>
                        <i className="fa fa-home" />
                        {" "}
                        SITE:
                        {" "}
                        <a href={COMPANY_SITE_CONTACT} target="_blank">{COMPANY_SITE_CONTACT}</a>
                    </Col>

                    <Col md={12} style={{fontSize:16, textAlign:"center", padding:5}}>
                        <i className="fa fa-envelope-o" />
                        {" "}
                        E-MAIL:
                        {" "}
                        <a href={"mailto:"+COMPANY_EMAIL} target="_blank">{COMPANY_EMAIL}</a>
                    </Col>

                    {COMPANY_PHONE.map(phone => {
                        return (
                            <Col md={12} style={{fontSize:16, textAlign:"center", padding:5}}>
                                <i className="fa fa-phone" />
                                {" "}
                                {phone}
                            </Col>
                        )
                    })}

                </Panel>

                <div style={{marginBottom:15}} />

                {this.renderAlert()}
            </Col>
        )
    }
}