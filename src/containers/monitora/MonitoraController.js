import React, { Component } from 'react'
import { Col } from "react-bootstrap"

//Components
import TitleProduct from "../../components/utils/TitleProduct"
import Panel from "../../components/panel/Panel"
import MyButton from "../../components/button/MyButton"

//Constants
import {COMPANY_PRODUCT_MONITORA, COMPANY_PRODUCT_MONITORA_COLOR, ICON_MONITORA} from "../../constants/constantsCompany"

class Monitora extends Component {
    render() {
        return (
            <span>
                <Panel>
                    <TitleProduct
                        icon={ICON_MONITORA}
                        title={COMPANY_PRODUCT_MONITORA}
                        color={COMPANY_PRODUCT_MONITORA_COLOR}
                    />
                    <MyButton
                        tooltip="Teste"
                        label="Teste"
                    />
                </Panel>

                <div style={{marginBottom:15}} />

                <Col md={5} style={{paddingLeft:0}}>
                    <Panel title="Carteiras">
                    </Panel>
                </Col>

                <Col md={7} style={{paddingRight:0}}>
                    <Panel title="Documentos">
                    </Panel>
                </Col>
            </span>
        );
    }
}

export default Monitora