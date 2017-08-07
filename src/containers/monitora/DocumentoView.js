import React, { Component } from 'react'

//Components
import Panel from "../../components/panel/Panel"
import TitleProduct from "../../components/utils/TitleProduct"

export default class DocumentoView extends Component {
    render() {
        return (
            <span>
                <Panel>
                    <TitleProduct
                        icon={ICON_MONITORA}
                        title={COMPANY_PRODUCT_MONITORA}
                        color={COMPANY_PRODUCT_MONITORA_COLOR}
                    />
                </Panel>
            </span>
        )
    }
}